import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

import ReliefActions from "../../Redux/ReliefRedux"

import './Relief.css'

class Relief extends React.Component {

    static propTypes = {
        t: PropTypes.func.isRequired,
        isDisabled: PropTypes.bool,
        addRelief: PropTypes.func.isRequired,
    }

    onApply = (e) => !this.props.isDisabled && !this.props.relief.submitting && this.props.addRelief({product: 'SLOTS'})

    render() {
        const {t} = this.props
        return (
            <div className={`btn btn--green relief-button${this.props.isDisabled ? ' is-disabled' : ''}${this.props.relief.submitting ? ' is-spinning' : ''}`} onClick={this.onApply}>
                <div className="ic icon-thin-plus"/>
                {' '}
                {t('apply relief')}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        relief: state.relief,
    }
}

const mapDispatchToProps = (dispatch) => ({
    addRelief: (params) => dispatch(ReliefActions.reliefAddRequest(params)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Relief))