import React from 'react'
import PropTypes from 'prop-types'

import {getI18n, isPlayable, isDemoable} from '../../helper'
import i18n from '../../i18n'
import PlayButton from '../Button/Play'
import './Spot.css'

class Spot extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isHovered: false,
            isFading: false,
            isActive: props.active || false,
        }
    }

    setActive = (result) => this.setState({
        isActive: result
    })

    setFading = (result) => this.setState({
        isFading: result
    })

    activateSpot = result => this.setState({
        isHovered: result
    })

    onMouseEnter = (event) => {
        this.props.onMouseEnter()
        this.setState({
            isHovered: true
        })
    }

    onMouseLeave = (event) => {
        !this.isControlButton(event.relatedTarget) && this.setState({isHovered: false})
        this.props.onMouseLeave()
    }

    isControlButton = (relatedTargetEl) => {
        // console.log(relatedTargetEl.dataset)
        return !!relatedTargetEl && relatedTargetEl.classList && relatedTargetEl.classList.contains('big-spots__btn') && relatedTargetEl.dataset.spotType === this.props.type
    }

    removeFadingClass = (event) => {
        this.setFading(false)
    }

    render() {
        const {type, spot, active} = this.props
        return (
            <div
                className={`big-spot big-spot--${type}${type === 'large' ? ' big-spot--big' : ''}${active ? ' is-active' : ''}${this.state.isHovered ? ' is-hovered' : ''}${this.state.isFading ? ' is-fading' : ''}`}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onTransitionEnd={this.removeFadingClass}
            >
                {/* gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;goToLinkPromoSpot1&quot;, eventLabel:&quot;http://www.gog.com/promo/20180410_mount_and_blade&quot;}" */}
                <img
                    className="big-spot__img"
                    srcSet={`//abimg.sc172.com/spot/${spot.image}.jpg`}
                    alt=""
                />
                {type === 'promo' && <React.Fragment>
                    <div className="big-spot__text">
                        <h2 className="big-spot__title">
                            Series Promo
                            <strong>{getI18n(spot.title, i18n.language)}</strong>
                        </h2>
                        <p className="big-spot__discount" style={{color: "#a1d6ff"}}>-66%</p>
                        {/* gog-counter="1523642399" */}
                        <div style={{marginBottom: '2.5em'}}>
                            {/* ng-cloak */}
                            <strong className="big-spot__counter">
                                {/* ng-if="!counter.hasEnded" */}
                                <span>
                                {/* ng-if="counter.days >= 2" ng-bind="'&#039; + counter.days + &#039;d &#039; + counter.padded.hours + &#039; : &#039; + counter.padded.minutes + &#039; : &#039; + counter.padded.seconds + &#039;'" */}
                                    <span>
                                    2d 16 : 13 : 06
                                </span>
                                    {/* ng-if="counter.days < 2" ng-bind="'&#039; + counter.padded.hours48 + &#039; : &#039; + counter.padded.minutes + &#039; : &#039; + counter.padded.seconds + &#039;'" */}
                                    <span/>
                            </span>
                            </strong>
                            {/* ng-cloak ng-if="counter.hasEnded" */}
                            <span>This promo has expired</span>
                        </div>
                    </div>
                    <div className="big-spot__text" style={{left: 0, right: 0}}>
                        <div style={{minWidth: '3.4em'}} className={`big-spot__button play-btn spot-need${isDemoable(spot.product) ? ' play-btn--active' : ''}`}>
                            <PlayButton
                                mode={'demo'}
                                id={spot.product.id}
                                brand={spot.product.brand.code}
                                module={'SlotsPage'}
                                classes={['_clickable']}
                                title={getI18n(spot.product.name, i18n.language)}
                                isDisabled={!isDemoable(spot.product)}
                                textClasses={[]}
                            />
                        </div>
                        <div className={`big-spot__button play-btn spot-need${isPlayable(spot.product) ? ' play-btn--active' : ''}`}>
                            <PlayButton
                                mode={'play'}
                                id={spot.product.id}
                                brand={spot.product.brand.code}
                                module={'SlotsPage'}
                                classes={['play-btn__text']}
                                title={getI18n(spot.product.name, i18n.language)}
                                isDisabled={!isPlayable(spot.product)}
                                textClasses={['product-state__play']}
                            />
                        </div>
                    </div>  
                    <div className="hl"/>
                </React.Fragment>}
                {type === 'large' && <React.Fragment>
                    {/* gog-product="1127573289" ng-class="{ 'big-spot__text--free-product': product.price.isFree }" */}
                    <div className="big-spot__text--right big-spot__text product-row--has-card is-buyable">
                        {/* ng-show="product.price.isDiscounted" ng-bind="product.price.discountPercentage + '%'" */}
                        <p className="big-spot__discount price-text--discount ng-hide">0%</p>
                        {/* ng-class="{'is-owned': product.isOwned }" ng-click="productCtrl.addToCart()"
                             gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;addToCartBigSpot1&quot;, eventLabel:&quot;Banner Saga 3 Pre-Order&quot;}" */}
                        <div className="big-spot__button price-btn price-btn--active ng-hide">
                            {/* ng-show="product.inCart" */}
                            <span className="price-btn__text ng-hide">
                                <i className="ic icon-cart"/>
                            </span>
                            {/* ng-show="!product.inCart" */}
                            <span className="price-btn__text">
                                {/* ng-show="product.isOwned" */}
                                <span className="price-btn__text--owned ng-hide">owned</span>
                                <span className="big-spot__price">
                                    {/* ng-show="product.price.isFree" */}
                                    <span className="ng-hide">Free</span>
                                    {/* ng-show="!product.price.isFree" ng-bind="product.price.amount" */}
                                    <span>24.99</span>
                                </span>
                            </span>
                        </div>
                        <div style={{minWidth: '3.4em'}} className={`big-spot__button play-btn spot-need${isDemoable(spot.product) ? ' play-btn--active' : ''}`}>
                            <PlayButton
                                mode={'demo'}
                                id={spot.product.id}
                                brand={spot.product.brand.code}
                                module={'SlotsPage'}
                                classes={['_clickable']}
                                title={getI18n(spot.product.name, i18n.language)}
                                isDisabled={!isDemoable(spot.product)}
                                textClasses={[]}
                            />
                        </div>
                        <div className={`big-spot__button play-btn spot-need${isPlayable(spot.product) ? ' play-btn--active' : ''}`}>
                            <PlayButton
                                mode={'play'}
                                id={spot.product.id}
                                brand={spot.product.brand.code}
                                module={'SlotsPage'}
                                classes={['play-btn__text']}
                                title={getI18n(spot.product.name, i18n.language)}
                                isDisabled={!isPlayable(spot.product)}
                                textClasses={['product-state__play']}
                            />
                        </div>
                    </div>
                    <div className="big-spot__text--left big-spot__text">
                        <h2 className="big-spot__title">
                            <span className="big-spot__small ng-hide">Windows + Mac</span>
                            <strong>{getI18n(spot.title, i18n.language)}</strong>
                        </h2>
                    </div>
                    
                </React.Fragment>}
            </div>
        )
    }
}

Spot.propTypes = {
    type: PropTypes.oneOf(['promo', 'large']).isRequired,
    spot: PropTypes.object,
}

export default Spot