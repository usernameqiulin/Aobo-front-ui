import React from 'react'
import '../ConfirmBox.css'

const NotificationBox = ({isVisible, hasRetry}) => {
    return (
        <div className={`notification-box${isVisible ? ' is-visible' : ''}`}>
            <p className="notification-box__text">
                <svg className="_icon notification-box__icon">
                    <use xlinkHref="#icon-triangle-exclemation"/>
                </svg>
            </p>
            <div className={`notification-box__actions${hasRetry?' has-retry':''}`}>
                {/* ng-click="errorMainNotification.retry()" */}
                <span className="notification-box__actions__link">Retry</span>
                {/* ng-click="errorMainNotification.cancel()" */}
                <span className="notification-box__actions__link">Cancel</span>
            </div>
        </div>
    )
}

export default NotificationBox