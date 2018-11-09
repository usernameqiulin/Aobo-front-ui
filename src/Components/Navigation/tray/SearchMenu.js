import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import GoogleAnalytics from 'react-ga'
import NativeListener from 'react-native-listener'

import SearchActions from "../../../Redux/SearchRedux"
import ABInputer from "../../ABInputer"
import Result from "./Search/Result";

const MAX_RESULTS = 20

const PRODUCTS = [
    'SLOTS',
    'LIVE',
    'SPORTS',
    'LOTTERY',
]
class SearchMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            selectedCategory: 'SLOTS',
            searchCount: 0,
            result: props.search.data || {}
        }
    }

    componentDidMount() {
        // document.querySelector('.menu-search-toolbar__close').addEventListener('click', this.props.hide);
        this.clear.addEventListener('click', this._clear)
        // this.submenu.addEventListener('click', this.props.stopper)
    }

    componentWillReceiveProps(newProps) {
        if (!this.props.isExpanded && newProps.isExpanded) {
            this.input.focus()
        }
        if (this.props.isExpanded && !newProps.isExpanded) {
            this.reset()
        }
        if (newProps.search !== this.props.search) {
            this.setState({
                result: newProps.search.data
            })
        }
    }

    _searchTermChange = (value) => {
        let term = value.trim()

        const searchCount = term.length > 1 ? this.state.searchCount+1 : this.state.searchCount
        this.setState({
            searchTerm: term,
            searchCount: searchCount
        }, () => {
            this.state.searchTerm.length > 1 && this.props.doSearch({
                keyword: this.state.searchTerm,
            })
        })
    }

    _clear = (e) => {
        !!e && e.stopPropagation()
        !!e && e.preventDefault()
        this.setState({
            searchTerm: '',
            result: {},
            selectedCategory: 'SLOTS',
            searchCount: 0,
        })
        this.input.reset()
        !!e && this.input.focus()
    }

    _toggle = (event) => {
        this.props.toggle(event)
    }

    reset = () => {
        this._clear(null)
    }

    hasProduct = (product) => {
        const {result} = this.state
        return !!result && !!this.state.searchTerm && result.hasOwnProperty(product) && !this.props.search.fetching ? result[product].length : 0
    }

    showProduct = (product) => {
        return function (e) {
            e.stopPropagation()
            product !== this.state.selectedCategory && this.setState({
                selectedCategory: product
            })
        }.bind(this)
    }

    render() {
        const {t} = this.props

        return (
            <div className="menu-item js-menu-search">
                <a className="menu-link menu-link--last menu-link--search menu-link--icon" onClick={this._toggle}>
                    <svg viewBox="0 0 14.69 16" className="menu-icon-svg menu-icon-svg--search"><use xlinkHref="#icon-search2"/></svg>
                </a>
                {/* gog-menu-search="" */}
                <div className="menu-submenu menu-search">
                    <NativeListener onClick={e => e.stopPropagation() && alert('clicked')}>
                    <div className="menu-search-toolbar">
                        <svg viewBox="0 0 32 32" className="menu-search-icon"><use xlinkHref="#icon-search2"/></svg>
                        <div className="menu-search-input">
                            <ABInputer
                                valueChanger={this._searchTermChange}
                                defaultValue={this.state.searchTerm}
                                type={'search'}
                                classes={['menu-search-input__field', 'js-menu-search-input']}
                                ref={ref => this.input = ref}
                            />
                            <a
                                className={`menu-search-input__clear menu-search-loader menu-uppercase${this.state.searchTerm.length > 0 ? '' : ' ng-hide'}${this.props.search.fetching ? ' is-loading' : ''}`}
                                ref={r => this.clear = r}
                            >
                                {t('clear')}
                                <span className="menu-search-loader__ball"/>
                                <span className="menu-search-loader__ball"/>
                                <span className="menu-search-loader__ball"/>
                                <span className="menu-search-loader__ball"/>
                            </a>
                        </div>
                        {PRODUCTS.map(p => {
                            return (
                                <NativeListener key={p} onClick={this.showProduct(p)}>
                                    <a className={`menu-search-toolbar__results-count menu-uppercase _clickable${this.hasProduct(p) ? '' : ' ng-hide'}${this.state.selectedCategory === p ? ' is-active' : ''}`}>
                                        <svg className={`icon-svg`}>
                                            <use xlinkHref={`#icon-${p.toLowerCase()}`}/>
                                        </svg>
                                        {/* is-highlighted menu-item__count--cart */}
                                        <span className={`menu-item__count`}>{this.hasProduct(p)}</span>
                                        <span className="menu-triangle menu-triangle--centered"/>
                                    </a>
                                </NativeListener>
                            )
                        })}
                        {/* ng-click="menu.hide($event, 'search')" */}
                        <NativeListener onClick={e => {this._clear(null); this._toggle(e)}}>
                            <a className="menu-search-toolbar__close _clickable">
                                <svg viewBox="0 0 32 32" className="menu-icon-svg"><use xlinkHref="#icon-close4"/></svg>
                            </a>
                        </NativeListener>
                    </div>
                    </NativeListener>
                    {/* ng-show="search.selectedCategoryProducts.length == 0 &amp;&amp; search.searchCount > 0 &amp;&amp; !search.isLoading" */}
                    {/* no result */}
                    {/* ${(this.state.selectedCategoryProducts.length === 0 && this.searchCount > 0 && !this.state.isLoading) ? '' : ' ng-hide'} */}
                    <div className={`menu-search__no-results${!this.hasProduct(this.state.selectedCategory) && this.state.searchCount > 0 && !!this.state.searchTerm && !this.props.search.fetching ? '' : ' ng-hide'}`}>
                        <div className="menu-search-empty">
                            <div className="menu-search-empty__header menu-uppercase">
                                <svg viewBox="0 0 32 32" className="menu-search-empty__header-icon"><use xlinkHref="#icon-search2"/></svg>
                                {' '}
                                未找到结果
                            </div>
                            <hr className="menu-search-empty__line"/>
                            <div className="menu-search-empty__description">
                                请尝试调整您搜索的关键词。
                            </div>
                            {/* ng-show="search.selectedCategory == 'games'" */}
                            <Link to="/slots" className={`menu-btn menu-search-empty__btn menu-uppercase ng-hide`}>
                                浏览所有游戏
                            </Link>
                            {/* ng-show="search.selectedCategory == 'movies'" */}
                            <Link to="/live" className={`menu-btn menu-search-empty__btn menu-uppercase ng-hide`}>
                                浏览影片
                            </Link>
                        </div>
                    </div>
                    {/* ng-show="search.selectedCategoryProducts.length" */}
                    {/* result list */}
                    {/* ${this.state.selectedCategoryProducts.length ? '' : ' ng-hide'} */}
                    <Result
                        data={this.hasProduct(this.state.selectedCategory) ? this.state.result[this.state.selectedCategory] : []}
                        isShow={this.hasProduct(this.state.selectedCategory)}
                        searchCount={this.state.searchCount}
                    />
                </div>
            </div>
        )
    }
}

SearchMenu.propTypes = {
    toggle: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    doSearch: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    doSearch: (params) => dispatch(SearchActions.searchRequest(params)),
});

const mapStateToProps = (state) => {
    return {
        search: state.search,
        auth: state.auth,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(translate()(SearchMenu))