import React from 'react'
import PropTypes from 'prop-types'
import {pluck} from "ramda"

import GamePage from "./GamePage"
import './BrandDetail.css'

class BrandDetail extends React.Component {

    brandArray = pluck('code')(this.props.brands)

    state = {
        current: this.props.selected,
        prev: null,
        isReverting: false,
        isChanging: false,
    }

    isReverting = (prev, next) => {
        return this.brandArray.indexOf(next) < this.brandArray.indexOf(prev)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selected !== this.state.current) {
            this.setState({
                current: nextProps.selected,
                prev: this.state.current,
                isChanging: true,
                isReverting: this.isReverting(this.state.current, nextProps.selected),
            })
        }
    }

    onTransitionEnd = e => {
        // console.log(e.target.classList, this.container.classList)
        // if (e.target.classList.contains('_page')) {
            this.setState({
                prev: null,
                isChanging: false,
                isReverting: false,
            })
        // }
    }

    render() {
        const {brands, favorite, isLoading} = this.props
        return (
            //点击后立刻: _selected-page--{NEXT}, is-changing-page _selected-page--{selected}--removed
            //${' _selected-page--' + selected + '--removed'} ' is-bg-transitioning'
            <section
                className={`game-details is-visible is-top-animated
                ${this.state.isReverting?'is-reverting-page':''}
                _selected-page--${this.state.current}
                ${this.state.isChanging?'is-changing-page':''}
                ${this.state.prev?'_selected-page--'+this.state.prev+'--removed':''}
                `}
                ref={r => this.container = r}
                onTransitionEnd={this.onTransitionEnd}
            >
                <div className="game-details__body">
                    <div className={`game-details__loading${isLoading ? '' : ' ng-hide'}`}>
                        <i className={`spinner--big spinner--big-light${isLoading? ' is-spinning' : ''}`}/>
                    </div>
                    <div className="container">
                        <div className="_pages">
                            {!!brands && brands.map(b => <GamePage
                                key={b.code}
                                brand={b}
                                favorite={favorite}
                            />)}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

BrandDetail.propTypes = {
    brands: PropTypes.array.isRequired,
    selected: PropTypes.string.isRequired,
    favorite: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
}

export default BrandDetail