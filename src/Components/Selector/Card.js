import React from 'react'
import PropTypes from 'prop-types'

import '../Card/BankCardSmall.css'
import './Card.css'

class Card extends React.Component {

    onClick = e => {
        if (this.props.selectable && this.props.onSelect) {
            this.props.onSelect(this.props.id)
        }
    }

    render() {
        const {t} = this.props
        return (
            <div className={`card-wrapper${this.props.selectable ? ' _clickable' : ''}${this.props.selected === this.props.id && this.props.selectable ? ' selected' : ''}`} onClick={this.onClick}>
                <span className={`bank-logo-small${' ' + this.props.bank}`}/>
                <span className={`card-text`}>{t('Ending in')}: {this.props.account.number.slice(-4)}</span>
                {this.props.selectable && <svg className={`icon-tick`}>
                    <use xlinkHref={`#icon-tick`}/>
                </svg>}
            </div>
        )
    }
}

Card.propTypes = {
    t: PropTypes.func.isRequired,
    selectable: PropTypes.bool,
    onSelect: PropTypes.func,
    selected: PropTypes.string,
    card: PropTypes.string,
    bank: PropTypes.string,
}

export default Card