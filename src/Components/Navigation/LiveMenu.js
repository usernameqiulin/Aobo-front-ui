import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {isMobile} from "../../helper"
import {translate} from 'react-i18next'

class LiveMenu extends React.Component {
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
        this.props.cancelTimeout('live')
    }

    render() {
        const {t} = this.props

        return (
            <div
                className="menu-item menu-item--animated has-submenu hide-in-lite-mode js-menu-live"
                onMouseEnter={this._mouseEnter}
                onMouseLeave={this._mouseLeave}
            >
                <Link className="menu-link menu-uppercase" to="/live" onTouchStart={this._touchStart}
                      onTouchEnd={this._touchEnd}>
                    {t('LIVE')}
                    <svg viewBox="0 0 32 32" className="menu-link__dropdown-icon">
                        <use xlinkHref="#icon-arrow-down2"/>
                    </svg>
                </Link>
                <span className="menu-triangle"/>
                <div className="menu-submenu js-menu">
                    <div className="menu-submenu-item  menu-submenu-item--hover">
                        {/* gog-track-event="{eventAction: 'Click', eventCategory: 'topBar', eventLabel: 'All forums COMMUNITY'}" */}
                        <Link className="menu-submenu-link" to="/live">所有论坛</Link>
                    </div>
                    <div className="menu-submenu-item  menu-submenu-item--hover">
                        {/* gog-track-event="{eventAction: 'Click', eventCategory: 'topBar', eventLabel: 'General discussion forums COMMUNITY'}" */}
                        <Link className="menu-submenu-link" to="/forum/general_zh">中文讨论论坛</Link>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        {/* gog-track-event="{eventAction: 'Click', eventCategory: 'topBar', eventLabel: 'Community Wishlist COMMUNITY'}" */}
                        <Link className="menu-submenu-link" to="/wishlist">社区愿望单</Link>
                    </div>
                    <div className="menu-submenu-separator"/>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        {/* gog-track-event="{eventAction: 'Click', eventCategory: 'topBar', eventLabel: 'Facebook COMMUNITY'}" */}
                        <a className="menu-submenu-link" href="https://www.facebook.com/gogcom">Facebook</a>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        {/* gog-track-event="{eventAction: 'Click', eventCategory: 'topBar', eventLabel: 'Twitter COMMUNITY'}" */}
                        <a className="menu-submenu-link" href="https://twitter.com/GOGcom">Twitter</a>
                    </div>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        {/* target="_blank" gog-track-event="{eventAction: 'Click', eventCategory: 'topBar', eventLabel: 'Twitch COMMUNITY'}" */}
                        <a className="menu-submenu-link" href="https://www.twitch.tv/gogcom">Twitch</a>
                    </div>
                </div>
            </div>
        )
    }
}

LiveMenu.propTypes = {
    touchHandler: PropTypes.func.isRequired,
    mouseEnter: PropTypes.func.isRequired,
    mouseLeave: PropTypes.func.isRequired,
    cancelTimeout: PropTypes.func.isRequired,
}

export default translate()(LiveMenu)
