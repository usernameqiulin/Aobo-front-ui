import React,{PureComponent, Component} from 'react';
import {translate} from 'react-i18next';
import {connect} from 'react-redux';

import {WOW} from './wow.min.js';
import './index.css';
import './animate.min.css';
import Produce from './produce';
import PartHeader from './partHeader';
import AdvantageDesc from './advantageDesc';
import PartFourCon from './partFour';
import {DomAnimation} from './doAnimationIf';
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import productImg1 from '../../images/affiliate/product1.pic';
import productImg2 from '../../images/affiliate/product2.pic';
import productImg3 from '../../images/affiliate/product3.pic';
import productImg4 from '../../images/affiliate/product4.pic';
import coorImg from '../../images/affiliate/coor.svg';
import dateImg from '../../images/affiliate/calendar.2x.png';
import partSixImg from '../../images/affiliate/pie.2x.png';
import rightImg from '../../images/affiliate/right.svg';
import advImg1 from '../../images/affiliate/adv1.pic';
import advImg2 from '../../images/affiliate/adv2.pic';
import advImg3 from '../../images/affiliate/adv3.pic';
import advImg4 from '../../images/affiliate/adv4.pic';
import advImg5 from '../../images/affiliate/adv5.pic';
import androidIcon from '../../images/affiliate/icon-android.2x.png';
import iphoneIcon from '../../images/affiliate/icon-iphone.2x.png';
import macIcon from '../../images/affiliate/icon-mac.2x.png';
import windowsIcon from '../../images/affiliate/icon-windows.2x.png';
import i18n from '../../i18n';
import AlertActions from "../../Redux/AlertRedux";

class Affiliate extends PureComponent{  //主页面
    constructor(props){
        super(props);  
        this.language = i18n.language.indexOf('en') === 0 ? 'en' : i18n.language; 
        this.changeLanguage = this.changeLanguage.bind(this);
    }
    componentDidMount(){
        let wow = new WOW(
            {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       true,       // default
            live:         true        // default
          }
          )
        wow.init();
        this.changeLanguage(this.language);
        i18n.on('languageChanged', this.changeLanguage);
    }
    componentWillUnmount(){
        i18n.off('languageChangesd', this.changeLanguage);
    }
    async changeLanguage(language){
        if(i18n.options.ns.indexOf('affiliate') !== -1) //已经包含affiliate命名空间
            return;
        try{
            const response = await fetch(`/locales/${language}/affiliate.json`);
            if(response.ok){
                const data = await response.json();
                i18n.addResource(this.language, 'affiliate', data);
            }else{
                throw new Error('Network response was not ok');
            }
        }catch(err){
            this.props.alertError(err.message, 'error');
        }
    }
    render(){
        const {t} = this.props;
        return (
            <div className="affiliate-component">
                <ScrollToTopOnMount></ScrollToTopOnMount>
                <PartOne></PartOne>
                <PartTwo t={t}></PartTwo>
                <PartThree t={t}></PartThree>
                <PartFourCon></PartFourCon>
                <PartFive t={t}></PartFive>
                <PartSix t={t}></PartSix>
                <PartSeven t={t}></PartSeven>
            </div>
        )
    }
}


class PartOne extends PureComponent{  //第一部分的图片
    render(){
        return (
            <div className="partOne-component">

            </div>
        )
    }
}

class PartTwo extends PureComponent{  //第二部分我们的产品
    constructor(props){
        super(props);
        this.produce = [
            {
                img: productImg1,
            },
            {
                img: productImg2,
            },
            {
                img: productImg3,
            },
            {
                img: productImg4,
            }
        ]
    }
    render(){
        const {t} = this.props;
        return (
            <div id="partTwo" className="partTwo-component">
                <div className="wrapper">
                    <PartHeader title={t('product.name', '我们的产品')}></PartHeader>
                    <div className="produce-container clearfix">
                        {
                            this.produce.map((item, index)=>{
                                return <Produce img={item.img} text={t(`product.content.${index}`, '产品')} key={index}></Produce>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class PartThree extends PureComponent{  //第三部分我们的优势
    constructor(props){
        super(props);
        this.state = {
            floatType: document.body.clientWidth < 800
        }
        this.advantage = [
            {
                "title": "快速便捷的审核流程",
                "p": ["7*24专业代理团队","申请后3个工作日内完成审核","电话、QQ、SKYPE以及微信等多种渠道让沟通更加便捷"],
                img: advImg1
            },
            {
                "title": "我们的优势，您推广的利器",
                "p": ["7*24专业代理团队","申请后3个工作日内完成审核","电话、QQ、SKYPE以及微信等多种渠道让沟通更加便捷"],
                img: advImg2
            },
            {
                "title": "高回报率的佣金制度",
                "p": ["7*24专业代理团队","申请后3个工作日内完成审核","电话、QQ、SKYPE以及微信等多种渠道让沟通更加便捷"],
                img: advImg3
            },
            {
                "title": "报表清晰，计算简易",
                "p": ["7*24专业代理团队","申请后3个工作日内完成审核","电话、QQ、SKYPE以及微信等多种渠道让沟通更加便捷"],
                img: advImg4
            },
            {
                "title": "特色代理VIP，业界首创，尽显尊贵",
                "p": ["7*24专业代理团队","申请后3个工作日内完成审核","电话、QQ、SKYPE以及微信等多种渠道让沟通更加便捷"],
                img: advImg5
            }
        ]
    }
    componentDidMount(){
        window.addEventListener('resize',(e)=>{
            this.setState({
                floatType: document.body.clientWidth < 800
            })
        })
    }
    render(){
        const {t} = this.props;
        return (
            <div id="partThree" className="partThree-component">
                <div className="wrapper">
                    <PartHeader style={{backgroundColor: 'whitesmoke'}}title={t('advantage.name', '我们的优势')}></PartHeader>
                    <div className="advantage-container clearfix">
                        {
                            (t('advantage.content', {returnObjects: 'true'}) === 'advantage.content' ?
                            this.advantage 
                            :
                            t('advantage.content', {returnObjects: 'true'})).map((item, index)=>{
                                return <PartThreeLine key={index} type={this.state.floatType ? 0 : index%2} 
                                            advantageInfor={item} img={this.advantage[index].img}>
                                        </PartThreeLine>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

//PartFour单独放在外面

class PartFive extends PureComponent{  //第五部分
    constructor(props){
        super(props);
        this.state = {
            textOne: '',
            textTwo: '',
            textThree: '',
        };
        this.writerText = ["","",""];
        this.speed = 200;  //打字速度
        this.msg = this.props.t('arrange.content', {returnObjects: true});
        this.msg = this.msg === 'arrange.content' ? this.writerText : this.msg;
        this.doAnimation = this.doAnimation.bind(this);
        this.getEle = this.getEle.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.msg = nextProps.t('arrange.content', {returnObjects: true});
        this.msg = this.msg === 'arrange.content' ? this.writerText : this.msg;     
    }
    changeText = ()=> {
        this.msg = this.props.t('arrange.content', {returnObjects: true});
        this.msg = this.msg === 'arrange.content' ? this.writerText : this.msg;
        this.setState({
            textOne: this.msg[0],
            textTwo: this.msg[1],
            textThree: this.msg[2]
        })
    }
    componentDidMount(){
        const part = new DomAnimation(this.ele);
        part.once('doAnimationIf', this.doAnimation);
        i18n.on('languageChanged', this.changeText)
    }
    componentWillUnmount(){
        i18n.off('languageChanged', this.changeText)
    }
    getEle(ele){
        if(ele){
            this.ele = ele;
        }
    }
    doAnimation(){ //打字器
        let typewriter = setInterval(()=>{ //打字器
            if(this.state.textOne.length === this.msg[0].length && this.state.textTwo.length === this.msg[1].length && this.state.textThree.length === this.msg[2].length){
                return clearInterval(typewriter);
            }
            this.setState(prevState=>{
                let prevLengthOne = prevState.textOne.length;
                let prevLengthTwo = prevState.textTwo.length;
                let prevLengthThree = prevState.textThree.length;
                return {
                    textOne: prevLengthOne === this.msg[0].length ? this.msg[0] : this.msg[0].substring(0, prevLengthOne + 1),
                    textTwo: prevLengthTwo === this.msg[1].length ? this.msg[1] : this.msg[1].substring(0, prevLengthTwo + 1),
                    textThree: prevLengthThree === this.msg[2].length ? this.msg[2] : this.msg[2].substring(0, prevLengthThree + 1)
                }
            })       
        },this.speed)
    }
    render(){
        const {t} = this.props;
        return (
            <div ref={this.getEle} id="partFive" className="partFive-component">
                <PartHeader title={t('arrange.name', '日期规划')}></PartHeader>
                <div className="partFive-container clearfix">
                        <div className="calendar-container">
                            <img className="wow animated fadeInLeft" data-wow-duration="1.6s" data-wow-delay="0s" src={dateImg} alt=""/>
                        </div>
                        <div className="typewriter-container">
                            <div className="typewriter">
                                <h2>
                                {
                                    this.state.textOne.split('').map((item, index)=>{
                                        return <span className="animated fadeIn" key={index}>{item}</span>
                                    })
                                }
                                </h2>
                                <h2>
                                {
                                    this.state.textTwo.split('').map((item, index)=>{
                                        return <span className="animated fadeIn" key={index}>{item}</span>
                                    })
                                }
                                </h2>
                                <h2>
                                {
                                    this.state.textThree.split('').map((item, index)=>{
                                        return <span className="animated fadeIn" key={index}>{item}</span>
                                    })
                                }
                                </h2>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

class PartSix extends PureComponent{  //第六部分
    constructor(props){
        super(props);
        this.goal = [
            ["先赚他一个亿"],
            ["买车","买房"],
            ["全部花掉","再赚"],
            ["慢慢花"]
        ]
    }
    render(){
        const {t} = this.props;
        return (
            <div id="partSix" className="partSix-component">
                <PartHeader title={t('goal.name', '目标')}></PartHeader>
                <div className="partSix-container clearfix">
                    <div style={{width: '50%', float: 'left'}}>
                        <ul>
                            {
                                (t('goal.content', {returnObjects: true}) === 'goal.content' ?
                                this.goal
                                :
                                t('goal.content', {returnObjects: true})).map((item, index)=>{
                                    return <PartSixLine delay={`${index/3}s`} text={item} key={index}></PartSixLine>
                                })
                            }
                        </ul>
                    </div>
                    <div style={{width: '50%', float: 'left'}}>
                        <img className="rightImg fadeInRight wow animated" data-wow-duration="1.2s" data-wow-delay="0.2s" src={partSixImg} alt=""/>
                    </div>
                </div>
            </div>
        ) 
    }
}

class PartSeven extends PureComponent{  //第七部分
    render(){
        const {t} = this.props;
        return (
            <div id="partSeven" className="partSeven-component">
                <div className="seven-header">
                    <h1>{t('download.name', '客户端下载')}</h1>
                    <h2>{t('download.explain', '提供电脑客户端和手机客户端下载，真正做到随时随地')}</h2>
                </div>
                <ul className="partSeven-container clearfix">
                    <li className="wow animated fadeInUpBig" data-wow-delay="0.3s">
                        <img src={macIcon} alt=""/>
                        <h3>{t('download.content.0', 'Mac系统')}</h3>
                    </li>
                    <li className="wow animated fadeInUpBig" data-wow-delay="0.6s">
                        <img src={windowsIcon}  alt=""/>
                        <h3>{t('download.content.1', 'Windows系统')}</h3>
                    </li>
                    <li className="wow animated fadeInUpBig" data-wow-delay="0.9s">
                        <img src={iphoneIcon}  alt=""/>
                        <h3>{t('download.content.2', 'iPhone')}</h3>
                    </li>
                    <li className="wow animated fadeInUpBig" data-wow-delay="1.2s">
                        <img src={androidIcon}  alt=""/>
                        <h3>{t('download.content.3', 'Android')}</h3>
                    </li>
                </ul>
            </div>
        )
    }
}

class PartThreeLine extends PureComponent{  //partThree里面的一行
    render(){
        const {type, advantageInfor, img} = this.props;
        return (
            type === 1 ?
            <li className="partThreeLine-component clearfix">
                <div className="left clearfix typeOne">
                    <AdvantageDesc className="wow animated fadeInLeft" data-wow-delay=".5s" data-wow-duration="1.6s" to='right' title={advantageInfor.title} p={advantageInfor.p} color='rgba(32, 147, 192, 0.603)'></AdvantageDesc>
                </div>
                <div className="center">
                    <img className="wow animated fadeInDown" data-wow-delay=".5s" data-wow-duration="1.6s" src={coorImg} alt="" />
                </div>
                <div className="right  typeOne">
                    <img className="wow animated fadeInRight" data-wow-delay=".5s" data-wow-duration="1.6s" src={img} alt=""/>
                </div>
            </li>
            :
            <li className="partThreeLine-component clearfix">
                <div className="left clearfix typeTwo">
                    <img className="wow animated fadeInLeft" data-wow-delay=".5s" data-wow-duration="1.6s" src={img} alt=""/>
                </div>
                <div className="center">
                    <img className="wow animated fadeInDown" data-wow-delay=".5s" data-wow-duration="1.6s" src={coorImg} alt="" />
                </div>
                <div className="right clearfix typeTwo">
                    <AdvantageDesc className="wow animated fadeInRight" data-wow-delay=".5s" data-wow-duration="1.6s" to='left' title={advantageInfor.title} p={advantageInfor.p} color='rgba(32, 147, 192, 0.603)'></AdvantageDesc>
                </div>
            </li>
        )
    }
}

class PartSixLine extends PureComponent{  //partSix里面的一行
    render(){
        const {delay, text} = this.props;
        return (
            <li className="partSixLine-component clearfix fadeInLeft animated wow" data-wow-delay={delay} data-wow-duration="1.2s">
                <div className="text-container">
                    <div className="text">
                        {
                            text.map((item, index)=>{
                                return <h2 key={index}>{item}</h2>
                            })
                        }
                    </div>
                </div>
                <img src={coorImg} alt=""/>
            </li>
        )
    }
}

function mapStateToProps(state){
    return {
        
    }
}

function mapDispatchToProps(dispatch){
    return {
        alertError(error){
            dispatch(AlertActions.alertAdd(error, 'error'))
        }
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate('affiliate', {wait: false})(Affiliate))