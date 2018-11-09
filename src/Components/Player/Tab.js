import React from 'react'
import PropTypes from 'prop-types'
import {randomGameIcon} from "../../helper"

class Tab extends React.Component {
    image = randomGameIcon(this.props.icon, 'png')

    close = e => this.props.onClose(this.props.id)

    toggleActive = e => this.props.switcher(this.props.id)

    render() {
        const {isActive} = this.props
        return (
            <div className={`game-tab${isActive ? ' is-active' : ''}`}>
                <section className={`game-tab__main _clickable`} onClick={this.toggleActive}>
                    <figure className={`game-tab__icon game-icon`}>
                        <img
                            className="game-icon__image"
                            srcSet={this.image.x1 + ', ' + this.image.x2 + ' 2x'}
                            draggable="false"
                            alt={this.props.brand}
                            title={this.props.brand}
                        />
                    </figure>
                </section>
                <button className={`game-tab__option game-tab__action-btn`} onClick={this.close}>
                    <svg className={`_icon game-tab__action-btn-icon`}>
                        <use xlinkHref={`#icon-close-thin`}/>
                    </svg>
                </button>
                <span className={`_dot _dot--blue game-tab__option game-tab__status-dot`}/>
            </div>
        )
    }
}

Tab.propTypes = {
    isActive: PropTypes.bool,
    icon: PropTypes.string,
    onClose: PropTypes.func,
    id: PropTypes.string,
    switcher: PropTypes.func,
}

export default Tab