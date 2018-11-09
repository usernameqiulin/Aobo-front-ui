import React, {Component} from 'react'
import PropTypes from 'prop-types'
import GoogleAnalytics from 'react-ga'
import {Link} from "react-router-dom"

import i18n from '../../i18n'
import {getI18n} from "../../helper"
import MenuInsideCategoryColumn from "./MenuInsideCategoryColumn"

class MenuInsideCategory extends Component {

    render() {
        const {selectedCategory} = this.props
        return (
            <div className="menu-inside-category">
                <p className="menu-inside-category__title">{getI18n(selectedCategory.categoryTitle, i18n.language)}</p>
                <div className="menu-products cf">
                    {[1,2,3].map(v => {
                        return <MenuInsideCategoryColumn key={v} selectedCategory={selectedCategory} number={v}/>
                    })}
                </div>
                <Link className={`menu-btn menu-btn--full menu-category-btn${selectedCategory.name === 'all' ? ' ng-hide' : ''}
                `}
                      to={selectedCategory.url}
                      onClick={e => GoogleAnalytics.event({action: 'Click', category: 'topBar', label: 'All ' +  selectedCategory.name + ' Games '})}
                >
                    {!!selectedCategory.categoryButton ? getI18n(selectedCategory.categoryButton, i18n.language) : ''}
                </Link>
            </div>
        );
    }
}

MenuInsideCategory.propTypes = {
    selectedCategory: PropTypes.object,
};

export default MenuInsideCategory