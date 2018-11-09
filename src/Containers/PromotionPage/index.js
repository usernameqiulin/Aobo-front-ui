/**
 * Created by darkmoon on 7/2/17.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import GoogleAnalytics from 'react-ga'

import PromotionActions from '../../Redux/PromotionRedux'
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import ABPromotionCategories from "../../Components/ABPromotionCategories"
import ABPromotionFlip from "../../Components/ABPromotionFlip"
import ABSpinner from "../../Components/ABSpinner"

import './index.css'

class PromotionPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentCategory: props.location.hash ? props.location.hash.split('#')[1] : 'ALL',
        }
    }

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('promotionPage')
        })
    }

    onCategoryChange = (category) => {
        this.props.history.push('/promotion' + (category !== 'ALL' ? '#' + category : ''))
        this.setState({
            currentCategory: category,
        })
    }

    componentDidMount() {
        /*!this.props.promotion.data && */this.props.getPromotion()
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.hash !== prevProps.location.hash) {
            const category = this.props.location.hash ? this.props.location.hash.split('#')[1] : 'ALL'
            this.setState({
                currentCategory: category,
            })
        }
    }

    render() {
        const {t} = this.props
        return (
            <div className={`promotions-wrapper cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('promotionPage')}</title>
                    <meta name="description" content={t('promotionPageMetaDescription')}/>
                    <body className="promotion-page"/>
                </Helmet>
                <ScrollToTopOnMount/>
                <div className="promotion-lp">
                    <div className="nav-spacer menu-spacer"/>
                    <div className="container">
                        <div className="nav-spacer menu-spacer"/>
                        <h1 className="promotion-lp__header">{t('Promotion')}</h1>
                        <h2 className="promotion-lp__subheader">
                            {t('promotionPage')}
                        </h2>
                    </div>
                </div>
                <ABPromotionCategories onChange={this.onCategoryChange} currentCategory={this.state.currentCategory}/>
                <ABSpinner hidden={!this.props.promotion.fetching} color={'light'} size={'big'}/>
                <div className="container">
                    <div className={`promo-list`}>
                        {
                            this.props.promotion.data && this.props.promotion.data.map((p, i) => {
                                return <ABPromotionFlip key={i} currentCategory={this.state.currentCategory} promotion={p} locale={this.props.i18n.language} buttonLabel={t('Show details')}/>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

PromotionPage.propTypes = {
    promotion: PropTypes.object.isRequired,
    // auth: PropTypes.object.isRequired,
    getPromotion: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        promotion: state.promotion,
        // auth: state.auth,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getPromotion: () => dispatch(PromotionActions.promotionRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate()(PromotionPage))