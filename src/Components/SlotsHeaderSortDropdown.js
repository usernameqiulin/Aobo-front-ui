import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

class SlotsHeaderSortDropdown extends React.Component {

    render() {
        const { t } = this.props
        return (
            <span className={`header__dropdown module-header-dd _dropdown${this.props.expanded ? ' is-expanded' : ' is-contracted'}`}
                  onClick={this.props.toggler}
                  onMouseLeave={this.props.hider}
            >
                <span>{t('by_' + this.props.current)}</span>
                <span className="_dropdown__pointer-wrapper">
                    <i className="ic icon-dropdown-down header__switch-icon"/>
                    <i className="_dropdown__pointer-up"/>
                </span>
                <span className="_dropdown__items module-header-dd__items" onMouseEnter={this.props.over}>
                    {['popularity', 'title', 'rating', 'date', 'bestselling', 'release_asc', 'release_desc'].map(by => {
                        return <span key={by} className="_dropdown__item" onClick={e => this.props.switcher(by)}>{t('by_' + by)}</span>
                    }, this)}
                </span>
            </span>
        )
    }
}

SlotsHeaderSortDropdown.propTypes = {
    current: PropTypes.oneOf(['popularity', 'title', 'rating', 'date', 'bestselling', 'release_asc', 'release_desc']),
    toggler: PropTypes.func,
    hider: PropTypes.func,
    expanded: PropTypes.bool,
    switcher: PropTypes.func,
    over: PropTypes.func,
}

export default translate()(SlotsHeaderSortDropdown)