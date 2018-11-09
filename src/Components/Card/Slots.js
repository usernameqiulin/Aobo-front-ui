import React from 'react'
import PropTypes from 'prop-types'

import i18n from '../../i18n'
import {getGameCategories, getName, isDemoable, isPlayable, randomGameImg} from "../../helper"
import PlayButton from '../Button/Play'

import './slots.css'
import {translate} from "react-i18next"

//todo: addFavorite/deleteFavorite

class Slots extends React.Component {

    toggleFavorite = (e) => {

    }


    render() {
        const {t, product, module, isNew} = this.props, name = getName(product.name, i18n.language)
        const image = randomGameImg('4', 'png')
        const isFavorited = this.props.favorites.includes(this.props.product.id)

        const isPlayAble = isPlayable(product)
        const isDemoAble = isDemoable(product)

        return (
            //${!!play.fetching && play.fetching === product.id ? ' is-spinning' : ''}
            <div className={`product-row-wrapper`}>
                <div className={`product-state-holder product-row product-row--has-card${product.product === 'LIVE' ? ' live' : ''}${isPlayAble?' is-playable':''}${isDemoAble ? ' is-demoable' : ''}`}>
                    <span className={`prof-badge game__badge ${isNew ? '' : 'ng-hide'}`}>{t('new')}</span>
                    <div className={`product-row__play product-row__alignment`}>
                        <div className={`play-btn${isPlayAble ? ' play-btn--active' : ''}`}>
                            <PlayButton
                                mode={'play'}
                                id={product.id}
                                brand={product.brand.code}
                                module={module}
                                classes={['play-btn__text']}
                                title={name}
                                isDisabled={!isPlayAble}
                                textClasses={['product-state__play']}
                            />
                        </div>
                    </div>
                    <div className="product-row__link">
                        <div className="product-row__picture">
                            <img className="product-row__img" srcSet={image.x1 + ', ' + image.x2 + ' 2x'}/>
                        </div>
                        <div className={`product-row__demo product-row__alignment product-state__demo`}>
                            <span className={`play-text--demo`}>
                                <PlayButton
                                    mode={'demo'}
                                    id={product.id}
                                    brand={product.brand.code}
                                    module={module}
                                    classes={['_clickable']}
                                    title={name}
                                    isDisabled={!isDemoAble}
                                    textClasses={[]}
                                />
                            </span>
                        </div>
                        {!isDemoAble && <div className="product-row__demo product-row__alignment"/>}
                        <div className="product-row__text">
                            <div className="product-row__content">
                                <div className="product-row__content-in">
                                    <div className="product-row__title">
                                        <div className={`product-title product-title--flagged`}>
                                            <span className="product-title__text">
                                                <svg className="icon-svg">
                                                    <use xlinkHref={`#icon-${product.brand.code.toLowerCase() }`}/>
                                                </svg>
                                                {name}
                                            </span>
                                            <span className="product-title__flags">
                                                {isFavorited && <i className={`_product-flag product-title__icon ic icon-heart active`}/>}
                                                {product.isComingSoon && <span className="_product-flag product-title__flag product-title__flag--soon">{t('Coming soon')}</span>}
                                                {product.isInDevelopment && <span className="_product-flag product-title__flag product-title__flag--in-dev">开发中</span>}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="product-row__info product-row__alignment">
                                        <span className="product-row__rating js-star-rating star-rating"/>
                                        <span className="product-row__os">
                                            {(product.worksOn.pcBrowser || product.worksOn.mobileBrowser) && <i className="ic icon-flash"/>}
                                            {product.worksOn.windowsDownload && <i className="ic icon-win"/>}
                                            {product.worksOn.mobileBrowser && <i className="ic icon-mac"/>}
                                            {(product.worksOn.androidApp || product.worksOn.mobileBrowser) && <i className="ic icon-android"/>}
                                        </span>
                                        {/* ng-if="product.releaseDate" gog-release-date='{"date": {{ ::product.releaseDate }}, "visibilityDate": {{ ::product.salesVisibility.from }}}'*/}
                                        <span className={`product-row__date`}>2018</span>
                                        {/* ng-if="::product.category" ng-bind="::product.category" */}
                                        <span className={`product-row__genre`}>
                                            {getGameCategories(product.categories, i18n.language)}
                                        </span>
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

Slots.propTypes = {
    product: PropTypes.object.isRequired,
    module: PropTypes.string.isRequired,
    favorites: PropTypes.array.isRequired,
    // isNew: PropTypes.bool.isRequired,
}

export default translate()(Slots)