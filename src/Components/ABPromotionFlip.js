import React from 'react'
import PropTypes from 'prop-types'
import GoogleAnalytics from "react-ga"

import {getName, randomImgServer, toUnixTimestamp} from "../helper"
import ABCountdown from './ABCountdown'

/**
 * image size:
 * 749x160 1x, 2x
 * 919x160 1x, 2x
 * 1060x80 1x, 2x
 */
class ABPromotionFlip extends React.Component {
    state = {
        collapsed: !0,
    }

    title = getName(this.props.promotion.title, 'en-GB')

    onClick = () => {
        GoogleAnalytics.event({
            action: !this.state.collapsed ? 'Close' : 'Open',
            category: 'Promotion',
            label: 'promotion_banner - ' + this.title,
        })
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    showPromotion = () => {
        return this.props.currentCategory === 'ALL' || this.props.promotion.categories.indexOf(this.props.currentCategory) !== -1
    }

    buildImage = (banner, size) => {
        const server = '//abimg.sc172.com/promotion/'
        return server + banner + '_' + size + '.jpeg, ' + server + '_' + size + '@2x.jpeg 2x'
    }

    render() {
        const {promotion, locale} = this.props, {banner} = promotion
        const title = getName(promotion.title, locale)
        const content = getName(promotion.content, locale)

        return (
            <div className={`promo-item__container promo-item__container--3d promo-item__container--solo${this.state.collapsed ? ' is-collapsed' : ' is-expanded'}${this.showPromotion() ? '' : ' ng-hide'}`}>
                {/* gog-giveaway-social="winter_2017_giveaway" ng-class="{ 'is-flipped': giveaway.isClaimed }" gog-giveaway="winter_2017_giveaway" */}
                <div className={`promo-item__wrapper`}>
                    <div className={`promo-item promo-item__banner-giveaway-product is-buyable is-free`}>
                        {/*<div className="promo-item__flip-container promo-item__flip-container--back">*/}
                            {/*<picture className={`promo-item__picture promo-item__picture--primary promo-item__component-position promo-item__component-position--fill promo-item__component-position--z-bg`}>*/}
                                {/*<source media="(max-width:749px)" srcSet=""/>*/}
                                {/*<source media="(min-width:750px) and (max-width:919px)" srcSet=""/>*/}
                                {/*<source media="(min-width:920px)" srcSet=""/>*/}
                                {/*/!* gog-picture-fill="" *!/*/}
                                {/*<img className="promo-item__img promo-item__img--primary" alt="Oxenfree"/>*/}
                            {/*</picture>*/}
                            {/*<div className="promo-item__textual promo-item__component-position promo-item__component-position--center-center promo-item__component-position--no-pointer-event promo-item__component-position--z-bg">*/}
                                {/*<div className="promo-item__align-h-center promo-item__align-v-center">*/}
                                    {/*<h3 className="promo-item__title">Thanks! Oxenfree will appear in your account soon </h3>*/}
                                    {/*<h4 className="promo-item__description promo-item__description--short">Follow us on social media and never miss another giveaway </h4>*/}
                                    {/*<div className="promo-item__socials">*/}
                                        {/*<div className="fb-like"*/}
                                             {/*data-href=""*/}
                                             {/*data-layout="button_count"*/}
                                             {/*data-action="like"*/}
                                             {/*data-size="small"*/}
                                             {/*data-show-faces="false"*/}
                                             {/*data-share="false"*/}
                                        {/*/>*/}
                                        {/*<div id="fb-root"/>*/}
                                        {/*<a href=""*/}
                                           {/*className="twitter-follow-button"*/}
                                           {/*data-show-screen-name="false"*/}
                                           {/*data-show-count="false"/>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <div className="promo-item__flip-container promo-item__flip-container--front">
                            <picture className="promo-item__picture promo-item__picture--primary promo-item__component-position promo-item__component-position--fill promo-item__component-position--z-bg">
                                <source media="(max-width:749px)" srcSet={this.buildImage(banner, 749)}/>
                                <source media="(min-width:750px) and (max-width:919px)" srcSet={this.buildImage(banner, 919)}/>
                                <source media="(min-width:920px)" srcSet={this.buildImage(banner, 1060)}/>
                                {/* gog-picture-fill="" */}
                                <img className="promo-item__img promo-item__img--primary" alt={title}/>
                            </picture>
                            <a className="promo-item__lnk promo-item__component-position promo-item__component-position--fill _clickable" onClick={this.onClick}/>
                            <div className="promo-item__textual promo-item__component-position promo-item__component-position--title-description promo-item__component-position--no-pointer-event promo-item__component-position--z-bg">
                                <div className="promo-item__align-h-left">
                                    <h3 className="promo-item__title">{title}</h3>
                                    {this.props.promotion.period.to && <h4 className="promo-item__description promo-item__description--short">
                                        {/* gog-countdown="winter_2017_giveaway" data-countdown-timestamp="1513864799" */}
                                        <ABCountdown id={this.props.promotion.id} countdownTimestamp={toUnixTimestamp(this.props.promotion.period.to)}/>
                                    </h4>}
                                </div>
                            </div>
                            <div className="ultimate-price-holder promo-item__component-position promo-item__component-position--ultimate-price promo-item__component-position--z-fg">
                                <div className="ultimate-price">
                                    {/* ng-click="giveaway.claim()" ng-hide="giveaway.isExpired || giveaway.isClaimed" gog-analytics-event="[ 'Promo Element', 'Redeem', 'giveaway - Oxenfree' ]" */}
                                    <div className={`ultimate-price__btn`} onClick={this.onClick}>
                                        {/* ng-show="!giveaway.isClaimed && !giveaway.isExpired" */}
                                        <div className={``}>{this.props.buttonLabel}</div>
                                        {/* ng-show="giveaway.isClaimed && !giveaway.isExpired" */}
                                        <div className={`ng-hide`}>Claimed</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`promo-item__content cf`} dangerouslySetInnerHTML={{__html: content}}/>
                </div>
            </div>
        )
    }
}

ABPromotionFlip.propTypes = {
    promotion: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    currentCategory: PropTypes.oneOf([
        'ALL',
        'DEPOSIT',
        'SLOTS',
        'LIVE',
        'SPORTS',
        'LOTTERY',
        'REBATE',
    ]).isRequired,
}

export default ABPromotionFlip