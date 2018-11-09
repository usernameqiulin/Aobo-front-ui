import React from 'react'
import PropTypes from 'prop-types'
import {NavLink} from "react-router-dom"
import ABScroll from "../ABScroll"

class Nav extends React.Component {

    render() {
        const {t} = this.props
        return (
            <ABScroll>
                <NavLink exact to="/account" className="module-header__btn" activeClassName="is-active">{t('My AB Gaming')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/profile" className="module-header__btn" activeClassName="is-active">{t('profile & setting')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/favorite" className="module-header__btn" activeClassName="is-active">{t('favorite')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/coupon" className="module-header__btn" activeClassName="is-active">{t('coupon')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/transactions" className="module-header__btn" activeClassName="is-active">{t('transactions')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/records" className="module-header__btn" activeClassName="is-active">
                    {t('Game records')}
                    <var className="css-data-holder css-data-holder--user-settings"/>
                </NavLink>
                <i className="dot"/>
                <NavLink to="/account/members" className="module-header__btn" activeClassName="is-active">{t('members.title')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/gross" className="module-header__btn" activeClassName="is-active">{t('gross.title')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/visitors" className="module-header__btn" activeClassName="is-active">{t('visitors.name')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/charges" className="module-header__btn" activeClassName="is-active">{t('charges.name')}</NavLink>
                <i className="dot"/>
                <NavLink to="/account/history" className="module-header__btn" activeClassName="is-active">{t('history.name')}</NavLink>
             
                
            </ABScroll>
        )
    }
}

export default Nav