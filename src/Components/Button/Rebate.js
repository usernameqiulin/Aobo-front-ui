import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {translate} from 'react-i18next'

import RebateActions from "../../Redux/RebateRedux"
import withDropdown from "../withDropdown"

class Rebate extends React.Component {

    static propTypes = {
        t: PropTypes.func.isRequired,
        calculateRebate: PropTypes.func.isRequired,
    }

    onApplySlots = e => {
        !this.props.rebate.calculating && this.props.calculateRebate({product: 'SLOTS'})
    }

    onApplyLive = e => {
        !this.props.rebate.calculating && this.props.calculateRebate({product: 'LIVE'})
    }

    render() {
        const {t, rebate, expanded, toggler, hider} = this.props
        return (
            <div className={`btn btn--green btn--wide${expanded ? ' is-expanded' : ' is-contracted'}${!!rebate.calculating ? ' is-disabled is-spinning' : ''}`}
                 onClick={toggler}
                 onMouseLeave={hider}
            >
                {t('redeem')}
                <span className="_dropdown__pointer-wrapper rebate__pointer-wrapper">
                    <i className="ic icon-dropdown-down rebate__icon-down"/>
                    <i className="_dropdown__pointer-up rebate__pointer-up"/>
                </span>
                <span className="_dropdown__items rebate__dropdown-items">
                    <span className="_dropdown__item" onClick={this.onApplySlots}>
                        <svg className={`icon-svg`}><use xlinkHref={`#icon-slots`}/></svg>
                        {t('SLOTS')}
                    </span>
                    <span className="_dropdown__item" onClick={this.onApplyLive}>
                        <svg className={`icon-svg`}><use xlinkHref={`#icon-live`}/></svg>
                        {t('LIVE')}
                    </span>
                </span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rebate: state.rebate,
    }
}

const mapDispatchToProps = (dispatch) => ({
    calculateRebate: (params) => dispatch(RebateActions.rebateCalculateRequest(params)),
})


export default withDropdown(connect(mapStateToProps, mapDispatchToProps)(translate()(Rebate)))