import React from 'react'
import PropTypes from 'prop-types'

import './Bank.css'

class Bank extends React.Component {

    onClick = e => {
        if (this.props.selectable && this.props.onSelect) {
            this.props.onSelect(this.props.code)
        }
    }

    render() {
        return (
            <div className={`bank-wrapper${this.props.selected === this.props.code ? ' selected' : ''}`} onClick={this.onClick} title={this.props.name}>
                <svg className="bank-wrapper__selected-icon">
                    <use xlinkHref="#selected-bg"/>
                </svg>
                <span className={`bank-logo${' ' + this.props.code}`}/>
                {/*<svg className={`icon-tick`}>*/}
                    {/*<use xlinkHref={`#icon-tick`}/>*/}
                {/*</svg>*/}
            </div>
        )
    }
}

Bank.propTypes = {
    selectable: PropTypes.bool,
    onSelect: PropTypes.func,
    selected: PropTypes.string,
    code: PropTypes.string.isRequired,
    name: PropTypes.string,
}

export default Bank