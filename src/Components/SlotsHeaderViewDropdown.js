import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"

class SlotsHeaderViewDropdown extends React.Component {

    render() {
        const { t } = this.props;
        return (
            <span className={`header__dropdown module-header-dd _dropdown ${this.props.expanded ? 'is-expanded' : 'is-contracted'}`}
                  onClick={this.props.toggler}
                  onMouseLeave={this.props.hider}
            >
                <span>{t('as_' + this.props.current)}</span>
                <span className="_dropdown__pointer-wrapper">
                    <i className="ic icon-dropdown-down header__switch-icon"/>
                    <i className="_dropdown__pointer-up"/>
                </span>
                <span className="_dropdown__items module-header-dd__items" onMouseEnter={this.props.over}>
                    {['grid', 'list'].map(function (mode) {
                        return <span key={mode} className="_dropdown__item" onClick={e => this.props.switcher(mode)}>{t('as_' + mode)}</span>
                    }, this)}
                </span>
            </span>
        )
    }
}

SlotsHeaderViewDropdown.propTypes = {
    current: PropTypes.oneOf(['list', 'grid']),
    toggler: PropTypes.func,
    hider: PropTypes.func,
    expanded: PropTypes.bool,
    switcher: PropTypes.func,
    over: PropTypes.func,
}

export default translate()(SlotsHeaderViewDropdown)