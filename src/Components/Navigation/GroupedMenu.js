import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'
import GoogleAnalytics from 'react-ga'

import {isMobile} from "../../helper";

class GroupedMenu extends React.Component {
    constructor(props) {
        super(props)
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

    render() {
        const {t} = this.props

        return (
            <div className="menu-item menu-item--animated has-submenu hide-in-lite-mode hide-in-normal-mode menu-item--grouped js-menu-grouped"
                 onMouseEnter={this._mouseEnter}
                 onMouseLeave={this._mouseLeave}
            >
                <a className="menu-link menu-uppercase" onTouchStart={this._touchStart} onTouchEnd={this._touchEnd}>
                    {t('More')}
                    <svg viewBox="0 0 32 32" className="menu-link__dropdown-icon"><use xlinkHref="#icon-arrow-down2"/></svg>
                </a>
                <span className="menu-triangle"/>
                <div className="menu-submenu js-menu">
                    <div className="menu-submenu-item  menu-submenu-item--hover">
                        <Link to="/sports" className="menu-submenu-link" onClick={e => GoogleAnalytics.event({action: 'Click', category: 'topBar', label: 'Sports'})}>
                            {t('SPORTS')}
                        </Link>
                    </div>
                    <div className="menu-submenu-item  menu-submenu-item--hover">
                        <Link to="/promotion" className="menu-submenu-link" onClick={e => GoogleAnalytics.event({action: 'Click', category: 'topBar', label: 'Promotion'})}>
                            {t('Promotion')}
                        </Link>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover vip">
                        <Link to="/vip" className="menu-submenu-link" onClick={e => GoogleAnalytics.event({action: 'Click', category: 'topBar', label: 'Vip'})}>{t('Vip')}</Link>
                    </div>
                </div>
            </div>
        )
    }
}

GroupedMenu.propTypes = {
    touchHandler: PropTypes.func.isRequired,
    mouseEnter: PropTypes.func.isRequired,
    mouseLeave: PropTypes.func.isRequired,
}

export default translate()(GroupedMenu)
