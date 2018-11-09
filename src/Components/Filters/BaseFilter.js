import React from 'react'
import PropTypes from 'prop-types'

class BaseFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: !1,
            selected: [],
        }
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
        return (
            <div
                className={`filter _dropdown${this.state.isExpanded ? ' is-expanded' : ' is-contracted'} filter--${this.props.filter.slug}${this.anySelected() ? ' is-selected' : ''}`}
                onClick={this._toggleDropdown}
                onMouseLeave={this._leave}
            >
                {this.props.filter.title}
                <i className={`ic ic--small icon-dropdown-down${!this.anySelected() ? '' : ' ng-hide'}`}/>
                <i className={`ic ic--small icon-dropdown-down js-not-toggle no-hl${this.anySelected() ? '' : ' ng-hide'}`} onClick={this._clearFilter}/>
                <i className="_dropdown__pointer-up _dropdown__pointer--light filter__pointer"/>
                <div className="filter__items _dropdown__items">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

BaseFilter.propTypes = {
    filter: PropTypes.object,
    children: PropTypes.any.isRequired,
    selected: PropTypes.array,
    clear: PropTypes.func,
}

export default BaseFilter