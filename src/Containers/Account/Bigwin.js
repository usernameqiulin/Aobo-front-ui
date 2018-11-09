import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import queryString from "query-string"
import R from "ramda"
import GoogleAnalytics from 'react-ga'

import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import ABSpinner from "../../Components/ABSpinner"
import BigwinActions from '../../Redux/BigwinRedux'
import FilterClearButton from "../../Components/Filter/FilterClearButton"
import FilterSectionFactory from '../../Components/Filter/FilterSectionFactory'
import Paginate from "../../Components/Paginate"
import moment from "moment/moment"
import {amountFormat} from "../../helper"
import i18n from "../../i18n"
import BigwinRecord from '../../Components/Account/Record/Bigwin'

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
},

INPUTRANGES = [
    {
        slug: 'amount',
        title: 'Amount',
    }
]

class Bigwin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            params: queryString.parse(props.location.search),
        }
        this.filters = [
            {
                title: 'brand',
                slug: 'brand',
                choices: this._genBrandChoices(),
                is_grouped: false,
                is_multichoice: true,
            },
        ]
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

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('bigwin')
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
            }, () => this.updateUrl())
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

    updateUrl = () => {
        const url = this.props.match.path + '?' + queryString.stringify(this.state.params)
        this.props.history.push(url)
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
        this.props.getBigwin(this.state.params)
    }

    render() {
        const {t, bigwin, profile} = this.props
        let sub_total = 0
        return (
            <div className={`container account cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('bigwin')}</title>
                    {/*<body className={`account-page bigwin-page`}></body>*/}
                </Helmet>
                <ScrollToTopOnMount/>
                <section className={`account__filters`}>
                    <FilterSectionFactory
                        filters={this.filters}
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
                        isLoading={bigwin.fetching}
                    />
                </section>
                <div className="module-header wallet__module-header cf">
                    <h1 className={`header__title`}>
                        {t('Bigwin records')}
                        {!!profile.data && <span className={`wallet-transactions__info`}>(GMT{profile.data.timezone})</span>}
                    </h1>
                    <FilterClearButton clearFunc={this.clearFilters} label={t('clear_filters')} isFiltered={this.isFiltered()}/>
                </div>
                <ABSpinner hidden={!((!bigwin.data || (!!bigwin.data && bigwin.data.meta.total === 0)) && bigwin.fetching)} size={'big'}/>
                <div className={`container list__message${bigwin.fetching || (!bigwin.fetching && !bigwin.error && !!bigwin.data && bigwin.data.meta.total > 0) ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                <div className={`wallet-transactions${!!bigwin.data && bigwin.data.meta.total > 0 ? '' : ' ng-hide'}`}>
                    <div className="wallet-transactions__head">
                        <div className="wallet-transactions__header wallet-transactions__header--date">{t('date')}</div>
                        <div className="wallet-transactions__header wallet-records__header--game">{t('game')}</div>
                        <div className="wallet-transactions__header wallet-records__header--bet">{t('bet')}</div>
                        <div className="wallet-transactions__header wallet-records__header--payout">{t('payout')}</div>
                    </div>
                    {bigwin.data && bigwin.data.meta.total > 0 && bigwin.data.data.map(r => {
                        sub_total += r.bonus
                        return <BigwinRecord
                            key={r.id}
                            record={r}
                            timezone={profile.data.timezone}
                            language={i18n.language}
                        />
                    })}
                    <div className={`wallet-transactions__foot`}>
                        <div className={`wallet-transactions__footer wallet-transactions__header--date`}>
                            {t('subtotal')}
                        </div>
                        <div className={`wallet-transactions__footer wallet-records__header--game`}>
                            <b className={`wallet-transactions__change`}>
                                <span className={`_price`}>
                                    {amountFormat(sub_total)}
                                </span>
                            </b>
                        </div>
                    </div>
                </div>
                <Paginate
                    totalPages={bigwin.data ? bigwin.data.meta.last_page : 1}
                    change={this.onPageChange}
                    currentPage={bigwin.data ? bigwin.data.meta.current_page : 1}
                    extraClasses="list__pagination no-hl"
                />
            </div>
        )
    }
}

Bigwin.propTypes = {
    bigwin: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        bigwin: state.bigwin,
        profile: state.profile,
        config: state.config,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getBigwin: (params) => dispatch(BigwinActions.bigwinRequest(params))
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Bigwin))