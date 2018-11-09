import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {translate} from "react-i18next"
import Swipeable from 'react-swipeable'
import ReactDOM from 'react-dom'

import SpotActions from "../../Redux/SpotRedux"

import Blur from "./Blur"
import Control from "./Control"
import Spots from "./Spots"

import './spots.css'
import CssData from "../CssData"

const SPOTS = {
    large: [
        {
            image: '//images-3.gog.com/a1b0fcdd0d49558ead8e0b91ed1a8a0599c48d1fc163a5974f40ad61ffc2e38c_800.jpg , //images-3.gog.com/a1b0fcdd0d49558ead8e0b91ed1a8a0599c48d1fc163a5974f40ad61ffc2e38c.jpg 2x',
            blur: '//abimg.sc172.com/spot/13937f0432da5cc7b79fbed3016c16bb'
        },
        {
            image: '//images-2.gog.com/38b59bed6594aad09d09cd135c44fda6c9a008dba6531a88889e096c6a8cc36d_800.jpg , //images-2.gog.com/38b59bed6594aad09d09cd135c44fda6c9a008dba6531a88889e096c6a8cc36d.jpg 2x',
            blur: '//abimg.sc172.com/spot/bc66e5447d448b6ebc84c1acbd6922a6'
        },
        {
            image: '//images-1.gog.com/9ff3c3824ab15185b64024b3b737d2094784f4e659852e1f9ea4d468d28bfd22_800.jpg , //images-1.gog.com/9ff3c3824ab15185b64024b3b737d2094784f4e659852e1f9ea4d468d28bfd22.jpg 2x',
            blur: '//abimg.sc172.com/spot/09e071e4482f607f1ece8477a0443eb1'
        },
    ],
    promo: [
        {
            image: '//images-2.gog.com/eaee8d8e16de8d285dbce74b329f3cd160886141fb1d5ade08ecea448fb8c075_promo_240.jpg , //images-1.gog.com/eaee8d8e16de8d285dbce74b329f3cd160886141fb1d5ade08ecea448fb8c075_promo_480.jpg 2x'
        },
        {
            image: '//images-1.gog.com/320a86f43918e5361c8c7d20a55fcfbb08c24e6fa94d06a8a13b8ce9adb97fee_promo_240.jpg , //images-2.gog.com/320a86f43918e5361c8c7d20a55fcfbb08c24e6fa94d06a8a13b8ce9adb97fee_promo_480.jpg 2x'
        },
    ],
}

class SpotsContainer extends React.Component {
    constructor(props) {
        super(props)
        props.getSpot()
        this.state = {
            isAnimationOn: false,
            isRotatorNeeded: !!props.spot.data && !!props.spot.data.large && props.spot.data.large.length > 1,
            isRotatorActive: false,
            areSpotsEngagedElsewhere: false,
            isScrollingActive: false,
            distance: 0,
        }
    }

    componentDidMount() {
        // this.spotState = spotState
        this.setupAnimations()
        this.initRotation()
    }

    setupAnimations = () => {
        this.setState({isAnimationOn: true})
        // this.largeSpots.on("transitionend", this.removeFadingClass), this.promoSpots.on("transitionend", this.removeFadingClass), this.blurSpots.on("transitionend", this.removeFadingClass)
    }

    initRotation = () => {
        if (!this.state.isRotatorActive && this.state.isRotatorNeeded && this.isRotationEnabled()) {
            this.setState({isRotatorActive: true})
            this.unlockAllRotations()
            this.rotateSpots()
        }
    }

    isRotationEnabled = () => {
        return !(this.state.areSpotsEngagedElsewhere || this.large.isRotationPausedByUser && this.promo.isRotationPausedByUser)
    }

    unlockAllRotations = () => {
        this.large.unlockRotation()
        this.promo.unlockRotation()
    }

    lockAllRotations = () => {
        this.setState({isRotatorActive: false})
        this.large && this.large.lockRotation()
        this.promo && this.promo.lockRotation()
    }

    rotateSpots = () => {
        this.large.rotate()
        this.promo.rotate()
    }

    cssDataListener = (data) => {
        data.isRotatorActive ? this.unlockByOtherMechanism() : data.isRotatorActive ? void 0 : this.lockByOtherMechanism()
        this.setState({
            ...this.state,
            ...data,
        })
    }

    lockByOtherMechanism = () => {
        this.setState({
            areSpotsEngagedElsewhere: true,
        }, () => this.lockAllRotations())
    }

    unlockByOtherMechanism = () => {
        this.setState({
            areSpotsEngagedElsewhere: false,
        }, () => this.initRotation())
    }

    prevSpot = (type) => {
        !!this[type] && this[type].prevSpot()
    }

    nextSpot = (type) => {
        !!this[type] && this[type].nextSpot()
    }

    onLock = (type) => {
        !!this[type] && this[type].lockRotation()
    }

    onUnlock = (type, relatedEl) => {
        !!this[type] && this[type].unlockByUser()
        !!this[type] && !relatedEl.parentNode.classList.contains('big-spot--' + type) && this[type].deactivate()
    }

    swipingLeft = (e, absX) => {
        const containerWidth = ReactDOM.findDOMNode(this.swipeContainer).getBoundingClientRect().width,
            contentWidth = (ReactDOM.findDOMNode(this.large).getBoundingClientRect().width+5) * SPOTS.large.length + (ReactDOM.findDOMNode(this.promo).getBoundingClientRect().width+5) * this.props.spot.data.promo.length - 5
        const distance = this.state.distance-absX < containerWidth - contentWidth ? containerWidth - contentWidth : this.state.distance-absX
        if (distance !== this.state.distance) {
            this.setState({
                distance: distance,
            })
        }
    }

    swipingRight = (e, absX) => {
        const distance = this.state.distance + absX > 0 ? 0 : this.state.distance + absX
        if (distance !== this.state.distance) {
            this.setState({
                distance: distance,
            })
        }
    }

    onTap = e => e.preventDefault()

    render() {
        const {t, spot} = this.props
        return (
            <React.Fragment>
                {spot.data && spot.data.large && spot.data.large.length && <Blur
                    ref={ref => this.blurSpots = ref}
                    spots={spot.data.large}
                />}
                <section style={{minHeight: '174px'}} className={`spots _spinner${!spot.data && spot.fetching ? ' is-spinning' : ''}`}>
                    <section className="container" ref={r => this.swipeContainer = r}>
                        <div className="all-spots">
                            <Swipeable
                                className="big-spots"
                                style={{
                                    WebkitTransform: 'translateX('+this.state.distance+'px)',
                                    MozTransform: 'translateX('+this.state.distance+'px)',
                                    msTransform: 'translateX('+this.state.distance+'px)',
                                    transform: 'translateX('+this.state.distance+'px)',
                                }}
                                onSwipingLeft={this.swipingLeft}
                                onSwipingRight={this.swipingRight}
                                preventDefaultTouchmoveEvent
                                stopPropagation
                                delta={10}
                                onTap={this.onTap}
                                flickThreshold={0.1}
                                disabled={!this.state.isScrollingActive}
                            >
                                <CssData listener={this.cssDataListener}/>
                                <div className="big-spots__header big-spots__header--promo">
                                    SPECIAL OFFERS
                                </div>
                                {!!spot.data && !!spot.data.promo && <Spots
                                    type={'promo'}
                                    spots={spot.data.promo}
                                    switchTime={5e3}
                                    delay={400}
                                    ref={ref => this.promo = ref}
                                />}
                                {/* end small spots */}
                                <div className="big-spots__header">
                                    Featured
                                </div>
                                {
                                    !!spot.data && !!spot.data.large &&
                                    <Spots
                                        type={'large'}
                                        spots={spot.data.large}
                                        switchTime={5e3}
                                        blur={this.blurSpots}
                                        ref={ref => this.large = ref}
                                    />
                                }
                                {/* end big spots */}
                                {!!spot.data && !!spot.data.large && <Control
                                    type={'large'}
                                    onPrev={this.prevSpot}
                                    onNext={this.nextSpot}
                                    hasPromo={!!SPOTS.promo}
                                    onLock={this.onLock}
                                    onUnlock={this.onUnlock}
                                />}
                                {!!spot.data && !!spot.data.promo && <Control
                                    type={'promo'}
                                    onPrev={this.prevSpot}
                                    onNext={this.nextSpot}
                                    hasPromo={true}
                                    onLock={this.onLock}
                                    onUnlock={this.onUnlock}
                                />}
                            </Swipeable>
                        </div>
                    </section>
                </section>
            </React.Fragment>
        )
    }
}

SpotsContainer.propTypes = {
    spot: PropTypes.object.isRequired,
    getSpot: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        spot: state.spot,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getSpot: () => dispatch(SpotActions.spotRequest()),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(SpotsContainer))