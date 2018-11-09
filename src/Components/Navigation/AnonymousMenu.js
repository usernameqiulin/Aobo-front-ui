import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import GoogleAnalytics from "react-ga"
import NativeListener from 'react-native-listener'

import {isMobile} from "../../helper"
import FeatureSlider from "./FeatureSlider"
import MenuAnonymousHeader from "./MenuAnonymousHeader"
import MenuAnonymousShelf from "./MenuAnonymousShelf"
import MenuAnonymousAbout from "./MenuAnonymousAbout"
import MenuAnonymousFeaturesHeader from "./MenuAnonymousFeaturesHeader"

class AnonymousMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    _mouseEnter = (event) => {
        !isMobile() && this.props.mouseEnter(event);
    }

    _mouseLeave = (event) => {
        !isMobile() && this.props.mouseLeave(event);
    }

    _touchStart = (event) => {
        event.preventDefault()
    }

    _touchEnd = (event) => {
        event.preventDefault()
        this.props.touchHandler(event)
    }

    _mouseEnterSub = (event) => {
        this.props.cancelTimeout('anonymous')
    }

    render() {
        const {t} = this.props

        return (
            // ng-cloak ng-controller="menuAnonymousCtrl as anonymous" ng-show="anonymous.isResponseFetched && !anonymous.isUserLoggedIn"
            <div className={`menu-item menu-item--animated has-submenu menu-anonymous js-menu-anonymous${this.props.isHidden ? ' ng-hide' : ''}`}
                 onMouseEnter={this._mouseEnter}
                 onMouseLeave={this._mouseLeave}
            >
                <NativeListener onClick={this.props.openLogin}>
                    <a className="menu-link menu-link--anonymous menu-uppercase hide-on-touch-device">
                        <span>{t('login')}</span>
                        <svg viewBox="0 0 32 32" className="menu-link__dropdown-icon">
                            <use xlinkHref="#icon-arrow-down2"/>
                        </svg>
                        <span className="menu-triangle menu-triangle--others menu-triangle--anonymous"/>
                    </a>
                </NativeListener>
                {/* ng-touchstart="$event.preventDefault(); menu.toggle($event, 'anonymous')" */}
                <a className="menu-link menu-link--anonymous menu-uppercase hide-on-non-touch-device" onTouchStart={this._touchStart} onTouchEnd={this._touchEnd}>
                    <span onClick={e => GoogleAnalytics.event({
                        action: 'login',
                        category: 'topBar',
                        label: 'Login'
                    })}>{t('login')}</span>
                    <svg viewBox="0 0 32 32" className="menu-link__dropdown-icon">
                        <use xlinkHref="#icon-arrow-down2"/>
                    </svg>
                    <span className="menu-triangle menu-triangle--others menu-triangle--anonymous"/>
                </a>
                {/* ng-click="menu.stopPropagation($event)" ng-mouseenter="menu.cancelTimeout('anonymous')" */}
                <NativeListener onClick={e => this.props.eventStopper(e)} onMouseOver={this._mouseEnterSub}>
                    <div className="menu-submenu menu-anonymous__submenu">
                        <MenuAnonymousHeader
                            openRegistration={this.props.openRegistration}
                            openLogin={this.props.openLogin}
                        />
                        <MenuAnonymousShelf/>
                        <MenuAnonymousAbout/>
                        <MenuAnonymousFeaturesHeader/>
                        <FeatureSlider isExpanded={this.props.isExpanded}/>
                    </div>
                </NativeListener>
            </div>
        )
    }
}

AnonymousMenu.propTypes = {
    eventStopper: PropTypes.func.isRequired,
    mouseEnter: PropTypes.func.isRequired,
    mouseLeave: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    openLogin: PropTypes.func.isRequired,
    openRegistration: PropTypes.func.isRequired,
}

export default translate()(AnonymousMenu)
