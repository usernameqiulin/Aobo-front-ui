import React from 'react'
import {translate} from 'react-i18next'
import PropTypes from 'prop-types'

export default translate()((props) => {
    const {t} = props

    return (
        <p className="menu-anonymous__about">
            <b>{t('anonymous_about_bold')}</b>
            {t('anonymous_about_regular')}
        </p>
    )
})