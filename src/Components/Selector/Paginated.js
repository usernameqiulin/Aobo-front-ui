import React from 'react'
import PropTypes from 'prop-types'

import Paginate from "../Paginate"

class Paginated extends React.Component {

    state = {
        currentPage: 1,
    }

    changePage = (p) => {
        if (p !== this.state.page && p > 0) {
            this.setState({
                currentPage: p,
            })
        }
    }

    getPaginated = () => {
        const totalPages = Math.ceil(this.props.data.length/this.props.pageSize)
        let pages = []
        for (let i = 0; i < totalPages; i++) {
            pages.push(this.props.data.slice(i * this.props.pageSize, (i+1) * this.props.pageSize))
        }
        return {totalPages, pages}
    }

    render() {
        const paginated = this.getPaginated(), Component = this.props.component
        return (
            <React.Fragment>
                <div>
                {!!paginated && paginated.pages.map((p, i) => {
                    return (
                        <div key={i} className={`${i === this.state.currentPage - 1 ? '' : 'ng-hide'}`}>
                            {p.map(c =>
                                <Component
                                    coupon={c}
                                    key={c.code}
                                    onSelect={this.props.componentProps.onSelect}
                                    isSelected={this.props.componentProps.selected === c.code}
                                    isDisabled={this.props.componentProps.isDisabled}
                                />
                            )}
                        </div>
                    )
                })
                }
                </div>
                <Paginate
                    totalPages={paginated.totalPages}
                    currentPage={this.state.currentPage}
                    change={this.changePage}
                    extraClasses="modal__pagination no-hl"
                />
            </React.Fragment>
        )
    }
}

Paginated.propTypes = {
    data: PropTypes.array.isRequired,
    pageSize: PropTypes.number.isRequired,
    selected: PropTypes.any,
}

export default Paginated