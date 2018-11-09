import React from 'react'
import PropTypes from 'prop-types'

class Error extends React.Component {
    render() {
        return (
            // ng-controller="errorMainNotificationCtrl as errorMainNotification" ng-class="{ 'is-visible':errorMainNotification.isVisible }"
            <div className="notification-box is-visible">
                <p className="notification-box__text">
                    <svg className="_icon notification-box__icon"><use xlinkHref="#icon-triangle-exclemation"/></svg>
                    错误，由于隐私限制无法打开对话。
                </p>
                {/* ng-class="{ 'has-retry':errorMainNotification.hasRetry }" */}
                <div className="notification-box__actions has-retry">
                    {/* ng-click="errorMainNotification.retry()" */}
                    <span className="notification-box__actions__link">重试</span>
                    {/* ng-click="errorMainNotification.cancel()" */}
                    <span className="notification-box__actions__link">取消</span>
                </div>
            </div>
        )
    }
}

export default Error