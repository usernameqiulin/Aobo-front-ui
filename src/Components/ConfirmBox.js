import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"

import './ConfirmBox.css'
import ConfirmActions from "../Redux/ConfirmRedux"
import {connect} from "react-redux";

class ConfirmBox extends React.Component {

    onOk = e => this.props.yes()

    onCancel = e => this.props.no()

    render() {
        const {t, confirm} = this.props
        return (
            <div className={`notification-box${!!confirm.show ? ' is-visible' : ''}`}>
                <p className="notification-box__text">
                    <svg className="_icon notification-box__icon">
                        <use xlinkHref="#icon-triangle-exclemation"/>
                    </svg>
                    {t(confirm.message, confirm.data)}
                </p>
                <div className={`notification-box__actions has-retry`}>
                    {/* ng-click="errorMainNotification.retry()" */}
                    <span className="notification-box__actions__link" onClick={this.onOk}>{t('OK')}</span>
                    {/* ng-click="errorMainNotification.cancel()" */}
                    <span className="notification-box__actions__link" onClick={this.onCancel}>{t('Cancel')}</span>
                </div>
            </div>
        )
    }
}

ConfirmBox.propTypes = {
    yes: PropTypes.func,
    no: PropTypes.func,
}

const mapStateToProps = (state) => {
    return {
        confirm: state.confirm,
    }
}

const mapDispatchToProps = (dispatch) => ({
    yes: () => dispatch(ConfirmActions.confirmYes()),
    no: () => dispatch(ConfirmActions.confirmNo()),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ConfirmBox))