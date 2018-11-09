import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"

import ABModal from "../ABModal"
import ABBankAccount from "../Form/ABBankAccount"

import './BankCard.css'

class ABBankAccountAdd extends React.Component {

    state = {
        showAddForm: false,
    }

    closeModal = () => {
        this.setState({showAddForm: false})
    }

    openModal = (e) => {
        this.setState({showAddForm: true})
    }

    render() {
        const {t} = this.props
        return (
            <div className="bank-card">
                <div className={`bank-card__inner`}>
                    <div className="module card-rectangle">
                        <div className={`card-rectangle--add_wrapper`}>
                            <a className={`card-rectangle--add _clickable`} onClick={this.openModal}>
                                {'+ '}{t('Debit card')}
                            </a>
                        </div>
                    </div>
                </div>
                <ABModal
                    onClose={this.closeModal}
                    closeOnEsc={true}
                    open={this.state.showAddForm}
                    classes={{modal: 'modal-overlay', overlay: 'dim'}}
                    closeOnOverlayClick={true}
                    dark
                >
                    <ABBankAccount t={t}/>
                </ABModal>
            </div>
        )
    }
}

ABBankAccountAdd.propTypes = {
    t: PropTypes.func.isRequired,
}

export default translate()(ABBankAccountAdd)