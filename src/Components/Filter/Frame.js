import React from 'react'
import PropTypes from 'prop-types'

class Frame extends React.Component {
    state = {
        isExpanded: false,
    }

    reset = (e) => {
        e.stopPropagation()
        this.props.clear()
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
            <div className={`filters__section filters__section--alter-on-big-screens ${this.props.extraClasses}`}>
                <div
                    className={`filtr _dropdown${this.state.isExpanded ? ' is-expanded' : ' is-contracted'}${this.props.applied ? ' is-applied' : ''}`}
                    onClick={this._toggleDropdown}
                    onMouseLeave={this._leave}
                >
                    <span className="filter__title">{this.props.title}</span>
                    <i className="ic ic--small icon-dropdown-down filter__icon"/>
                    <i className={`ic icon-close2 js-not-toggle no-hl filter__icon`} onClick={this.reset}/>
                    <i className="_dropdown__pointer-up _dropdown__pointer--light filter__pointer"/>
                    <div className="filter__items _dropdown__items">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}

Frame.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any.isRequired,
    clear: PropTypes.func,
    extraClasses: PropTypes.string,
    applied: PropTypes.bool,
}

export default Frame