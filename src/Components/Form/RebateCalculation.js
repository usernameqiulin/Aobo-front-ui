import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"
import {connect} from "react-redux"
import moment from "moment/moment"

import RebateActions from "../../Redux/RebateRedux"
import {amountFormat} from "../../helper"

class RebateCalculation extends React.Component {

    onSubmit = e => {
        this.props.addRebate({product:this.props.rebate.calculation.product})
    }

    onCancel = e => this.props.onClose()

    componentWillReceiveProps(nextProps) {
        if (this.props.rebate.adding && !nextProps.rebate.adding && !nextProps.rebate.error) {
            this.props.onClose()
        }
    }

    render() {
        const {t, rebate, timezone} = this.props
        return (
            <div className={`modal-form`}>
                <div className={`modal-form__header`}>
                    <div className="modal-form__title">
                        <svg className={`icon-svg`}><use xlinkHref={`#icon-${rebate.calculation.product.toLowerCase()}`}/></svg>
                        <b>
                            {moment(rebate.calculation.period.from).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}
                            {' - '}
                            {moment(rebate.calculation.period.to).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')}
                        </b>
                    </div>
                </div>
                <div className={`rebate-details__wrapper${!!rebate.calculation?'':' ng-hide'}`}>
                    <div className={`modal-form__field table-header`}>
                        <div className="rebate-form__item brand"/>
                        <div className="rebate-form__item total-bets">{t('total bets')}</div>
                        <div className="rebate-form__item rebateable-bets">{t('rebateable bets')}</div>
                        <div className="rebate-form__item rate">{t('rate')}</div>
                        <div className="rebate-form__item">{t('rebate')}</div>
                    </div>
                    {!!rebate.calculation && rebate.calculation.details.map((d, i) => {
                        return (
                            <div className={`modal-form__field${!d.rebateable_flow?' is-disabled':''}`} key={i}>
                                <div className="rebate-form__item brand">
                                    <span className={`modal-form__label`}>
                                        <svg className={`icon-svg`}><use xlinkHref={`#icon-${d.brand.toLowerCase()}`}/></svg>
                                    </span>
                                </div>
                                <div className="rebate-form__item total-bets">
                                    <b className={``}>
                                        <span className={`_price`}>{amountFormat(d.flow)}</span>
                                    </b>
                                </div>
                                <div className="rebate-form__item rebateable-bets">
                                    <b className={``}>
                                        <span className={`_price`}>{amountFormat(d.rebateable_flow)}</span>
                                    </b>
                                </div>
                                <div className="rebate-form__item rate">
                                    <b className={``}>
                                        <span className={`_percentage`}>{(d.rate*100).toFixed(2)}</span>
                                    </b>
                                </div>
                                <div className="rebate-form__item">
                                    <b className={``}>
                                        <span className={`_price`}>{amountFormat(d.amount)}</span>
                                    </b>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`modal-form__bottom`}>
                    <div className={`rebate-modal__total`}>
                        <div className={`rebate-modal__total-info`}>
                            <span className={`rebate-modal__total-title`}>
                                {t('total')}
                            </span>
                            <br/>
                            <span className={`_price`}>{amountFormat(rebate.calculation.total)}</span>
                        </div>
                    </div>
                </div>
                <div className={`modal-form__bottom btns cf`}>
                    <span className={`btn btn--glass add-review__button`} onClick={this.onCancel}>
                        {t('redeem later')}
                    </span>
                    <span className={`btn btn--green add-review__button _spinner${rebate.adding ? ' is-disabled is-spinning' : ''}${!rebate.calculating && !rebate.error && !rebate.calculation.total?' is-disabled':''}`} onClick={this.onSubmit}>
                        {t('redeem now')}
                    </span>
                </div>
            </div>
        )
    }
}

RebateCalculation.propTypes = {
    rebate: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        rebate: state.rebate,
    }
}

const mapDispatchToProps = (dispatch) => ({
    calculateRebate: (params) => dispatch(RebateActions.rebateCalculateRequest(params)),
    addRebate: (params) => dispatch(RebateActions.rebateAddRequest(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(RebateCalculation))