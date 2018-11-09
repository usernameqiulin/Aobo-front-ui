import React from 'react'
import PropTypes from 'prop-types'

import {getName} from "../../helper"
import i18n from '../../i18n'

class Brand extends React.Component {

    _onClick = (event) => {
        if (this.props.current !== this.props.brand.code) {
            this.props.goto(this.props.brand.code)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.current !== this.props.current) return true
        return false
    }

    render() {
        const {brand, current} = this.props, imgName = brand.code.toLowerCase(), name = getName(brand.name, i18n.language)
        return (
            <div className={`product-row-wrapper${brand.code === current ? ' dimming-chooser__active-element-wrap' : ''}`} onClick={this._onClick}>
                <div className={`product-state-holder product-row product-row--grid dimming-chooser__element`}>
                    <div className={`product-row__link`} title={name}>
                        <div className={`product-row__picture`}>
                            <img
                                className="product-row__img"
                                alt={name}
                                srcSet={require("../../images/live/" + imgName + ".png") + ", " + require("../../images/live/" + imgName + "@2x.png") + " 2x"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Brand.propTypes = {
    brand: PropTypes.object.isRequired,
    goto: PropTypes.func.isRequired,
    current: PropTypes.string.isRequired,
}

export default Brand