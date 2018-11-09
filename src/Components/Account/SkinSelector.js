import React from 'react'
import PropTypes from "prop-types"

const SKIN_AVAILABLE = ['Wood', 'Dark', 'Glass', 'Chrome', 'White', 'Piano']

class SkinSelector extends React.Component {

    render() {
        const {t, current, expanded} = this.props
        return (
            <span
                className={`_dropdown${expanded ? ' is-expanded' : ' is-contracted'}`}
                onClick={this.props.toggler}
                onMouseLeave={this.props.hider}
            >
                {SKIN_AVAILABLE.map((skin, i) => <b key={i} className={`skin-selector__current${current === skin ? '' : ' ng-hide'}`}>{t(skin)}</b>)}
                <span className="_dropdown__pointer-wrapper skin-selector__pointer-wrapper">
                    <i className="ic icon-dropdown-down header__switch-icon skin-selector__dropdown-icon"/>
                    <i className="_dropdown__pointer-up"/>
                </span>
                <div className={`_dropdown__items skin-selector__items`} onMouseEnter={this.props.over}>
                    {SKIN_AVAILABLE.map((skin, i) => (
                        <div key={i} className={`_dropdown__item skin-selector__item${current === skin ? ' is-selected' : ''}`} onClick={e=>this.props.switcher(skin)}>
                            <i className="dropdown-input radio"/>{t(skin)}
                            <div className={`skin-selector__tmb skin-selector__tmb--${skin.toLowerCase()}`}/>
                        </div>
                    ))}
                </div>
            </span>
        )
    }
}

SkinSelector.propTypes = {
    current: PropTypes.oneOf(SKIN_AVAILABLE),
    toggler: PropTypes.func,
    hider: PropTypes.func,
    expanded: PropTypes.bool,
    switcher: PropTypes.func,
    over: PropTypes.func,
    t: PropTypes.func.isRequired,
}

export default SkinSelector