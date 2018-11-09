import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"

import {getI18n, isDemoable, isPlayable} from "../../helper"
import i18n from "../../i18n"
import PlayButton from '../Button/Play'

class SpecialSingle extends React.Component {

    shouldComponentUpdate(nextProps)
    {
        if (nextProps.category.name === this.props.category.name)
            return false
        return true
    }

    render() {
        const {t, category, launcher} = this.props,
            product = category.products[0]
        const isPlayAble = isPlayable(product)
        const isDemoAble = isDemoable(product)
        return (
            <div className={`menu-custom-category menu-product-state-holder${category.isSpecial && category.customisation.isSingle ? '' : ' ng-hide'}`}>
                <div className="menu-custom-category__bg-container">
                    <div className="menu-custom-category__bg"
                         style={{
                             backgroundImage: 'url(' + category.customisation.backgroundImage + ')',
                             backgroundColor: category.customisation.categoryColor
                         }}
                    />
                </div>
                <div className="menu-custom-category__content">
                    <img className="menu-custom-category__logo" src={getI18n(category.customisation.logoImage, i18n.language)}/>
                    <p className="menu-custom-category__description">{getI18n(category.customisation.description, i18n.language)}</p>
                    <div className={`menu-custom-category__play`}>
                        {isDemoAble && <PlayButton
                            mode={'demo'}
                            id={product.id}
                            brand={product.brand.code}
                            module={'topBar'}
                            classes={['menu-custom-category__demo _clickable']}
                            title={category.name}
                            isDisabled={!isDemoAble}
                            textClasses={[]}
                        />}
                        <PlayButton
                            mode={'play'}
                            id={product.id}
                            brand={product.brand.code}
                            module={'topBar'}
                            classes={['menu-custom-category__play-btn']}
                            title={category.name}
                            isDisabled={!isPlayAble}
                            textClasses={[]}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

SpecialSingle.propTypes = {
    category: PropTypes.object.isRequired,
}

export default translate()(SpecialSingle)