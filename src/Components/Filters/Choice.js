import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

import i18n from '../../i18n'
import {getName} from "../../helper"

class Choice extends React.Component {

    _toggle = (e) => {
        e.stopPropagation()
        !this.props.choice.disabled && this.props.onChoice(this.props.choice.slug)
    }

    render() {
        const {t, choice, isSub, selected, type} = this.props
        const title = 'object' === typeof (choice.title) ? getName(choice.title, i18n.language) : choice.title
        return (
            <div className={`_dropdown__item filter__item${choice.disabled ? ' _dropdown__item--disabled' : ''}${isSub ? ' filter__item--sub' : '' }${selected ? ' is-selected' : ''}`}
                 onClick={this._toggle}>
                <i className={`${'filter-' + type}`}/>
                <span dangerouslySetInnerHTML={{__html: (!!choice.icon ? (choice.icon + ' ') : '') + t(title)}}/>
            </div>
        )
    }
}

Choice.propTypes = {
    choice: PropTypes.shape({
        title: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.array]),
        slug: PropTypes.string,
    }).isRequired,
    type: PropTypes.oneOf(['radio', 'checkbox']).isRequired,
    onChoice: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
    isSub: PropTypes.bool
}

export default translate()(Choice)