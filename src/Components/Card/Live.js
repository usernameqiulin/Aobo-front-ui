import React from 'react'
import PropTypes from 'prop-types'
import './Live.css'

class Live extends React.Component {

    render() {
        return (
            <div className="live-game__container">
                <div className="live-game-item live-game-item__highlight is-buyable is-discounted is-discount-colored-level-2 is-badged">
                    <picture className="live-game-item__picture live-game-item__picture--primary live-game-item__component-position live-game-item__component-position--fill live-game-item__component-position--z-bg ">
                        <source media="(max-width:340px)"
                                srcSet="//images-4.gog.com/7e76cc2732c61941527693f43bc013ee970d28e6b3b344dfdfd46c05b7ec81f4_product_quartet_250.jpg , //images-4.gog.com/7e76cc2732c61941527693f43bc013ee970d28e6b3b344dfdfd46c05b7ec81f4_product_quartet_250_2x.jpg 2x"/>
                        <source media="(min-width:421px) and (max-width:563px)"
                                srcSet="//images-4.gog.com/7e76cc2732c61941527693f43bc013ee970d28e6b3b344dfdfd46c05b7ec81f4_552.jpg , //images-4.gog.com/7e76cc2732c61941527693f43bc013ee970d28e6b3b344dfdfd46c05b7ec81f4_1104.jpg 2x"/>
                        <source media="(min-width:341px) and (max-width:420px), (min-width:564px) and (max-width:893px)"
                                srcSet="//images-4.gog.com/7e76cc2732c61941527693f43bc013ee970d28e6b3b344dfdfd46c05b7ec81f4_420.jpg , //images-4.gog.com/7e76cc2732c61941527693f43bc013ee970d28e6b3b344dfdfd46c05b7ec81f4_840.jpg 2x"/>
                        <source media="(min-width:894px)"
                                srcSet="//images-4.gog.com/7e76cc2732c61941527693f43bc013ee970d28e6b3b344dfdfd46c05b7ec81f4_552.jpg , //images-4.gog.com/7e76cc2732c61941527693f43bc013ee970d28e6b3b344dfdfd46c05b7ec81f4_1104.jpg 2x"/>
                        {/* gog-picture-fill */}
                        <img className="live-game-item__img live-game-item__img--primary " alt="Divinity: Original Sin 2"/>
                    </picture>
                    {/* gog-analytics-event='[ "Promo Element", "Click", "highlight_quartet - Divinity: Original Sin 2" ]'*/}
                    <a className="live-game-item__lnk live-game-item__component-position live-game-item__component-position--fill" href="###"/>

                    <div className="badge-generic__container live-game-item__component-position live-game-item__component-position--left-top-off-h badge-generic__container--initial-animation">
                        {/* 收藏: if logged in - if in favorites else favorite button */}
                        <div className="badge-generic__badge badge-generic__badge--wishlisted badge-generic__badge--slide">
                            <i className="ic icon-heart badge__icon badge__icon--prefix"/>
                            <div className="badge-generic__slider">
                                <span className="badge-generic__text">
                                    已加入愿望单
                                    <i className="ic icon-heart badge__icon badge__icon--postfix"/>
                                </span>
                            </div>
                        </div>
                        <div className=" badge-generic__badge badge-generic__badge--custom badge-generic__badge--slide js-product-badge">
                            <i className="ic badge__icon badge__icon--prefix"/>
                            <div className="badge-generic__slider">
                                <span className="badge-generic__text">
                                    <span className="js-product-badge-text">新游戏</span>
                                    <i className="ic badge__icon badge__icon--postfix"/>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="product-row__os-support live-game-item__component-position live-game-item__component-position--left-bottom promo-item__component-position--no-pointer-event has-win-support"/>
                    <div className="ultimate-price-holder live-game-item__component-position live-game-item__component-position--right-bottom live-game-item__component-position--z-fg">
                        <div className="ultimate-price ">
                            <div className="ultimate-price__discount colored-discount js-colored-discount ">
                                -<span>10</span>%
                            </div>
                            {/* ng-className="{ 'is-in-cart': product.inCart }"
                                 ng-click="!product.inCart && productCtrl.addToCart()"
                                 gog-analytics-event='[ "Promo Element", "Add to cart", "highlight_quartet - Divinity: Original Sin 2" ]' */}
                            <div className="ultimate-price__btn ">
                                <div className="ultimate-price__in-cart">
                                    <i className="ic icon-cart"/>
                                </div>
                                <div className="ultimate-price__main-price">
                                    {/* ng-bind="product.price.amount" */}
                                    <span className="_price ">40.49</span>
                                </div>
                                <div className="ultimate-price__buy-now-label">现在购买</div>
                                <div className="ultimate-price__preorder-label">预购</div>
                                <div className="ultimate-price__tba-label">待定</div>
                                <div className="ultimate-price__owned-label">已拥有</div>
                                <div className="ultimate-price__free-label">免费</div>
                                <div className="ultimate-price__old-price">
                                    {/* ng-bind="product.price.baseAmount" */}
                                    <span className="_price ">44.99</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Live.propTypes = {
    game: PropTypes.object.isRequired,
}
export default Live