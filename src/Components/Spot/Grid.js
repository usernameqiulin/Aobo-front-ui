import React from 'react'
import PropTypes from 'prop-types'

class Grid extends React.Component {
    render() {
        return (
            <div gog-spots-scroll="" gog-css-data="" className="small-spots small-spots--grid">
                <var className="css-data-holder"/>
                <div className="small-spots-container cf">
                    <div className="small-spots-in">
                        <div
                            className="product-row-wrapper"><!-- ngIf: frontpage.smallSpotsLimit >= 1 -->
                            <div
                                className="product-state-holder product-row product-row--grid product-row--not-small product-row--has-card is-discounted is-buyable"
                                gog-product="1916896012" gog-spot=""
                                ng-if="frontpage.smallSpotsLimit >= 1"
                                style="user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); touch-action: none;">
                                <div
                                    className="product-row__price product-row__alignment"><!-- ngIf: ::product.customAttributes.customPriceButtonVariant == 'join' -->
                                    <div className="product-state__price-btn price-btn

                  price-btn--active" ng-click="productCtrl.addToCart()"
                                         gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;addToCartSmallSpot1&quot;, eventLabel:&quot;INSIDE&quot;}"
                                         ng-class="{
                 	'price-btn--in-cart' : product.inCart,
                 	'price-btn--free': product.price.isFree
                 }" ng-hide="::product.customAttributes.customPriceButtonVariant == 'join'"><span
                                        className="price-btn__text "><span
                                        className="product-status__in-cart"><i
                                        className="ic icon-cart"></i></span><span
                                        className="product-state__is-tba">
                        TBA                    </span><span className="price-btn__text--owned product-state__is-owned">
						owned					</span><span className="product-state__is-free">
						Free					</span><span className="_price product-state__price"
                                                             ng-bind="product.price.amount">11.99</span></span></div>
                                </div>
                                <a ng-href="/game/inside" className="product-row__link"
                                   gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;goToLinkSmallSpot1&quot;, eventLabel:&quot;INSIDE&quot;}"
                                   href="/game/inside">
                                    <div className="product-row__picture"><img
                                        className="product-row__img"
                                        srcSet="//images-4.gog.com/cde8b43b33ac15046a6969a59ddf5dd87ada2524ce0db3c6f721fff44308df9b_196.jpg , //images-4.gog.com/cde8b43b33ac15046a6969a59ddf5dd87ada2524ce0db3c6f721fff44308df9b_392.jpg 2x"
                                        alt="INSIDE"/></div>
                                    <div
                                        className="product-row__discount product-row__alignment product-state__discount">
                                                        <span className="price-text--discount"><span
                                                            ng-bind="product.price.discountPercentage">40</span>%</span>
                                    </div>
                                    <div className="product-row__text">
                                        <div className="product-row__content">
                                            <div className="product-row__content-in">
                                                <div
                                                    className="product-row__title"><!-- ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment -->
                                                    <div className="product-title"
                                                         ng-if="!product.isComingSoon &amp;&amp; !product.isWishlisted &amp;&amp; !product.isInDevelopment">
                                                                        <span className="product-title__text"
                                                                              ng-bind="::product.title">INSIDE</span>
                                                    </div>
                                                    <!-- end ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment --><!-- ngIf: product.isComingSoon || product.isWishlisted || product.isInDevelopment -->
                                                </div>
                                                <div
                                                    className="product-row__info product-row__alignment"><!-- ngIf: ::product.isGame --><span
                                                    className="product-row__os"
                                                    ng-if="::product.isGame"><!-- ngIf: ::product.worksOn.Windows --><i
                                                    className="ic icon-win"
                                                    ng-if="::product.worksOn.Windows"></i><!-- end ngIf: ::product.worksOn.Windows --></span><!-- end ngIf: ::product.isGame --><!-- ngIf: product.releaseDate --><span
                                                    ng-if="product.releaseDate"
                                                    className="product-row__date" gog-release-date="{
                                            &quot;date&quot;: 1467147600,
                                            &quot;visibilityDate&quot;: 1479811500
                                        }">2016</span><!-- end ngIf: product.releaseDate --><!-- ngIf: ::product.category --><span
                                                    ng-if="::product.category"
                                                    className="product-row__genre"
                                                    ng-bind="::product.category">Adventure</span><!-- end ngIf: ::product.category -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a></div>
                            <!-- end ngIf: frontpage.smallSpotsLimit >= 1 --></div>
                        <!-- wrapper -->
                        <div
                            className="product-row-wrapper"><!-- ngIf: frontpage.smallSpotsLimit >= 2 -->
                            <div
                                className="product-state-holder product-row product-row--grid product-row--not-small product-row--has-card is-discounted is-buyable"
                                gog-product="1439487606" gog-spot=""
                                ng-if="frontpage.smallSpotsLimit >= 2"
                                style="user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); touch-action: none;">
                                <div
                                    className="product-row__price product-row__alignment"><!-- ngIf: ::product.customAttributes.customPriceButtonVariant == 'join' -->
                                    <div className="product-state__price-btn price-btn

                  price-btn--active" ng-click="productCtrl.addToCart()"
                                         gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;addToCartSmallSpot2&quot;, eventLabel:&quot;SOMA&quot;}"
                                         ng-class="{
                 	'price-btn--in-cart' : product.inCart,
                 	'price-btn--free': product.price.isFree
                 }" ng-hide="::product.customAttributes.customPriceButtonVariant == 'join'"><span
                                        className="price-btn__text "><span
                                        className="product-status__in-cart"><i
                                        className="ic icon-cart"></i></span><span
                                        className="product-state__is-tba">
                        TBA                    </span><span className="price-btn__text--owned product-state__is-owned">
						owned					</span><span className="product-state__is-free">
						Free					</span><span className="_price product-state__price"
                                                             ng-bind="product.price.amount">7.49</span></span></div>
                                </div>
                                <a ng-href="/game/soma" className="product-row__link"
                                   gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;goToLinkSmallSpot2&quot;, eventLabel:&quot;SOMA&quot;}"
                                   href="/game/soma">
                                    <div className="product-row__picture"><img
                                        className="product-row__img"
                                        srcSet="//images-3.gog.com/04171b58c59c02140ce3327a3f769b8f06b2c948949331afa17130fd98f26605_196.jpg , //images-3.gog.com/04171b58c59c02140ce3327a3f769b8f06b2c948949331afa17130fd98f26605_392.jpg 2x"
                                        alt="SOMA"/></div>
                                    <div
                                        className="product-row__discount product-row__alignment product-state__discount">
                                                        <span className="price-text--discount"><span
                                                            ng-bind="product.price.discountPercentage">75</span>%</span>
                                    </div>
                                    <div className="product-row__text">
                                        <div className="product-row__content">
                                            <div className="product-row__content-in">
                                                <div
                                                    className="product-row__title"><!-- ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment -->
                                                    <div className="product-title"
                                                         ng-if="!product.isComingSoon &amp;&amp; !product.isWishlisted &amp;&amp; !product.isInDevelopment">
                                                                        <span className="product-title__text"
                                                                              ng-bind="::product.title">SOMA</span>
                                                    </div>
                                                    <!-- end ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment --><!-- ngIf: product.isComingSoon || product.isWishlisted || product.isInDevelopment -->
                                                </div>
                                                <div
                                                    className="product-row__info product-row__alignment"><!-- ngIf: ::product.isGame --><span
                                                    className="product-row__os"
                                                    ng-if="::product.isGame"><!-- ngIf: ::product.worksOn.Windows --><i
                                                    className="ic icon-win"
                                                    ng-if="::product.worksOn.Windows"></i><!-- end ngIf: ::product.worksOn.Windows --><!-- ngIf: ::product.worksOn.Mac --><i
                                                    className="ic icon-mac"
                                                    ng-if="::product.worksOn.Mac"></i><!-- end ngIf: ::product.worksOn.Mac --><!-- ngIf: ::product.worksOn.Linux --><i
                                                    className="ic icon-linux"
                                                    ng-if="::product.worksOn.Linux"></i><!-- end ngIf: ::product.worksOn.Linux --></span><!-- end ngIf: ::product.isGame --><!-- ngIf: product.releaseDate --><span
                                                    ng-if="product.releaseDate"
                                                    className="product-row__date" gog-release-date="{
                                            &quot;date&quot;: 1442869200,
                                            &quot;visibilityDate&quot;: 1442904600
                                        }">2015</span><!-- end ngIf: product.releaseDate --><!-- ngIf: ::product.category --><span
                                                    ng-if="::product.category"
                                                    className="product-row__genre"
                                                    ng-bind="::product.category">Adventure</span><!-- end ngIf: ::product.category -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a></div>
                            <!-- end ngIf: frontpage.smallSpotsLimit >= 2 --></div>
                        <!-- wrapper -->
                        <div
                            className="product-row-wrapper"><!-- ngIf: frontpage.smallSpotsLimit >= 3 -->
                            <div
                                className="product-state-holder product-row product-row--grid product-row--not-small product-row--has-card is-discounted is-buyable"
                                gog-product="1449856523" gog-spot=""
                                ng-if="frontpage.smallSpotsLimit >= 3"
                                style="user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); touch-action: none;">
                                <div
                                    className="product-row__price product-row__alignment"><!-- ngIf: ::product.customAttributes.customPriceButtonVariant == 'join' -->
                                    <div className="product-state__price-btn price-btn

                  price-btn--active" ng-click="productCtrl.addToCart()"
                                         gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;addToCartSmallSpot3&quot;, eventLabel:&quot;>observer_&quot;}"
                                         ng-class="{
                 	'price-btn--in-cart' : product.inCart,
                 	'price-btn--free': product.price.isFree
                 }" ng-hide="::product.customAttributes.customPriceButtonVariant == 'join'"><span
                                        className="price-btn__text "><span
                                        className="product-status__in-cart"><i
                                        className="ic icon-cart"></i></span><span
                                        className="product-state__is-tba">
                        TBA                    </span><span className="price-btn__text--owned product-state__is-owned">
						owned					</span><span className="product-state__is-free">
						Free					</span><span className="_price product-state__price"
                                                             ng-bind="product.price.amount">17.99</span></span></div>
                                </div>
                                <a ng-href="/game/observer" className="product-row__link"
                                   gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;goToLinkSmallSpot3&quot;, eventLabel:&quot;>observer_&quot;}"
                                   href="/game/observer">
                                    <div className="product-row__picture"><img
                                        className="product-row__img"
                                        srcSet="//images-3.gog.com/500910d581534b6a81ac7551b04388d8f037d8dcfb4f8d7d3d55fa0cdaa35870_196.jpg , //images-3.gog.com/500910d581534b6a81ac7551b04388d8f037d8dcfb4f8d7d3d55fa0cdaa35870_392.jpg 2x"
                                        alt=">observer_"/></div>
                                    <div
                                        className="product-row__discount product-row__alignment product-state__discount">
                                                        <span className="price-text--discount"><span
                                                            ng-bind="product.price.discountPercentage">40</span>%</span>
                                    </div>
                                    <div className="product-row__text">
                                        <div className="product-row__content">
                                            <div className="product-row__content-in">
                                                <div
                                                    className="product-row__title"><!-- ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment -->
                                                    <div className="product-title"
                                                         ng-if="!product.isComingSoon &amp;&amp; !product.isWishlisted &amp;&amp; !product.isInDevelopment">
                                                                        <span className="product-title__text"
                                                                              ng-bind="::product.title">&gt;observer_</span>
                                                    </div>
                                                    <!-- end ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment --><!-- ngIf: product.isComingSoon || product.isWishlisted || product.isInDevelopment -->
                                                </div>
                                                <div
                                                    className="product-row__info product-row__alignment"><!-- ngIf: ::product.isGame --><span
                                                    className="product-row__os"
                                                    ng-if="::product.isGame"><!-- ngIf: ::product.worksOn.Windows --><i
                                                    className="ic icon-win"
                                                    ng-if="::product.worksOn.Windows"></i><!-- end ngIf: ::product.worksOn.Windows --><!-- ngIf: ::product.worksOn.Mac --><i
                                                    className="ic icon-mac"
                                                    ng-if="::product.worksOn.Mac"></i><!-- end ngIf: ::product.worksOn.Mac --><!-- ngIf: ::product.worksOn.Linux --><i
                                                    className="ic icon-linux"
                                                    ng-if="::product.worksOn.Linux"></i><!-- end ngIf: ::product.worksOn.Linux --></span><!-- end ngIf: ::product.isGame --><!-- ngIf: product.releaseDate --><span
                                                    ng-if="product.releaseDate"
                                                    className="product-row__date" gog-release-date="{
                                            &quot;date&quot;: 1502744400,
                                            &quot;visibilityDate&quot;: 1502794500
                                        }">2017</span><!-- end ngIf: product.releaseDate --><!-- ngIf: ::product.category --><span
                                                    ng-if="::product.category"
                                                    className="product-row__genre"
                                                    ng-bind="::product.category">Adventure</span><!-- end ngIf: ::product.category -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a></div>
                            <!-- end ngIf: frontpage.smallSpotsLimit >= 3 --></div>
                        <!-- wrapper -->
                        <div
                            className="product-row-wrapper"><!-- ngIf: frontpage.smallSpotsLimit >= 4 -->
                            <div
                                className="product-state-holder product-row product-row--grid product-row--not-small product-row--has-card is-buyable"
                                gog-product="1719198803" gog-spot=""
                                ng-if="frontpage.smallSpotsLimit >= 4"
                                style="user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); touch-action: none;">
                                <div
                                    className="product-row__price product-row__alignment"><!-- ngIf: ::product.customAttributes.customPriceButtonVariant == 'join' -->
                                    <div
                                        className="product-state__price-btn price-btn                                     price-btn--active"
                                        ng-click="productCtrl.addToCart()"
                                        gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;addToCartSmallSpot4&quot;, eventLabel:&quot;Kingdom Come: Deliverance&quot;}"
                                        ng-class="{
                 	'price-btn--in-cart' : product.inCart,
                 	'price-btn--free': product.price.isFree
                 }" ng-hide="::product.customAttributes.customPriceButtonVariant == 'join'"><span
                                        className="price-btn__text "><span
                                        className="product-status__in-cart"><i
                                        className="ic icon-cart"></i></span><span
                                        className="product-state__is-tba">
                        TBA                    </span><span className="price-btn__text--owned product-state__is-owned">
						owned					</span><span className="product-state__is-free">
						Free					</span><span className="_price product-state__price"
                                                             ng-bind="product.price.amount">59.99</span></span></div>
                                </div>
                                <a ng-href="/game/kingdom_come_deliverance"
                                   className="product-row__link"
                                   gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;goToLinkSmallSpot4&quot;, eventLabel:&quot;Kingdom Come: Deliverance&quot;}"
                                   href="/game/kingdom_come_deliverance">
                                    <div className="product-row__picture"><img
                                        className="product-row__img"
                                        srcSet="//images-4.gog.com/3d3a31a86183d7e6f9f31a160b7ee37810837746f0b64e0d3e8165bb38466894_196.jpg , //images-4.gog.com/3d3a31a86183d7e6f9f31a160b7ee37810837746f0b64e0d3e8165bb38466894_392.jpg 2x"
                                        alt="Kingdom Come: Deliverance"/></div>
                                    <div
                                        className="product-row__discount product-row__alignment product-state__discount">
                                                        <span className="price-text--discount"><span
                                                            ng-bind="product.price.discountPercentage">0</span>%</span>
                                    </div>
                                    <div className="product-row__text">
                                        <div className="product-row__content">
                                            <div className="product-row__content-in">
                                                <div
                                                    className="product-row__title"><!-- ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment -->
                                                    <div className="product-title"
                                                         ng-if="!product.isComingSoon &amp;&amp; !product.isWishlisted &amp;&amp; !product.isInDevelopment">
                                                                        <span className="product-title__text"
                                                                              ng-bind="::product.title">Kingdom Come: Deliverance</span>
                                                    </div>
                                                    <!-- end ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment --><!-- ngIf: product.isComingSoon || product.isWishlisted || product.isInDevelopment -->
                                                </div>
                                                <div
                                                    className="product-row__info product-row__alignment"><!-- ngIf: ::product.isGame --><span
                                                    className="product-row__os"
                                                    ng-if="::product.isGame"><!-- ngIf: ::product.worksOn.Windows --><i
                                                    className="ic icon-win"
                                                    ng-if="::product.worksOn.Windows"></i><!-- end ngIf: ::product.worksOn.Windows --></span><!-- end ngIf: ::product.isGame --><!-- ngIf: product.releaseDate --><span
                                                    ng-if="product.releaseDate"
                                                    className="product-row__date" gog-release-date="{
                                            &quot;date&quot;: 1519682400,
                                            &quot;visibilityDate&quot;: 1519750500
                                        }">2018</span><!-- end ngIf: product.releaseDate --><!-- ngIf: ::product.category --><span
                                                    ng-if="::product.category"
                                                    className="product-row__genre"
                                                    ng-bind="::product.category">Adventure</span><!-- end ngIf: ::product.category -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a></div>
                            <!-- end ngIf: frontpage.smallSpotsLimit >= 4 --></div>
                        <!-- wrapper -->
                        <div
                            className="product-row-wrapper"><!-- ngIf: frontpage.smallSpotsLimit >= 5 -->
                            <div
                                className="product-state-holder product-row product-row--grid product-row--not-small product-row--has-card is-discounted is-buyable"
                                gog-product="1578751181" gog-spot=""
                                ng-if="frontpage.smallSpotsLimit >= 5"
                                style="user-select: none; -webkit-user-drag: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); touch-action: none;">
                                <div
                                    className="product-row__price product-row__alignment"><!-- ngIf: ::product.customAttributes.customPriceButtonVariant == 'join' -->
                                    <div className="product-state__price-btn price-btn

                  price-btn--active" ng-click="productCtrl.addToCart()"
                                         gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;addToCartSmallSpot5&quot;, eventLabel:&quot;Darkwood&quot;}"
                                         ng-class="{
                 	'price-btn--in-cart' : product.inCart,
                 	'price-btn--free': product.price.isFree
                 }" ng-hide="::product.customAttributes.customPriceButtonVariant == 'join'"><span
                                        className="price-btn__text "><span
                                        className="product-status__in-cart"><i
                                        className="ic icon-cart"></i></span><span
                                        className="product-state__is-tba">
                        TBA                    </span><span className="price-btn__text--owned product-state__is-owned">
						owned					</span><span className="product-state__is-free">
						Free					</span><span className="_price product-state__price"
                                                             ng-bind="product.price.amount">10.49</span></span></div>
                                </div>
                                <a ng-href="/game/darkwood" className="product-row__link"
                                   gog-track-event="{eventCategory:&quot;mainPage&quot;, eventAction:&quot;goToLinkSmallSpot5&quot;, eventLabel:&quot;Darkwood&quot;}"
                                   href="/game/darkwood">
                                    <div className="product-row__picture"><img
                                        className="product-row__img"
                                        srcSet="//images-1.gog.com/d229654e383dd842314bfef21f6130c914c6569c184863116a02511abeb282ea_196.jpg , //images-1.gog.com/d229654e383dd842314bfef21f6130c914c6569c184863116a02511abeb282ea_392.jpg 2x"
                                        alt="Darkwood"/></div>
                                    <div
                                        className="product-row__discount product-row__alignment product-state__discount">
                                                        <span className="price-text--discount"><span
                                                            ng-bind="product.price.discountPercentage">30</span>%</span>
                                    </div>
                                    <div className="product-row__text">
                                        <div className="product-row__content">
                                            <div className="product-row__content-in">
                                                <div
                                                    className="product-row__title"><!-- ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment -->
                                                    <div className="product-title"
                                                         ng-if="!product.isComingSoon &amp;&amp; !product.isWishlisted &amp;&amp; !product.isInDevelopment">
                                                                        <span className="product-title__text"
                                                                              ng-bind="::product.title">Darkwood</span>
                                                    </div>
                                                    <!-- end ngIf: !product.isComingSoon && !product.isWishlisted && !product.isInDevelopment --><!-- ngIf: product.isComingSoon || product.isWishlisted || product.isInDevelopment -->
                                                </div>
                                                <div
                                                    className="product-row__info product-row__alignment"><!-- ngIf: ::product.isGame --><span
                                                    className="product-row__os"
                                                    ng-if="::product.isGame"><!-- ngIf: ::product.worksOn.Windows --><i
                                                    className="ic icon-win"
                                                    ng-if="::product.worksOn.Windows"></i><!-- end ngIf: ::product.worksOn.Windows --><!-- ngIf: ::product.worksOn.Mac --><i
                                                    className="ic icon-mac"
                                                    ng-if="::product.worksOn.Mac"></i><!-- end ngIf: ::product.worksOn.Mac --><!-- ngIf: ::product.worksOn.Linux --><i
                                                    className="ic icon-linux"
                                                    ng-if="::product.worksOn.Linux"></i><!-- end ngIf: ::product.worksOn.Linux --></span><!-- end ngIf: ::product.isGame --><!-- ngIf: product.releaseDate --><span
                                                    ng-if="product.releaseDate"
                                                    className="product-row__date" gog-release-date="{
                                            &quot;date&quot;: 1502917200,
                                            &quot;visibilityDate&quot;: 1502992500
                                        }">2017</span><!-- end ngIf: product.releaseDate --><!-- ngIf: ::product.category --><span
                                                    ng-if="::product.category"
                                                    className="product-row__genre"
                                                    ng-bind="::product.category">Action</span><!-- end ngIf: ::product.category -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a></div>
                            <!-- end ngIf: frontpage.smallSpotsLimit >= 5 --></div>
                        <!-- wrapper -->
                    </div>
                </div>
            </div>
        )
    }
}

Grid.propTypes = {

}

export default Grid