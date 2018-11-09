import React from 'react'
import PropTypes from 'prop-types'

import {isMobile} from "../../helper"

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isExplanationVisible: 1,
        }
    }

    componentDidMount() {
        !isMobile() && this.input.focus()
    }


    _onSearchBlur = () => {
        this.setState({
            isExplanationVisible: !1,
        })
    }

    _onSearchFocus = () => {
        this.setState({
            isExplanationVisible: 1,
        })
    }

    _onSearchChange = (e) => {
        this.props.changeFunc(e.target.value);
    }

    _clearSearch = () => {
        this.props.changeFunc('')
        this.input.focus()
    }


    render() {
        const { t } = this.props
        return (
            <div className="filters__search-container">
                <div className={`filters__search _search${this.props.loading ? ' is-spinning' : ''}${this.props.keyword.length > 0 ? ' is-showing-clear' : ''}`}>
                    {/* ng-model-options="{ debounce: { 'default': 300 } }" */}
                    <input type="search"
                           className="_search__input type"
                           onBlur={this._onSearchBlur}
                           onFocus={this._onSearchFocus}
                           value={this.props.keyword}
                           placeholder={t('search_placeholder')}
                           onChange={this._onSearchChange}
                           ref={ref => this.input = ref}
                    />
                    <i className="ic icon-search _search__icon"/>
                    <i className="_search__spinner"/>
                    <i className="_search__clear ic icon-clear" onClick={this._clearSearch}/>
                </div>
                <div className={`filters__search-popover ${this.state.isExplanationVisible ? 'is-expanded' : ''}`}>
                    <i className="_dropdown__pointer-up _dropdown__pointer--light filter__pointer"/>
                    <div className="filters__search-explained">{t('search_explanation')}</div>
                </div>
            </div>
        )
    }
}

Search.propTypes = {
    keyword: PropTypes.string,
    changeFunc: PropTypes.func,
    loading: PropTypes.bool,
    t: PropTypes.func.isRequired,
}

export default Search