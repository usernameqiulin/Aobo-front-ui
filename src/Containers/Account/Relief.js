import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import queryString from "query-string"
import R from "ramda"
import moment from "moment/moment"
import GoogleAnalytics from 'react-ga'

import ReliefActions from '../../Redux/ReliefRedux'
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import ABSpinner from "../../Components/ABSpinner"
import Paginate from "../../Components/Paginate"
import ReliefRecord from '../../Components/Account/Record/Relief'
import FilterClearButton from "../../Components/Filter/FilterClearButton"
import FilterSectionFactory from '../../Components/Filter/FilterSectionFactory'
import ReliefForm from '../../Components/Form/Relief'
import {amountFormat} from "../../helper";

const FILTER_SLUGS = [
    'product',
    'min_amount',
    'max_amount',
    'start_time',
    'end_time',
    'sort',
]
const MAX = moment().endOf('day'), MIN = moment().add(-process.env.REACT_APP_RECORD_MAX_DAYS*12, 'days').startOf('day')

const DEFAULT_PARAMS = {
    page: 1,
    sort: 'created_at.desc',
    start_time: MIN.format(process.env.REACT_APP_DATE_FORMAT),
    end_time: MAX.format(process.env.REACT_APP_DATE_FORMAT),
}

const FILTERS = [
    {
        title: 'product',
        slug: 'product',
        choices: [
            {
                icon: '<svg class=icon-svg><use xlink:href="#icon-slots"/></svg>',
                title: 'SLOTS',
                slug: 'SLOTS',
                disabled: false,
            },
            {
                icon: '<svg class=icon-svg><use xlink:href="#icon-live"/></svg>',
                title: 'LIVE',
                slug: 'LIVE',
                disabled: true,
            },
            {
                icon: '<svg class=icon-svg><use xlink:href="#icon-lottery"/></svg>',
                title: 'LOTTERY',
                slug: 'LOTTERY',
                disabled: true,
            },
            {
                icon: '<svg class=icon-svg><use xlink:href="#icon-sports"/></svg>',
                title: 'SPORTS',
                slug: 'SPORTS',
                disabled: true,
            },
        ],
        is_grouped: false,
        is_multichoice: true,
    },
],

INPUTRANGES = [
    {
        slug: 'amount',
        title: 'Amount',
    }
]



/**
 * @todo: currencySymbolAfter
 */
class Relief extends React.Component {

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('relief')
        })
    }

    state = {
        params: queryString.parse(this.props.location.search),
    }

    componentDidMount() {
        if (!this.state.params.page || !this.state.params.start_time || !this.state.params.end_time || !this.state.params.sort) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: this.state.params.page ? this.state.params.page : 1,
                    start_time: this.state.params.start_time ? this.state.params.start_time : DEFAULT_PARAMS.start_time,
                    end_time: this.state.params.end_time ? this.state.params.end_time : DEFAULT_PARAMS.end_time,
                    sort: this.state.params.sort ? this.state.params.sort : DEFAULT_PARAMS.sort,
                }
            }, () => this.updateUrl('replace'))
        }
        else {
            !!this.state.params.page && !!this.state.params.start_time && !!this.state.params.end_time && !!this.state.params.sort && !this.props.relief.fetching && this.doQuery()
        }
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
        const url = this.props.match.path + '?' + queryString.stringify(this.state.params)
        if (type && type === 'replace') {
            this.props.history.replace(url)
        } else {
            this.props.history.push(url)
        }
    }

    onPageChange = (p) => {
        if (p !== parseInt(this.state.params.page) && p > 0) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: p,
                },
            }, () => this.updateUrl())
        }
    }

    clearFilters = () => {
        this.setState({
            params: DEFAULT_PARAMS,
        }, () => {
            this.refs['filter'].reset()
            this.updateUrl()
        })
    }

    isFiltered = () => {
        return FILTER_SLUGS.filter((f) => {
            if (f === 'sort') {
                return !!this.state.params[f] && this.state.params[f] !== 'created_at.desc'
            }
            if (f === 'start_time' || f === 'end_time') {
                return this.state.params[f] && this.state.params[f] !== DEFAULT_PARAMS[f]
            }
            return Object.keys(this.state.params).includes(f)
        }).length > 0
    }

    onFilterChange = (filter) => {
        let params = R.merge(this.state.params, {})

        if (filter.slug === 'amount') {
            if (filter.selected[0]) {
                params['min_' + filter.slug] = filter.selected[0]
            } else {
                delete params['min_' + filter.slug]
            }
            if (filter.selected[1]) {
                params['max_' + filter.slug] = filter.selected[1]
            } else {
                delete params['max_' + filter.slug]
            }
        } else if (filter.slug === 'time') {
            if (filter.selected[0]) {
                params['start_' + filter.slug] = filter.selected[0]
            } else {
                delete params['start_' + filter.slug]
            }
            if (filter.selected[1]) {
                params['end_' + filter.slug] = filter.selected[1]
            } else {
                delete params['end_' + filter.slug]
            }
        } else {
            params[filter.slug] = filter.selected
            filter.selected.length > 0 ? params[filter.slug] = filter.selected.join(',') : delete params[filter.slug]
        }

        this.setState({
            params: params,
        }, () => this.updateUrl())
    }

    doQuery = () => {
        window.scrollTo(0, 0)
        this.props.getRelief(this.state.params)
    }

    render() {
        const {t, profile, relief} = this.props
        let subtotal = 0

        return (
            <div className={`container account cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('relief')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        filters={FILTERS}
                        inputRanges={INPUTRANGES}
                        timeRange={{
                            slug: 'time',
                            withTime: false,
                            available: [MIN, MAX],
                        }}
                        params={this.state.params}
                        t={t}
                        onSelectChange={this.onFilterChange}
                        ref={'filter'}
                        isLoading={relief.fetching}
                    />
                </section>
                <div className="module-header wallet__module-header cf has-btn">
                    <h1 className={`header__title`}>
                        {t('Relief records')}
                        {!!profile.data && <span className={`wallet-transactions__info`}>(GMT{profile.data.timezone})</span>}
                    </h1>
                    <FilterClearButton clearFunc={this.clearFilters} label={t('clear_filters')} isFiltered={this.isFiltered()}/>
                    <ReliefForm/>
                </div>
                <ABSpinner hidden={!((!relief.data || (!!relief.data && relief.data.meta.total === 0)) && relief.fetching)} size={'big'}/>
                <div className={`wallet-transactions${!!relief.data && relief.data.meta.total > 0 ? '' : ' ng-hide'}`}>
                    <div className="wallet-transactions__head">
                        <div className="wallet-transactions__header wallet-transactions__header--date">{t('date')}</div>
                        <div className="wallet-transactions__header wallet-rebate__header--name">{t('transaction name')}</div>
                        <div className="wallet-transactions__header wallet-rebate__header--balance-change">{t('Amount')}</div>
                    </div>
                    {
                        relief.data && relief.data.meta.total > 0 && relief.data.data.map((r, i) => {
                            subtotal += r.amount
                            return <ReliefRecord
                                record={r}
                                key={i}
                                timezone={profile.data.timezone}
                                t={t}
                                detailLabel={t('Show details')}
                            />
                        })
                    }
                    <div className={`wallet-transactions__foot`}>
                        <div className="wallet-transactions__footer wallet-transactions__header--date">{t('subtotal')}</div>
                        <div className={`wallet-transactions__footer wallet-rebate__header--name`}/>
                        <div className={`wallet-transactions__footer wallet-rebate__header--balance-change`}>
                            <b className={`wallet-transactions__change wallet-transactions__change--plus`}>
                                <span className={`_price`}>
                                    {amountFormat(subtotal)}
                                </span>
                            </b>
                        </div>
                    </div>
                </div>
                <div className={`container list__message${relief.fetching || (!relief.fetching && !relief.error && !!relief.data && relief.data.meta.total > 0) ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <Paginate
                    totalPages={relief.data ? relief.data.meta.last_page : 1}
                    change={this.onPageChange}
                    currentPage={relief.data ? relief.data.meta.current_page : 1}
                    extraClasses="list__pagination no-hl"
                />
            </div>
        )
    }
}

Relief.propTypes = {
    auth: PropTypes.object.isRequired,
    relief: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getRelief: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        relief: state.relief,
        profile: state.profile,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRelief: params => dispatch(ReliefActions.reliefRequest(params)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Relief))