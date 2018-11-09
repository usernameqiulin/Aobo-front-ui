import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'
import NativeListener from 'react-native-listener'

import LiteAnonymous from "./LiteAnonymous"
import LiteAccount from './LiteAccount'

class LiteMenu extends React.Component {

    _toggle = (event) => {
        event.stopPropagation()
        this.props.toggle(event)
    }

    render() {
        const {t} = this.props

        return (
            // ng-controller="menuGamesCtrl as games"
            <div className="menu-item menu-lite js-menu-lite">
                {/* ng-click="menu.toggle($event, 'lite', true)" */}
                <NativeListener onClick={this._toggle}>
                    <a className="menu-lite-link hide-in-normal-mode hide-in-grouped-mode menu-uppercase _clickable">
                        <span className="menu-hamburger">
                            <span className="menu-hamburger__line"/>
                            <span className="menu-hamburger__line"/>
                            <span className="menu-hamburger__line"/>
                        </span>
                        {t('menu')}
                    </a>
                </NativeListener>
                <div className="menu-submenu menu-lite__submenu">
                    <div className="menu-submenu-item menu-submenu-item--hover"><Link to="/slots" className="menu-submenu-link menu-submenu-link--lite">{t('SLOTS')}</Link></div>
                    <div className="menu-submenu-item menu-submenu-item--hover"><Link to="/live" className="menu-submenu-link menu-submenu-link--lite">{t('LIVE')}</Link></div>
                    <div className="menu-submenu-item menu-submenu-item--hover"><Link to="/sports" className="menu-submenu-link menu-submenu-link--lite">{t('SPORTS')}</Link></div>
                    <div className="menu-submenu-item menu-submenu-item--hover"><Link to="/lottery" className="menu-submenu-link menu-submenu-link--lite">{t('LOTTERY')}</Link></div>
                    <div className="menu-submenu-item menu-submenu-item--hover"><Link to="/promotion" className="menu-submenu-link menu-submenu-link--lite">{t('Promotion')}</Link></div>
                    <div className="menu-submenu-item menu-submenu-item--hover"><Link to="/vip" className="menu-submenu-link menu-submenu-link--lite">{t('Vip')}</Link></div>
                    {/* ng-repeat="customCategory in games.customCategories track by customCategory.name" */}
                    <div className="menu-submenu-item  menu-submenu-item--hover">
                        {/* ng-style="{'color': customCategory.customisation.categoryColor }" */}
                        <a className="menu-submenu-link menu-submenu-link--lite menu-custom-category-link" href="/game/seven_the_days_long_gone">Seven: The Days Long Gone</a>
                    </div>
                    {/* ng-repeat="customCategory in games.customCategories track by customCategory.name" */}
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        {/* ng-style="{'color': customCategory.customisation.categoryColor }" */}
                        <a className="menu-submenu-link menu-submenu-link--lite menu-custom-category-link" href="/game/spellforce_3">SpellForce 3</a>
                    </div>
                    {/* ng-repeat="customCategory in games.customCategories track by customCategory.name" */}
                    <div className="menu-submenu-item menu-submenu-item--hover">
                        {/* ng-style="{'color': customCategory.customisation.categoryColor }" */}
                        <a className="menu-submenu-link menu-submenu-link--lite menu-custom-category-link" href="/game/divinity_original_sin_2">Divinity: Original Sin 2</a>
                    </div>
                    {/* ng-controller="menuAccountCtrl as account" ng-show="account.isUserLoggedIn" gog-menu-swipe="" */}
                    {/* ng-controller="menuAnonymousCtrl as anonymous" ng-show="anonymous.isResponseFetched &amp;&amp; !anonymous.isUserLoggedIn" gog-menu-swipe="" */}
                    <LiteAccount isHidden={!(!!this.props.auth.data)}/>
                    <LiteAnonymous
                        openLogin={this.props.openLogin}
                        openRegistration={this.props.openRegistration}
                        isHidden={!!this.props.auth.data}
                    />
                </div>
            </div>
        )
    }
}
LiteMenu.propTypes = {
    toggle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    openLogin: PropTypes.func.isRequired,
    openRegistration: PropTypes.func.isRequired,
}

export default translate()(LiteMenu)