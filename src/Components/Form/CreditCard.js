import React from 'react'
import PropTypes from 'prop-types'

class CreditCard extends React.Component {

    render() {
        return (
            <div className={``}>
                <div className="fieldset">
                        <span className="input-wrapper input--large">
                            <input
                                autoComplete="off"
                                className="input input--large"
                                type="number"
                                name="card_number_input"
                                value=""
                                placeholder="卡号"
                                required="required"
                            />
                            {/* ng-show="orderForm.card_number_input.$error.cardNumber && orderForm.card_number_input.$touched" */}
                            <strong className={`message message--error ng-hide`}>无效的卡号</strong>
                        </span>
                </div>
                <div className={`fieldset fieldset--card-additional-info`}>
                    <div className="fieldset__field fieldset__field--card-expire">
                            <span className="input-wrapper input-wrapper--month">
                                <input
                                    disabled
                                    autoComplete="off"
                                    type="text"
                                    value=""
                                    name="card_month_display"
                                    placeholder="到期月份"
                                    className="input input--month"
                                />
                                <i className="ic ic--small icon-dropdown-down input-wrapper__icon"/>
                                <select name="card_expiration_month" className="unfocusable" required="required">
                                    <option disabled="" selected="" value="">月</option>
                                    <option value="1">01 – 一月</option>
                                    <option value="2">02 – 二月</option>
                                    <option value="3">03 – 三月</option>
                                    <option value="4">04 – 四月</option>
                                    <option value="5">05 – 五月</option>
                                    <option value="6">06 – 六月</option>
                                    <option value="7">07 – 七月</option>
                                    <option value="8">08 – 八月</option>
                                    <option value="9">09 – 九月</option>
                                    <option value="10">10 – 十月</option>
                                    <option value="11">11 – 十一月</option>
                                    <option value="12">12 – 十二月</option>
                                </select>
                            </span>
                        <span className="input-wrapper input-wrapper--year">
                                <input
                                    ng-model="orderPaymentData.ccardData.card_expiration_year"
                                    disabled=""
                                    autoComplete="off"
                                    className="input input--year ng-pristine ng-untouched ng-valid"
                                    type="text"
                                    value=""
                                    placeholder="年"
                                />
                                <i className="ic ic--small icon-dropdown-down input-wrapper__icon"/>
                                <select name="card_expiration_year" className="unfocusable" required="required">
                                    <option disabled="" selected="" value="">年</option>
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                </select>
                            </span>
                    </div>
                    <div className="fieldset__field fieldset__field--scode">
                        {/* ng-class="{'ng-invalid-number-type': orderForm.card_security_code.$error.numberType,'ng-invalid-code-length': orderForm.card_security_code.$error.codeLength,'ng-touched': orderForm.card_security_code.$touched}"*/}
                        <label className={`input-element input--scode`}>
                            <input
                                maxLength="4"
                                minLength="3"
                                placeholder="CVV2"
                                autoComplete="off"
                                type="number"
                                name="card_security_code"
                                value=""
                                className="unfocusable"
                                required="required"
                            />
                            <i className="img-card img-card--scode input-element__icon"/>
                        </label>
                    </div>
                </div>
                <div className="fieldset fieldset--cardholder">
                    <input
                        autoComplete="off"
                        className="input input--large unfocusable"
                        type="text"
                        name="cardholder_name"
                        value=""
                        placeholder="银行卡上的姓名"
                        required="required"
                    />
                </div>
                <div className="save-card-option">
                    <label className="save-card-option__label">
                        {/* ng-model="orderPaymentData.ccardData.saveCard" */}
                        <input
                            type="checkbox"
                            className="hidden-input"
                        />
                        <span className="checkbox save-card-option__checkbox"/>
                        保存此银行卡以便以后使用。
                    </label>
                    <p className="save-card-option__description">一旦您的银行批准了此次支付，将会生成一个安全、加密的支付令牌。我们不会将您的银行卡详细信息直接保存在我们的数据库中。</p>
                </div>
            </div>
        )
    }
}

export default CreditCard