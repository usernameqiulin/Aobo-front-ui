import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'
import {isMobile} from "../../../helper"

class CartMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    _toggle = (event) => {
        // console.log(event.currentTarget)
        // event.stopPropagation()
        this.props.toggle(event)
    }

    _mouseEnter = (event) => {
        !isMobile() && this.props.cancelTimeout('cart');
    }

    _mouseLeave = (event) => {
        !isMobile() && this.props.mouseLeave(event);
    }

    render() {
        return (
            // ng-controller="menuCartCtrl as cart" hook-test="menuCart"
            <div className="menu-item menu-cart has-submenu js-menu-cart">
                {/* ng-click="menu.toggle($event, 'cart', true)" ng-mouseleave="menu.hide($event, 'cart', 600)" ng-mouseenter="menu.cancelTimeout('cart')" ng-class="{ 'is-notifying': cart.itemAddedAnimation }" hook-test="menuCartButton" */}
                <a className="menu-link menu-link--icon menu-link--cart"
                   onClick={this._toggle}
                   onMouseLeave={this._mouseLeave}
                   onMouseOver={this._mouseEnter}
                >
                    <svg viewBox="0 0 32 32" className="menu-icon-svg"><use xlinkHref="#icon-cart2"/></svg>
                    {/* ng-show="cart.cartCount <= 99" ng-bind="cart.cartCount" ng-class="{ 'is-highlighted': cart.itemAdded }" hook-test="cartCounter" */}
                    <span className="menu-item__count menu-item__count--cart">1</span>
                    {/* ng-show="cart.cartCount > 99" */}
                    <span className="menu-item__count menu-item__count--cart ng-hide">99+</span>
                    {/* ng-class="{'menu-triangle--others': !cart.isCartEmpty}" */}
                    <span className="menu-triangle menu-triangle--centered menu-triangle--others"/>
                </a>
                {/* ng-mouseleave="menu.hideOnMouseleave($event, 'cart', 600)" ng-mouseenter="menu.cancelTimeout('cart')" */}
                <div className="menu-submenu menu-cart__submenu" onMouseOver={this._mouseEnter} onMouseLeave={this._mouseLeave}>
                    {/* ng-hide="cart.isCartEmpty" */}
                    <div className="menu-header menu-header-cart">
                        {/* ng-click="cart.goToCheckout()" ng-class="{ 'is-spinning': cart.isSpinnerVisible }" ng-show="!cart.isCartEmpty" hook-test="cartCheckoutNow" */}
                        <a className="menu-cart__btn menu-btn menu-btn--green">
                            进入结算
                        </a>
                        {/* ng-hide="cart.isSpinnerVisible" */}
                        <div className="menu-cart-items">
                            <span className="menu-header__label hide-in-lite-mode">您的购物车</span>
                            {/* ng-show="cart.isCartEmpty" */}
                            <span className="menu-header__label hide-in-normal-mode hide-in-grouped-mode ng-hide">您的购物车</span>
                            {/* ng-show="cart.isCartEmpty" */}
                            <span className="menu-header__items ng-hide">
                                现在是空的。
                            </span>
                            {/* ng-show="!cart.isCartEmpty" */}
                            <span className="menu-header__label hide-in-normal-mode hide-in-grouped-mode">
                                {/* ng-bind="cart.cartCount" */}
                                <span>1</span>&nbsp;您购物车里的商品
                                {/*<ng-pluralize count="cart.cartCount" when="{*/}
                                    {/*'one' : '您购物车里的物品',*/}
                                    {/*'few' : '您购物车里的物品',*/}
                                    {/*'many' : '您购物车中的物品',*/}
                                    {/*'other': '您购物车里的商品'*/}
                                 {/*}">您购物车里的商品</ng-pluralize>*/}
                            </span>
                            {/* ng-show="!cart.isCartEmpty" */}
                            <span className="menu-header__items hide-in-lite-mode">
                                {/* ng-bind="cart.cartCount" */}
                                <span>1</span>&nbsp;物品_添加了的_其他
                                {/*<ng-pluralize count="cart.cartCount" when="{*/}
                                    {/*'one' : '物品_添加了的_其他',*/}
                                    {/*'few' : '物品_添加了的_其他',*/}
                                    {/*'many' : '物品_添加了的_其他',*/}
                                    {/*'other': '物品_添加了的_其他'*/}
                                 {/*}">物品_添加了的_其他</ng-pluralize>*/}
                            </span>
                        </div>
                        {/* ng-bind="cart.cartTotalPrice.amount" ng-hide="cart.isSpinnerVisible || cart.cartTotalPrice.isZero || cart.isCartEmpty" hook-test="cartTotalPrice" */}
                        <div className="menu-cart__total-price _price">49.99</div>
                    </div>
                    {/* ng-show="cart.isCartEmpty" */}
                    <div className="menu-cart-empty ng-hide">
                        <div className="menu-cart-empty__header menu-uppercase">
                            <svg viewBox="0 0 32 32" className="menu-cart-empty__header-icon"><use xlinkHref="#icon-cart2"/></svg> 您的购物车是空的
                        </div>
                        <hr className="menu-cart-empty__line"/>
                        <div className="menu-cart-empty__description">
                            发现优质的游戏和优惠活动
                        </div>
                        <a className="menu-btn menu-cart-empty__btn menu-uppercase" href="/games">
                            浏览畅销商品
                        </a>
                        {/* ng-show="cart.isWishlistButtonVisible" */}
                        <a className="menu-btn menu-cart-empty__btn menu-cart-empty__btn--wishlist menu-uppercase" href="/account/wishlist">
                            您的愿望单
                        </a>
                    </div>
                    <div className="menu-cart__products-list">
                        {/* gog-menu-scrollbar="" gog-menu-scrollbar-refresh="1" */}
                        <div className=" _gog-menu-scrollbar">
                            <div className="js-gog-scrollbar-wrapper _gog-menu-scrollbar__wrapper">
                                <div className="js-gog-scrollbar-content _gog-menu-scrollbar__content menu-cart__content">
                                    {/* ngRepeat: productId in cart.products */}
                                    {/* ng-repeat="productId in cart.products" ng-class="{'is-first': $first,'is-removed': productCtrl.toBeRemoved}" gog-product="1419313792" gog-product-repository="menuProducts" gog-menu-cart-item-swipe="" */}
                                    <div className="menu-product menu-cart-item menu-product-state-holder js-focusable-element product-row--has-card is-buyable is-in-cart is-first">
                                        <a className="menu-product__link" href="/game/spellforce_iii">
                                            {/* ng-show="!product.isWishlisted" ng-click="productCtrl.removeFromCart(); productCtrl.addToWishlist(); $event.preventDefault(); menu.cancelTimeout('cart')" hook-test="cartWishlist" */}
                                            <span className={`menu-cart-item__wishlist js-action-left ng-hide`}>
                                                <svg viewBox="0 0 32 32" className="menu-cart-item__wishlist-icon"><use xlinkHref="#icon-wishlist-menu"/></svg>
                                                愿望单
                                            </span>
                                            {/* ng-show="product.isWishlisted" */}
                                            <span className="menu-cart-item__wishlist menu-cart-item__wishlist--disabled ng-hide">已加入愿望单</span>
                                            <img className="menu-product__image menu-cart-item__image"
                                                 srcSet="https://images-3.gog.com/e5b889ddcd0acec729ed30a82b3fd525a22e327a2bcf0f335a5bd3f6d6c67e11_100.jpg ,https://images-3.gog.com/e5b889ddcd0acec729ed30a82b3fd525a22e327a2bcf0f335a5bd3f6d6c67e11_200.jpg 2x"
                                            />
                                            <div className="menu-product__content">
                                                <div className="menu-product__content-in">
                                                    {/* ng-attr-title="{{ product.title }}" ng-bind="product.title" */}
                                                    <div className="menu-product__title menu-cart-item__title" title="SpellForce 3">SpellForce 3</div>
                                                    <div className="menu-cart-item__options">
                                                        {/* ng-click="productCtrl.removeFromCart(); $event.preventDefault(); " hook-test="cartRemove" */}
                                                        <span className="menu-cart-option">删除</span>
                                                        {/* ng-show="!product.isOwned &amp;&amp; !product.isWishlisted" ng-click="productCtrl.removeFromCart(); productCtrl.addToWishlist(); $event.preventDefault(); " */}
                                                        <span className="menu-cart-option menu-cart-option--add-to-wishlist">移动到愿望单</span>
                                                        {/* ng-show="!product.isOwned &amp;&amp; product.isWishlisted" */}
                                                        <span className="menu-cart-option menu-cart-option--wishlisted ng-hide">
                                                            <svg viewBox="0 0 32 32" className="menu-cart-option__icon menu-cart-option__icon--wishlisted"><use xlinkHref="#icon-wishlisted2"/></svg>
                                                            已加入愿望单
                                                        </span>
                                                        {/* ng-show="product.isOwned" */}
                                                        <span className="menu-cart-option menu-cart-option--owned ng-hide">
                                                            <svg viewBox="0 0 32 32" className="menu-cart-option__icon menu-cart-option__icon--owned"><use xlinkHref="#icon-owned"/></svg>
                                                            已拥有
                                                        </span>
                                                    </div>
                                                    <div className="menu-product__discount menu-cart-item__discount product-state__discount">
                                                        <span className="menu-product__discount-text">
                                                            {/* ng-bind="product.price.discountPercentage" */}
                                                            <span>0</span>%
                                                        </span>
                                                    </div>
                                                    <div className="menu-cart-item__price">
                                                        {/* ng-show="product.price.isFree" */}
                                                        <span className="price-text ng-hide">免费</span>
                                                        {/* ng-show="!product.price.isFree" ng-bind="product.price.amount" */}
                                                        <span className="_price">49.99</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                        {/* ng-click="productCtrl.removeFromCart(); $event.preventDefault();" */}
                                        <a className="menu-cart-item__remove js-action-right">
                                            删除
                                            <svg viewBox="0 0 32 32" className="menu-cart-item__remove-icon"><use xlinkHref="#icon-remove-menu"/></svg>
                                        </a>
                                    </div>
                                    {/* end ngRepeat: productId in cart.products */}
                                    <div className="js-gog-scrollbar-bar _gog-menu-scrollbar__bar is-disabled"/>
                                </div>
                            </div>
                            <span className="menu__list-shadow"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CartMenu.propTypes = {

}

export default translate()(CartMenu)
