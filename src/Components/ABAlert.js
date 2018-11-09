import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'
import Portal from 'react-minimalist-portal'

import './alert.css'

import AlertActions from '../Redux/AlertRedux'

class ABAlert extends React.Component {

    dismiss = (e) => {
        this.props.alertDismiss()
    }

    render() {
        const {t, alert} = this.props
        return (
            <Portal>
                <div className={`alert${alert.message ? ' fade-in' : ''}${alert.level === 'error' ? ' error' : ''}${alert.level === 'success' ? ' success' : ''}`}>
                    <div className="container cf alert__in">
                        <p className="alert__text">
                            {t(alert.message)}
                        </p>
                        <div className="alert__close" onClick={this.dismiss}>×</div>
                    </div>
                </div>
            </Portal>
        )
    }
}

ABAlert.propTypes = {
    alert: PropTypes.object.isRequired,
    alertDismiss: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
    }
}

const mapDispatchToProps = (dispatch) => ({
    alertDismiss: () => dispatch(AlertActions.alertDismiss()),
})



export default connect(mapStateToProps, mapDispatchToProps)(translate()(ABAlert))