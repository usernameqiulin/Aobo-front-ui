import React, {Component} from 'react';
import R from "ramda"

export const type = {
    deposit: Symbol('deposit'),
    transfer: Symbol('transfer')
}

class DepositAndTransfer extends Component{
    constructor(props, defaultDestinationWallet = ''){
        super(props);
        this.defaultWallet = defaultDestinationWallet;
        //存款需要method，转账不需要
        const defaultMethod = this.type === type.deposit ?
            (!!props.profile.data ? this.getDefaultMethod(props.profile.data) : null)
            :
            null;
        const couponInit = props.couponCode ? props.couponCode : null;
        this.state = {
            form: {
                amount: '',
                coupon: couponInit ? couponInit.code: '',
                method: defaultMethod ? defaultMethod.method : '',
                source_wallet: '',
                destination_wallet: couponInit ? couponInit.wallet : this.defaultWallet,
                extra: null,
                code: '',
            },
            focus: {
                coupon: false,
                amount: false,
            },
            error: {
                coupon: null,
                amount: null,
                method: null,
                source_wallet: null,
                destination_wallet: null,
                code: null,
            },
            info: {
                amount: 'min',
            },
            coupon: couponInit ? couponInit : {},
            couponHint: {
                show: false,
                data: []
            }
        }
        this.validRange = defaultMethod ? defaultMethod.range : {min:0, max:null}
        const conditions = couponInit ? couponInit.conditions.find(con => con.type === 'principal') : null;
        this.couponMinAmount = conditions ? conditions.value.value : null;
        this.maxAmount = null;
    }
    getDefaultMethod = (profile) => {
        return profile.financial.settings.deposit[0]
    }
    onCouponFocus = e => {   //优惠券输入框选中
        // console.log('focus')
        this.setState(prevState => ({
            couponHint: {...prevState.couponHint, show: true},
            focus: {
                ...this.state.focus,
                coupon: true,
            },
        }))
    }
    onCouponBlur = e => {  //优惠券输入框失去焦点
        // console.log('blur')
        this.setState(prevState => ({
            couponHint: {...prevState.couponHint, show: false},
            focus: {
                ...this.state.focus,
                coupon: false,
            },
        }))
    }
    onAmountChange = (inputLimit = false) => {  //金额输入框内容发生改变
        return e => {
            let amountString = e.target.value
            if (amountString.indexOf('.') !== -1 && amountString.split('.')[1].length > 2) {
                return false
            }
            const amount = parseFloat(amountString)
            if (isNaN(amount)) {
                this.findError('');
                this.setState(prevState => ({
                    form: {
                        ...prevState.form,
                        amount: '',
                    },
                }))
            }else if(this.findError(amount) || !inputLimit){
                this.setState(prevState => ({
                    form: {
                        ...prevState.form,
                        amount: amount
                    }
                }))
            }
        }
    }
    findError = (nextAmount) => {   //判断是否有错
        let error = R.merge(this.state.error, {});
        let infoAmount = 'min';
        let amountShouldUpdate = true;
        if (nextAmount !== '') { //如果有输入金额
            if (!!this.validRange.min && nextAmount < this.validRange.min && nextAmount !== 0) {   //是否在金额要求范围内
                infoAmount = 'min'
                error.amount = 'min';
                amountShouldUpdate = false
            }else if (!!this.validRange.max && nextAmount > this.validRange.max) {
                infoAmount = 'max'
                error.amount = 'max';
                amountShouldUpdate = false;
            }else if(this.maxAmount !== null && nextAmount > this.maxAmount){  //转账余额最大金额限制
                infoAmount = 'max';
                error.amount = 'max';
                amountShouldUpdate = false;
            }
            else{
                error.amount = null;
                infoAmount = 'max'
            }

            if (this.couponMinAmount && nextAmount < this.couponMinAmount) {   //存在优惠券最小金额要求限制且输入金额小于优惠券最小金额要求
                error.amount = 'coupon'
            }else if(error.amount === 'coupon'){
                error.amount = null
            }
        }else{
            error.amount = null
        }
        this.setState({
            error,
            info: {amount: infoAmount}
        })
        return amountShouldUpdate;
    }
    onCouponChange = (e, close = false) => {   //优惠券输入框内容改变时触发
        const couponValue = e.target.value || e.target.innerHTML;
        const coupons = this.props.coupon;
        let couponHint = [];
        const reg = new RegExp(`^(${couponValue})`);
        let couponNow = null;
        this.couponMinAmount = !!couponValue ? this.couponMinAmount : null;
        if(!!coupons.data && !!couponValue){   //可以调用props里面的coupon
            for(let item of coupons.data){
                reg.test(item.code) && couponHint.push(item.code);
                couponNow = item.code === couponValue ? item : couponNow;
            }
            if(couponNow){ //如果有对应的优惠券      
                const condition = couponNow.conditions.find(con => con.type === 'principal')
                this.couponMinAmount = condition.value.value
            }else{   //没有对应的优惠券，将优惠券最低要求改为0
                this.couponMinAmount = null;
            }
        }
        this.findError(this.state.form.amount); //判断是否有错误
        this.setState(prevState => ({
            coupon: couponNow ? couponNow : {},
            couponHint: {show: prevState.couponHint.show, data: close ? [] : couponHint},
            form: {
                ...prevState.form,
                coupon: couponValue,
                destination_wallet: couponNow ? couponNow.wallet : (JSON.stringify(prevState.coupon) === "{}" ? prevState.form.destination_wallet : this.defaultWallet)
            }
        })) 
    }
    onCouponSelect = (code) => {   //选中优惠券触发
        const c = code === this.state.form.coupon ? '' : code  //判断是选中or取消选中优惠券
        const coupon = c ? this.props.coupon.data.find(item => item.code === c) : {}
        // console.log(coupon)
        let form = R.merge(this.state.form, {});
        form.coupon = c
        if (!!c && !!coupon) {  //如果是选中优惠券
            form.destination_wallet = coupon.wallet
            const condition = coupon.conditions.find(con => con.type === 'principal')
            this.couponMinAmount = condition.value.value
        }
        else {  //取消选择优惠券
            form.destination_wallet = this.defaultWallet
            this.couponMinAmount = null
        }
        this.findError(this.state.form.amount);  //查找错误
        this.setState({
            form: form,
            coupon: coupon,
        })
    }
    selectDestinationWallet = (canCancelSelected = false) => {   //选中钱包
        return wallet => {
            if(this.state.form.destination_wallet === wallet){  //取消选择钱包
                canCancelSelected && this.setState(prevState => ({
                    form: {
                        ...prevState.form,
                        destination_wallet: '',
                        coupon: ''
                    },
                    coupon: {}
                }), () => {
                    this.couponMinAmount = null;
                    this.findError(this.state.form.amount);
                })
            }else{ //更换钱包或者选中钱包
                this.setState(prevState => ({
                    form: {
                        ...prevState.form,
                        destination_wallet: wallet,
                        coupon: ''
                    },
                    coupon: {}
                }), () => {
                    this.couponMinAmount = null;
                    this.findError(this.state.form.amount);
                })
            }
            // this.findError(this.state.form.amount)
        }
    }
    onCouponHintClick = e => {
        this.onCouponChange(e, true);  
    }

    onCouponHintMouseDown = e => {
        e.preventDefault();
    }

    couponInput = ele => {
        if(ele){
            this.couponInput = ele;
        }
    }
    onAmountFocus = e => this.setState({
        focus: {
            ...this.state.focus,
            amount: true,
        },
    })

    onAmountBlur = e => {
        this.findError(this.state.form.amount);
        this.setState({
            focus: {
                ...this.state.focus,
                amount: false,
            },
        })
    }
    onAmountKeyDown = e => {
        const string = e.target.value
        string.indexOf('.') !== -1 && string.split('.')[1].length >= 2 && e.which !== 8 && e.preventDefault()
    }
}

export default DepositAndTransfer;