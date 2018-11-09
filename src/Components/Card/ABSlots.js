import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import i18n from '../../i18n'

class ABSlots extends React.Component {

    render() {
        const { t, game } = this.props

        return (
            <div className="product-row-wrapper">
                <div className={`product-state-holder product-row product-row--has-card${game.buyable ? ' is-buyable' : ''}${game.price.isDiscounted ? ' is-discounted' : ''}`}>
                    <div className="product-row__price product-row__alignment">
                        {game.customAttributes.customPriceButtonVariant === 'join' &&
                        <a className="product-state__price-btn price-btn price-btn--active ng-cloak">
                            <span className="price-btn__text">
                                <span className="price-btn__text--owned product-state__is-owned">owned</span>
                                <span className="product-state__is-free">Free</span>
                                <span className="product-state__price">
                                    <span className="hide-on-not-owned">owned</span>
                                    <span className="product-state__price hide-on-owned">Free</span>
                                </span>
                            </span>
                        </a>}
                        {/* gog-track-event="{event:'addToCart',wayAddToCart:'Price'}" ng-class="{'price-btn--in-cart' : product.inCart}" */}
                        <div className={`product-state__price-btn price-btn price-btn--active ${game.price.isFree ? 'price-btn--free' : ''} ${game.customAttributes.customPriceButtonVariant === 'join' ? 'ng-hide' : ''}`}>
                            <span className="price-btn__text ">
                                <span className="product-status__in-cart">
                                    <i className="ic icon-cart"/>
                                </span>
                                <span className="product-state__is-tba">TBA</span>
                                <span className="price-btn__text--owned product-state__is-owned">owned</span>
                                <span className="product-state__is-free">Free</span>
                                <span className="_price product-state__price">{game.price.amount}</span>
                            </span>
                        </div>
                    </div>
                    <div className="product-row__link">
                        <div className="product-row__picture">
                            <img className="product-row__img" srcSet={game.image + '_196.jpg, ' + game.image + '_392.jpg 2x'}/>
                        </div>
                        <div className="product-row__discount product-row__alignment product-state__discount">
                            <span className="price-text--discount">
                                <span>{game.price.discountPercentage}</span>%
                            </span>
                        </div>
                        {/* ng-if="!product.price.isDiscounted" */}
                        {!game.price.isDiscounted && <div className="product-row__discount product-row__alignment"/>}
                        <div className="product-row__text">
                            <div className="product-row__content">
                                <div className="product-row__content-in">
                                    <div className="product-row__title">
                                        {!game.isComingSoon && !game.isWishlisted && !game.isInDevelopment &&
                                        <div className="product-title">
                                            <span className="product-title__text">{game.title}</span>
                                        </div>}
                                        {/* ng-if="product.isComingSoon || product.isWishlisted || product.isInDevelopment" ng-cloak
                                             gog-labeled-title='{"maxLineNumber": 2,"title": "{{ ::product.title }}"}' */}
                                        {(game.isComingSoon || game.isWishlisted || game.isInDevelopment) &&
                                        <div className="product-title product-title--flagged">
                                            <span className="product-title__text">{game.title}</span>
                                            <span className="product-title__flags">
                                                {game.isWishlisted && <i className="_product-flag product-title__icon ic icon-heart"/>}
                                                {game.isComingSoon && <span className="_product-flag product-title__flag product-title__flag--soon">{t('soon')}</span>}
                                                {game.isInDevelopment && <span className="_product-flag product-title__flag product-title__flag--in-dev">{t('in_dev')}</span>}
                                            </span>
                                        </div>}
                                    </div>
                                    <div className="product-row__info product-row__alignment">
                                        <span className="product-row__rating js-star-rating star-rating"/>
                                        {game.isGame &&
                                        <span className="product-row__os">
                                            <i className="ic icon-flash"/>
                                            {game.worksOn.Windows && <i className="ic icon-win"/>}
                                            {game.worksOn.Mac && <i className="ic icon-mac"/>}
                                            {game.worksOn.Linux && <i className="ic icon-android"/>}
                                        </span>}
                                        {game.isMovie && <span className="product-row__os product-row__media">MOVIE</span>}
                                        {/* ng-if="product.releaseDate" gog-release-date='{"date": {{ ::product.releaseDate }},"visibilityDate": {{::product.salesVisibility.from }}}' */}
                                        {game.releaseDate && <span className="product-row__date">2017</span>}
                                        {game.category && <span className="product-row__genre">{game.category}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
ABSlots.propTypes = {
    game: PropTypes.object.isRequired,
}

export default translate()(ABSlots)