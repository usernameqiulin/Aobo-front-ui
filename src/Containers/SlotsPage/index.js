/**
 * Created by darkmoon on 7/2/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import queryString from 'query-string'
import {Helmet} from "react-helmet"
import {translate} from "react-i18next"
import { withCookies, Cookies } from 'react-cookie'
import R from 'ramda'
import GoogleAnalytics from 'react-ga'
import moment from 'moment'

import SlotsFiltersActions from "../../Redux/SlotsFiltersRedux"
import GamesActions from "../../Redux/GamesRedux"
import withDropdown from "../../Components/withDropdown"
import SlotsHeaderViewDropdown from "../../Components/SlotsHeaderViewDropdown"
import SlotsHeaderSortDropdown from "../../Components/SlotsHeaderSortDropdown"
import {isMobile, flattenFavorite} from "../../helper"
import Paginate from "../../Components/Paginate"
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import ABSpinner from "../../Components/ABSpinner"
import SlotsCard from '../../Components/Card/Slots'

import './index.css'

import FilterSectionFactory from "../../Components/Filter/FilterSectionFactory"
import SpotsContainer from "../../Components/Spot/SpotsContainer"

const ViewDropdown = withDropdown(SlotsHeaderViewDropdown)
const SortDropdown = withDropdown(SlotsHeaderSortDropdown)


const DEFAULT_PARAMS = {
    page: 1,
    sort: 'popularity',
}

const FILTER_SLUGS = [
    'categories',
    'brands',
    'keyword',
    'sort',
]

class SlotsPage extends Component {

    constructor(props) {
        super(props);

        this.latestVisit = this.props.games.latestVisit;   //只有页面重新加载后才会更新latestVisit

        this.state = {
            params: queryString.parse(props.location.search),
            viewMode: props.cookies.get('viewMode') || 'grid',
        }
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('slotsPage')
        })
    }

    componentWillMount() {
        // !this.props.filters.fetching && !this.props.filters.data && this.props.getFilters()
    }

    componentDidMount() {
        this.props.setLatestVisit(moment());   //更新最新访问时间

        if (!this.state.params.page || !this.state.params.sort) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: this.state.params.page ? this.state.params.page : DEFAULT_PARAMS.page,
                    sort: this.state.params.sort ? this.state.params.sort : DEFAULT_PARAMS.sort,
                }
            }, () => this.updateUrl('replace'))
        }
        else {
            !!this.state.params.page && !!this.state.params.sort && !this.props.games.fetching && this.doQuery()
        }
        // if (!this.state.params.page || !this.state.params.sort) {
        //     this.setState({
        //         params: {
        //             ...this.state.params,
        //             page: this.state.params.page ? this.state.params.page : DEFAULT_PARAMS.page,
        //             sort: this.state.params.sort ? this.state.params.sort : DEFAULT_PARAMS.sort,
        //         }
        //     }, () => this.updateUrl())
        // }
        // !!this.props.location.search && !this.props.games.data && this.state.params.page && this.state.params.sort && this._doFilter()
    }

    componentDidUpdate(prevProps) {
        if (!this.props.location.search) {
            this.setState({
                params: DEFAULT_PARAMS,
            }, () => {
                this.updateUrl('replace')
            })
        }
        else if (this.props.location.search !== prevProps.location.search) {
            this.doQuery()
        }
    }

    updateUrl = (type) => {
        delete this.state.params.product
        const url = this.props.match.path + '?' + queryString.stringify(this.state.params)
        if (type && type === 'replace') {
            this.props.history.replace(url)
        } else {
            this.props.history.push(url)
        }
    }

    isFiltered = () => {
        return FILTER_SLUGS.filter((f) => {
            if (f === 'sort') {
                return !!this.state.params[f] && this.state.params[f] !== DEFAULT_PARAMS.sort
            }
            if (f === 'keyword') {
                return !!this.state.params.keyword
            }
            return Object.keys(this.state.params).includes(f)
        }).length > 0
    }

    _changePage = (p) => {
        if (p !== parseInt(this.state.params.page) && p > 0) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: p,
                },
            }, () => this.updateUrl())
        }
    }

    _clearFilters = () => {
        this.setState({
            params: DEFAULT_PARAMS,
        }, () => {
            this.filter.reset()
            this.updateUrl()
        })
    }

    _switcherViewMode = (mode) => {
        this.props.cookies.set('viewMode', mode, {maxAge: 60*60*24*999})
        this.setState({
            viewMode: mode,
        })
    };

    _switcherSort = (mode) => {
        let {params} = {...this.state}
        params.sort = mode
        this.setState({
            params: params,
        }, () => this.updateUrl())
    }

    onKeywordChange = (keyword) => {
        // let {params} = {...this.state}
        let key = keyword.trim()
        if(key.length === 0) key = undefined
        // if (params.keyword.length < 3) return
        this.setState({
            params: {
                ...this.state.params,
                keyword: key,
                page: 1,
            },
        }, () => {
            ((!!key && key.length >= 2) || typeof(key) === 'undefined') && this.updateUrl()
        })
    }

    _filterChange = (filter) => {
        let params = R.merge(this.state.params, {})

        params[filter.slug] = filter.selected

        filter.selected.length > 0 ? params[filter.slug] = filter.selected.join(',') : delete params[filter.slug]
        params.page = 1

        this.setState({
            params: params,
        }, () => this.updateUrl())
    }

    doQuery = () => {
        window.scrollTo(0, 0)
        this.props.getGames(this.state.params)
    }

    _genBrandChoices = () => {
        let brands = []
        !!this.props.config.data && this.props.config.data.brand.map(b => brands.push({
            icon: '<svg class=icon-svg><use xlink:href="#icon-' + b.code.toLowerCase() + '"/></svg>',
            title: b.name,
            slug: b.code,
            disabled: b.status === 'CLOSED',
        }))
        return brands
    }

    _genCategoryChoices = () => {
        let categories = []
        !!this.props.config.data && this.props.config.data.categories.map(b => categories.push({
            title: b.name,
            slug: b.id,
        }))
        return categories
    }

    newFilter = (updateAt) => {
        const newDay = 3;
        const updateTime = moment(updateAt).utcOffset(this.props.config.data.timezone)
        if(this.latestVisit){
            return updateTime > this.latestVisit ? 1 : 0;
        }else{   //第一次访问
            return moment().subtract(newDay, 'days') < updateTime ? 1 : 0;
        } 
    }

    FILTERS = [
        {
            title: 'Category',
            slug: 'categories',
            choices: this._genCategoryChoices(),
            is_grouped: false,
            is_multichoice: true,
        },
        {
            title: 'brand',
            slug: 'brands',
            choices: this._genBrandChoices(),
            is_grouped: false,
            is_multichoice: true,
        },
        {
            title: 'Lines',
            slug: 'lines',
            choices: [
                {
                    title: '1 - 5线',
                    slug: '1,5'
                },
                {
                    title: '6 - 10线',
                    slug: '6,10'
                },
                {
                    title: '11 - 15线',
                    slug: '11,15'
                },
                {
                    title: '16 - 20线',
                    slug: '16,20'
                },
                {
                    title: '21 - 25线',
                    slug: '21,25'
                },
                {
                    title: '26 - 60线',
                    slug: '26,60'
                },
                {
                    title: '61+',
                    slug: '61,'
                },
            ],
            is_grouped: false,
            is_multichoice: false,
        },
    ]

    render() {
        const { t, games, favorite } = this.props

        return (
            <div className="slots-wrapper cf">
                <Helmet>
                    <title>{t('AB Gaming')} : {t('slotsPage')}</title>
                    <meta name="description" content={t('slotsPageMetaDescription')} />
                </Helmet>
                <ScrollToTopOnMount/>
                <var className="css-data-holder"/>
                <div className="nav-spacer menu-spacer"/>
                <SpotsContainer/>
                <div className="container page-header module-header cf">
                    <h1 className="header__title">{t('total_games', {total: !!games.data ? games.data.meta.total : 0})}</h1>
                    <div className={`header__clear _clickable${this.isFiltered() ? '' : ' ng-hide'}`} onClick={this._clearFilters}>
                        <i className="ic icon-close2 header__clear-icon"/>
                        {t('clear filters')}
                    </div>
                    <div className="header__switches cf">
                        <div className="header__switch">
                            {t('view')}{t('colon')}
                            <ViewDropdown current={this.state.viewMode} switcher={this._switcherViewMode}/>
                        </div>
                        <div className="header__switch">
                            {t('order')}{t('colon')}
                            <SortDropdown current={this.state.params.sort} switcher={this._switcherSort}/>
                        </div>
                    </div>
                </div>
                <section className={`container slots-filters`}>
                    <FilterSectionFactory
                        search={{
                            keyword: this.state.params.keyword,
                            onChange: this.onKeywordChange,
                        }}
                        filters={this.FILTERS}
                        params={this.state.params}
                        t={t}
                        onSelectChange={this._filterChange}
                        ref={ref => this.filter = ref}
                        isLoading={games.fetching}
                    />
                </section>
                <div className={`list container cf ${this.state.viewMode === 'list' ? 'list--rows' : ''} ${this.state.viewMode === 'grid' ? 'list--grid' : ''}`}>
                    <div className="list-inner">
                        <div>
                            {this.props.games.data && this.props.games.data.meta.total > 0 &&
                            this.props.games.data.data.map(p => {
                                return <SlotsCard
                                    key={p.id}
                                    product={p}
                                    isNew={!!p.timestamps ? !!this.newFilter(p.timestamps.updateAt) : false}
                                    module={'SlotsPage'}
                                    favorites={!!favorite.data ? flattenFavorite(favorite.data.data) : []}
                                />
                            })}
                        </div>
                    </div>
                </div>
                <Paginate totalPages={this.props.games.data ? this.props.games.data.meta.last_page : 1}
                          change={this._changePage}
                          currentPage={parseInt(this.state.params.page)}
                          extraClasses="list__pagination no-hl"
                />
                <ABSpinner
                    hidden={
                        (!games.fetching && !!games.error)
                        || !((!games.data || (!!games.data && games.data.meta.total === 0)) && games.fetching)
                    }
                    color={''}
                    size={'big'}
                />
                <div className={`container list__message${games.fetching || (!games.fetching && !games.error && !!games.data && games.data.meta.total > 0) ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
            </div>
        )
    }
}

SlotsPage.propTypes = {
    getFilters: PropTypes.func.isRequired,
    getGames: PropTypes.func.isRequired,
    setLatestVisit: PropTypes.func.isRequired,
    filters: PropTypes.object.isRequired,
    games: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    favorite: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    cookies: PropTypes.instanceOf(Cookies).isRequired,
}

const mapStateToProps = (state) => {
    return {
        filters: state.slotsFilters,
        games: state.games,
        profile: state.profile,
        favorite: state.favorite,
        config: state.config,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getFilters: () => dispatch(SlotsFiltersActions.filtersRequest()),
    getGames: (params) => dispatch(GamesActions.gamesRequest(params)),
    setLatestVisit: (time) => dispatch(GamesActions.gamesLatestVisit(time)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(withCookies(SlotsPage)))
