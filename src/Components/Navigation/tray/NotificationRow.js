import React from 'react'
import PropTypes from 'prop-types'
import moment from "moment/moment"
import {translate} from "react-i18next";
import {amountFormat} from "../../../helper";

class NotificationRow extends React.Component {

    buildCss = () => {
        const {notification} = this.props
        let css = ''
        if(notification.consumed) css += ' is-consumed'
        if(notification.hasBackground) css += ' has-background'
        if(notification.isSpecial) css += ' is-special'
        switch (notification.type) {
            case 'account':
                if (notification.event === 'new_member') {
                    css += ' is-new-friend'
                }
                break
            case 'rank':
                if (notification.event === 'upgraded') {
                    css += ' is-upgraded'
                } else {
                    css += ' is-downgraded'
                }
                break
            case 'game':
                if (notification.event === 'new') {
                    css += ' is-product-release'
                }
                break
            default:
                css += ' is-' + notification.type + '-' + notification.event
        }
        return css
    }

    buildImg = (image, suffix, ext) => {
        return image + '_' + suffix + '.' + (ext ? ext : 'png')
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        const {notification, t} = this.props
        return (
            //               ng-click="notifications.executeActionForNotification(notification.id, $event); menu.hide($event, 'notifications', 0)"
            //                ng-class="{ 'is-consumed': notification.consumed,
            //                                         'has-background': notification.hasBackground,
            //                                         'is-special': notification.isSpecial,
            //                                         'is-new-chat-message': notification.type == 'new_chat_message',
            //                                         'is-new-invite': notification.type == 'new_invite',
            //                                         'is-new-game-invite': notification.type == 'new_game_invite',
            //                                         'is-new-forum-reply': notification.type == 'new_forum_reply',
            //                                         'is-wishlisted-products-discounted': notification.type == 'wishlisted_products_discounted',
            //                                         'is-new-friend': notification.type == 'new_friend',
            //                                         'is-product-release': notification.type == 'product_release'
            //                             }" ng-href="{{ notifications.parseLink(notification.link) }}"
            //                ng-switch="::notification.imageType"
            <a className={`menu-notification _clickable ${this.buildCss()}`}>
                {!!notification.hasBackground && <img className="menu-notification__special-bg" srcSet={notification.background + ' 1x'}/>}
                {notification.imageType === 'gameIcon' && <img className="menu-notification__image menu-notification__image--gameIcon" src={notification.image}/>}
                {notification.imageType === 'Logo' && <img className="menu-notification__image menu-notification__image--Logo" src={notification.image}/>}
                {notification.imageType !== 'gameIcon' && notification.imageType !== 'Logo' &&
                <img className="menu-notification__image menu-notification__image--avatar" srcSet={this.buildImg(notification.image, 'menu_notification_av', 'png') + ' 1x, ' + this.buildImg(notification.image, 'menu_notification_av2', 'png') + ' 2x'}/>}
                <span className="menu-notification__icon">
                    <svg viewBox="0 0 32 32" className="menu-notification__icon-svg">
                        <use xlinkHref={`#icon-notification-${notification.icon}`}/>
                    </svg>
                </span>
                <b className="menu-notification__title">
                    <span className="menu-notification__title-text menu-notification__title-text--from-notification">{notification.title}</span>
                    <span className="menu-notification__title-text menu-notification__title-text--deposit-success">
                        {t('Deposit success')}
                    </span>
                    <span className="menu-notification__title-text menu-notification__title-text--withdraw-success">
                        {t('Withdraw success')}
                    </span>
                    <span className="menu-notification__title-text menu-notification__title-text--rebate-success">
                        {t('Rebate success')}
                    </span>
                    <span className="menu-notification__title-text menu-notification__title-text--relief-success">
                        {t('Relief success')}
                    </span>
                    <span className="menu-notification__date">{moment(notification.timestamps.createdAt).toNow()}</span>
                </b>
                <span className="menu-notification__description">
                    <b className="menu-notification__label menu-notification__label--product-release">{t('Now available for playing')}</b>
                    <b className="menu-notification__label menu-notification__label--new-friend">{t('Your new member')}</b>
                    {(
                        notification.type !== 'deposit'
                        && notification.type !== 'withdraw'
                        && notification.type !== 'rebate'
                        && notification.type !== 'relief'
                    )
                    && <span>{notification.description}</span>
                    }
                    {(
                        notification.type === 'deposit'
                        || notification.type === 'withdraw'
                        || notification.type === 'rebate'
                        || notification.type === 'relief'
                    )
                    && <span className={`_price`}>{amountFormat(notification.description)}</span>
                    }
                </span>
            </a>
        )
    }
}

NotificationRow.propTypes = {
    t: PropTypes.func.isRequired,
    notification: PropTypes.object.isRequired,
}

export default translate()(NotificationRow)