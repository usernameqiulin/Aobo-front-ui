import React from 'react'
import PropTypes from 'prop-types'
import GoogleAnalytics from "react-ga"
import {getName} from "../helper"

class ABPromotion extends React.Component {

    constructor(props) {
        super(props)
        this.title = getName(props.promotion.title, 'en-GB')
        this.state = {
            collapsed: !1,
        }
    }

    onClick = () => {
        GoogleAnalytics.event({
            action: 'Click',
            category: 'Promotion',
            label: 'promotion_banner - ' + this.title,
        })
    }

    render() {
        const title = getName(this.props.promotion.title, this.props.locale) ? getName(this.props.promotion.title, this.props.locale) : this.title
        const content = getName(this.props.promotion.content, this.props.locale) ? getName(this.props.promotion.content, this.props.locale) : getName(this.props.promotion.content, 'en-GB')
        return (
            <div className="banner">
                {/* gog-analytics-event="[ 'Promo Element', 'Click', 'banner_regular - New games available on GOG Connect' ]" */}
                <a className={`banner__lnk _clickable`} onClick={this.onClick}/>
                <picture className="banner__picture">
                    {/* gog-picture-fill="" */}
                    <img
                        className={`banner__img`}
                        srcSet={require('../images/promotion/1450925769.jpg') + ", " + require('../images/promotion/1450925769-2x.jpg') +" 2x"}
                        alt="New games available on GOG Connect"
                    />
                </picture>
                <div className="banner__content">
                    <div className="banner-content banner-content--width-float">
                        {/*<h4 className="banner__title">*/}
                            {/*{title}*/}
                        {/*</h4>*/}
                        <p className="banner__subtitle">{title}</p>
                    </div>
                    <div className="banner-content banner-content--width-static">
                        <div className="ultimate-price-holder">
                            <div className="ultimate-price banner__button">
                                <a className={`ultimate-price__btn _clickable`} onClick={this.onClick}>{this.props.buttonLabel}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ABPromotion.propTypes = {
    promotion: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string.isRequired,
}

export default ABPromotion