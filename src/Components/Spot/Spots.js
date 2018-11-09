import React from 'react'
import PropTypes from 'prop-types'

import Spot from "./Spot"
// import TypeRotator from "./TypeRotator"

/**
 * spotState
 * spotRotator
 */
class Spots extends React.PureComponent {

    constructor(props) {
        super(props)
        this.isRotationPausedByUser = false
        this._timeoutRotation = null
        this.state = {
            currentSpot: 1
        }
        this._switchTime = !!props.switchTime ? props.switchTime : 1e3
        this._delay = !!props.delay ? props.delay : 0
        this._switchTime += this._delay
        this.amount = props.spots.length
        this.els = {}
    }

    componentWillUnmount() {
        clearTimeout(this._timeoutRotation)
        this._timeoutRotation = null
    }

    lockRotation = () => {
        this._isRotationPausedByUser = true
        clearTimeout(this._timeoutRotation)
        this._timeoutRotation = null
    }

    unlockRotation = () => {
        clearTimeout(this._timeoutRotation)
        this._isRotationPausedByUser = false
    }

    unlockByUser = () => {
        this.unlockRotation()
        this.rotate()
    }

    deactivate = () => {
        if (Object.keys(this.els).length) {
            for (const key in this.els) {
                this.els[key].activateSpot(false)
            }
        }
    }

    rotate = () => {
        if (!this._isRotationPausedByUser) {
            this._timeoutRotation = setTimeout(this._rotate, this._switchTime)
        }
    }

    _rotate = () => {
        this.nextSpot()
        this.rotate()
        if (this._delay) {
            this._switchTime -= this._delay
            this._delay = 0
        }
    }

    nextSpot = () => {
        this.resolveNextSpot(1)
        this.assignElements()
    }

    prevSpot = () => {
        this.resolveNextSpot(-1)
        this.assignElements()
    }

    resolveNextSpot = (direction) => {
        let {currentSpot} = this.state
        currentSpot += direction
        currentSpot > this.amount && (currentSpot = 1)
        currentSpot <= 0 && (currentSpot = this.amount)
        this.setState({
            currentSpot: currentSpot
        })
    }

    assignElements = () => {
        const currentIndex = this.state.currentSpot,
            prevIndex = currentIndex > 1 ? currentIndex - 1 : this.amount
        this.updateSpotDisplay(prevIndex, currentIndex)
    }

    updateSpotDisplay = (prevIndex, currentIndex) => {
        // this.props.type === 'large' && console.log(this.props.type, prevIndex, currentIndex)
        const {type} = this.props, prevKey = type + prevIndex, currentKey = type + currentIndex
        if (!!this.els[prevKey]) {
            this.els[prevKey].setFading(true)
            this.els[prevKey].setActive(false)
        }
        !!this.els[currentKey] && this.els[currentKey].setActive(true)
        !!this.props.blur && this.props.blur.rotate(prevIndex - 1, currentIndex - 1)
    }

    render() {
        const {type, spots} = this.props
        return spots.map(function (spot, i) {
            i++
            return (
                <Spot
                    key={i}
                    type={type}
                    spot={spot}
                    ref={ref => this.els[type + i] = ref}
                    active={i === this.state.currentSpot}
                    onMouseEnter={this.lockRotation}
                    onMouseLeave={this.unlockByUser}
                />
            )
        }, this)
    }
}

Spots.propTypes = {
    type: PropTypes.oneOf(['large', 'promo']).isRequired,
    spots: PropTypes.array,
    switchTime: PropTypes.number,
    delay: PropTypes.number,
    blur: PropTypes.object
}

export default Spots