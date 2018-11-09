import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuCategoryItem from "./MenuCategoryItem";

class MenuInsideCategoryColumn extends Component {

    render() {
        return (
            <div className={`menu-inside-category__column${this.props.selectedCategory.hideColumn === this.props.number ? ' menu-inside-category__column--expendable' :''}`}>
                {this.props.selectedCategory.columns[this.props.number-1].map((item, index) => {
                    if (this.props.selectedCategory.name !== 'all') {
                        let pp = this.props.selectedCategory.products.filter(p => {
                            return p.id === item.objectId;
                        })[0];
                        pp = Object.assign(item, pp)
                        return pp && <MenuCategoryItem key={index} product={pp}/>
                    } else {
                        return <MenuCategoryItem key={index} product={item}/>
                    }
                })}
            </div>
        );
    }
}

MenuInsideCategoryColumn.propTypes = {
    selectedCategory: PropTypes.object,
    number: PropTypes.number,
}

export default MenuInsideCategoryColumn;