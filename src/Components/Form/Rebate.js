import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"

import RebateCalculation from './RebateCalculation'
import RebateButton from '../Button/Rebate'
import ABModal from "../ABModal"

class Rebate extends React.Component {

    state = {
        isOpen: false,
    }

    closeModal = () => {
        this.setState({
            isOpen: false,
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.rebate.calculating && !nextProps.rebate.calculating && !nextProps.rebate.error) {
            this.setState({
                isOpen: true,
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <RebateButton/>
                <ABModal
                    onClose={this.closeModal}
                    closeOnEsc={false}
                    open={this.state.isOpen}
                    classes={{modal: 'modal-overlay', overlay: 'dim'}}
                    extraClass={'rebate-modal'}
                    closeOnOverlayClick={false}
                    dark
                >
                    <RebateCalculation
                        onClose={this.closeModal}
                        timezone={this.props.timezone}
                    />
                </ABModal>
            </React.Fragment>
        )
    }
}

Rebate.propTypes = {
    rebate: PropTypes.object.isRequired,
    timezone: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
    return {
        rebate: state.rebate,
    }
}

const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Rebate)