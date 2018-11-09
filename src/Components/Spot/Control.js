import React from 'react'
import PropTypes from 'prop-types'

class Control extends React.Component {

    onMouseEnter = e => {
        this.props.onLock(this.props.type)
    }

    onMouseLeave = e => {
        this.props.onUnlock(this.props.type, e.relatedTarget)
    }

    nextSpot = (e) => {
        this.props.onNext(this.props.type)
    }

    prevSpot = (e) => {
        this.props.onPrev(this.props.type)
    }

    // controlButtonMouseOut = (event) => {
    //     if (!this.isBigSpot(thisNgEl, event.relatedTarget)) return deactivateSpot()
    // }
    //
    isBigSpot = (relatedTargetEl) => {
        // return !!relatedTargetEl && (buttonNgEl.attr("data-spot-type") === SpotsTypeRotator.TYPE.PROMO ? promoSpotsEl.indexOf(relatedTargetEl) !== -1 : bigSpotsEl.indexOf(relatedTargetEl) !== -1)
        return !!relatedTargetEl && relatedTargetEl.classList.contains('big-spots')/* && relatedTargetEl.dataset.spotType === this.props.type*/
    }

    render() {
        const {type, hasPromo} = this.props
        return (
            <div className={`big-spots__controls big-spots__controls--${type}${hasPromo ? ' big-spots__controls--with-promo' : ''}`}>
                <button
                    data-spot-type={type}
                    className={`big-spots__btn big-spots__btn--next${type === 'promo' ? ' big-spots__btn--promo' : ''}`}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.nextSpot}
                >
                    <i className="ic icon-fat-arrow-right"/>
                </button>
                <button
                    data-spot-type={type}
                    className={`big-spots__btn big-spots__btn--prev${type === 'promo' ? ' big-spots__btn--promo' : ''}`}
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                    onClick={this.prevSpot}
                >
                    <i className="ic icon-fat-arrow-left"/>
                </button>
            </div>
        )
    }
}

Control.propTypes = {
    type: PropTypes.oneOf(['large', 'promo']).isRequired,
    hasPromo: PropTypes.bool,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
}

export default Control