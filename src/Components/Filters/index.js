import React from 'react'
import PropTypes from 'prop-types'

import GroupFilter from "./GroupFilter"
import PaginatedFilter from "./PaginatedFilter"
import Search from "./Search"

class SlotsFilter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            showFilters: !1,
        }
    }

    _toggleFilter = () => {
        this.setState({
            showFilters: !this.state.showFilters,
        })
    }

    _getPaginated = (filter) => {
        // console.log(filter)
        if (!filter.is_grouped) {
            const totalPages = Math.ceil(filter.choices.length/process.env.REACT_APP_FILTER_PAGESIZE)
            let pages = []
            for (let i = 0; i < totalPages; i++) {
                pages.push(filter.choices.slice(i * process.env.REACT_APP_FILTER_PAGESIZE, (i+1) * process.env.REACT_APP_FILTER_PAGESIZE))
            }
            // console.log(Object.assign(filter, paginate))
            // console.log(filter)
            return {...filter, totalPages, pages}
        }
        return filter
    }

    render() {
        const { t } = this.props
        return (
            <section className="container filters">
                <div className="module module--filters cf">
                    <Search t={t} keyword={this.props.params.keyword || ''} changeFunc={this.props.onKeywordChange} loading={this.props.loading}/>
                    <div className="filter__dropdown-toggle hide-on-big-filters" onClick={this._toggleFilter}>
                        {t('filters')}
                        <i className="ic ic--small icon-dropdown-down"/>
                    </div>
                    <div className={`filters__dropdowns cf${this.state.showFilters ? ' is-filter-expanded' : ''}`}>
                        <span className={`${!this.props.filters.fetching ? 'ng-hide' : ''}`}>
                            <div className="filter filter--category _dropdown is-contracted">
                                Genre <i className="ic ic--small icon-dropdown-down"/>
                            </div>
                            <div className="filter filter--system _dropdown is-contracted">
                                System <i className="ic ic--small icon-dropdown-down"/>
                            </div>
                            <div className="filter filter--language _dropdown is-contracted">
                                Language <i className="ic ic--small icon-dropdown-down"/>
                            </div>
                            <div className="filter filter--feature _dropdown is-contracted">
                                Features <i className="ic ic--small icon-dropdown-down"/>
                            </div>
                            <div className="filter filter--release _dropdown is-contracted">
                                Release <i className="ic ic--small icon-dropdown-down"/>
                            </div>
                            <div className="filter filter--devpub _dropdown is-contracted">
                                Company <i className="ic ic--small icon-dropdown-down"/>
                            </div>
                            <div className="filter filter--price _dropdown is-contracted">
                                Price <i className="ic ic--small icon-dropdown-down"/>
                            </div>
                        </span>
                        <span>
                            {/* ng-className="{ 'is-selected': filter.isSelected() }" */}
                            {!this.props.filters.fetching && this.props.filters.data && this.props.filters.data.map((v, i) => {
                                const filter = this._getPaginated(v), selected = Object.prototype.hasOwnProperty.call(this.props.params, filter.slug) ? this.props.params[filter.slug].split(',') : []
                                if (filter.is_grouped) {
                                    // return null;
                                    return (
                                        <GroupFilter
                                            key={filter.slug}
                                            filter={filter}
                                            filterChange={this.props.onSelectChange}
                                            selected={selected}
                                        />
                                    )
                                }
                                if (filter.is_multichoice) {
                                    // return null;
                                    return (
                                        <PaginatedFilter
                                            key={filter.slug}
                                            filter={filter}
                                            filterChange={this.props.onSelectChange}
                                            selected={selected}
                                        />
                                    )
                                }
                                if (!filter.is_multichoice) {
                                    // return null;
                                    return (
                                        <PaginatedFilter
                                            key={filter.slug}
                                            filter={filter}
                                            filterChange={this.props.onSelectChange}
                                            selected={selected}
                                        />
                                    )
                                }
                            })}
                        </span>
                    </div>
                </div>
            </section>
        )
    }
}
SlotsFilter.propTypes = {
    filters: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    onKeywordChange: PropTypes.func,
    keyword: PropTypes.string,
    onSelectChange: PropTypes.func,
    t: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
}
export default SlotsFilter