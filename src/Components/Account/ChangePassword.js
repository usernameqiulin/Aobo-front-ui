import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"
import {connect} from "react-redux"

import ABModal from "../ABModal"
import ABOTP from "../Form/ABOTP"
import ProfileActions from "../../Redux/ProfileRedux"

class ChangePassword extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            param: {
                old: '',
                new: '',
                new_confirmation: '',
            },
            error: {
                field: null,
                message: null,
            },
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.profile.updating.indexOf('password') > -1 && nextProps.profile.updating.indexOf('password') === -1 && nextProps.profile.error) {
            console.log(nextProps.profile.error)
            const error = nextProps.profile.error
            if (error.startsWith('OLD_PASSWORD')) {
                this.setState({
                    error: {
                        field: 'old'
                    }
                })
            } else if (error.startsWith('NEW_PASSWORD_CONFIRMATION')) {
                this.setState({
                    error: {
                        field: 'new_confirmation'
                    }
                })
            } else if (error.startsWith('NEW_PASSWORD')) {
                this.setState({
                    error: {
                        field: 'new'
                    }
                })
            }
        }
    }

    closeModal = () => {
        this.props.switcher()
    }

    openModal = e => {
        this.props.switcher()
    }

    isValid = () => {
        return (
            this.state.param.old !== ''
            && this.state.param.new !== ''
            && this.state.param.new_confirmation !== ''
            && this.state.param.old.length === 6
            && this.state.param.new.length === 6
            && this.state.param.new_confirmation.length === 6
            && this.state.param.new === this.state.param.new_confirmation
            // && this.state.param.new !== this.state.param.old
        )
    }

    changeOld = (code) => {
        this.changeParam('old', code)
    }

    changeNew = (code) => {
        this.changeParam('new', code)
    }

    changeNewConfirm = (code) => {
        this.changeParam('new_confirmation', code)
    }

    changeParam = (type, code) => {
        if (this.state.error.field === type) {
            this.setState({
                error: {
                    field: ''
                }
            })
        }
        if (code.length === 6) {
            let {param, error} = this.state
            param[type] = code
            if (type === 'new_confirmation' && this.state.param.new && this.state.param.new !== code) {
                error.field = 'new_confirmation'
            }
            this.setState({
                param: param,
                error
            })
        }
    }

    onSubmit = e => {
        let field = ''
        if (this.state.param.old.length !== 6) {
            field = 'old'
        } else if (this.state.param.new.length !== 6) {
            field = 'new'
        } else if (this.state.param.new_confirmation.length !== 6) {
            field = 'new'
        } else if (this.state.param.new !== this.state.param.new_confirmation) {
            field = 'new_confirmation'
        }
        if (!!field) {
            this.setState({
                error: {
                    field: field,
                }
            })
            return
        }
        this.props.updatePassword(this.state.param)
    }

    render() {
        const {t, isOpen, profile} = this.props
        return (
            <ABModal
                onClose={this.closeModal}
                closeOnEsc={false}
                open={isOpen}
                classes={{modal: 'modal-overlay', overlay: 'dim'}}
                closeOnOverlayClick={false}
                dark
            >
                <div className={`modal-form _spinner modal-form__change-password${profile.updating.indexOf('password') > -1 ? ' is-spinning' : ''}`}>
                    <div className={`modal-form__header`}>
                        <div className="modal-form__title">
                            {t('Change fund password')}
                        </div>
                    </div>
                    <div className={`modal-form__field modal-form__field-transparent`}>
                        <div className="modal-form__item">
                            <span className="modal-form__label">{t('Old password')}</span>
                        </div>
                        <div className={`modal-form__input otp`}>
                            <ABOTP
                                onChange={this.changeOld}
                                isError={this.state.error.field === 'old'}
                                maskSwitch={true}
                                eyeClose
                            />
                        </div>
                    </div>
                    <div className={`modal-form__field modal-form__field-transparent`}>
                        <div className="modal-form__item">
                            <span className="modal-form__label">{t('New password')}</span>
                        </div>
                        <div className={`modal-form__input otp`}>
                            <ABOTP
                                onChange={this.changeNew}
                                isError={this.state.error.field === 'new' || this.state.error.field === 'new_confirmation'}
                                maskSwitch={true}
                                eyeClose
                            />
                        </div>
                    </div>
                    <div className={`modal-form__field modal-form__field-transparent`}>
                        <div className="modal-form__item">
                            <span className="modal-form__label">{t('Confirm password')}</span>
                        </div>
                        <div className={`modal-form__input otp`}>
                            <ABOTP
                                onChange={this.changeNewConfirm}
                                isError={this.state.error.field === 'new_confirmation'}
                                maskSwitch={true}
                                eyeClose
                            />
                        </div>
                    </div>
                    <div className={`modal-form__bottom`}>
                        <span className={`btn btn--gray add-review__button${this.isValid() ? '' : ' ng-hide'}`} onClick={this.onSubmit}>
                            {t('Change fund password')}
                        </span>
                        <span className={`btn btn--gray add-review__button is-disabled${!this.isValid() ? '' : ' ng-hide'}`}>{t('Change fund password')}</span>
                    </div>
                </div>
            </ABModal>
        )
    }
}

ChangePassword.propTypes = {
    isOpen: PropTypes.bool,
    switcher: PropTypes.func,
    updatePassword: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
    }
}

const mapDispatchToProps = (dispatch) => ({
    updatePassword: (param) => dispatch(ProfileActions.passwordUpdateRequest(param)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(ChangePassword))