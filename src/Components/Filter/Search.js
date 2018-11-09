import React from 'react'
import PropTypes from 'prop-types'

import ABInputer from "../ABInputer"

class Search extends React.Component {
    clearTerm = () => {
        this.inputer.reset()
        this.props.onKeywordChange('')
    }

    changePropsKeyword = (value) => this.props.onKeywordChange(value)

    reset = () => this.inputer.reset()

    render() {
        const {t, keyword, isLoading} = this.props
        return (
            <div className="filters__section filters__section--search">
                {/* ng-class="{'is-showing-clear': search.isTermApplied && !view.isDataProcessing, 'is-spinning': view.isDataProcessing && search.isTermApplied}" */}
                <div className={`filtr filter--search _search${!!keyword && keyword.length > 0 && !isLoading ? ' is-showing-clear' : ''}${isLoading ? ' is-spinning' : ''}`}>
                    <ABInputer
                        valueChanger={this.changePropsKeyword}
                        defaultValue={keyword}
                        type={'search'}
                        placeHolder={t('search_placeholder')}
                        classes={['_search__input']}
                        ref={ref => this.inputer = ref}
                    />
                    <i className="ic icon-search _search__icon"/>
                    <i className="_search__spinner"/>
                    <i className="_search__clear ic icon-clear" onClick={this.clearTerm}/>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    keyword: PropTypes.string,
    isLoading: PropTypes.bool,
    t: PropTypes.func,
    onKeywordChange: PropTypes.func.isRequired,
}

export default Search