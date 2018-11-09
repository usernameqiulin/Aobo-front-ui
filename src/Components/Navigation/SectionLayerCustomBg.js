import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MenuInsideCategory from "./MenuInsideCategory";

class SectionLayerCustomBg extends Component {

    render() {
        return (
            <div className={`menu-section-layer__custom-bg
            ${this.props.selectedCategory.isSpecial && !this.props.selectedCategory.customisation.isSingle ? '' : 'ng-hide'}
            `} style={{backgroundImage: 'url('+this.props.selectedCategory.customisation.backgroundImage+')', backgroundColor: this.props.selectedCategory.customisation.categoryColor}}>
                <MenuInsideCategory selectedCategory={this.props.selectedCategory}/>
            </div>
        )
    }
}

SectionLayerCustomBg.propTypes = {
    selectedCategory: PropTypes.object,
}

export default SectionLayerCustomBg;