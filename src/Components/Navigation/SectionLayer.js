import React, {Component} from 'react'
import PropTypes from 'prop-types'

import SectionLayerCustomBg from "./SectionLayerCustomBg"
import MenuInsideCategory from "./MenuInsideCategory"
import SpecialSingle from "./SpecialSingle"

class SectionLayer extends Component {
    render() {
        const {selectedCategory} = this.props
        return (
            <div className={`menu-section-layer${selectedCategory ? ' menu-section-layer--' + selectedCategory.name : ''}${this.props.isLayerExpanded ? ' is-visible' : ''}`} onMouseOver={this.props.holdCategory}>
                {selectedCategory
                && selectedCategory.isSpecial
                && selectedCategory.customisation.isSingle
                && !!selectedCategory.products[0]
                && !!selectedCategory.products[0].id
                && <SpecialSingle category={selectedCategory} module={'topBar'}/>}
                {selectedCategory && selectedCategory.isSpecial && !selectedCategory.customisation.isSingle && <SectionLayerCustomBg selectedCategory={selectedCategory}/>}
                {selectedCategory && !selectedCategory.isSpecial && <MenuInsideCategory selectedCategory={selectedCategory}/>}
            </div>
        );
    }
}

SectionLayer.propTypes = {
    selectedCategory: PropTypes.object,
    isLayerExpanded: PropTypes.bool,
    holdCategory: PropTypes.func,
};

export default SectionLayer;