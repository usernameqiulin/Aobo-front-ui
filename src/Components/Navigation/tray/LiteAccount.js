import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import NativeListener from 'react-native-listener'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"

import FavoriteActions from "../../../Redux/FavoriteRedux"
import ABSwipe from "../../ABSwipe";
import AuthActions from "../../../Redux/AuthRedux"

class LiteAccount extends React.Component {
    _toggle = (e) => {
        this.props.toggle(e)
    }

    onLogout = e => {
        // e.stopPropagation();
        this.props.logout()
    }

    render() {
        const {t, profile, favorite} = this.props, username = !this.props.isHidden && !profile.fetching && profile.data ? profile.data.username : '...'
        return (
            <ABSwipe direction={'vertical'} size={90}>
                <div className={`menu-lite-account${this.props.isHidden ? ' ng-hide' : ''}`}>
                    <NativeListener onClick={this._toggle}>
                        <div className="menu-header menu-account__user">
                            <div className="menu-account__user-in">
                                <img className="menu-account__user-avatar"
                                     srcSet={require('../../../images/menu_user_av_big.jpg') + " 1x," + require('../../../images/menu_user_av_big2.jpg') + " 2x"}
                                />
                                <span className="menu-account__user-name">{username}</span>
                            </div>
                        </div>
                    </NativeListener>
                    {/* gog-menu-scrollbar="" */}
                    <div className="menu-account__list _gog-menu-scrollbar">
                        <div className="js-gog-scrollbar-wrapper _gog-menu-scrollbar__wrapper">
                            {/* ng-touchstart="$event.stopPropagation();" */}
                            <div className="js-gog-scrollbar-content _gog-menu-scrollbar__content menu-account__content">
                                <Link to="/account/profile" className="menu-account-link">
                                    {t('profile & setting')}
                                </Link>
                                <Link to="/account/favorite" className="menu-account-link">
                                    {t('favorite')}
                                    <span className={`menu-submenu-item__label${(!this.props.isHidden && !!favorite.data && favorite.data.data.length > 0) ? '' : ' ng-hide'}`}>
                                        {(!this.props.isHidden && !!favorite.data && favorite.data.data.length > 0) ? favorite.data.data.length : 0}
                                    </span>
                                </Link>
                                <Link to="/account" className="menu-account-link">
                                    {t('wallet_balance')}
                                </Link>
                                <div className="menu-submenu-separator"/>
                                <Link to="/account/rebate" className="menu-account-link">{t('rebate')}</Link>
                                <Link to="/account/coupon" className="menu-account-link">{t('coupon')}</Link>
                                <Link to="/account/relief" className="menu-account-link">{t('relief')}</Link>
                                <Link to="/account/bigwin" className="menu-account-link">{t('bigwin')}</Link>
                                <div className="menu-submenu-separator"/>
                                <Link to="/account/transactions" className="menu-account-link">
                                    {t('transactions')}
                                </Link>
                                <Link to="/account/records" className="menu-account-link">{t('records')}</Link>
                                <div className="menu-submenu-separator"/>
                                {/* ng-click="account.logout()" */}
                                <a className="menu-account-link" onClick={this.onLogout}>{t('logout')}</a>
                                <div className="js-gog-scrollbar-bar _gog-menu-scrollbar__bar is-disabled"/>
                            </div>
                        </div>
                    </div>
                </div>
            </ABSwipe>
        )
    }
}

LiteAccount.propTypes = {
    favorite: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getFavorites: PropTypes.func.isRequired,
    isHidden: PropTypes.bool,
}

const mapDispatchToProps = (dispatch) => ({
    getFavorites: () => dispatch(FavoriteActions.favoriteRequest({})),
    logout: () => dispatch(AuthActions.logout()),
})

const mapStateToProps = (state) => {
    return {
        favorite: state.favorite,
        profile: state.profile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate()(LiteAccount))
