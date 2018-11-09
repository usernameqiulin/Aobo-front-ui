import React from 'react'
import PropTypes from 'prop-types'

class ABRadio extends React.Component {

    onClick = (e) => {
        if (this.props.disabled) {
            return e.stopPropagation()
        }
        this.props.onClick(this.props.name, this.props.value)
    }

    render() {
        return (
            <span className={`input-wrapper input-wrapper--inline _clickable${this.props.checked ? ' is-selected' : ''}`} onClick={this.onClick}>
                <i className="filter-radio"/>
                <span>{this.props.label}</span>
            </span>
        )
    }
}

ABRadio.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    checked: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string,
    disabled: PropTypes.bool,
}

export default ABRadio