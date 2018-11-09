import React from 'react'
import PropTypes from 'prop-types'
import ABRadio from "./ABRadio";

class ABRadioGroup extends React.Component {

    render() {
        const {t} = this.props
        return (
            <span>
                {this.props.options.map((o, i) => {
                    return <ABRadio
                        label={t(o.label)}
                        value={o.value}
                        key={i}
                        checked={this.props.value === o.value}
                        onClick={this.props.toggle}
                        name={this.props.name}
                        disabled={o.disabled}
                    />
                })}
            </span>
        )
    }
}

ABRadioGroup.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        value: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]).isRequired,
    })).isRequired,
    toggle: PropTypes.func.isRequired,
    value: PropTypes.any,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.array,
    language: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
}

export default ABRadioGroup