import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from 'react-helmet'
import GoogleAnalytics from 'react-ga'
import QRCode from 'qrcode.react';

import './profile.css'
import ProfileActions from "../../Redux/ProfileRedux"
import AuthActions from "../../Redux/AuthRedux"
import CardActions from '../../Redux/CardRedux'

import ABSelect from "../../Components/ABSelect"
import {genBirthYearOptions, genBirthDayOptions, genMonthOptions, verifyBirthday} from '../../helper'
import ABRadioGroup from "../../Components/ABRadioGroup"
import ABCheckbox from "../../Components/ABCheckbox"
import ABBankCard from "../../Components/Card/ABBankAccount"
import ABSpinner from "../../Components/ABSpinner"
import ABBankCardAdd from "../../Components/Card/ABBankAccountAdd"
import i18n from '../../i18n'
import ABOTP from "../../Components/Form/ABOTP"
import ChangePassword from "../../Components/Account/ChangePassword"
import UserMobile from "../../Components/Account/UserMobile"
import UserName from "../../Components/Account/UserName"


const birthYearOptions = genBirthYearOptions()
const birthDayOptions = genBirthDayOptions()
const birthMonthOptions = genMonthOptions()
const MAX_CARDS = 3

class Profile extends React.Component {

    PROTECTIONS = [
        {
            label: 'PROTECTION_otp',
            value: 'otp',
        },
        {
            label: 'PROTECTION_password',
            value: 'password',
        },
        {
            label: 'PROTECTION_sms',
            value: 'sms',
        },
    ]

    constructor(props) {
        super(props)
        !props.card.fetching && !props.card.data && props.getCard()
        const {t} = props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('profile & setting')
        })
        const arr = !!props.profile.data && !!props.profile.data.birthday ? props.profile.data.birthday.split('-') : ['', '', '']
        this.state = {
            error: {},
            saved: [],
            birthday: {year: arr[0], month: arr[1], day: arr[2]},
            password: '',
            changePwdOpen: false,
            toggle:false
        }
        this.changeToggle = this.changeToggle.bind(this);
    }
    changeToggle(){
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        this.setState(ps =>{return{toggle:!ps.toggle}})
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.profile.updating.length > 0 && nextProps.profile.updating.length === 0 && !nextProps.profile.error) {
            this.setState({
                saved: this.props.profile.updating,
            })
            if (this.props.profile.updating.includes('password') && this.state.changePwdOpen) {
                this.modalSwitcher()
            }
        }
        if (!!this.props.card.adding && !nextProps.card.adding && !nextProps.card.addError) {
            this.cardAdd.closeModal()
        }
    }

    birthdayOnChange = (n, v) => {
        let b = this.state.birthday
        b[n] = v
        if (!verifyBirthday(b)) {
            this.setState({
                error: {
                    birthday: true
                },
            })
        } else {
            this.setState({
                birthday: b,
                error: {
                    birthday: false
                },
            }, () => {
                this.props.updateProfile({birthday: Object.values(this.state.birthday).join('-')})
            })
        }
    }

    nameOnChange = (e) => {
        !!this.cardAdd && this.cardAdd.openModal()
    }

    settingOnChange = (n, v) => {
        let profile = {}, origin
        if (['login', 'card', 'transfer', 'withdraw'].indexOf(n) > -1) {
            if (v === 'otp' && !this.props.profile.data.otp) {
                this.setState({
                    error: {
                        [n]: {hasRetry: false, text: 'Please enable otp first'},
                    }
                })
                return
            }
            if (v === 'sms' && !this.props.profile.data.phone.number) {
                this.setState({
                    error: {
                        [n]: {hasRetry: false, text: 'Please add mobile number first'},
                    }
                })
                return
            }
            if (v === 'password' && !this.props.profile.data.fpwd) {
                this.setState({
                    error: {
                        [n]: {hasRetry: false, text: 'Please set fund password first'},
                    }
                })
                return
            }
            origin = this.props.profile.data.setting[n]
            profile.setting = {}
            profile.setting[n] = v
        }
        else {
            origin = this.props.profile.data[n]
            profile[n] = v
        }
        this.setState({saved: [], error: {}}, () => v !== origin && this.props.updateProfile(profile))
    }

    deleteCard = (id, params) => {
        this.props.deleteCard(id, params)
    }

    openChangeEmail = e => window.ABAccount.openEmailChange(this.onEmailChangeSuccess, this.onEmailChangeFinish)

    onEmailChangeSuccess = () => console.log('email change succeed')

    onEmailChangeFinish = () => window.ABAccount.close()

    openSms = e => window.ABAccount.openSMS(this.onSmsSuccess, this.onSmsFinish)

    onSmsSuccess = () => console.log('Sms change succeed')

    onSmsFinish = () => window.ABAccount.close()

    openChangePassword = e => window.ABAccount.openPasswordChange(this.onPasswordChangeSuccess, this.onPasswordChangeFinish)

    onPasswordChangeSuccess = () => {
        this.props.history.push('/')
        this.props.logout()
    }

    onPasswordChangeFinish = () => {
        return window.ABAccount.close()
    }

    openOtpEnable = e => window.ABAccount.openTwoStepEnable(this.onOTPEnabled, this.onOTPFinish)

    onOTPEnabled = () => {
        this.props.updateProfile({otp: true})
    }

    onOTPFinish = () => {
        return window.ABAccount.close()
    }

    openOtpDisable = e => window.ABAccount.openTwoStepDisable(this.onOTPDisabled, this.onOTPFinish)

    onOTPDisabled = () => {
        this.props.updateProfile({otp: false})
    }

    onFundPasswordChange = (pwd) => {
        this.setState({password: pwd})
    }

    onFundPasswordSet = (e) => {
        e.stopPropagation()
        if (this.props.profile.updating.includes('password')) return
        if (!this.props.profile.data.fpwd) {
            return this.setPassword()
        }
    }

    setPassword = () => {
        if (this.state.password.length !== 6) {
            this.setState({
                error: {
                    password: true
                }
            })
        } else {
            this.props.updateProfile({password: this.state.password})
            this.setState({
                password: '',
                changePwdOpen: false,
            })
        }
    }

    onFundPasswordUpdate = e => {
        e.stopPropagation()
        if (this.props.profile.updating.includes('password')) return
        this.modalSwitcher()
    }

    modalSwitcher = () => this.setState({changePwdOpen: !this.state.changePwdOpen})

    render() {
        const {t, profile} = this.props
        const { toggle } = this.state
        return (
            <div className={`container account`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('profile & setting')}</title>
                </Helmet>
                <div className="settings-layout">
                    <div className="settings-layout__content settings-content">
                        <div className="module-header settings-content__header">
                            {t('account')}
                        </div>
                        <ul className="settings-list">
                            <li className="settings-list__item settings-item">
                                <span className="settings-item__label settings-item__section">{t('username')}</span>
                                <strong
                                    className="settings-item__value settings-item__section">{!!profile.data && profile.data.username}</strong>
                                <span className="settings-item__action settings-item__section"/>
                            </li>
                            <li className="settings-list__item settings-item">
                                <span className="settings-item__label settings-item__section">{t('Email')}</span>
                                <strong
                                    className="settings-item__value settings-item__section">{!!profile.data && profile.data.email}</strong>
                                <span className="settings-item__action settings-item__section">
                                    <span className={`settings-item__status`}>
                                        <svg className="icon-lock"><use xlinkHref="#icon-padlock"/></svg>
                                    </span>
                                </span>
                            </li>
                            <li className="settings-list__item settings-item">
                                <span className="settings-item__label settings-item__section">{t('USER_DOMAIN')}</span>
                                <strong
                                    className="settings-item__value settings-item__section">{!!profile.data && `https://${profile.data.domains.self}`}</strong>
                                <span className="settings-item__action settings-item__section"  >
                                    <span style={{position: 'relative'}} className={`settings-item__status`}>
                                        <svg className="icon-lock"  onClick={this.changeToggle}><use xlinkHref="#icon-padlock"/></svg>
                                        <div className="qr-code-container" style={{display:toggle ? "block":"none",position:'absolute'}} >
                                            <QRCode value={`https://${profile.data.domains.self}`} size={120} style={{position:"absolute",top:0,left:0,right:0,bottom:0,margin:"auto"}}/>
                                        </div>
                                    </span>
                                </span>
                            </li>
                        </ul>
                        <div className="module-header settings-content__header">
                            {t('verification')}
                        </div>
                        <ul className="settings-list setting-list--fixed">
                            <li className="settings-list__item settings-item">
                                <span className="settings-item__label settings-item__section">{t('Name')}</span>
                                <UserName name={profile.data.name} clickHandler={this.nameOnChange}/>
                            </li>
                            <li className="settings-list__item settings-item">
                                <span
                                    className="settings-item__label settings-item__section">{t('Mobile number')}</span>
                                <UserMobile data={profile.data.phone} clickHandler={this.openSms}/>
                            </li>
                        </ul>
                        <div className="module-header settings-content__header">
                            {t('profile')}
                        </div>
                        <ul className="settings-list">
                            <li className="settings-list__item settings-item">
                                <span className="settings-item__label settings-item__section">{t('Birthday')}</span>
                                <strong className="settings-item__value settings-item__section">
                                    <ABSelect
                                        placeholder={t('year')}
                                        value={this.state.birthday.year}
                                        options={birthYearOptions}
                                        classes={'input-wrapper--year'}
                                        inputClasses={'input--year'}
                                        onChange={this.birthdayOnChange}
                                        invalid={this.state.error.hasOwnProperty('birthday') && this.state.error.birthday}
                                        name={'year'}
                                    />
                                    <ABSelect
                                        placeholder={t('month')}
                                        value={this.state.birthday.month}
                                        options={birthMonthOptions}
                                        classes={'input-wrapper--month'}
                                        inputClasses={'input--month'}
                                        onChange={this.birthdayOnChange}
                                        invalid={this.state.error.hasOwnProperty('birthday') && this.state.error.birthday}
                                        name={'month'}
                                    />
                                    <ABSelect
                                        placeholder={t('day')}
                                        value={this.state.birthday.day}
                                        options={birthDayOptions}
                                        classes={'input-wrapper--day'}
                                        inputClasses={'input--day'}
                                        onChange={this.birthdayOnChange}
                                        invalid={this.state.error.hasOwnProperty('birthday') && this.state.error.birthday}
                                        name={'day'}
                                    />
                                </strong>
                                <span className="settings-item__status-container settings-item__section">
                                    {/* ng-show="bday.is.processing" */}
                                    <span
                                        className={`_spinner is-spinning settings-item__status settings-item__status--spinner${!!profile.updating.length && profile.updating.indexOf('birthday') > -1 ? '' : ' ng-hide'}`}/>
                                    {/* ng-show="bday.is.saved &amp;&amp; !bday.is.invalid" ng-class="{ 'fade': bday.is.saved }" */}
                                    <span
                                        className={`settings-item__status settings-item__status--success${this.state.saved.indexOf('birthday') > -1 ? ' fade' : ' ng-hide'}${!!profile.updating.length && profile.updating.indexOf('birthday') > -1 ? ' ng-hide' : ''}`}>
                                        <i className="ic icon-tick"/> {t('Saved')}
                                    </span>
                                    {/* ng-show="bday.is.tooYoung" ng-class="{ 'fade-in': bday.is.tooYoung }" */}
                                    <span className={`settings-item__status settings-item__status--error ng-hide`}>
                                        {t('You must be 13 or older to use AB Gaming')}
                                    </span>
                                    {/* ng-show="bday.noResponse" ng-class="{ 'fade-in': bday.noResponse }" */}
                                    <span className="settings-item__status settings-item__status--error ng-hide" >
                                        {t('Something went wrong')}
                                        {/* ng-click="bday.save()" */}
                                        <span className="un">{t('Please try again')}</span>
                                    </span>
                                </span>
                            </li>
                            {/* gender */}
                            <li className={`settings-list__item settings-item`}>
                                <span className="settings-item__label settings-item__section">{t('gender')}</span>
                                <strong className={`settings-item__value settings-item__section`}>
                                    <ABRadioGroup
                                        options={[{label: 'Male', value: 'M'}, {label: 'Female', value: 'F'}]}
                                        toggle={this.settingOnChange}
                                        value={profile.data.gender}
                                        name={'gender'}
                                        language={i18n.language}
                                        t={t}
                                    />
                                </strong>
                                <span className="settings-item__status-container settings-item__section">
                                    {/* ng-show="bday.is.processing" */}
                                    <span
                                        className={`_spinner is-spinning settings-item__status settings-item__status--spinner${!!profile.updating && profile.updating.indexOf('gender') !== -1 ? '' : ' ng-hide'}`}/>
                                    {/* ng-show="bday.is.saved &amp;&amp; !bday.is.invalid" ng-class="{ 'fade': bday.is.saved }" */}
                                    <span
                                        className={`settings-item__status settings-item__status--success${this.state.saved.indexOf('gender') > -1 ? ' fade' : ' ng-hide'}`}>
                                        <i className="ic icon-tick"/> {t('Saved')}
                                    </span>
                                    {/* ng-show="bday.noResponse" ng-class="{ 'fade-in': bday.noResponse }" */}
                                    <span className="settings-item__status settings-item__status--error ng-hide">
                                        {t('Something went wrong')}
                                        {/* ng-click="bday.save()" */}
                                        <span className="un">{t('Please try again')}</span>
                                    </span>
                                </span>
                            </li>
                        </ul>
                        <div className="module-header settings-content__header">
                            {t('setting')}
                        </div>
                        <ul className={`settings-list`}>
                            <li className="settings-list__item settings-item">
                                <span
                                    className="settings-item__label settings-item__section">{t('login password')}</span>
                                <strong className="settings-item__value settings-item__section">
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                    <i className="dot settings-dot"/>
                                </strong>
                                <span className="settings-item__action settings-item__section">
                                    {/* ng-click="login.changePassword()" */}
                                    <span className="btn btn--gray"
                                          onClick={this.openChangePassword}>{t('Change')}</span>
                                </span>
                            </li>
                            <li className="settings-list__item settings-item">
                                <span
                                    className="settings-item__label settings-item__section">{t('fund password')}</span>
                                <strong className="settings-item__value settings-item__section">
                                    {profile.data.fpwd && <React.Fragment>
                                        <i className="dot settings-dot"/>
                                        <i className="dot settings-dot"/>
                                        <i className="dot settings-dot"/>
                                        <i className="dot settings-dot"/>
                                        <i className="dot settings-dot"/>
                                        <i className="dot settings-dot"/>
                                    </React.Fragment>}
                                    {!profile.data.fpwd &&
                                    <ABOTP isError={!!this.state.error.password} onChange={this.onFundPasswordChange}
                                           maskSwitch eyeClose/>}
                                </strong>
                                <span className="settings-item__action settings-item__section">
                                    <span
                                        className={`settings-item__status settings-item__status--success${this.state.saved.indexOf('password') > -1 ? ' fade' : ' ng-hide'}${!!profile.updating.length && profile.updating.includes('password') ? ' ng-hide' : ''}`}>
                                        <i className="ic icon-tick"/> {t('Saved')}
                                    </span>
                                    {!profile.data.fpwd && <span
                                        className={`btn btn--gray _spinner${this.props.profile.updating.includes('password') ? ' is-spinning' : ''}`}
                                        onClick={this.onFundPasswordSet}>
                                        {t('set fund password')}
                                    </span>}
                                    {!!profile.data.fpwd &&
                                    <span className={`btn btn--gray`} onClick={this.onFundPasswordUpdate}>
                                        {t('Change')}
                                    </span>}
                                </span>
                                {!!profile.data.fpwd &&
                                <ChangePassword isOpen={this.state.changePwdOpen} switcher={this.modalSwitcher}/>}
                            </li>
                        </ul>
                        <div className="module-header settings-content__header">
                            {t('Mobile Token')}
                        </div>
                        <ul className={`settings-list setting-list--fixed`}>
                            <li className={`settings-item settings-item--two-step settings-list__item`}>
                                <span className="settings-item__label settings-item__section">{t('Mobile Token')}</span>
                                {/* ng-class="{ 'settings-option--on': twoStep.is.enabled.set }" */}
                                <span
                                    className={`settings-item__option settings-option--no-uppercase settings-item__section${!!profile.data && !!profile.data.otp ? ' settings-option--on' : ''}`}>
                                    <span className="settings-option__show-when-off setting-item--two-step__disabled">
                                        {/* ng-click="twoStep.enable()" */}
                                        <a className="btn btn--green settings-item__btn settings-item__two-step-btn"
                                           onClick={this.openOtpEnable}>
                                            <svg className="settings-item__two-step-icon"><use
                                                xlinkHref="#icon-shield"/></svg>
                                            {t("enable")}
                                        </a>
                                        <span className="setting-item--two-step__disabled-text">
                                            {t('Disabled on this account')}
                                        </span>
                                    </span>
                                    <span className="settings-option__show-when-on">
                                        <svg className="settings-item__two-step-icon"><use
                                            xlinkHref="#icon-shield"/></svg>
                                        {t('Your account is protected with mobile token')}
                                        <a className="un" onClick={this.openOtpDisable}>{t("disable")}</a>
                                    </span>
                                </span>
                            </li>
                            <li className="settings-list__item settings-item settings-item--security settings-item--two-step-description">
                                <span
                                    className="settings-item__label settings-item__section">{t('What is this?')}</span>
                                <span className="settings-item__option settings-item__section cf">
                                    {t('Mobile token is an optional extra layer of protection for your AB Gaming account')}
                                    <br/>
                                    {t('With mobile token enabled, your identity will be verified through your email address whenever you log in from a new device, browser and/or location')}
                                    <div className="steps-explanation cf">
                                        <figure className="step-expl step-expl--1">
                                            <div className="step-expl__arrow-wrapper">
                                                <img className="step-expl__image" alt=""
                                                     src="//www4-static4.gog.com/bundles/gogwebsiteaccount/img/two_step/step_1.png"/>
                                                <svg className="step-expl__arrow"><use xlinkHref="#icon-arrow"/></svg>
                                            </div>
                                            <figcaption className="step-expl__text">
                                                1. {t('Log in using your email and password')}
                                            </figcaption>
                                        </figure>
                                        <figure className="step-expl step-expl--2">
                                            <div className="step-expl__arrow-wrapper">
                                                <img className="step-expl__image" alt=""
                                                     src="//www4-static2.gog.com/bundles/gogwebsiteaccount/img/two_step/step_2.png"/>
                                                <svg className="step-expl__arrow"><use xlinkHref="#icon-arrow"/></svg>
                                            </div>
                                            <figcaption className="step-expl__text">
                                                2. {t('Check your email for the security code')}
                                            </figcaption>
                                        </figure>
                                        <figure className="step-expl step-expl--3">
                                            <img className="step-expl__image" alt=""
                                                 src="//www4-static2.gog.com/bundles/gogwebsiteaccount/img/two_step/step_3.png"/>
                                            <figcaption className="step-expl__text">
                                                3. {t('Enter the code to log in')}
                                            </figcaption>
                                        </figure>
                                    </div>
                                </span>
                            </li>
                        </ul>
                        <div className="module-header settings-content__header">
                            {t('Account protection')}
                        </div>
                        <ul className="settings-list">
                            {/*<li className={`settings-list__item settings-item`}>*/}
                            {/*<span className="settings-item__label settings-item__section">{t('login')}</span>*/}
                            {/*<strong className="settings-item__value settings-item__section">*/}
                            {/*<ABRadioGroup*/}
                            {/*options={this.PROTECTIONS}*/}
                            {/*toggle={this.settingOnChange}*/}
                            {/*value={profile.data.setting.login}*/}
                            {/*name={'login'}*/}
                            {/*language={i18n.language}*/}
                            {/*t={t}*/}
                            {/*/>*/}
                            {/*</strong>*/}
                            {/*<span className="settings-item__status-container settings-item__section">*/}
                            {/*<span className={`_spinner is-spinning settings-item__status settings-item__status--spinner${!!profile.updating.length && profile.updating.indexOf('login') > -1 ? '' : ' ng-hide'}`}/>*/}
                            {/*<span className={`settings-item__status settings-item__status--success${this.state.saved.indexOf('login') > -1 ? ' fade' : ' ng-hide'}`}>*/}
                            {/*<i className="ic icon-tick"/> {t('Saved')}*/}
                            {/*</span>*/}
                            {/*<span className={`settings-item__status settings-item__status--error${Object.keys(this.state.error).indexOf('login') > -1 ? ' fade-in' : ' ng-hide'}`}>*/}
                            {/*{t(Object.keys(this.state.error).indexOf('login') > -1 ? this.state.error.login.text : 'Something went wrong')}*/}
                            {/*{Object.keys(this.state.error).indexOf('login') > -1 && this.state.error.login.hasRetry && <span className="un" onClick={e=>alert('retry')}>{t('Please try again')}</span>}*/}
                            {/*</span>*/}
                            {/*</span>*/}
                            {/*</li>*/}
                            <li className={`settings-list__item settings-item`}>
                                <span className="settings-item__label settings-item__section">{t('card')}</span>
                                <strong className={`settings-item__value settings-item__section`}>
                                    <ABRadioGroup
                                        options={this.PROTECTIONS}
                                        toggle={this.settingOnChange}
                                        value={profile.data.setting.card}
                                        name={'card'}
                                        language={i18n.language}
                                        t={t}
                                    />
                                </strong>
                                <span className="settings-item__status-container settings-item__section">
                                    <span
                                        className={`_spinner is-spinning settings-item__status settings-item__status--spinner${!!profile.updating.length && profile.updating.indexOf('card') > -1 ? '' : ' ng-hide'}`}/>
                                    <span
                                        className={`settings-item__status settings-item__status--success${this.state.saved.indexOf('card') > -1 ? ' fade' : ' ng-hide'}`}>
                                        <i className="ic icon-tick"/> {t('Saved')}
                                    </span>
                                    <span
                                        className={`settings-item__status settings-item__status--error${Object.keys(this.state.error).indexOf('card') > -1 ? ' fade-in' : ' ng-hide'}`}>
                                        {t(Object.keys(this.state.error).indexOf('card') > -1 ? this.state.error.card.text : 'Something went wrong')}
                                        {Object.keys(this.state.error).indexOf('card') > -1 && this.state.error.card.hasRetry &&
                                        <span className="un"
                                              onClick={e => alert('retry')}>{t('Please try again')}</span>}
                                    </span>
                                </span>
                            </li>
                            <li className={`settings-list__item settings-item`}>
                                <span className="settings-item__label settings-item__section">{t('transfer')}</span>
                                <strong className={`settings-item__value settings-item__section`}>
                                    <ABRadioGroup
                                        options={this.PROTECTIONS}
                                        toggle={this.settingOnChange}
                                        value={profile.data.setting.transfer}
                                        name={'transfer'}
                                        language={i18n.language}
                                        t={t}
                                    />
                                </strong>
                                <span className="settings-item__status-container settings-item__section">
                                    <span
                                        className={`_spinner is-spinning settings-item__status settings-item__status--spinner${!!profile.updating.length && profile.updating.indexOf('transfer') > -1 ? '' : ' ng-hide'}`}/>
                                    <span
                                        className={`settings-item__status settings-item__status--success${this.state.saved.indexOf('transfer') > -1 ? ' fade' : ' ng-hide'}`}>
                                        <i className="ic icon-tick"/> {t('Saved')}
                                    </span>
                                    <span
                                        className={`settings-item__status settings-item__status--error${Object.keys(this.state.error).indexOf('transfer') > -1 ? ' fade-in' : ' ng-hide'}`}>
                                        {t(Object.keys(this.state.error).indexOf('transfer') > -1 ? this.state.error.transfer.text : 'Something went wrong')}
                                        {Object.keys(this.state.error).indexOf('transfer') > -1 && this.state.error.transfer.hasRetry &&
                                        <span className="un"
                                              onClick={e => alert('retry')}>{t('Please try again')}</span>}
                                    </span>
                                </span>
                            </li>
                            <li className={`settings-list__item settings-item`}>
                                <span className="settings-item__label settings-item__section">{t('withdraw')}</span>
                                <strong className={`settings-item__value settings-item__section`}>
                                    <ABRadioGroup
                                        options={this.PROTECTIONS}
                                        toggle={this.settingOnChange}
                                        value={profile.data.setting.withdraw}
                                        name={'withdraw'}
                                        language={i18n.language}
                                        t={t}
                                    />
                                </strong>
                                <span className="settings-item__status-container settings-item__section">
                                    <span
                                        className={`_spinner is-spinning settings-item__status settings-item__status--spinner${!!profile.updating.length && profile.updating.indexOf('withdraw') > -1 ? '' : ' ng-hide'}`}/>
                                    <span
                                        className={`settings-item__status settings-item__status--success${this.state.saved.indexOf('withdraw') > -1 ? ' fade' : ' ng-hide'}`}>
                                        <i className="ic icon-tick"/> {t('Saved')}
                                    </span>
                                    <span
                                        className={`settings-item__status settings-item__status--error${Object.keys(this.state.error).indexOf('withdraw') > -1 ? ' fade-in' : ' ng-hide'}`}>
                                        {t(Object.keys(this.state.error).indexOf('withdraw') > -1 ? this.state.error.withdraw.text : 'Something went wrong')}
                                        {Object.keys(this.state.error).indexOf('withdraw') > -1 && this.state.error.withdraw.hasRetry &&
                                        <span className="un"
                                              onClick={e => alert('retry')}>{t('Please try again')}</span>}
                                    </span>
                                </span>
                            </li>
                        </ul>
                        <div className="module-header settings-content__header">
                            {t('card')}
                        </div>
                        <div className={`cards-section`}>
                            {this.props.card.fetching && !this.state.cardDeleting && <ABSpinner size="big"/>}
                            {this.props.card.data && this.props.profile.data && this.props.card.data.map((card, i) => {
                                return (
                                    <ABBankCard
                                        account={card}
                                        t={t}
                                        key={card.id}
                                        onDelete={this.deleteCard}
                                        timezone={this.props.profile.data.timezone}
                                        isDeleting={this.props.card.deleting === card.id}
                                        error={this.props.card.deleteError}
                                        protection={profile.data.setting.card}
                                        resetError={this.props.resetCardDeleteError}
                                    />
                                )
                            })}
                            {this.props.card.data && this.props.card.data.length < MAX_CARDS &&
                            <ABBankCardAdd ref={r => this.cardAdd = r}/>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    setting: PropTypes.object.isRequired,
    card: PropTypes.object.isRequired,
    getCard: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile: {fetching: false, updating: [], error: false, data: profileMock.data},
        setting: state.setting,
        card: state.card,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getCard: () => dispatch(CardActions.cardRequest()),
    deleteCard: (id, params) => dispatch(CardActions.cardDeleteRequest(id, params)),
    addCard: (card) => dispatch(CardActions.cardAddRequest(card)),
    updateProfile: (profile) => dispatch(ProfileActions.profileUpdateRequest(profile)),
    resetCardDeleteError: () => dispatch(CardActions.cardDeleteSuccess()),
    // resetCardAddError: () => dispatch(CardActions.cardAddSuccess()),
    logout: () => dispatch(AuthActions.logoutRequest()),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Profile))

const profileMock = {
    "stat": "ok",
    "data": {
        "userId": "246c7170-71e7-11e7-b6a2-dbb4fae9b3b7",
        "username": "kirinse",
        "email": "kirinse@gmail.com",
        "name": "马哈马的·买买提",
        "rank": {
            "code": "DEFAULT",
            "level": 0,
            "isDefault": true,
            "isDeleted": false,
            "conditions": [],
            "treatments": [],
            "rebates": {
                "CNY": [
                    {
                        "product": "SLOTS",
                        "max": 8888,
                        "days": 300,
                        "brands": [
                            {
                                "brand": "PT",
                                "rate": 0.008,
                                "currency": "CNY"
                            },
                            {
                                "brand": "BBIN",
                                "rate": 0.011,
                                "currency": "CNY"
                            },
                            {
                                "brand": "MG",
                                "rate": 0.009,
                                "currency": "CNY"
                            },
                            {
                                "brand": "PNG",
                                "rate": 0.009,
                                "currency": "CNY"
                            },
                            {
                                "brand": "HABA",
                                "rate": 0.009,
                                "currency": "CNY"
                            },
                            {
                                "brand": "AG",
                                "rate": 0.009,
                                "currency": "CNY"
                            },
                            {
                                "brand": "TTG",
                                "rate": 0.009,
                                "currency": "CNY"
                            }
                        ]
                    },
                    {
                        "product": "LIVE",
                        "max": 8888,
                        "days": 3000,
                        "brands": [
                            {
                                "brand": "PT",
                                "rate": 0.008,
                                "currency": "CNY"
                            },
                            {
                                "brand": "MG",
                                "rate": 0.008,
                                "currency": "CNY"
                            },
                            {
                                "brand": "BBIN",
                                "rate": 0.008,
                                "currency": "CNY"
                            },
                            {
                                "brand": "AG",
                                "rate": 0.008,
                                "currency": "CNY"
                            }
                        ]
                    }
                ]
            }
        },
        "plan": {
            "code": "DEFAULT",
            "rates": {
                "brand": 0.1,
                "financial": 0.015,
                "bonus": 1
            },
            "isDeleted": false,
            "stages": [
                {
                    "level": 1,
                    "activeUsers": 5,
                    "profit": {
                        "min": 1,
                        "max": 50000
                    },
                    "rate": 0.3,
                    "timestamps": {
                        "createdAt": "2018-05-23T06:02:43+00:00",
                        "updatedAt": "2018-05-23T06:02:43+00:00"
                    }
                },
                {
                    "level": 2,
                    "activeUsers": 5,
                    "profit": {
                        "min": 50001,
                        "max": 100000
                    },
                    "rate": 0.35,
                    "timestamps": {
                        "createdAt": "2018-05-23T06:02:43+00:00",
                        "updatedAt": "2018-05-23T06:02:43+00:00"
                    }
                },
                {
                    "level": 3,
                    "activeUsers": 15,
                    "profit": {
                        "min": 100001,
                        "max": 1000000
                    },
                    "rate": 0.45,
                    "timestamps": {
                        "createdAt": "2018-05-23T06:02:43+00:00",
                        "updatedAt": "2018-05-23T06:02:43+00:00"
                    }
                },
                {
                    "level": 4,
                    "activeUsers": 30,
                    "profit": {
                        "min": 1000001,
                        "max": 99999999
                    },
                    "rate": 0.5,
                    "timestamps": {
                        "createdAt": "2018-05-23T06:02:43+00:00",
                        "updatedAt": "2018-05-23T06:02:43+00:00"
                    }
                }
            ],
            "timestamps": {
                "createdAt": "2018-05-23T06:02:43+00:00",
                "updatedAt": "2018-05-23T06:02:43+00:00"
            }
        },
        "birthday": "1980-02-07",
        "gender": "M",
        "identity": "100000750207087",
        "phone": {
            "country": "+86",
            "iso": "cn",
            "number": "158*****705"
        },
        "otp": true,
        "fpwd": true,
        "domains": {
            "self": "ad9c4206e57.4lo.me:3000",
            "register": "localhost:3000"
        },
        "verifications": {
            "name": true,
            "identity": false,
            "phone": true
        },
        "financial": {
            "id": "d1b25450-b204-11e7-ab48-097a050432ea",
            "name": "CNY default",
            "isDefault": true,
            "currency": {
                "name": "Yuan (Chinese) Renminbi",
                "code": "CNY",
                "symbol": "¥",
                "supported": 1,
                "symbol_after": 0
            },
            "limitations": {
                "balance": {
                    "total": 1000000
                },
                "deposit": {
                    "daily": 1000000
                },
                "withdraw": {
                    "daily": 200000,
                    "min": 100,
                    "max": 50000
                }
            },
            "settings": {
                "deposit": [
                    {
                        "method": "CNYCC",
                        "psp": "PP",
                        "range": {
                            "min": 0.01,
                            "max": 10000
                        },
                        "timestamps": {
                            "createdAt": "2017-10-15T23:59:02+00:00",
                            "updatedAt": "2017-10-16T01:21:40+00:00"
                        }
                    },
                    {
                        "method": "CNYWX",
                        "psp": "PP",
                        "range": {
                            "min": 0.01,
                            "max": 3000
                        },
                        "timestamps": {
                            "createdAt": "2017-10-16T01:21:40+00:00",
                            "updatedAt": "2017-10-16T01:21:40+00:00"
                        }
                    },
                    {
                        "method": "CNYALI",
                        "psp": "PP",
                        "range": {
                            "min": 0.01,
                            "max": 3000
                        },
                        "timestamps": {
                            "createdAt": "2017-10-16T01:21:40+00:00",
                            "updatedAt": "2017-10-16T01:21:40+00:00"
                        }
                    },
                    {
                        "method": "ALIWAP",
                        "psp": "PP",
                        "range": {
                            "min": 0.01,
                            "max": 3000
                        },
                        "timestamps": {
                            "createdAt": "2017-10-16T01:21:40+00:00",
                            "updatedAt": "2017-10-16T01:21:40+00:00"
                        }
                    }
                ],
                "withdraw": [
                    {
                        "bank": {
                            "name": "中国工商银行",
                            "code": "ICBC"
                        }
                    },
                    {
                        "bank": {
                            "name": "中国建设银行",
                            "code": "CCB"
                        }
                    },
                    {
                        "bank": {
                            "name": "中国农业银行",
                            "code": "ABC"
                        }
                    }
                ]
            }
        },
        "setting": {
            "login": null,
            "profile": null,
            "card": "sms",
            "transfer": "password",
            "withdraw": "otp"
        },
        "locale": "zh-CN",
        "country": {
            "iso": "CN",
            "niceName": "China",
            "phoneCode": 86
        },
        "currency": "CNY",
        "timezone": "+08:00",
        "hasMember": true,
        "parent": {
            "userId": "ee61ee00-5ce1-11e8-86dd-19d9ff5e8837",
            "username": "default"
        },
        "locked": false,
        "timestamps": {
            "createdAt": "2017-09-28T06:49:33+00:00",
            "updatedAt": "2018-07-03T21:11:06+00:00"
        }
    }
}