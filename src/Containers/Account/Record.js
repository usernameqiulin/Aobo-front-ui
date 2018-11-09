import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import queryString from "query-string"
import moment from "moment"
import R from 'ramda'
import GoogleAnalytics from 'react-ga'

import RecordActions from "../../Redux/RecordRedux"
import ABSpinner from "../../Components/ABSpinner"
import Paginate from "../../Components/Paginate"
import ABGameRecord from "../../Components/Account/Record/Game"
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import i18n from "../../i18n"
import FilterClearButton from "../../Components/Filter/FilterClearButton"
import FilterSectionFactory from '../../Components/Filter/FilterSectionFactory'
import {amountFormat} from "../../helper";

const FILTER_SLUGS = [
    'product',
    'brand',
    'min_bet',
    'max_bet',
    'min_payout',
    'max_payout',
    'start_time',
    'end_time',
    'sort',
]
const TODAY = moment(), MAX = moment().endOf('day'), MIN = moment().add(-process.env.REACT_APP_RECORD_MAX_DAYS*4, 'days').startOf('day')

const DEFAULT_PARAMS = {
    page: 1,
    sort: 'play_time.desc',
    start_time: TODAY.startOf('day').format(process.env.REACT_APP_TIME_FORMAT),
    end_time: MAX.format(process.env.REACT_APP_TIME_FORMAT),
}

const INPUTRANGES = [
    {
        slug: 'bet',
        title: 'bet amount',
    },
    {
        slug: 'payout',
        title: 'payout amount',
    },
]

class Record extends React.Component {

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('Game records')
        })
    }

    _genProductChoices = () => {
        let products = []
        !!this.props.config.data && this.props.config.data.product.map(p => products.push({
            icon: '<svg class=icon-svg><use xlink:href="#icon-' + p.code.toLowerCase() + '"/></svg>',
            title: p.code,
            slug: p.code,
            disabled: false,
        }))
        return products
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

    FILTERS = [
        {
            title: 'product',
            slug: 'product',
            choices: this._genProductChoices(),
            is_grouped: false,
            is_multichoice: true,
        },
        {
            title: 'brand',
            slug: 'brand',
            choices: this._genBrandChoices(),
            is_grouped: false,
            is_multichoice: true,
        },
    ]

    state = {
        params: queryString.parse(this.props.location.search),
    }

    componentDidMount() {
        if (!this.state.params.page || !this.state.params.sort || !this.state.params.start_time || !this.state.params.end_time) {
            this.setState({
                params: {
                    ...this.state.params,
                    page: this.state.params.page ? this.state.params.page : DEFAULT_PARAMS.page,
                    sort: this.state.params.sort ? this.state.params.sort : DEFAULT_PARAMS.sort,
                    start_time: this.state.params.start_time ? this.state.params.start_time : DEFAULT_PARAMS.start_time,
                    end_time: this.state.params.end_time ? this.state.params.end_time : DEFAULT_PARAMS.end_time,
                }
            }, () => this.updateUrl('replace'))
        }
        else {
            !!this.state.params.page && !!this.state.params.sort && !!this.state.params.start_time && !!this.state.params.end_time && this.doQuery()
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
                return !!this.state.params[f] && this.state.params[f] !== 'play_time.desc'
            }
            if (f === 'start_time' || f === 'end_time') {
                return this.state.params[f] && this.state.params[f] !== DEFAULT_PARAMS[f]
            }
            return Object.keys(this.state.params).includes(f)
        }).length > 0
    }

    onFilterChange = (filter) => {
        let params = R.merge(this.state.params, {})

        if (filter.slug === 'bet' || filter.slug === 'payout') {
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
        params.page = 1
        this.setState({
            params: params,
        }, () => this.updateUrl())
    }

    doQuery = () => {
        // window.scrollTo(0, 0)
        this.props.getRecord(this.state.params)
    }

    render() {
        const {t, record, config, profile} = this.props
        let total_bet = 0, total_payout = 0
        return (
            <div className={`container account cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('Game records')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        filters={this.FILTERS}
                        inputRanges={INPUTRANGES}
                        timeRange={{
                            slug: 'time',
                            withTime: true,
                            available: [MIN, MAX],
                        }}
                        params={this.state.params}
                        t={t}
                        onSelectChange={this.onFilterChange}
                        ref={'filter'}
                        isLoading={record.fetching}
                    />
                </section>
                <div className="module-header wallet__module-header cf">
                    <h1 className={`header__title`}>
                        {t('Game records')}
                        {!!profile.data && <span className={`wallet-transactions__info`}>(GMT{profile.data.timezone})</span>}
                    </h1>
                    <FilterClearButton clearFunc={this.clearFilters} isFiltered={this.isFiltered()}/>
                </div>
                <ABSpinner hidden={!((!record.data || (!!record.data && record.data.meta.total === 0)) && record.fetching)} size={'big'}/>
                {
                    record.data && !!record.data.meta && record.data.meta.total > 0 &&
                    <div className={`wallet-transactions`}>
                        <div className="wallet-transactions__head">
                            <div className="wallet-transactions__header wallet-transactions__header--date">{t('play time')}</div>
                            <div className="wallet-transactions__header wallet-records__header--game">{t('game')}</div>
                            <div className="wallet-transactions__header wallet-records__header--round">{t('round')}</div>
                            <div className="wallet-transactions__header wallet-records__header--bet">{t('bet')}</div>
                            <div className="wallet-transactions__header wallet-records__header--payout">{t('payout')}</div>
                        </div>
                        {record.data && record.data.meta.total > 0 && record.data.data.map((r, i) => {
                            total_bet += r.bet
                            total_payout += r.payout
                            return <ABGameRecord
                                record={r}
                                key={i}
                                timezone={profile.data.timezone}
                                language={i18n.language}
                            />
                        })}
                        <div className={`wallet-transactions__foot`}>
                            <div className="wallet-transactions__footer wallet-transactions__header--date">{t('subtotal')}</div>
                            <div className="wallet-transactions__footer wallet-records__header--game"/>
                            <div className="wallet-transactions__footer wallet-records__header--bet">
                                <b className={`wallet-transactions__change wallet-transactions__change--minus`}>
                                    <span className={`_price`}>
                                        {amountFormat(total_bet)}
                                    </span>
                                </b>
                            </div>
                            <div className="wallet-transactions__footer wallet-records__header--payout">
                                <b className={`wallet-transactions__change wallet-transactions__change--plus`}>
                                    <span className={`_price`}>
                                        {amountFormat(total_payout)}
                                    </span>
                                </b>
                            </div>
                        </div>
                    </div>
                }
                <div className={`container list__message${record.fetching || (!record.fetching && !record.error && !!record.data && record.data.meta.total > 0) ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <Paginate
                    totalPages={!!record.data ? record.data.meta.last_page : 1}
                    change={this.onPageChange}
                    currentPage={parseInt(this.state.params.page)}
                    extraClasses="list__pagination no-hl"
                />
            </div>
        )
    }
}

Record.propTypes = {
    auth: PropTypes.object.isRequired,
    record: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getRecord: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        record: state.record,
        config: state.config,
        profile: state.profile,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRecord: (params) => dispatch(RecordActions.recordRequest(params)),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Record))