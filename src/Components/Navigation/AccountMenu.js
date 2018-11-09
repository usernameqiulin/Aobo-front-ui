import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'
import {connect} from "react-redux"
import GoogleAnalytics from "react-ga"
import NativeListener from 'react-native-listener'

import i18n from '../../i18n'
import {isMobile, getName, amountFormat} from "../../helper"
import FavoriteActions from "../../Redux/FavoriteRedux"
import WalletActions from "../../Redux/WalletRedux"
import ProfileActions from '../../Redux/ProfileRedux'
import CheckoutAction from "../../Redux/CheckoutRedux"
import DepositActions from "../../Redux/DepositRedux"
import NotificationActions from "../../Redux/NotificationRedux"

import {isEmpty, isNil} from "ramda"

const LANG_AND_CURRENCY_VISIBLE_CLASSNAME = 'menu-account--language-and-currency-is-visible'

class AccountMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showWallets: false,
        }
        this.hidingTimeout = !1
    }

    componentDidMount() {
        this.container = ReactDOM.findDOMNode(this)
        !this.props.wallet.fetching && !this.props.wallet.main && !this.props.wallet.other && !!this.props.auth.data && this.props.getWallets()
        !this.props.favorite.fetching && !this.props.favorite.data && !!this.props.auth.data && this.props.getFavorites()
        !this.props.profile.fetching && !this.props.profile.data && !!this.props.auth.data && this.props.getProfile()
        if (!!this.props.profile.data) {
            this.subscribeUserChannel(this.props.pusher, this.props.profile)
            this.setGA(this.props.profile)
            this.props.getNotifications()
        }
    }

    subscribeUserChannel = (pusher, profile) => {
        const client = pusher.data.client, channel = client.subscribe('user-' + profile.data.userId)
        const bindings = [
            {
                event: 'balance.updated',
                handler: (message) => {
                    this.props.updateBalance(message)
                }
            },
            // {
            //     event: 'deposit.succeed',
            //     handler: (message) => {
            //         console.log(message)
            //         this.props.CheckoutSuccess()
            //         this.props.updateOrder(message.id)
            //     }
            // },
            {
                event: 'notification.created',
                handler: message => {
                    if (message.type === 'deposit' && message.event === 'success') {
                        this.props.CheckoutSuccess()
                        this.props.updateOrder(message.order_id)
                    }
                    this.props.gotNewNotification(message)
                }
            }
        ]
        bindings.map(b => channel.bind(b.event, b.handler))
    }

    setGA = (profile) => {
        GoogleAnalytics.set({
            userId: profile.data.userId,
            language: i18n.language,
            currencyCode: profile.data.currency,
        })
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.auth.data && newProps.auth.data) {
            this.props.getWallets()
            this.props.getFavorites()
            this.props.getProfile()
            this.props.getNotifications()
        }

        if (!this.props.isExpanded && newProps.isExpanded) {
            this.container.classList.remove(LANG_AND_CURRENCY_VISIBLE_CLASSNAME)
            this.setState({
                showWallets: false,
            })
        }
        if (!this.props.profile.data && !!newProps.profile.data) {
            !!this.props.pusher.data && this.subscribeUserChannel(this.props.pusher, newProps.profile)
            this.setGA(newProps.profile)
        }
    }

    gaEvent = (e, label) => {
        GoogleAnalytics.event({
            action: 'Click',
            category: 'topBar',
            label: label
        })
    }

    _mouseEnter = (event) => {
        !isMobile() && this.props.mouseEnter(event)
    }

    _mouseLeave = (event) => {
        !isMobile() && this.props.mouseLeave(event)
    }

    _touchStart = (event) => {
        event.preventDefault()
    }

    _touchEnd = (event) => {
        event.preventDefault()
        this.props.touchHandler(event)
    }

    _touchWalletEnd = (event) => {
        event.preventDefault()
        this.show()
    }

    _mouseLeaveWallets = (event) => {
        event.preventDefault()
        this.hide()
    }

    _mouseEnterSub = (event) => {
        this.props.cancelTimeout('account')
    }

    hide = () => {
        const _this = this, delay = this.props.menuAim.getActivationDelay()
        this.hidingTimeout = setTimeout(function() {
            _this.container.classList.remove(LANG_AND_CURRENCY_VISIBLE_CLASSNAME)
            _this.setState({
                showWallets: !1,
            })
        }, delay)
    }

    show = () => {
        this.setState({
            showWallets: !0,
        })
        this.container.classList.add(LANG_AND_CURRENCY_VISIBLE_CLASSNAME)
    }

    cancelHidding = () => {
        clearTimeout(this.hidingTimeout)
    }

    refreshBalance = (code) => {
        if (this.props.wallet.updating) {
            return
        }
        this.props.updateWallet(code)
    }

    onLogout = e => {
        this.gaEvent(e, 'logout')
        // e.stopPropagation();
        this.props.onLogout(e)
    }

    render() {
        const {t, profile, favorite, wallet} = this.props, username = !profile.fetching && profile.data ? profile.data.username : ''

        return (
            //${this.state.showWallets ? ' menu-account--language-and-currency-is-visible' : ''}
            <div className={`menu-item menu-item--animated menu-account has-submenu js-menu-account${this.props.isHidden ? ' ng-hide' : ''}`}
                 onMouseEnter={this._mouseEnter}
                 onMouseLeave={this._mouseLeave}
            >
                <Link to="/account" className="menu-link" onTouchStart={this._touchStart} onTouchEnd={this._touchEnd}>
                    <div className={`menu-link__avatar-wrapper`}>
                        <div className={`avatar__spinner${!profile.fetching && profile.data?' ng-hide':''}`}/>
                        <img className="menu-link__image" srcSet={require('../../images/menu_user_av_small.jpg') + " 1x,"+require('../../images/menu_user_av_small2.jpg') + " 2x"}/>
                    </div>
                    <span className="menu-username">{username}</span>
                    <svg viewBox="0 0 32 32" className="menu-link__dropdown-icon"><use xlinkHref="#icon-arrow-down2"/></svg>
                    <span className="menu-triangle menu-triangle--others"/>
                </Link>
                <div className="menu-submenu menu-account__submenu" onMouseOver={this._mouseEnterSub}>
                    <div className="menu-header menu-account__user">
                        <div className="menu-account__user-in">
                            <img className="menu-account__user-avatar" srcSet={require('../../images/menu_user_av_big.jpg') + " 1x," + require('../../images/menu_user_av_big2.jpg') + " 2x"}/>
                            <span className="menu-header__label">{t('My AB Gaming')}</span>
                            <span className="menu-account__user-name">{username}</span>
                        </div>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/account/profile" className="menu-submenu-link" onClick={e => this.gaEvent(e, 'profile & setting')}>
                            {t('profile & setting')}
                            <span className="menu-submenu-item__label ng-hide">6</span>
                        </Link>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/account/favorite" className="menu-submenu-link" onClick={e => this.gaEvent(e, 'favorite')}>
                            {t('favorite')}
                            <span className={`menu-submenu-item__label${(!!favorite.data && !!favorite.data.data && favorite.data.data.length > 0) ? '' : ' ng-hide'}`}>
                                {(!!favorite.data && !!favorite.data.data && favorite.data.data.length > 0) ? favorite.data.data.length : 0}
                            </span>
                        </Link>
                    </div>
                    <div className={`menu-submenu-item menu-submenu-item--static menu-submenu-item--hover${this.state.showWallets ? ' is-active' : ''}`}
                         onMouseOver={this._touchWalletEnd}
                         onMouseLeave={this._mouseLeaveWallets}
                    >
                        {/* gog-track-event="{eventAction: 'Click', eventCategory: 'topBar', eventLabel: 'Language and currency ACCOUNT'}" ng-touchstart="$event.preventDefault(); langAndCurrency.show()" */}
                        <Link className="menu-submenu-link" to="/account" onTouchStart={this._touchStart} onTouchEnd={this._touchWalletEnd} onClick={e => this.gaEvent(e, 'wallet')}>
                            {t('wallet_balance')}
                            <svg viewBox="0 0 32 32" className="menu-submenu-icon"><use xlinkHref="#icon-arrow-right4"/></svg>
                            <svg viewBox="0 0 32 32" className="menu-submenu-icon"><use xlinkHref="#icon-arrow-right4"/></svg>
                        </Link>
                        <div className={`menu-language-and-currency${this.state.showWallets ? ' is-visible' : ''}`} onMouseOver={this.cancelHidding}>
                            <div className="menu-language">
                                {!isNil(wallet.main) && !isEmpty(wallet.main) &&
                                    <div>
                                        <p className="menu-language-and-currency__header">{getName(wallet.main.wallet.name, i18n.language)}</p>
                                        <ul className="menu-language-and-currency__list">
                                            <li className="menu-language-and-currency__list-item">
                                                <span className={`_price`}>
                                                    <span>{amountFormat(wallet.main.balances.available).split('.')[0]}</span>
                                                    <sup className="wallet-amount__tip">{amountFormat(wallet.main.balances.available).split('.')[1]}</sup>
                                                </span>
                                                <NativeListener onClick={(e) => {e.stopPropagation(); this.refreshBalance(wallet.main.wallet.code)}}>
                                                    <a className={`menu-btn--gray _spinner _clickable${wallet.updating === 'MAIN' ? ' is-spinning' : ''}`}>
                                                        <svg className={`icon-refresh${wallet.updating === 'MAIN' ? ' ng-hide' : ''}`}><use xlinkHref="#icon-refresh"/></svg>
                                                    </a>
                                                </NativeListener>
                                            </li>
                                        </ul>
                                    </div>
                                }
                                {!isNil(wallet.other) && !isEmpty(wallet.other) && wallet.other.map((w, i) => {
                                    return (
                                        <div key={i}>
                                            <p className="menu-language-and-currency__header">{getName(w.wallet.name, i18n.language)}</p>
                                            <ul className="menu-language-and-currency__list">
                                                <li className="menu-language-and-currency__list-item">
                                                    <span className={`_price`}>
                                                        <span>{amountFormat(w.balances.available).split('.')[0]}</span>
                                                        <sup className="wallet-amount__tip">{amountFormat(w.balances.available).split('.')[1]}</sup>
                                                    </span>
                                                    <NativeListener onClick={(e) => {e.stopPropagation(); this.refreshBalance(w.wallet.code)}}>
                                                        <a className={`menu-btn--gray _spinner _clickable${wallet.updating === w.wallet.code ? ' is-spinning' : ''}`}>
                                                            <svg className={`icon-refresh${wallet.updating === w.wallet.code ? ' ng-hide' : ''}`}><use xlinkHref="#icon-refresh"/></svg>
                                                        </a>
                                                    </NativeListener>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })
                                }
                            </div>
                            <div className="menu-language-and-currency__footer is-visible">
                                <Link to='/account/deposit#deposit' className="menu-language-and-currency__button" onClick={e => this.gaEvent(e, 'deposit')}>{t('deposit')}</Link>
                                <Link to='/account/transfer#transfer' className="menu-language-and-currency__button" onClick={e => this.gaEvent(e, 'transfer')}>{t('transfer')}</Link>
                                <Link to='/account/withdraw#withdraw' className="menu-language-and-currency__button" onClick={e => this.gaEvent(e, 'withdraw')}>{t('withdraw')}</Link>
                            </div>
                        </div>
                    </div>
                    <div className="menu-submenu-separator"/>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/account/rebate" className="menu-submenu-link" onClick={e => this.gaEvent(e, 'rebate')}>{t('rebate')}</Link>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/account/coupon" className="menu-submenu-link" onClick={e => this.gaEvent(e, 'coupon')}>{t('coupon')}</Link>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/account/relief" className="menu-submenu-link" onClick={e => this.gaEvent(e, 'relief')}>{t('relief')}</Link>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/account/bigwin" className="menu-submenu-link" onClick={e => this.gaEvent(e, 'bigwin')}>{t('bigwin')}</Link>
                    </div>
                    <div className="menu-submenu-separator"/>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/account/transactions" className="menu-submenu-link" onClick={e => this.gaEvent(e, 'transactions')}>
                            {t('transactions')}
                            <span className="menu-submenu-item__label _price ng-hide">0</span>
                        </Link>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/account/records" className="menu-submenu-link" onClick={e => this.gaEvent(e, 'Game records')}>{t('Game records')}</Link>
                    </div>
                    <div className="menu-submenu-separator"/>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <a className="menu-submenu-link" onClick={this.onLogout}>{t('logout')}</a>
                    </div>
                </div>
            </div>
        )
    }
}

AccountMenu.propTypes = {
    wallet: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    favorite: PropTypes.object.isRequired,
    getFavorites: PropTypes.func.isRequired,
    getWallets: PropTypes.func.isRequired,
    updateWallet: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    pusher: PropTypes.object.isRequired,
    updateBalance: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    getFavorites: () => dispatch(FavoriteActions.favoriteRequest({})),
    getWallets: () => dispatch(WalletActions.walletRequest()),
    updateWallet: (code) => dispatch(WalletActions.walletUpdateRequest(code)),
    getProfile: () => dispatch(ProfileActions.profileRequest()),
    updateBalance: (obj) => dispatch(WalletActions.walletUpdateBalance(obj)),
    CheckoutSuccess: () => dispatch(CheckoutAction.checkoutSuccess()),
    updateOrder: (id) => dispatch(DepositActions.orderUpdateRequest(id)),
    getNotifications: () => dispatch(NotificationActions.notificationRequest()),
    gotNewNotification: (notification) => dispatch(NotificationActions.notificationGotNew(notification)),
})

const mapStateToProps = (state) => {
    return {
        wallet: state.wallet,
        favorite: state.favorite,
        profile: state.profile,
        pusher: state.pusher,
        auth: state.auth,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate()(AccountMenu))