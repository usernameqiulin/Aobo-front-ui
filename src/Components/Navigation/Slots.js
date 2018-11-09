import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"
import {Link} from 'react-router-dom'

import {isMobile} from "../../helper"
import SectionLayer from "./SectionLayer"
import SubmenuItem from "./SubmenuItem";

class Slots extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: null,
            isExpanded: false,
            isLayerExpanded: false,
        }
        this.customCategories = {}
        this.normalCategories = {}
        this.categories = this.props.data
        this.layerTimeout = !1
        this.layerLoadingTimeout = !1
        this.customCategoriesCount = 0
        // !props.menu.fetching && props.menu.data && this.filterCustomCategories(props.menu.data)
    }

    componentWillReceiveProps(newProps) {
        // if (!this.props.menu.data && newProps.menu.data) {
        //     this.filterCustomCategories(newProps.menu.data)
        // }
        if (!this.props.isExpanded && newProps.isExpanded) {
            this.hideCategory()
        }
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

    selectCategory = (category, activationDelayed) => {
        void 0 === activationDelayed && (activationDelayed = !0), clearTimeout(this.layerLoadingTimeout);
        let delay = 0;
        activationDelayed && (delay = this.props.menuAim.getActivationDelay());
        let callback = function () {
            this.props.menu.data.data.segments.map(section => {
                if (category in section) {
                    this.setState({
                        isLayerExpanded: true,
                        selectedCategory: section[category]
                    });
                    this.showCategory();
                    return;
                }
            })
            // if (category in this.props.menu.data) {
            //     this.setState({
            //         isLayerExpanded: true,
            //         selectedCategory: this.props.menu.data[category]
            //     });
            //     this.showCategory();
            // } else {
            //     this.setState({
            //         isLayerExpanded: true,
            //         selectedCategory: {name: category}
            //     });
            //     // this.categoryChangeListeners.callListeners();
            // }
        }
        this.layerLoadingTimeout = setTimeout(callback.bind(this), delay)
    }

    showCategory = () => {
        clearTimeout(this.layerTimeout)
        /*, this.isLayerExpanded = !0, this.categoryChangeListeners.callListeners()*/
        this.setState({
            isLayerExpanded: true,
        });
    }

    holdCategory = () => {
        clearTimeout(this.layerTimeout), clearTimeout(this.layerLoadingTimeout)
        /*, this.isLayerExpanded = !0*/
        this.setState({
            isLayerExpanded: true,
        })
    }

    hideCategory = () => {
        // this.isLayerExpanded = !1, this.selectedCategory = this.props.menu.data[DEFAULT_CATEGORY]/*, this.categoryChangeListeners.callListeners()*/
        this.setState({
            isLayerExpanded: false,
            selectedCategory: null,
        })
    }

    checkState = () => {
        this.props.isExpanded && this.hideCategory()
    }

    render() {
        const {t, menu} = this.props
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
                <div
                    className={`menu-submenu menu-slots__submenu js-menu-sloped-submenu${this.state.isLayerExpanded ? ' menu-slots__submenu--category-expanded' : ''}`}
                    onMouseEnter={this._mouseEnterSub}
                >
                    <SectionLayer selectedCategory={this.state.selectedCategory}
                                  isLayerExpanded={this.state.isLayerExpanded} holdCategory={this.holdCategory}/>
                    {!!menu.data && !!menu.data.data && menu.data.data.segments.map((section, i) => {
                        return (
                            <React.Fragment key={i}>
                                {Object.keys(section).length > 0 &&
                                Object.keys(section).map((key) => {
                                    return <SubmenuItem key={key} category={section[key]}
                                                        selectedCategory={this.state.selectedCategory}
                                                        selector={this.selectCategory}/>
                                })}
                                {(i < menu.data.data.segments.length-1) && <div key={i} className="menu-submenu-separator"/>}
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>
        )
    }
}

Slots.propTypes = {
    menu: PropTypes.object.isRequired,
    touchHandler: PropTypes.func.isRequired,
    mouseEnter: PropTypes.func.isRequired,
    mouseLeave: PropTypes.func.isRequired,
    cancelTimeout: PropTypes.func.isRequired,
    isExpanded: PropTypes.bool.isRequired,
}

export default translate()(Slots)