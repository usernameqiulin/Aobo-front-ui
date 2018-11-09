import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import NativeListener from 'react-native-listener'

const MenuAnonymousHeader = (props) => {
    const {t, openRegistration, openLogin} = props
    return (
        <div className="menu-header menu-anonymous-header">
            {/* ng-click="anonymous.openRegistration()" */}
            <NativeListener onClick={openRegistration}>
                <a className="menu-btn menu-btn--gray menu-anonymous-header__btn menu-anonymous-header__btn--create-account menu-uppercase">
                    {t('Register')}
                </a>
            </NativeListener>
            <span className="menu-anonymous-header__separator"/>
            {/* ng-click="anonymous.openLogin()" gog-track-event="{eventCategory: 'topBar', eventAction:'login', eventLabel:'Login' }" */}
            <NativeListener onClick={openLogin}>
                <a className="menu-btn menu-anonymous-header__btn menu-anonymous-header__btn--sign-in menu-uppercase">
                    {t('login')}
                </a>
            </NativeListener>
        </div>
    )
}

MenuAnonymousHeader.propTypes = {
    openRegistration: PropTypes.func.isRequired,
    openLogin: PropTypes.func.isRequired,
}

export default translate()(MenuAnonymousHeader)