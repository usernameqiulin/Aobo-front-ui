import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import queryString from "query-string"
import R from "ramda"
import GoogleAnalytics from 'react-ga'
import moment from "moment/moment"

import RebateActions from '../../Redux/RebateRedux'
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import ABSpinner from "../../Components/ABSpinner"
import RebateRecord from "../../Components/Account/Record/Rebate"
import Paginate from "../../Components/Paginate"
import FilterClearButton from "../../Components/Filter/FilterClearButton"
import FilterSectionFactory from '../../Components/Filter/FilterSectionFactory'
import {amountFormat} from "../../helper"
import RebateForm from '../../Components/Form/Rebate'

const FILTER_SLUGS = [
    'product',
    'min_amount',
    'max_amount',
    'start_time',
    'end_time',
    'status',
    'sort',
]
const MAX = moment().endOf('day'), MIN = moment().add(-process.env.REACT_APP_RECORD_MAX_DAYS*8, 'days').startOf('day')

const DEFAULT_PARAMS = {
    page: 1,
    sort: 'created_at.desc',
    start_time: MIN.format(process.env.REACT_APP_DATE_FORMAT),
    end_time: MAX.format(process.env.REACT_APP_DATE_FORMAT),
}

const INPUTRANGES = [
    {
        slug: 'amount',
        title: 'Amount',
    }
]

class Rebate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            params: queryString.parse(this.props.location.search),
            isSlotsOpen: props.location.hash === '#slots',
            isLiveOpen: props.location.hash === '#live',
            filters: [
                {
                    title: 'product',
                    slug: 'product',
                    choices: this._genProductChoices(),
                    is_grouped: false,
                    is_multichoice: true,
                },
                {
                    title: 'status',
                    slug: 'status',
                    choices: [
                        {
                            title: 'success',
                            slug: 'success',
                        },
                        {
                            title: 'processing',
                            slug: 'processing',
                        },
                        {
                            title: 'declined',
                            slug: 'declined',
                        },
                    ],
                    is_grouped: false,
                    is_multichoice: true,
                }
            ]
        }
    }

    _genProductChoices = () => {
        let products = []
        !!this.props.config.data && this.props.config.data.product.map(p => products.push({
            icon: '<svg class=icon-svg><use xlink:href="#icon-' + p.code.toLowerCase() + '"/></svg>',
            title: p.code,
            slug: p.code,
            disabled: ['SLOTS','LIVE'].indexOf(p.code) === -1,
        }))
        return products
    }

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('rebate')
        })
    }

    componentDidMount() {
        if (!this.state.params.page || !this.state.params.start_time || !this.state.params.end_time) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: this.state.params.page ? this.state.params.page : 1,
                    start_time: this.state.params.start_time ? this.state.params.start_time : DEFAULT_PARAMS.start_time,
                    end_time: this.state.params.end_time ? this.state.params.end_time : DEFAULT_PARAMS.end_time,
                }
            }, () => this.updateUrl('replace'))
        }
        else {
            !!this.state.params.page && !!this.state.params.start_time && !!this.state.params.end_time && this.doQuery()
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
        const url = this.props.match.path + '?' + queryString.stringify(this.state.params) + (this.state.isSlotsOpen ? '#slots' : (this.state.isLiveOpen ? '#live' : ''))
        if (type && type === 'replace') {
            this.props.history.replace(url)
        } else {
            this.props.history.push(url)
        }
    }

    onPageChange = (p) => {
        if (p !== parseInt(this.state.params.page, 10) && p > 0) {
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
        this.props.getRebates(this.state.params)
    }

    render() {
        const {t, profile, rebate} = this.props
        let sub_total = 0
        return (
            <div className={`container account cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('rebate')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        filters={this.state.filters}
                        inputRanges={INPUTRANGES}
                        timeRange={{
                            slug: 'time',
                            withTime: false,
                            available: [MIN, MAX],
                        }}
                        params={this.state.params}
                        t={t}
                        onSelectChange={this.onFilterChange}
                        isLoading={rebate.fetching}
                        ref={'filter'}
                    />
                </section>
                <div className="module-header wallet__module-header cf has-btn">
                    <h1 className={`header__title`}>
                        {t('Rebate records')}
                        {!!profile.data && <span className={`wallet-transactions__info`}>(GMT{profile.data.timezone})</span>}
                    </h1>
                    <FilterClearButton clearFunc={this.clearFilters} label={t('clear_filters')} isFiltered={this.isFiltered()}/>
                    <div className={`relief-button`}>
                        <RebateForm timezone={profile.data.timezone}/>
                    </div>
                </div>
                <ABSpinner hidden={!((!rebate.data || (!!rebate.data && rebate.data.meta.total === 0)) && rebate.fetching)} size={'big'}/>
                {!!profile.data &&
                <div className={`wallet-transactions${!!rebate.data && rebate.data.meta.total > 0 ? '' : ' ng-hide'}`}>
                    <div className={`wallet-transactions__head`}>
                        <div className="wallet-transactions__header wallet-transactions__header--date">{t('date')}</div>
                        <div className="wallet-transactions__header wallet-rebate__header--balance-change">{t('Amount')}</div>
                        <div className="wallet-transactions__header wallet-rebate__header--name">{t('transaction name')}</div>
                    </div>
                    {
                        rebate.data && rebate.data.meta.total > 0 && rebate.data.data.map((r, i) => {
                            sub_total += r.bonus
                            return <RebateRecord
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
                        <div className={`wallet-transactions__footer wallet-rebate__header--balance-change`}>
                            <b className={`wallet-transactions__change wallet-transactions__change--plus`}>
                                <span className={`_price`}>
                                    {amountFormat(sub_total)}
                                </span>
                            </b>
                        </div>
                        <div className={`wallet-transactions__footer wallet-rebate__header--name`}/>
                    </div>
                </div>}
                <div className={`container list__message${rebate.fetching || (!rebate.fetching && rebate.error) || (!!rebate.data && rebate.data.meta.total > 0) ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <Paginate
                    totalPages={rebate.data ? rebate.data.meta.last_page : 1}
                    change={this.onPageChange}
                    currentPage={rebate.data ? rebate.data.meta.current_page : 1}
                    extraClasses="list__pagination no-hl"
                />
            </div>
        )
    }
}

Rebate.propTypes = {
    rebate: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getRebates: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        rebate: state.rebate,
        profile: state.profile,
        config: state.config,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRebates: params => dispatch(RebateActions.rebateRequest(params)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Rebate))