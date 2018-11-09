import React from 'react'
import PropTypes from 'prop-types'

class ABSelect extends React.Component {

    constructor(props) {
        super(props)
        this.valid = props.options.map(o => o.value)
    }

    change = (e) => {
        this.props.onChange(this.props.name, e.target.value)
    }

    render() {
        return (
            <span className={`input-wrapper input-wrapper--inline${this.props.classes ? (' ' + this.props.classes) : ''}`}>
                <input autoComplete="off"
                       type="text"
                       value={this.props.value}
                       className={`input${this.props.inputClasses ? (' ' + this.props.inputClasses) : ''}${this.props.invalid ? ' is-invalid' : ''}`}
                       placeholder={this.props.placeholder}
                       readOnly
                />
                {!this.props.disabled && <i className="ic ic--small icon-dropdown-down input-wrapper__icon"/>}
                {!this.props.disabled && <select className="unfocusable" value={this.props.value} onChange={this.change}>
                    {
                        this.props.options.map((v, k) => {
                            return (
                                <option key={k} value={v.value}>{v.label}</option>
                            )
                        })
                    }
                </select>}
            </span>
        )
    }
}

ABSelect.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired
    })).isRequired,
    classes: PropTypes.string,
    inputClasses: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    invalid: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
}

export default ABSelect