import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'
import {connect} from "react-redux"

import {isMobile} from "../../../helper"
import NotificationActions from "../../../Redux/NotificationRedux"
import NotificationRow from "./NotificationRow"

class NotificationMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newNotificationAnimation: false,
            isVisible: false,
            oryginalDocumentTitle: "",
            isBlinkingTitle: false,
        }
    }

    playAnimation = () => {
        const _this = this, resetAnimation = function() {
            _this.setState({newNotificationAnimation: false})
        }
        this.setState({
            newNotificationAnimation: true,
        })
        setTimeout(resetAnimation, 2e3)
    }

    _toggle = (event) => {
        this.props.toggle(event)
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isExpanded && nextProps.isExpanded) {
            this.props.notification.lastUnconsumedNotificationsCount && this.props.consumeIfExpanded()
        }
        if (this.props.notification.lastUnconsumedNotificationsCount < nextProps.notification.lastUnconsumedNotificationsCount) {
            this.playAnimation()
        }
    }

    _mouseEnter = (event) => {
        !isMobile() && this.props.cancelTimeout('notifications')
    }

    _mouseLeave = (event) => {
        !isMobile() && this.props.mouseLeave(event)
    }

    onClear = event => {
        this.props.clearAllNotifications()
    }

    render() {
        const {notification, t, profile, config} = this.props

        return (
            <div className={`menu-item menu-item--invisible-on-loading menu-notifications has-submenu js-menu-notifications`}>
                <a className={`menu-link menu-link--icon${this.state.newNotificationAnimation ? ' is-notifying' : ''}`}
                   onClick={this._toggle}
                   onMouseLeave={this._mouseLeave}
                   onMouseOver={this._mouseEnter}
                   ref={r=>this.trigger = r}
                >
                    <svg viewBox="0 0 15 16" className={`menu-icon-svg menu-icon-svg--notifications${this.state.newNotificationAnimation ? ' got-notification' : ''}`}>
                        <use xlinkHref="#icon-notification"/>
                    </svg>
                    <span className={`menu-item__count menu-item__count--notifications${!notification.fetching && notification.lastUnconsumedNotificationsCount ? ' is-highlighted' : ''}`}>
                        {notification.notificationsCount}
                    </span>
                    <span className="menu-triangle menu-triangle--centered menu-triangle--others"/>
                </a>
                <div className="menu-submenu menu-notifications__submenu" onMouseOver={this._mouseEnter} onMouseLeave={this._mouseLeave}>
                    {/* ng-show="notifications.list.length > 0" ng-class="{'has-unread-notifications': notifications.notificationsCount > 0}" */}
                    <div className={`menu-header menu-header-notifications${!!notification.data && notification.data.length ? ' has-unread-notifications' : ' ng-hide'}`}>
                        <div className="menu-header__label">{t('Your notifications')}</div>
                        <div className="menu-header__unread menu-header-notifications--has-unread-notifications">
                            {t('notification_pending', {unread: notification.lastUnconsumedNotificationsCount})}
                        </div>
                        <div className={`menu-header__unread menu-header-notifications--no-unread-notifications`}>
                            {t('There’s nothing to read yet')}
                        </div>
                        {/* ng-click="notifications.deleteAllNotifications(); menu.cancelTimeout('notifications')" */}
                        <a className={`menu-btn menu-btn--gray menu-header__btn menu-header-notifications__btn--mark-all-as-read menu-uppercase`} onClick={this.onClear}>{t('Clear all')}</a>
                    </div>
                    {/* ng-show="notifications.showEmptyNotificationsMessage" */}
                    <div className={`menu-notifications-empty${!notification.notificationsCount ? '' : ' ng-hide'}`}>
                        <div className="menu-notifications-empty__header menu-uppercase">
                            <svg viewBox="0 0 32 32" className="menu-notifications-empty__header-icon"><use xlinkHref="#icon-notifications-empty"/></svg> {t('Your notifications')}
                        </div>
                        <hr className="menu-notifications-empty__line"/>
                        <div className="menu-notifications-empty__description">
                            {t('See new chat messages, friend invites, as well as important announcements and deals relevant to you')}
                        </div>
                    </div>
                    {/* gog-menu-scrollbar="" gog-menu-scrollbar-refresh="0" ng-hide="notifications.showEmptyNotificationsMessage" */}
                    <div className={`menu-notifications__list _menu-scrollbar${!notification.data ? ' ng-hide' : ''}`}>
                        <div className="js-gog-scrollbar-wrapper _menu-scrollbar__wrapper">
                            <div className="js-gog-scrollbar-content _menu-scrollbar__content menu-notifications__content">
                                <div className="menu-notifications__list-in">
                                    {!!notification.data && notification.data.map(n => {
                                        return <NotificationRow
                                            notification={n}
                                            key={n.id}
                                        />
                                    })}
                                </div>
                                <div className="js-gog-scrollbar-bar _gog-menu-scrollbar__bar is-disabled"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

NotificationMenu.propTypes = {
    isExpanded: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    mouseLeave: PropTypes.func.isRequired,
    cancelTimeout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
    }
}

const mapDispatchToProps = (dispatch) => ({
    consumeIfExpanded: () => dispatch(NotificationActions.notificationConsumeAllRequest()),
    clearAllNotifications: () => dispatch(NotificationActions.notificationClearAllRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(NotificationMenu))
