import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import GoogleAnalytics from "react-ga"

import {MenuAimFactory} from "../../helper"
import './menu.css'
import SlotsMenu from './Slots'
import LiveMenu from './LiveMenu'
import SearchMenu from "./tray/SearchMenu"
import NotificationMenu from "./tray/NotificationMenu"
import GroupedMenu from "./GroupedMenu"
import LiteMenu from "./tray/LiteMenu"
import SportsMenu from "./SportsMenu"
import LotteryMenu from "./LotteryMenu"
import PromotionMenu from "./PromotionMenu"
import VipMenu from "./VipMenu"
import MenuActions from "../../Redux/MenuRedux"
import AuthActions from "../../Redux/AuthRedux"
// import CartMenu from "./tray/CartMenu"
import AnonymousMenu from "./AnonymousMenu"
import AccountMenu from "./AccountMenu"

const ACTIVATION_DELAY = 150
const ESCAPE = 27
const DROPDOWN_SUBMENU_PREFIX = '.js-menu-'
const ANIMATION_MODES = {
    LONG: "long",
    SHORT: "short"
}
const DONT_STOP_PROPAGATION = ['use', 'A', 'svg', 'a']

class Navigation extends React.PureComponent {
    constructor(props) {
        super(props)
        this.expanded = {
            slots: false,
            live: false,
            sports: false,
            lottery: false,
            search: false,
            account: false,
            cart: false,
            notifications: false,
            friends: false,
            anonymous: false
        }
        this.state = {
            currentExpanded: '',
        }
        this.currentExpanded = {}
        this.hiddingTimeouts = {}
        this.showingTimeout = null
        this.animationMode = ANIMATION_MODES.LONG
    }

    componentDidMount() {
        !this.props.menu.data && this.props.getMenu()

        this.container = ReactDOM.findDOMNode(this)
        let menuAimFactory = MenuAimFactory()
        this.menuAim = menuAimFactory.getForMenu(this.container, 75, 300, "below")
        // console.log(this.menuAim)
        window.addEventListener("keydown", this.onKeyDown)
        this.container.addEventListener("click", this.stopPropagation), this.container.addEventListener("click", this.hideOnClickInMenu)
        document.body.addEventListener("click", this.hideExpanded)
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.onKeyDown)
        document.body.removeEventListener("click", this.hideExpanded)
        this.container.removeEventListener("click", this.stopPropagation), this.container.removeEventListener("click", this.hideOnClickInMenu)
    }

    show = (event, menuName) => {
        if (null !== event && event.stopPropagation(), !this.isExpanded(menuName)) {
            this.hideExpanded();
            let menu = this.container.querySelector(DROPDOWN_SUBMENU_PREFIX + menuName);
            menu.classList.add("is-expanded", "animation-mode--" + this.animationMode),
                this.props.overlayToggle(true),
                this.currentExpanded.menuElement = menu,
                this.currentExpanded.menuName = menuName,
                this.container.classList.add("menu--" + menuName + "-expanded", "menu--expanded"),
                this.setMenuState(menuName, !0),
                this.expanded[menuName] = !0,
                this.setState({
                    currentExpanded: menuName,
                })
                // document.body.addEventListener("click", this.hideExpanded)
        }
    }

    showWithDelay = (event, menuName, delay) => {
        let _this = this;
        void 0 === delay && (delay = ACTIVATION_DELAY), clearTimeout(this.showingTimeout), null !== event && event.stopPropagation(), this.animationMode = ANIMATION_MODES.LONG, this.anyExpanded() ? (this.animationMode = ANIMATION_MODES.SHORT, this.show(null, menuName)) : this.showingTimeout = setTimeout(function() {
            _this.show(null, menuName)
        }, delay)
    }

    showOnFirstClick = (event, menuName) => {
        this.isExpanded(menuName) || (event.preventDefault(), clearTimeout(this.showingTimeout), this.show(event, menuName))
    }

    toggle = (event, menuName, disableScroll) => {
        void 0 === disableScroll && (disableScroll = false),
            this.animationMode = ANIMATION_MODES.LONG,
            this.isExpanded(menuName)
                ? (this.hide(event, menuName), disableScroll && this.enableScroll())
                : (this.anyExpanded() && (this.animationMode = ANIMATION_MODES.SHORT), this.show(event, menuName), disableScroll && this.disableScroll())
    }

    isExpanded = (menuName) => {
        return this.expanded[menuName]
    }

    hide = (event, menuName, delay) => {
        if (void 0 === delay && (delay = this.menuAim.getActivationDelay()), clearTimeout(this.showingTimeout), this.expanded[menuName]) {
            null !== event && event.stopPropagation()
            this.hiddingTimeouts[menuName] = setTimeout(this.delayedHide.bind(this, menuName), delay)
            this.setState({
                currentExpanded: '',
            })
        }
    }

    hideOnMouseleave = (event, menuName, delay) => {
        this.eventToPass = event, this.menuNameToPass = menuName, window.addEventListener("blur", this.hideOnClickOutside), window.addEventListener("click", this.hideOnClickOutside), this.hide(event, menuName, delay)
    }

    hideOnClickOutside = (e) => {
        this.hide(this.eventToPass, this.menuNameToPass, 0), window.removeEventListener("blur", this.hideOnClickOutside), window.removeEventListener("click", this.hideOnClickOutside)
    }

    stopPropagation = (event) => {
        if (
            event.target.classList.contains('menu-item__count')
            || event.target.classList.contains('menu-icon-svg--notifications')
            || event.target.classList.contains('menu-username')
            || event.target.classList.contains('menu-link__image')
            || event.target.classList.contains('menu-collection__image')
            || event.target.classList.contains('menu-collection__name')
            || event.target.classList.contains('menu-product__play-btn-text')
            || event.target.classList.contains('menu-custom-category__play-btn-content--play-now')
            || event.target.classList.contains('menu-search-toolbar__results-count')
            || event.target.classList.contains('menu-search-toolbar')
        ) {
            return
        }
        else if (this.expanded['notifications'] && (event.target.tagName === 'svg' || event.target.tagName === 'use')) {
            event.stopPropagation()
            return
        }
        // else if (event.target.classList.contains('menu-search-toolbar')) {
        //     console.log(event.target.classList.contains('menu-search-toolbar'))
        //
        //     event.stopPropagation()
        //     event.preventDefault()
        //     return
        // }
        (DONT_STOP_PROPAGATION.indexOf(event.target.tagName) === -1) && event.stopPropagation()
    }

    cancelTimeout = (menuName) => {
        clearTimeout(this.hiddingTimeouts[menuName])
    }

    setCurrentLocale = (locale) => {
        this.currentLocale = locale
    }

    setCurrentCountry = (country) => {
        this.currentCountry = country
    }

    setCurrentCurrency = (currency) => {
        this.currentCurrency = currency
    }

    enableScroll = () => {}

    disableScroll = () => {}

    setMenuState = (menuName, isExpanded) => {
        this.expanded[menuName] = isExpanded
        // this.menuVisibilityChangedListenersManager.callListeners(menuName, isExpanded)
    }

    delayedHide = (menuName) => {
        let menu = this.container.querySelector(DROPDOWN_SUBMENU_PREFIX + menuName);
        menu.classList.remove("animation-mode--short", "animation-mode--long"), this.expanded[menuName] = !1, menu.classList.contains("is-expanded") && (menu.classList.remove("is-expanded"), this.setMenuState(menuName, !1), this.container.classList.remove("menu--" + menuName + "-expanded"), this.anyExpanded() || (this.container.classList.remove("menu--expanded"), this.props.overlayToggle(false)))
    }

    onKeyDown = (event) => {
        event.keyCode !== ESCAPE || this.isExpanded("search") || this.hideExpanded()
    }

    changeTriggered = (menuName, state) => {
        state ? this.showByExternalTrigger(menuName) : this.hide(null, menuName)
    }

    showByExternalTrigger = (menuName) => {
        this.show(null, menuName)
        for (let iframesList = document.querySelectorAll("iframe"), i = 0; i < iframesList.length; i++) {
            iframesList[i].contentDocument.addEventListener("click", this.hideExpanded)
        }
    }

    hideExpanded = () => {
        for (let menuName in this.expanded) {
            this.expanded[menuName] && this.hide(null, menuName)
        }
    }

    hideOnClickInMenu = (event) => {
        let className = (DROPDOWN_SUBMENU_PREFIX + this.currentExpanded.menuName).substring(1),
            target = event.target;
        for (this.hideExpanded(); (null !== target || "undefined" !== typeof target) && target !== document.documentElement;) {
            if (target.classList.contains(className)) {
                this.cancelTimeout(this.currentExpanded.menuName);
                break
            }
            target = target.parentNode
        }
    }

    anyExpanded = () => {
        for (let menuName in this.expanded) {
            if (this.expanded[menuName]) {
                return !0;
            }
        }
        return !1
    }

    triggerExpand = (menuName) => {
        this.setMenuState(menuName, true)
    }

    triggerCollapse = (menuName) => {
        /*this.menuVisibilityChangeTriggeredListenersManager.callListeners(menuName, !1), */this.setMenuState(menuName, false)
    }

    openLogin = (event) => {
        // event.stopPropagation()
        GoogleAnalytics.event({
            action: 'login',
            category: 'topBar',
            label: 'Login'
        })
        this.hide(event, 'anonymous')
        this.props.loginRequest()
        // window.ABAccount.openLoginForm(this.onLoginFinish)
    }

    onLoginFinish = (data) => {
        this.props.loginSuccess(data)
        window.ABAccount.close()
    }

    openRegistration = (event) => {
        // event.stopPropagation()
        GoogleAnalytics.event({
            action: 'register',
            category: 'topBar',
            label: 'Register'
        })
        this.hide(event, 'anonymous')
        this.props.registerRequest()
        // window.ABAccount.openRegistrationForm(this.onLoginFinish)
    }

    onLogout = e => {
        GoogleAnalytics.event({
            action: 'logout',
            category: 'topBar',
            label: 'Logout'
        })
        this.delayedHide('account')
        this.props.logout()
    }

    render() {
        const {auth, currency, language} = this.props
        return (
            <nav className={`menu menu-prices-in-${currency} menu--osx menu-curr-symbol-before menu-language-${language}`}>
                <div className="menu__container">
                    <Link to="/" className="menu__logo">
                        <svg viewBox="0 0 32 32" className="menu__logo-icon">
                            <use xlinkHref="#icon-logo-aobo"/>
                        </svg>
                    </Link>
                    <div className="menu-main hide-in-lite-mode">
                        <SlotsMenu
                            touchHandler={event => this.toggle(event, 'slots')}
                            mouseEnter={event => this.showWithDelay(event, 'slots')}
                            mouseLeave={event => this.hide(event, 'slots')}
                            cancelTimeout={this.cancelTimeout}
                            menuAim={this.menuAim}
                            isExpanded={this.state.currentExpanded === 'slots'}
                            menu={this.props.menu}
                        />
                        <LiveMenu
                            touchHandler={event => this.toggle(event, 'live')}
                            mouseEnter={event => this.showWithDelay(event, 'live')}
                            mouseLeave={event => this.hide(event, 'live')}
                            cancelTimeout={this.cancelTimeout}
                        />
                        <SportsMenu
                            touchHandler={event => this.toggle(event, 'sports')}
                            mouseEnter={event => this.showWithDelay(event, 'sports')}
                            mouseLeave={event => this.hide(event, 'sports')}
                            cancelTimeout={this.cancelTimeout}
                        />
                        <LotteryMenu
                            touchHandler={event => this.toggle(event, 'lottery')}
                            mouseEnter={event => this.showWithDelay(event, 'lottery')}
                            mouseLeave={event => this.hide(event, 'lottery')}
                            cancelTimeout={this.cancelTimeout}
                        />
                        <PromotionMenu
                            touchHandler={event => this.toggle(event, 'promotion')}
                            mouseEnter={event => this.showWithDelay(event, 'promotion')}
                            mouseLeave={event => this.hide(event, 'promotion')}
                            cancelTimeout={this.cancelTimeout}
                        />
                        <VipMenu
                            touchHandler={event => this.toggle(event, 'vip')}
                            mouseEnter={event => this.showWithDelay(event, 'vip')}
                            mouseLeave={event => this.hide(event, 'vip')}
                            cancelTimeout={this.cancelTimeout}
                        />
                        <GroupedMenu
                            touchHandler={event => this.toggle(event, 'grouped')}
                            mouseEnter={event => this.showWithDelay(event, 'grouped')}
                            mouseLeave={event => this.hide(event, 'grouped')}
                            cancelTimeout={this.cancelTimeout}
                        />
                        <AccountMenu
                            touchHandler={event => this.toggle(event, 'account')}
                            mouseEnter={event => this.showWithDelay(event, 'account')}
                            mouseLeave={event => this.hide(event, 'account')}
                            cancelTimeout={this.cancelTimeout}
                            menuAim={this.menuAim}
                            isExpanded={this.state.currentExpanded === 'account'}
                            isHidden={!(!!auth.data && !!auth.data.access_token)}
                            onLogout={this.onLogout}
                        />
                        <AnonymousMenu
                            touchHandler={event => this.toggle(event, 'anonymous')}
                            mouseEnter={event => this.showWithDelay(event, 'anonymous')}
                            mouseLeave={event => this.hide(event, 'anonymous')}
                            cancelTimeout={this.cancelTimeout}
                            eventStopper={this.stopPropagation}
                            isExpanded={this.state.currentExpanded === 'anonymous'}
                            openLogin={this.openLogin}
                            openRegistration={this.openRegistration}
                            isHidden={!!auth.data && !!auth.data.access_token}
                        />
                    </div>
                    <div className="menu-tray">
                        <NotificationMenu
                            toggle={event => this.toggle(event, 'notifications', true)}
                            mouseLeave={event => this.hide(event, 'notifications', 600)}
                            cancelTimeout={this.cancelTimeout}
                            isExpanded={this.state.currentExpanded === 'notifications'}
                        />
                        {/*<CartMenu*/}
                            {/*toggle={event => this.toggle(event, 'cart', true)}*/}
                            {/*mouseLeave={event => this.hide(event, 'cart', 600)}*/}
                            {/*cancelTimeout={this.cancelTimeout}*/}
                        {/*/>*/}
                        <SearchMenu
                            toggle={event => this.toggle(event, 'search', true)}
                            isExpanded={this.state.currentExpanded === 'search'}
                        />
                        <LiteMenu
                            toggle={event => this.toggle(event, 'lite', true)}
                            auth={auth}
                            openLogin={this.openLogin}
                            openRegistration={this.openRegistration}
                        />
                    </div>
                </div>
                <div className="menu-fonts-preloader">
                    <span style={{fontWeight: 300}}>.</span>
                    <span style={{fontWeight: 400}}>.</span>
                    <span style={{fontWeight: 500}}>.</span>
                    <span style={{fontWeight: 600}}>.</span>
                    <span style={{fontWeight: 700}}>.</span>
                    <span style={{fontWeight: 800}}>.</span>
                </div>
            </nav>
        )
    }
}

Navigation.propTypes = {
    auth: PropTypes.object.isRequired,
    menu: PropTypes.object.isRequired,
    overlayToggle: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    language: PropTypes.string.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    getMenu: () => dispatch(MenuActions.menuRequest()),
    loginRequest: (callback) => dispatch(AuthActions.authRequest(callback)),
    registerRequest: (callback) => dispatch(AuthActions.registerRequest(callback)),
    loginSuccess: (data) => dispatch(AuthActions.authSuccess(data)),
    logout: () => dispatch(AuthActions.logoutRequest()),
});

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        auth: state.auth,
        wallet: state.wallet,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigation)