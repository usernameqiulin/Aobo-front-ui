import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'

class Paginate extends React.PureComponent {

    _prevPage = (e) => {
        e.stopPropagation();
        if (this.props.currentPage > 1 && this.props.currentPage <= this.props.totalPages) {
            const page = this.props.currentPage - 1
            this.props.change(page)
        }
    }

    _nextPage = (e) => {
        e.stopPropagation();
        if (this.props.currentPage < this.props.totalPages) {
            this.props.change(this.props.currentPage + 1)
        }
    }

    _changePage = (e) => {
        e.stopPropagation();
        const page = parseInt(e.target.value, 10);
        if (page !== this.props.currentPage && page > 0 && page <= this.props.totalPages) {
            this.props.change(page);
        }
    }

    render() {
        // console.log(this.props.currentPage)
        const {t} = this.props, currentPage = isNaN(this.props.currentPage) ? 1 : this.props.currentPage
        return (
            <div className={`pagin ${this.props.extraClasses}${this.props.totalPages > 1 ? '' : ' ng-hide'}`}>
                <span className={`pagin__prev${currentPage <= 1 ? ' pagin__part--inactive' : ' _clickable'}`}
                      onClick={this._prevPage}>
                    <i className="ic icon-arrow-left2"/>
                </span>
                <div className="pagin__current">
                    <input
                        type="tel"
                        className="pagin__input ng-pristine ng-untouched ng-valid"
                        value={currentPage}
                        onChange={this._changePage}
                    />
                </div>
                {t('of')}
                <span className="pagin__total">{this.props.totalPages}</span>
                <span
                    className={`pagin__next${currentPage >= this.props.totalPages ? ' pagin__part--inactive' : ' _clickable'}`}
                    onClick={this._nextPage}>
                    <i className="ic icon-arrow-right2"/>
                </span>
            </div>
        )
    }
}

Paginate.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.oneOfType([PropTypes.number, PropTypes.instanceOf(NaN)]).isRequired,
    change: PropTypes.func,
    extraClasses: PropTypes.string,
}

export default translate()(Paginate)