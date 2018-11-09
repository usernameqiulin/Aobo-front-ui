import React, {Component} from 'react'
import PropTypes from 'prop-types'

import Collection from "./Collection"
import Item from './tray/Search/Item'

class MenuCategoryItem extends Component {
    render() {
        const {product} = this.props
        return (
            <div className="menu-category-item">
                {!product.isCollection && <Item
                    product={product}
                    type={'grid'}
                    module={'topBar'}
                />}
                {product.isCollection && <Collection product={product}/>}
            </div>
        )
    }
}
MenuCategoryItem.propTypes = {
    product: PropTypes.object,
}

export default MenuCategoryItem