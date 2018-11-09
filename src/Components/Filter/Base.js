import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

class Base extends React.Component {
    state = {
            isExpanded: false,
    }

    _clearFilter = (e) => {
        e.stopPropagation()
        this.props.clear(true)
    }

    anySelected = () => {
        return this.props.selected.length > 0
    }

    _toggleDropdown = (e) => {
        e.stopPropagation();
        this.setState({
            isExpanded:!this.state.isExpanded,
        })
    }

    _leave = (e) => {
        setTimeout(function() {
            this.setState({isExpanded: !1});
        }.bind(this), 200)
    }

    render() {
        const {t} = this.props
        return (
            <div className="filters__section filters__section--alter-on-big-screens">
                <div
                    className={`filtr _dropdown${this.state.isExpanded ? ' is-expanded' : ' is-contracted'}${this.anySelected() ? ' is-applied' : ''}`}
                    onClick={this._toggleDropdown}
                    onMouseLeave={this._leave}
                >
                    <span className="filter__title">{t(this.props.filter.title)}</span>
                    <i className="ic ic--small icon-dropdown-down filter__icon"/>
                    <i className={`ic icon-close2 js-not-toggle no-hl filter__icon`} onClick={this._clearFilter}/>
                    <i className="_dropdown__pointer-up _dropdown__pointer--light filter__pointer"/>
                    <div className="filter__items _dropdown__items">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

Base.propTypes = {
    filter: PropTypes.object,
    children: PropTypes.any.isRequired,
    selected: PropTypes.array,
    clear: PropTypes.func,
}

export default translate()(Base)