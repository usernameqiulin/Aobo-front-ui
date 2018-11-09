import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"

import {getName, isDemoable, isPlayable, randomGameImg} from "../../../../helper"
import i18n from "../../../../i18n"
import PlayButton from '../../../Button/Play'

class Item extends React.Component {

    render() {
        const {t, product, isFirst, isLast, isAnimated, type, module} = this.props
        const image = randomGameImg('4', 'png')
        const title = getName(this.props.product.name, 'en-GB')
        const isPlayAble = isPlayable(product)
        const isDemoAble = isDemoable(product)
        return (
            <div className={`
            menu-product
            menu-product-state-holder
            js-focusable-element
            product-row--has-card${isPlayAble ? ' is-playable' : ''}
            ${isDemoAble ? ' is-demoable' : ''}
            ${isFirst ? ' is-first' : ''}
            ${isLast ? ' is-last' : ''}
            ${isAnimated ? ' is-animated' : ''}
            ${type === 'list' ? ' menu-search__result' : ' menu-product--grid'}
            `}>
                <PlayButton
                    mode={'play'}
                    id={product.id}
                    brand={product.brand.code}
                    module={module}
                    classes={isPlayAble?['menu-product__play-btn', 'menu-product__play-btn--active']:['menu-product__play-btn']}
                    title={title}
                    isDisabled={!isPlayAble}
                    textClasses={['menu-product__play-btn-text']}
                />
                <div className="menu-product__link" title={getName(product.name, i18n.language)}>
                    {type === 'grid' && <div className={`${!product.isTall ? 'menu-product__picture' : ''}${product.isTall ? 'menu-product__tall-picture' : ''}`}>
                        <span className="menu-product__loader-title">{getName(product.name, i18n.language)}</span>
                        <img className={`menu-product__image${product.isTall ? ' ng-hide' : ''}`} alt={getName(product.name, i18n.language)}
                             srcSet={image.x1 + ', ' + image.x2 + ' 2x'}/>
                        <img srcSet={ product.coverImage } alt={getName(product.name, i18n.language)}
                             className={`menu-product__image menu-product__image--tall${product.isTall ? '' : ' ng-hide'}`}/>
                        <svg viewBox="0 0 32 32" className={`menu-product__is-wishlisted${!!product.isWishlisted ? '' : ' ng-hide'}`}>
                            <use xlinkHref="#icon-wishlisted2"/>
                        </svg>
                    </div>}
                    {type === 'list' && <img className="menu-product__image"
                         srcSet={image.x1 + ', ' + image.x2 + ' 2x'}
                         alt={getName(product.name, i18n.language)}
                    />}
                    <div className="menu-product__content">
                        <div className="menu-product__content-in">
                            {type === 'list' && <div className="menu-product__title">
                                <span>{getName(product.name, i18n.language)}</span>
                                <div className="menu-product__flags">
                                    <span className={`menu-product__flag menu-product__flag--soon${product.isComingSoon ? '' : ' ng-hide'}`}>{t('Coming soon')}</span>
                                    {/*<span className={`menu-product__flag menu-product__flag--in-dev${!!product.isInDevelopment ? '' : ' ng-hide'}`}>in-dev</span>*/}
                                </div>
                            </div>}
                            {type === 'list' && <div className="menu-product__details">
                                <svg className="icon-svg">
                                    <use xlinkHref={`#icon-${product.brand.code.toLowerCase() }`}/>
                                </svg>
                                <svg className="icon-svg ng-hide">
                                    <use xlinkHref={`#icon-${product.product.toLowerCase() }`}/>
                                </svg>
                            </div>}
                            {type === 'list' && <div className="menu-product__rating js-star-rating star-rating star-rating--35"/>}
                            <div className="menu-product__os js-os-support">
                                <span>
                                    {(product.worksOn.pcBrowser || product.worksOn.mobileBrowser) && <i className="ic icon-flash"/>}
                                    {product.worksOn.windowsDownload && <i className="ic icon-win"/>}
                                    {product.worksOn.mobileBrowser && <i className="ic icon-mac"/>}
                                    {(product.worksOn.androidApp || product.worksOn.mobileBrowser) && <i className="ic icon-android"/>}
                                </span>
                            </div>
                            {type === 'grid' && <div className="menu-product__flags">
                                <span className={`menu-product__flag menu-product__flag--soon${!!product.isComingSoon ? '' : ' ng-hide'}`}>{t('Coming soon')}</span>
                                {/*<span className={`menu-product__flag menu-product__flag--in-dev${!!product.isInDevelopment ? '' : ' ng-hide'}`}>in-dev</span>*/}
                            </div>}
                            {type === 'grid' && <div className={`menu-product__brand`}>
                                <svg className="icon-svg">
                                    <use xlinkHref={`#icon-${product.brand.code.toLowerCase() }`}/>
                                </svg>
                            </div>}
                            <div className="menu-product__demo product-state__demo">
                                <PlayButton
                                    mode={'demo'}
                                    id={product.id}
                                    brand={product.brand.code}
                                    module={'Search'}
                                    classes={['menu-product__demo-text _clickable']}
                                    title={title}
                                    isDisabled={!isDemoAble}
                                    textClasses={['menu-product__play-btn-text']}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Item.propTypes = {
    product: PropTypes.object.isRequired,
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    isAnimated: PropTypes.bool,
    type: PropTypes.oneOf(['list', 'grid']).isRequired,
}

export default translate()(Item)