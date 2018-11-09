import React from 'react'
import PropTypes from 'prop-types'

import Grouped from "./Grouped"
import Paginated from "./Paginated"

import './Filter.css'
import Search from "./Search"
import AmountRange from "./AmountRange"
import TimeRange from "./TimeRange"

class FilterSectionFactory extends React.Component {

    constructor(props) {
        super(props)
        let state = {
            areFiltersVisibleOnSmallScreen: false,
        }
        !!props.inputRanges && props.inputRanges.map(r => {
            state['min_' + r.slug] = props.params['min_' + r.slug] || ''
            state['max_' + r.slug] = props.params['max_' + r.slug] || ''
        })
        this.state = state
    }

    toggle = () => this.setState({areFiltersVisibleOnSmallScreen: !this.state.areFiltersVisibleOnSmallScreen})

    _getPaginated = (filter) => {
        if (!filter.is_grouped) {
            const totalPages = Math.ceil(filter.choices.length/process.env.REACT_APP_FILTER_PAGESIZE)
            let pages = []
            for (let i = 0; i < totalPages; i++) {
                pages.push(filter.choices.slice(i * process.env.REACT_APP_FILTER_PAGESIZE, (i+1) * process.env.REACT_APP_FILTER_PAGESIZE))
            }
            return {...filter, totalPages, pages}
        }
        return filter
    }

    onApplyAmountRange = (slug) => {
        let a = [,], obj = {}
        obj.slug = slug
        a[0] = this.state['min_' + slug]
        a[1] = this.state['max_' + slug]
        obj.selected = a
        this.props.onSelectChange(obj)
    }

    onAmountChange = (obj) => {
        this.setState({
            ...this.state,
            ...obj,
        })
    }

    onAmountReset = (slug) => {
        let obj = {}
        obj['min_' + slug] = obj['max_' + slug] = ''
        this.setState({
            ...this.state,
            ...obj,
        }, () => this.onApplyAmountRange(slug))
    }

    reset = () => {
        let state = {}
        !!this.props.inputRanges && this.props.inputRanges.map(r => {
            state['min_' + r.slug] = ''
            state['max_' + r.slug] = ''
        })
        this.props.timeRange && this.timeRange.reset()
        !!this.props.search && this.search.reset()
        this.setState(state)
    }

    render() {
        //                    extraClass={!!this.props.search?'filters__section--alter-on-big-screens':''}
        const {t} = this.props
        return (
            <div className={`module module--filters filters${this.state.areFiltersVisibleOnSmallScreen ? ' filters--visible-on-small-screen' : ''}`}>
                <div className="filters__control">
                    <div className="filtr filter--toggle-filters" onClick={this.toggle}>
                        {t('filters')}
                        <i className="ic ic--small icon-dropdown-down filter__icon"/>
                    </div>
                </div>
                {!!this.props.search &&
                <Search
                    isLoading={this.props.isLoading}
                    onKeywordChange={this.props.search.onChange}
                    t={t}
                    keyword={this.props.search.keyword}
                    ref={ref => this.search = ref}
                />}
                {!!this.props.timeRange &&
                <TimeRange
                    onChange={this.props.onSelectChange}
                    withTime={this.props.timeRange.withTime}
                    isLoading={this.props.isLoading && !this.props.search}
                    value={[this.props.params.start_time, this.props.params.end_time]}
                    available={this.props.timeRange.available}
                    ref={ref => this.timeRange = ref}
                    t={t}
                />}
                {!!this.props.inputRanges && this.props.inputRanges.map((r, i) => <AmountRange
                    key={i}
                    slug={r.slug}
                    t={t}
                    onChange={this.onApplyAmountRange}
                    onInputChange={this.onAmountChange}
                    value={{min: this.state['min_' + r.slug], max: this.state['max_' + r.slug]}}
                    onReset={this.onAmountReset}
                    title={t(r.title)}
                />)}
                {!!this.props.filters && this.props.filters.map(v => {
                    const filter = this._getPaginated(v), 
                    selected = 
                        Object.prototype.hasOwnProperty.call(this.props.params, filter.slug) 
                        ? 
                        (filter.is_multichoice ? this.props.params[filter.slug].split(',') : [this.props.params[filter.slug]])  
                        : 
                        []
                    
                    if (filter.is_grouped) {
                        return (
                            <Grouped
                                key={filter.slug}
                                filter={filter}
                                filterChange={this.props.onSelectChange}
                                selected={selected}
                            />
                        )
                    }
                    if (filter.is_multichoice) {
                        return (
                            <Paginated
                                key={filter.slug}
                                filter={filter}
                                filterChange={this.props.onSelectChange}
                                selected={selected}
                            />
                        )
                    }
                    if (!filter.is_multichoice) {
                        return (
                            <Paginated
                                key={filter.slug}
                                filter={filter}
                                filterChange={this.props.onSelectChange}
                                selected={selected}
                            />
                        )
                    }
                })}
            </div>
        )
    }
}

FilterSectionFactory.propTypes = {
    //choices
    filters: PropTypes.array,
    //search input
    search: PropTypes.object,
    //input ranges
    inputRanges: PropTypes.array,
    //time range
    timeRange: PropTypes.object,
    onSelectChange: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
}

export default FilterSectionFactory