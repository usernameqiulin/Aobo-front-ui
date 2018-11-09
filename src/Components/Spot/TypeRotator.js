export default class TypeRotator {
    static TYPE = {
        LARGE: "large",
        PROMO: "promo"
    }

    constructor(_type, _nextSpot, _prevSpot, switchTime, _delay) {
        this._type = _type
        this._nextSpot = _nextSpot
        this._prevSpot = _prevSpot
        null == switchTime && (switchTime = 1e3)
        this._delay = null != _delay ? _delay : 0
        this._switchTime = switchTime + this._delay
        this._isRotationPausedByUser = false
        this._timeoutRotation = null
    }

    _rotate = () => {
        if (this._nextSpot(), this.rotate(), this._delay) {
            return this._switchTime -= this._delay, this._delay = 0
        }
    }

    static lockRotation = () => {
        return this._isRotationPausedByUser = true, clearTimeout(this._timeoutRotation), this._timeoutRotation = null
    }

    static unlockRotation = () => {
        return clearTimeout(this._timeoutRotation), this._isRotationPausedByUser = false
    }

    rotate = () => {
        if (!this._isRotationPausedByUser) {
            return this._timeoutRotation = setTimeout(this._rotate.bind(this), this._switchTime)
        }
    }
}