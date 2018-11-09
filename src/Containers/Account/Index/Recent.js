import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"
import {connect} from "react-redux"

import {flattenFavorite} from "../../../helper"
import ABSpinner from "../../../Components/ABSpinner"
import RecentActions from "../../../Redux/RecentRedux"
import SlotsCard from '../../../Components/Card/Slots'

const PAGESIZE = 10
class Recent extends React.Component {

    constructor(props) {
        super(props)
        this.pages = !!props.recent.data ? Math.floor(props.recent.data.length/PAGESIZE) : 1

        this.state = {
            data: !!props.recent.data && props.recent.data.length ? props.recent.data : props.config.data.recommend,
            currentPage: 1,
            pages: !!props.recent.data && props.recent.data.length ? Math.floor(props.recent.data.length/PAGESIZE) : props.config.data.recommend.length/PAGESIZE,
        }
    }

    componentDidMount() {
        this.props.getRecent()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.recent);
        if (this.props.recent.fetching && !nextProps.recent.fetching && !nextProps.recent.error) {
            if (nextProps.recent.data.length) {
                this.setState({
                    data: nextProps.recent.data,
                    pages: Math.floor(nextProps.recent.data.length/PAGESIZE),
                })
            }
        }
    }

    loadMore = (e) => {
        this.state.currentPage < this.state.pages && this.setState({
            currentPage: this.state.currentPage+1
        })
    }

    render() {
        const {t, recent, favorite} = this.props
        return (
            <React.Fragment>
                <ABSpinner hidden={!(recent.fetching && (recent.data === null || recent.data.length === 0))} size={'big'}/>
                <div>
                    <div className={`module-header wallet__module-header wallet__module-header--no-bottom-spacing${(recent.fetching && (recent.data === null || recent.data.length === 0)) ? ' ng-hide' : ''}`}>
                        {t(!!recent.data && recent.data.length ? 'recently played' : 'recommendations')}
                    </div>
                    <div className="list list--grid wallet__list cf">
                        <div className={`wallet__spinner-container${!!recent.data && recent.data.length > 0 && recent.fetching ? '' : ' ng-hide'}`}>
                            <i className="wallet__spinner is-spinning"/>
                        </div>
                        <div className="list-inner">
                            {!recent.fetching && !!this.state.data && this.state.data.map((p, i) => {
                                return i < this.state.currentPage * PAGESIZE && <SlotsCard
                                    key={p.id}
                                    product={p}
                                    module={'Account/Recent'}
                                    favorites={flattenFavorite(favorite.data.data||null)}
                                />
                            })}
                        </div>
                    </div>
                    <p className={`wallet__show-more-games${recent.fetching ? ' ng-hide' : ''}`}>
                        <a className={`wallet-load-more _clickable${this.state.currentPage < this.state.pages ? '' : ' ng-hide'}`} onClick={this.loadMore}>
                            显示更多游戏
                            <img srcSet={require('../../../images/d-arrow_x1.png') + ", " + require('../../../images/d-arrow_x2.png') + " 2x"} className="wallet-load-more__icon"/>
                        </a>
                    </p>
                </div>
            </React.Fragment>
        )
    }
}

Recent.propTypes = {
    config: PropTypes.object.isRequired,
    recent: PropTypes.object.isRequired,
    favorite: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        config: state.config,
        recent: state.recent,
        favorite: state.favorite,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getRecent: () => dispatch(RecentActions.recentRequest()),
})


export default connect(mapStateToProps, mapDispatchToProps)(translate()(Recent))