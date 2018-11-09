import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'
import {connect} from "react-redux"

import {isMobile} from "../../helper"
import i18n from '../../i18n'
import SectionLayer from "./SectionLayer"
import SubmenuItem from "./SubmenuItem"

const DEFAULT_CATEGORY = "default"

class SlotsMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: null,
            isExpanded: !1,
            isLayerExpanded: !1,
        }
        this.customCategories = {}
        this.normalCategories = {}
        this.categories = this.props.data
        this.layerTimeout = !1
        this.layerLoadingTimeout = !1
        this.customCategoriesCount = 0
        !props.menu.fetching && props.menu.data && this.filterCustomCategories(props.menu.data)
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.menu.data && newProps.menu.data) {
            this.filterCustomCategories(newProps.menu.data)
        }
        if (!this.props.isExpanded && newProps.isExpanded) {
            this.hideCategory()
        }
    }

    selectCategory = (category, activationDelayed) => {
        void 0 === activationDelayed && (activationDelayed = !0), clearTimeout(this.layerLoadingTimeout);
        let delay = 0;
        activationDelayed && (delay = this.props.menuAim.getActivationDelay());
        let callback = function() {
            if(category in this.props.menu.data) {
                this.setState({
                    isLayerExpanded: !0,
                    selectedCategory: this.props.menu.data[category]
                });
                this.showCategory();
            } else {
                this.setState({
                    isLayerExpanded: !0,
                    selectedCategory: {name: category}
                });
                // this.categoryChangeListeners.callListeners();
            }
        }
        this.layerLoadingTimeout = setTimeout(callback.bind(this), delay)
    }

    showCategory = () => {
        clearTimeout(this.layerTimeout), this.isLayerExpanded = !0/*, this.categoryChangeListeners.callListeners()*/
    }

    holdCategory = () => {
        clearTimeout(this.layerTimeout), clearTimeout(this.layerLoadingTimeout), this.isLayerExpanded = !0
    }

    hideCategory = () => {
        // this.isLayerExpanded = !1, this.selectedCategory = this.props.menu.data[DEFAULT_CATEGORY]/*, this.categoryChangeListeners.callListeners()*/
        this.setState({
            isLayerExpanded: !1,
            selectedCategory: null,
        })
    }

    updateCustomCategories = () => {
        this.customCategories = this.getCustomCategories(), this.customCategoriesCount = Object.keys(this.customCategories).length
    }

    getCustomCategories = () => {
        return this.customCategories;
    }

    filterCustomCategories = (data) => {
        for (let category in data) {
            if ("undefined" !== typeof data[category].isSpecial && data[category].isSpecial) {
                this.customCategories[category] = data[category]
            } else {
                if (category === 'cacheExpires') {
                    continue
                }
                this.normalCategories[category] = data[category]
            }
        }
        this.customCategoriesCount = Object.keys(this.customCategories).length
    }

    checkState = () => {
        this.props.isExpanded && this.hideCategory()
    }

    updateCategory = () => {
        // this.isLayerExpanded = this.menuGames.isLayerExpanded, this.selectedCategory = this.menuGames.selectedCategory
    }

    _mouseEnter = (event) => {
        !isMobile() && this.props.mouseEnter(event)
    }

    _mouseLeave = (event) => {
        !isMobile() && this.props.mouseLeave(event)
    }

    _touchStart = (event) => {
        event.preventDefault()
    }

    _touchEnd = (event) => {
        event.preventDefault()
        this.props.touchHandler(event)
    }

    _mouseEnterSub = (event) => {
        this.props.cancelTimeout('slots')
    }

    render() {
        const {t} = this.props
        return (
            <div className={`menu-item has-submenu menu-item--animated hide-in-lite-mode js-menu-slots`}
                 onMouseEnter={this._mouseEnter}
                 onMouseLeave={this._mouseLeave}
            >
                <Link className="menu-link menu-uppercase js-menu-link" to="/slots" onTouchStart={this._touchStart}
                      onTouchEnd={this._touchEnd}>
                    {t('SLOTS')}
                    <svg viewBox="0 0 32 32" className="menu-link__dropdown-icon">
                        <use xlinkHref="#icon-arrow-down2"/>
                    </svg>
                </Link>
                <span className="menu-triangle"/>
                <div className={`menu-submenu menu-slots__submenu js-menu-sloped-submenu${this.state.isLayerExpanded ? ' menu-slots__submenu--category-expanded' : ''}`}
                     onMouseEnter={this._mouseEnterSub}
                >
                    <SectionLayer selectedCategory={this.state.selectedCategory} isLayerExpanded={this.state.isLayerExpanded} holdCategory={this.holdCategory}/>
                    {this.customCategoriesCount > 0 && Object.keys(this.customCategories).map((k, i) => {
                        return <SubmenuItem key={i} category={this.customCategories[k]} selectedCategory={this.state.selectedCategory} selector={this.selectCategory}/>
                    })}
                    {this.customCategoriesCount > 0 && <div className="menu-submenu-separator"/>}
                    {this.normalCategories && Object.keys(this.normalCategories).map((k, j) => {
                        if (/separator-/.test(k)) {
                            return <div key={k} className="menu-submenu-separator"/>
                        }
                        return <SubmenuItem key={k} category={this.normalCategories[k]} selectedCategory={this.state.selectedCategory} selector={this.selectCategory}/>
                    })}
                </div>
            </div>
        )
    }
}

SlotsMenu.propTypes = {
    menu: PropTypes.object.isRequired,
    touchHandler: PropTypes.func.isRequired,
    mouseEnter: PropTypes.func.isRequired,
    mouseLeave: PropTypes.func.isRequired,
    cancelTimeout: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
}

export default translate()(SlotsMenu)