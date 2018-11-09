import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import './otp.css'

const NUMS = 6

class ABOTP extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            eyeOpen: !props.eyeClose,
        }
    }

    componentDidMount() {
        this.inputs = ReactDOM.findDOMNode(this).querySelectorAll('.otp__token')
        this.reset()
    }

    onChange(token) {
        this.props.onChange(token)
    }

    reset = () => {
        for (let j = 0; j < this.inputs.length; j += 1) {
            this.inputs[j].value = ''
        }
        this.setState({
            eyeOpen: !this.props.eyeClose,
        })
    }

    setSelectionRange = (field, start, end) => {
        if (field.createTextRange) {
            let selRange = field.createTextRange()
            selRange.collapse(true)
            selRange.moveStart('character', start)
            selRange.moveEnd('character', end)
            selRange.select()
            field.focus()
        } else if (field.setSelectionRange) {
            field.focus()
            field.setSelectionRange(start, end)
        } else if (typeof field.selectionStart !== 'undefined') {
            field.selectionStart = start
            field.selectionEnd = end
            field.focus()
        }
    }

    getCaretPosition = (oField) => {
        let iCaretPos = 0
        if (document.selection) {
            oField.focus()
            let oSel = document.selection.createRange()
            oSel.moveStart('character', -oField.value.length)
            iCaretPos = oSel.text.length
        }
        else if (oField.selectionStart || oField.selectionStart === '0') {
            iCaretPos = oField.selectionStart
        }
        return (iCaretPos)
    }

    distributeText = () => {
        let text = ''
        let indexToFocus = -1
        let cursorPosition = 0
        let token = ''
        for (let i = 0; i < this.inputs.length; i++) {
            // remove all whitespaces
            const inputText = this.inputs[i].value.replace(/[\s\D]/g, '')
            text += inputText
            if (this.inputs[i] === document.activeElement) {
                const textLength = inputText.length
                if (textLength === 0 && i > 0) {
                    indexToFocus = i - 1
                    cursorPosition = 1
                } else if (textLength > 0) {
                    indexToFocus = i + 1
                    cursorPosition = 0
                    if (indexToFocus >= this.inputs.length) {
                        indexToFocus = this.inputs.length - 1
                        cursorPosition = 1
                    }
                }
            }
        }

        for (let k = 0; k < this.inputs.length; k++) {
            this.inputs[k].value = (k < text.length ? text[k] : '')
            token += this.inputs[k].value
        }

        if (indexToFocus !== -1) {
            this.inputs[indexToFocus].focus()
            this.setSelectionRange(this.inputs[indexToFocus], cursorPosition, cursorPosition)
        }
        this.onChange(token)
    }

    onKeyDown = (event) => {
        // backspace
        if (event.which === 8) {
            for (let i = 0; i < this.inputs.length; i++) {
                if (this.inputs[i] === document.activeElement) {
                    const caretPosition = this.getCaretPosition(this.inputs[i])
                    if (caretPosition === 0 && i > 0) {
                        this.inputs[i - 1].value = ''
                    } else {
                        this.inputs[i].value = ''
                    }
                    this.distributeText()
                    break
                }
            }
            event.preventDefault()
        }
    }

    createInputs = () => {
        let inputArray = []
        for (let i = 0; i < NUMS; i++) {
            inputArray.push(
                <input type={`${this.state.eyeOpen ? 'tel' : 'password'}`}
                       key={i}
                       required="required"
                       className="otp__token"
                       autoComplete="off"
                       onInput={this.distributeText}
                       onKeyDown={this.onKeyDown}
                />
            )
        }
        return inputArray
    }

    switchEye = e => this.setState({
        eyeOpen: !this.state.eyeOpen
    })

    render() {
        const {isError, maskSwitch} = this.props
        return (
            //class error
            <div className={`otp_wrapper${isError ? ' error' : ''}`}>
                {this.createInputs()}
                {maskSwitch && <span className={`eye_wrapper`} onClick={this.switchEye}>
                    <i className={`ic icon-eye-${this.state.eyeOpen ? 'on' : 'off'}`}/>
                </span>}
            </div>
        )
    }
}

ABOTP.propTypes = {
    onChange: PropTypes.func.isRequired,
    isError: PropTypes.bool,
    maskSwitch: PropTypes.bool,
}

export default ABOTP