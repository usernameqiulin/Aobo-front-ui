import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"

class UserName extends React.Component {

    render() {
        const {t, name} = this.props
        return (
            <span className={`settings-item__option settings-item__section${!!name ? ' settings-option--on' : ''}`}>
                <span className="settings-option__show-when-off">
                    <a className="btn btn--green settings-item__btn settings-item__two-step-btn" onClick={this.props.clickHandler}>
                        {t('verify name by debit card')}
                    </a>
                </span>
                <span className="settings-option__show-when-on">
                    <svg className="icon-lock"><use xlinkHref="#icon-padlock"/></svg>
                    {' '}
                    {name}
                </span>
            </span>
        )
    }
}

UserName.propTypes = {
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
}

export default translate()(UserName)