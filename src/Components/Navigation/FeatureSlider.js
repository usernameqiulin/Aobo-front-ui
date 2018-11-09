import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import GoogleAnalytics from "react-ga"
import NativeListener from 'react-native-listener'
import ReactDOM from 'react-dom'

const CLASSNAMES = {
    ACTIVE: "is-active",
    PAUSED: "is-paused",
    ON: "is-on",
    DONE: "is-done",
}
const AUTOPLAY_INTERVAL = 5e3

class FeatureSlider extends React.Component {

    constructor(props) {
        super(props)
        this.currentSlide = 1
        this.intervalIDs = []
        this.timeoutID = 0
        this.startTime = 0
    }

    componentDidMount() {
        this.element = ReactDOM.findDOMNode(this),
            this.slides = this.element.querySelectorAll(".js-slide"),
            this.timer = this.element.querySelector(".js-timer"),
            this.timerSections = this.timer.querySelectorAll(".js-timer-section"),
            this.numberOfSlides = this.slides.length
    }

    componentWillUnmount() {
        this.destructor()
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.isExpanded && nextProps.isExpanded) {
            this.play()
        }
        if (this.props.isExpanded && !nextProps.isExpanded) {
            this.stop(), this.reset()
        }
    }

    triggerPrevSlide = (e) => {
        e.stopPropagation()
        window.clearTimeout(this.timeoutID), this.currentSlide > 1 ? this.currentSlide-- : this.currentSlide = this.numberOfSlides;
        let activeSlide = this.element.querySelector("." + CLASSNAMES.ACTIVE);
        if (activeSlide.classList.remove(CLASSNAMES.ACTIVE), this.currentSlide === this.numberOfSlides) {
            for (let section in Array.prototype.slice.call(this.timerSections)) {
                this.timerSections[section].classList.remove(CLASSNAMES.ACTIVE, CLASSNAMES.PAUSED, CLASSNAMES.ON), this.timerSections[section].classList.add(CLASSNAMES.DONE);
            }
        }
        else {
            this.timerSections[this.currentSlide].classList.remove(CLASSNAMES.ACTIVE, CLASSNAMES.PAUSED, CLASSNAMES.ON);
        }
        this.slides[this.currentSlide - 1].classList.add(CLASSNAMES.ACTIVE), this.timerSections[this.currentSlide - 1].classList.remove(CLASSNAMES.DONE), this.timerSections[this.currentSlide - 1].classList.add(CLASSNAMES.PAUSED)
    }

    triggerNextSlide = (e) => {
        e.stopPropagation()
        this.remaining = null, window.clearTimeout(this.timeoutID), this.clearIntervals(), this.nextSlide(!0)
    }

    reset = () => {
        this.currentSlide = 1;
        let activeSlide = this.element.querySelector("." + CLASSNAMES.ACTIVE);
        activeSlide.classList.remove(CLASSNAMES.ACTIVE), this.slides[0].classList.add(CLASSNAMES.ACTIVE), this.timer.classList.remove(CLASSNAMES.ON), this.remaining = null, this.startTime = 0, this.resetTimer(), window.clearTimeout(this.timeoutID)
    }

    play = () => {
        if (this.timerSections[this.currentSlide - 1].classList.add(CLASSNAMES.ON), null != this.remaining) {
            let callback = function () {
                this.nextSlide(), this.intervalIDs.push(window.setInterval(this.nextSlide.bind(this), AUTOPLAY_INTERVAL))
            };
            this.timeoutID = window.setTimeout(callback.bind(this), this.remaining), this.remaining = null
        } else {
            this.intervalIDs.push(window.setInterval(this.nextSlide.bind(this), AUTOPLAY_INTERVAL));
        }
        this.timerSections[this.currentSlide - 1].classList.remove(CLASSNAMES.PAUSED), this.timerSections[this.currentSlide - 1].classList.add(CLASSNAMES.ON), this.startTime = (new Date()).getMilliseconds()
    }

    stop = () => {
        this.clearIntervals(), this.timerSections[this.currentSlide - 1].classList.add(CLASSNAMES.PAUSED);
        let timeSinceStart = (new Date()).getMilliseconds() - this.startTime;
        this.remaining = AUTOPLAY_INTERVAL - timeSinceStart
    }

    destructor = () => {
        /*this.visibilityListenerCanceller(), */
        window.clearTimeout(this.timeoutID), this.clearIntervals()
    }

    checkState = () => {
        this.props.isExpanded ? this.play() : (this.stop(), this.reset())
    }

    nextSlide = (userTriggered) => {
        void 0 === userTriggered && (userTriggered = !1), this.currentSlide < this.numberOfSlides ? this.currentSlide++ : (this.currentSlide = 1, this.resetTimer()), this.startTime = (new Date()).getMilliseconds();
        let activeSlide = this.element.querySelector("." + CLASSNAMES.ACTIVE);
        activeSlide.classList.remove(CLASSNAMES.ACTIVE), this.slides[this.currentSlide - 1].classList.add(CLASSNAMES.ACTIVE), this.currentSlide > 1 && (this.timerSections[this.currentSlide - 2].classList.add(CLASSNAMES.DONE), this.timerSections[this.currentSlide - 2].classList.remove(CLASSNAMES.ON)), userTriggered ? (this.timerSections[this.currentSlide - 2] && this.timerSections[this.currentSlide - 2].classList.add(CLASSNAMES.DONE)) : this.timerSections[this.currentSlide - 1].classList.add(CLASSNAMES.ON)
    }

    resetTimer = () => {
        for (let i = 0; i < this.timerSections.length; i++) {
            this.timerSections[i].classList.remove(CLASSNAMES.ON, CLASSNAMES.PAUSED, CLASSNAMES.DONE)
        }
    }

    clearIntervals = () => {
        for (let _i = 0, _a = this.intervalIDs; _i < _a.length; _i++) {
            let intervalID = _a[_i];
            window.clearInterval(intervalID)
        }
        this.intervalIDs = []
    }

    render() {
        return (
            /* gog-menu-features-slider ng-mouseenter="slider.stop()" ng-mouseleave="slider.play()" */
            <div className="menu-features-slider" onMouseOver={this.stop} onMouseLeave={this.play}>
                {/* ng-click="slider.triggerPrevSlide()" */}
                <NativeListener onClick={this.triggerPrevSlide}>
                    <span className="menu-features-slider__nav menu-features-slider__nav--left">
                        <svg viewBox="0 0 32 32" className="menu-features-slider__nav-icon">
                            <use xlinkHref="#icon-fat-arrow-left"/>
                        </svg>
                    </span>
                </NativeListener>
                {/* ng-click="slider.triggerNextSlide()" */}
                <NativeListener onClick={this.triggerNextSlide}>
                    <span className="menu-features-slider__nav menu-features-slider__nav--right">
                        <svg viewBox="0 0 32 32" className="menu-features-slider__nav-icon">
                            <use xlinkHref="#icon-fat-arrow-right"/>
                        </svg>
                    </span>
                </NativeListener>
                <div className="menu-features-slider__slide js-slide is-active">
                    <div className="menu-features-slider__slide-text">
                        <svg viewBox="0 0 32 32"
                             className="menu-features-slider__slide-icon menu-features-slider__slide-icon--slide1">
                            <use xlinkHref="#icon-star"/>
                        </svg>
                        <b className="menu-features-slider__slide-highlight menu-features-slider__slide-highlight--slide1">
                            1. 精心挑选的最佳游戏。
                        </b>
                        从近期大作到永恒经典，这些都是我们精心挑选的伟大游戏，您绝对不应该错过。
                    </div>
                </div>
                <div className="menu-features-slider__slide js-slide">
                    <div className="menu-features-slider__slide-text">
                        <svg viewBox="0 0 32 32"
                             className="menu-features-slider__slide-icon menu-features-slider__slide-icon--slide2">
                            <use xlinkHref="#icon-heart"/>
                        </svg>
                        <b className="menu-features-slider__slide-highlight menu-features-slider__slide-highlight--slide2">
                            2. 顾客至上的宗旨。
                        </b>
                        致力于提供人性化的支持，最大化客户的利益。
                    </div>
                </div>
                <div className="menu-features-slider__slide js-slide">
                    <div className="menu-features-slider__slide-text">
                        <svg viewBox="0 0 32 32"
                             className="menu-features-slider__slide-icon menu-features-slider__slide-icon--slide3">
                            <use xlinkHref="#icon-hand-picked"/>
                        </svg>
                        <b className="menu-features-slider__slide-highlight menu-features-slider__slide-highlight--slide3">
                            3. 为玩家量身打造的平台。
                        </b>
                        我们的志向是要改变您购买游戏和玩游戏的方式，让您得到最大的自主选择权和轻松无忧的体验。
                    </div>
                </div>
                <div className="menu-features-slider__timer is-on js-timer">
                    <span className="menu-features-slider__timer-section js-timer-section"/>
                    <span className="menu-features-slider__timer-section js-timer-section"/>
                    <span className="menu-features-slider__timer-section js-timer-section"/>
                </div>
            </div>
        )
    }
}

export default translate()(FeatureSlider)