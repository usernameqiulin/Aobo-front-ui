import React from 'react'
import {translate} from 'react-i18next'

export default translate()((props) => {
    const {t} = props
    return (
        <p className="menu-anonymous__features-header">
            <span className="menu-anonymous__features-header-in">
                {t('why_us')}
            </span>
        </p>
    )
})