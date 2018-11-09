import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import GoogleAnalytics from "react-ga"

class ABPromotionCategories extends React.Component {

    onClick = (v) => {
        if (v !== this.props.currentCategory) {
            GoogleAnalytics.event({
                action: 'Click',
                category: 'Promotion',
                label: 'promotion_category - ' + v
            })
            this.props.onChange(v)
        }
    }

    render() {
        const {t, currentCategory} = this.props
        return (
            <div className="container">
                <div className="page-header module-header cf">
                    <div className="module-header-in cf">
                        <div className={`categories${currentCategory === 'ALL' ? ' active': ''}`}>
                            <a className={`_clickable`} onClick={this.onClick.bind(this, 'ALL')}>
                                <span className={`categories-icon all`}/>
                                <h5 className="text-uppercase">
                                    {t('All')}
                                </h5>
                            </a>
                        </div>
                        <div className={`categories${currentCategory === 'DEPOSIT' ? ' active': ''}`}>
                            <a className={`_clickable`} onClick={this.onClick.bind(this, 'DEPOSIT')}>
                                <span className={`categories-icon deposit`}/>
                                <h5 className="text-uppercase">
                                    {t('p-deposit')}
                                </h5>
                            </a>
                        </div>
                        <div className={`categories${currentCategory === 'SLOTS' ? ' active': ''}`}>
                            <a className={`_clickable`} onClick={this.onClick.bind(this, 'SLOTS')}>
                                <span className={`categories-icon slots`}/>
                                <h5 className="text-uppercase">
                                    {t('SLOTS')}
                                </h5>
                            </a>
                        </div>
                        <div className={`categories${currentCategory === 'LIVE' ? ' active': ''}`}>
                            <a className={`_clickable`} onClick={this.onClick.bind(this, 'LIVE')}>
                                <span className={`categories-icon live`}/>
                                <h5 className="text-uppercase">
                                    {t('LIVE')}
                                </h5>
                            </a>
                        </div>
                        <div className={`categories${currentCategory === 'SPORTS' ? ' active': ''}`}>
                            <a className={`_clickable`} onClick={this.onClick.bind(this, 'SPORTS')}>
                                <span className={`categories-icon sports`}/>
                                <h5 className="text-uppercase">
                                    {t('SPORTS')}
                                </h5>
                            </a>
                        </div>
                        <div className={`categories${currentCategory === 'LOTTERY' ? ' active': ''}`}>
                            <a className={`_clickable`} onClick={this.onClick.bind(this, 'LOTTERY')}>
                                <span className={`categories-icon lottery`}/>
                                <h5 className="text-uppercase">
                                    {t('LOTTERY')}
                                </h5>
                            </a>
                        </div>
                        <div className={`categories${currentCategory === 'REBATE' ? ' active': ''}`}>
                            <a className={`_clickable`} onClick={this.onClick.bind(this, 'REBATE')}>
                                <span className={`categories-icon rebate`}/>
                                <h5 className="text-uppercase">
                                    {t('rebate')}
                                </h5>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ABPromotionCategories.propTypes = {
    onChange: PropTypes.func.isRequired,
    currentCategory: PropTypes.oneOf([
        'ALL',
        'DEPOSIT',
        'SLOTS',
        'LIVE',
        'SPORTS',
        'LOTTERY',
        'REBATE',
    ]).isRequired,
}

export default translate()(ABPromotionCategories)