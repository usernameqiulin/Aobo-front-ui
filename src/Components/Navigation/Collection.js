import React from 'react'
import PropTypes from 'prop-types'
import GoogleAnalytics from 'react-ga'

import i18n from "../../i18n"
import {Link} from "react-router-dom"
import {getI18n} from "../../helper"

class Collection extends React.Component {
    render() {
        const {product} = this.props
        return (
            <div className="menu-collection">
                <Link className="menu-collection__link"
                      to={product.url}
                      onClick={e => GoogleAnalytics.event({
                          action: 'Click',
                          category: 'topBar',
                          label: 'COLLECTION ' + product.collectionName['en-GB']
                      })}
                >
                    <div className={`menu-collection__picture${product.isSuperTall ? ' is-super-tall' : ''}${product.isTall ? ' is-tall' : ''}`}>
                        <span className="menu-collection__loader-title">{getI18n(product.collectionName, i18n.language)}</span>
                        <img srcSet={product.coverImage}
                             className={`menu-collection__image${product.isTall ? '' : ' ng-hide'}`}/>
                        <img srcSet={product.coverImage}
                             className={`menu-collection__image${product.isSuperTall ? '' : ' ng-hide'}`}/>
                    </div>
                    <div className="menu-collection__name">{getI18n(product.collectionName, i18n.language)}</div>
                </Link>
            </div>
        )
    }
}
Collection.propTypes = {
    product: PropTypes.object.isRequired,
}
export default Collection