import React from 'react'
import PropTypes from 'prop-types'
import ReactDom from 'react-dom'

import {CountdownService} from '../helper'

const ATTR_TIMESTAMP = "countdownTimestamp",
    DEFAULTS = {
        DIGITS: "00"
    },
    CLASS_NAME = {
        JS_COUNTDOWN_LONG_ACTIVE: "js-countdown-long-active",
        JS_COUNTDOWN_SHORT_ACTIVE: "js-countdown-short-active",
        JS_COUNTDOWN_EXPIRED: "js-countdown-expired",
        JS_DAYS: "js-days",
        JS_HOURS: "js-hours",
        JS_MINUTES: "js-minutes",
        JS_SECONDS: "js-seconds",
        IS_HIDDEN: "is-hidden",
    }


class ABCountdown extends React.Component {

    constructor(props) {
        super(props)
        this._countdownService = new CountdownService()
    }

    _initialize = (countdown) => {
        this._listenerDestructors = [],
            this._listenerDestructors.push(countdown.registerCountdownListener(this._updateViewCountdown.bind(this))),
            this._listenerDestructors.push(countdown.registerCountdownFinishListener(this._updateViewCountdownFinished.bind(this))),
            this._updateRefElCountdown(this._elsCountdownLong)
    }

    componentDidMount() {
        let countdown, id, targetTimestamp;
        // console.log(this._countdownService)
        if (
            this._element = ReactDom.findDOMNode(this),
                this._elsCountdownLong = this._element.querySelectorAll("." + CLASS_NAME.JS_COUNTDOWN_LONG_ACTIVE),
                this._elsCountdownShort = this._element.querySelectorAll("." + CLASS_NAME.JS_COUNTDOWN_SHORT_ACTIVE),
                this._elsCountdownExpired = this._element.querySelectorAll("." + CLASS_NAME.JS_COUNTDOWN_EXPIRED),
                this._isLast48Hours = !1,
                id = this.props.id,
                !(countdown = this._countdownService.get(id))
        ) {
            if (!(targetTimestamp = this.props[ATTR_TIMESTAMP])) throw "abCountdown: target countdown is not initialized";
            countdown = this._countdownService.create(id, targetTimestamp)
        }
        this._initialize(countdown)
    }

    componentWillUnmount() {
        this._destructor()
    }

    _destructor = () => {
        this._listenerDestructors.forEach(function(destructListener) {
            return destructListener()
        }), this._listenerDestructors = []
    }

    _updateViewCountdown = (counter) => {
        counter || (counter = {}),
        counter.isLast48Hours !== this._isLast48Hours && (this._isLast48Hours = counter.isLast48Hours, this._isLast48Hours && (this._updateRefElCountdown(this._elsCountdownShort), this._setViewCounterShort())),
            counter.isLast48Hours
                ? this._updateViewDigit(this._elsHours, counter.hours48)
                : (this._updateViewDigit(this._elsDays, counter.days), this._updateViewDigit(this._elsHours, counter.hours)),
            this._updateViewDigit(this._elsMinutes, counter.minutes),
            this._updateViewDigit(this._elsSeconds, counter.seconds)
    }

    _updateRefElCountdown = (els) => {
        let el, elDays, elHours, elMinutes, elSeconds, i, len;
        if (null == els && (els = []), els && els.length) {
            for (this._elsDays = [], this._elsHours = [], this._elsMinutes = [], this._elsSeconds = [], i = 0, len = els.length; i < len; i++) {
                el = els[i],
                    elDays = el.querySelector("." + CLASS_NAME.JS_DAYS),
                    elHours = el.querySelector("." + CLASS_NAME.JS_HOURS),
                    elMinutes = el.querySelector("." + CLASS_NAME.JS_MINUTES),
                    elSeconds = el.querySelector("." + CLASS_NAME.JS_SECONDS),
                elDays && this._elsDays.push(elDays),
                elHours && this._elsHours.push(elHours),
                elMinutes && this._elsMinutes.push(elMinutes),
                elSeconds && this._elsSeconds.push(elSeconds)
            }
        }
    }

    _updateViewDigit = (els, value) => {
        let el, i, len;
        if (null == els && (els = []), null == value && (value = DEFAULTS.DIGITS), els && els.length) {
            for (i = 0, len = els.length; i < len; i++) {
                el = els[i], el.innerText = value
            }
        }
    }

    _setViewCounterShort = () => {
        let el, i, j, len, len1, ref, ref1;
        if (this._elsCountdownLong && this._elsCountdownLong.length) {
            for (ref = this._elsCountdownLong, i = 0, len = ref.length; i < len; i++) {
                el = ref[i], el.classList.add(CLASS_NAME.IS_HIDDEN);
            }
        }
        for (ref1 = this._elsCountdownShort, j = 0, len1 = ref1.length; j < len1; j++) {
            el = ref1[j], el.classList.remove(CLASS_NAME.IS_HIDDEN)
        }
    }

    _setViewHasExpired = () => {
        let el, i, j, k, len, len1, len2, ref, ref1, ref2;
        if (this._elsCountdownLong && this._elsCountdownLong.length) {
            for (ref = this._elsCountdownLong, i = 0, len = ref.length; i < len; i++) {
                el = ref[i], el.classList.add(CLASS_NAME.IS_HIDDEN);
            }
        }
        if (this._elsCountdownShort && this._elsCountdownShort.length) {
            for (ref1 = this._elsCountdownShort, j = 0, len1 = ref1.length; j < len1; j++) {
                el = ref1[j], el.classList.add(CLASS_NAME.IS_HIDDEN);
            }
        }
        for (ref2 = this._elsCountdownExpired, k = 0, len2 = ref2.length; k < len2; k++) {
            el = ref2[k], el.classList.remove(CLASS_NAME.IS_HIDDEN)
        }
    }

    _updateViewCountdownFinished = () => {
        this._updateViewCountdown(),
            this._setViewHasExpired(),
            this._destructor()
    }

    render() {
        return (
            <span>
                <span className="countdown__active js-countdown-long-active">
                    <i className={`ic icon-clock`}/>
                    <span className="js-days">--</span>:
                    <span className="js-hours">--</span>:
                    <span className="js-minutes">--</span>:
                    <span className="js-seconds">--</span>
                </span>
                <span className="countdown__active js-countdown-short-active is-hidden">
                    <i className={`ic icon-clock`}/>
                    <span className="js-hours">--</span>:
                    <span className="js-minutes">--</span>:
                    <span className="js-seconds">--</span>
                </span>
                <a className="countdown__expired js-countdown-expired is-hidden">Refresh now</a>
            </span>
        )
    }
}

ABCountdown.propTypes = {
    id: PropTypes.string.isRequired,
    countdownTimestamp: PropTypes.number.isRequired,
}

export default ABCountdown