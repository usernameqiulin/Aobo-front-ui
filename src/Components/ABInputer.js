import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

import {isChrome, isEdge, isFirefox, isIE, isOpera, isSafari} from '../helper'

// if now is in composition session
let isOnComposition = false

// for safari use only, innervalue can't setState when compositionend occurred
let isInnerChangeFromOnChange = false

class ABInputer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: this.props.defaultValue ? this.props.defaultValue : '',
            innerValue: this.props.defaultValue ? this.props.defaultValue : '',
        }
        this.changeProps = debounce(this.changeProps, 500)
    }

    onChange = e => {
        if (isInnerChangeFromOnChange) {
            this.setState({
                inputValue: e.target.value,
                innerValue: e.target.value,
            }/*, () => console.log(this.state.innerValue)*/)
            isInnerChangeFromOnChange = false
            return
        }
        if (!isOnComposition) {
            this.setState({
                inputValue: e.target.value,
                innerValue: e.target.value,
            }, () => this.changeProps(this.state.innerValue))
        } else {
            this.setState({
                inputValue: e.target.value
            })
        }
    }

    onComposition = (e) => {
        // Flow check
        if (!(e.target instanceof HTMLInputElement)) return
        if (e.type === 'compositionend') {
            // Chrome is ok for only setState innerValue
            // Opera, IE and Edge is like Chrome
            if (isChrome || isIE || isEdge || isOpera || isSafari) {
                this.setState({
                    innerValue: e.target.value,
                }, () => this.changeProps(this.state.innerValue))
            }

            // Firefox need to setState inputValue again...
            if (isFirefox) {
                this.setState({
                    innerValue: e.target.value,
                    inputValue: e.target.value,
                }, () => this.changeProps(this.state.innerValue))
            }

            // Safari think e.target.value in composition event is keyboard char,
            //  but it will fired another change after compositionend
            // if (isSafari) {
            //     // do change in the next change event
            //     // isInnerChangeFromOnChange = true
            //     this.setState({
            //         innerValue: e.target.value,
            //         inputValue: e.target.value,
            //     }, () => this.changeProps(this.state.innerValue))
            // }
            isOnComposition = false
        } else {
            isOnComposition = true
        }
    }

    changeProps = () => this.props.valueChanger(this.state.innerValue)

    reset = () => this.setState({
        inputValue: '',
        innerValue: '',
    })

    focus = () => this.i.focus()

    render() {
        return (
            <input
                type={!!this.props.type ? this.props.type : 'text'}
                className={!!this.props.classes ? this.props.classes.join(' ') : ''}
                value={this.state.inputValue}
                placeholder={!!this.props.placeHolder ? this.props.placeHolder : null}
                onChange={this.onChange}
                onCompositionUpdate={this.onComposition}
                onCompositionEnd={this.onComposition}
                onCompositionStart={this.onComposition}
                ref={r => this.i = r}
            />
        )
    }
}

ABInputer.propTypes = {
    defaultValue: PropTypes.string,
    valueChanger: PropTypes.func.isRequired,
    placeHolder: PropTypes.string,
    classes: PropTypes.array,
    type: PropTypes.oneOf(['search', 'text']).isRequired,
}

export default ABInputer