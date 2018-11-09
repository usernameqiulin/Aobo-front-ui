import React, {Component} from 'react'
import PropTypes from 'prop-types'
import GoogleAnalytics from 'react-ga'
import i18n from '../../i18n'
import {getI18n} from "../../helper"
import {Link} from "react-router-dom"

class SubmenuItem extends Component {

    _hover = (event) => {
        event.stopPropagation()
        event.preventDefault()
        this.props.selector(this.props.category.name)
    }

    render() {
        const {category} = this.props
        return (
            <div className={`menu-submenu-item${category.isSpecial ? ' menu-submenu-item--custom' : ''}${this.props.selectedCategory && this.props.selectedCategory.name === category.name ? ' is-active' : ''}`}
                 onMouseOver={this._hover}>
                {category.url &&
                    <Link
                        className={`menu-submenu-link${category.isSpecial ? ' menu-custom-category-link' : ' menu-submenu-link--featured'} js-menu-category-link`}
                        style={category.isSpecial ? {color: category.customisation.categoryColor} : null}
                        onTouchStart={e => e.stopPropagation()}
                        onTouchEnd={this._hover}
                        onClick={e => GoogleAnalytics.event({
                            action: 'Click',
                            category: 'topBar',
                            label: category.name
                        })}
                        to={category.url}
                    >
                        {getI18n(category.categoryTitle, i18n.language)}
                        <svg viewBox="0 0 32 32"
                             className={`menu-submenu-icon${category.isSpecial ? ' menu-submenu-icon--custom' : ''}`}
                             style={category.isSpecial ? {fill: category.customisation.categoryColor} : null}>
                            <use xlinkHref="#icon-arrow-right4"/>
                        </svg>
                        <svg viewBox="0 0 32 32"
                             className={`menu-submenu-icon${this.props.category.isSpecial ? ' menu-submenu-icon--custom' : ''}`}
                             style={category.isSpecial ? {fill: category.customisation.categoryColor} : null}>
                            <use xlinkHref="#icon-arrow-right4"/>
                        </svg>
                    </Link>}
                {!category.url &&
                    <div
                        className={`menu-submenu-link${category.isSpecial ? ' menu-custom-category-link' : ' menu-submenu-link--featured'} js-menu-category-link`}
                        style={category.isSpecial ? {color: category.customisation.categoryColor} : null}
                        onTouchStart={e => e.stopPropagation()}
                        onTouchEnd={this._hover}
                        onClick={e => GoogleAnalytics.event({
                            action: 'Click',
                            category: 'topBar',
                            label: category.name
                        })}
                    >
                        {getI18n(category.categoryTitle, i18n.language)}
                        <svg viewBox="0 0 32 32"
                             className={`menu-submenu-icon${category.isSpecial ? ' menu-submenu-icon--custom' : ''}`}
                             style={category.isSpecial ? {fill: category.customisation.categoryColor} : null}>
                            <use xlinkHref="#icon-arrow-right4"/>
                        </svg>
                        <svg viewBox="0 0 32 32"
                             className={`menu-submenu-icon${this.props.category.isSpecial ? ' menu-submenu-icon--custom' : ''}`}
                             style={category.isSpecial ? {fill: category.customisation.categoryColor} : null}>
                            <use xlinkHref="#icon-arrow-right4"/>
                        </svg>
                    </div>
                }
            </div>
        )
    }
}
SubmenuItem.propTypes = {
    category: PropTypes.object.isRequired,
    selector: PropTypes.func.isRequired,
    selectedCategory: PropTypes.object,
    language: PropTypes.string,
};
export default SubmenuItem;