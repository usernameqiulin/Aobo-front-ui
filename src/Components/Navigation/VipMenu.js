import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'
import {isMobile} from "../../helper"

class VipMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: null,
            isExpanded: !1,
            isLayerExpanded: !1
        }
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
        this.props.cancelTimeout('vip')
    }

    render() {
        const {t} = this.props

        return (
            <div className={`menu-item has-submenu menu-item--animated hide-in-lite-mode hide-in-grouped-mode js-menu-vip`}
                 onMouseEnter={this._mouseEnter}
                 onMouseLeave={this._mouseLeave}
            >
                <Link className="menu-link menu-uppercase js-menu-link" to="/vip" onTouchStart={this._touchStart}
                      onTouchEnd={this._touchEnd}>
                    {t('Vip')}
                    <svg viewBox="0 0 32 32" className="menu-link__dropdown-icon">
                        <use xlinkHref="#icon-arrow-down2"/>
                    </svg>
                </Link>
                <span className="menu-triangle"/>
                {/* ng-mouseenter="menu.cancelTimeout('store')" ng-class="{ 'menu-slots__submenu--category-expanded': games.isLayerExpanded }" */}
                <div className={`menu-submenu menu-vip__submenu js-menu-sloped-submenu${this.state.isLayerExpanded ? ' menu-vip__submenu--category-expanded' : ''}`}
                     onMouseEnter={this._mouseEnterSub}
                >
                    <div className="menu-submenu-item  menu-submenu-item--hover">
                        <Link to="/galaxy" className="menu-submenu-link">GOG Galaxy</Link>
                    </div>
                    <div className="menu-submenu-separator"/>
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        <Link to="/work" className="menu-submenu-link">加入团队</Link>
                    </div>
                </div>
            </div>
        )
    }
}

VipMenu.propTypes = {
    // hasSubMenu: PropTypes.bool.isRequired,
    touchHandler: PropTypes.func.isRequired,
    mouseEnter: PropTypes.func.isRequired,
    mouseLeave: PropTypes.func.isRequired,
    cancelTimeout: PropTypes.func.isRequired,
}

export default translate()(VipMenu)