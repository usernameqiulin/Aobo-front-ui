import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"

class FilterClearButton extends React.PureComponent {

    clearFilters = e => this.props.clearFunc()

    render() {
        const {t, isFiltered} = this.props
        return (
            <strong className={`account__filters-option collection-header__clear _clickable${isFiltered ? '' : ' ng-hide'}`} onClick={this.clearFilters}>
                {t('clear filters')} <i className="ic icon-close2"/>
            </strong>
        )
    }
}

FilterClearButton.propTypes = {
    isFiltered: PropTypes.bool,
    clearFunc: PropTypes.func.isRequired,
}

export default translate()(FilterClearButton)