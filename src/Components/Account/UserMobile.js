import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"

import '../../Styles/flags.css'

class UserMobile extends React.Component {

    render() {
        const {t, data} = this.props
        return (
            <span className={`settings-item__option settings-item__section${!!data.number ? ' settings-option--on' : ''}`}>
                <span className="settings-option__show-when-off">
                    <a className="btn btn--green settings-item__btn settings-item__two-step-btn" onClick={this.props.clickHandler}>
                        {t('add mobile number')}
                    </a>
                </span>
                <span className="settings-option__show-when-on">
                    <img src={require('../../images/flag_placeholder.png')} className={`flag${data.iso ? ' flag-' + data.iso : ''}`}/>
                    {' '}
                    <span>{data.country}</span>
                    {' '}
                    {data.number}
                    {' '}
                    <a className="un" onClick={this.props.clickHandler}>{t('change mobile number')}</a>
                </span>
            </span>
        )
    }
}

UserMobile.propTypes = {
    data: PropTypes.object.isRequired,
    clickHandler: PropTypes.func.isRequired,
}

export default translate()(UserMobile)