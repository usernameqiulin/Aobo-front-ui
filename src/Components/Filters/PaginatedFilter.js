import React from 'react'
import PropTypes from 'prop-types'
import Paginate from "../Paginate"
import BaseFilter from "./BaseFilter"
import Choice from "./Choice"

class PaginatedFilter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
        }
    }

    _changePage = (p) => {
        if (p !== this.state.page && p > 0) {
            this.setState({
                currentPage: p,
            })
        }
    }

    _onChoice = (choice) => {
        let {selected} = this.props, i = selected.indexOf(choice)
        if (i !== -1) {
            selected.splice(i, 1)
        } else {
            if (!this.props.filter.is_multichoice) {
                selected = []
            }
            selected.push(choice)
        }
        this.props.filterChange({slug: this.props.filter.slug, selected: selected})
    }

    _onClear = (needFilterChange) => {
        let selected = []
        needFilterChange && this.props.filterChange({slug: this.props.filter.slug, selected: selected})
    }

    render() {
        // console.log(this.props.selected)
        return (
            <BaseFilter {...this.props} selected={this.props.selected} clear={this._onClear}>
                {
                    this.props.filter &&
                    <div>
                        {this.props.filter.pages.map((v, i) => {
                            return (
                                <div key={i}
                                     className={`${ i > 0 ? 'filter-page' : ''}${i === this.state.currentPage - 1 ? '' : ' ng-hide'}`}>
                                    {v.map(c => {
                                        return (
                                            <Choice
                                                key={c.slug}
                                                choice={c}
                                                type={this.props.filter.is_multichoice ? 'checkbox' : 'radio'}
                                                onChoice={this._onChoice}
                                                selected={this.props.selected.indexOf(c.slug) !== -1}
                                            />
                                        )
                                    })}
                                </div>
                            );
                        })}
                    </div>
                }
                <Paginate
                    totalPages={this.props.filter.totalPages}
                    currentPage={this.state.currentPage}
                    change={this._changePage}
                    extraClasses="filter__items-pagination _fake_dropdown__item no-hl no-ho"
                />
            </BaseFilter>
        )
    }
}

PaginatedFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    filterChange: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
}

export default PaginatedFilter