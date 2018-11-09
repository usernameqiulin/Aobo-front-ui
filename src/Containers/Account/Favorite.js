import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import {connect} from 'react-redux'
import {Helmet} from "react-helmet"
import { withCookies, Cookies } from 'react-cookie'
import GoogleAnalytics from 'react-ga'

import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import ABSpinner from "../../Components/ABSpinner"
import SlotsCard from '../../Components/Card/Slots'

import './Favorite.css'
import {flattenFavorite} from "../../helper"
import withDropdown from "../../Components/withDropdown"
import SkinSelector from "../../Components/Account/SkinSelector"

const StyleSelector = withDropdown(SkinSelector)

class Favorite extends React.Component {

    state = {
        skin: this.props.cookies.get('favStyle') || 'Wood',
        viewMode: this.props.cookies.get('viewMode') || 'grid',
    }

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('My AB Gaming') + ' : ' + t('favorite')
        })
    }

    switchSkin = (skin) => {
        this.props.cookies.set('favStyle', skin, {maxAge: 60*60*24*999})
        this.setState({skin: skin})
    }

    render() {
        const {t, favorite} = this.props
        return (
            <div className={`container account dimming-chooser favorite-container cf`}>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('My AB Gaming')} : {t('favorite')}</title>
                </Helmet>
                <ScrollToTopOnMount/>
                <section className={`account__filters`}>
                    {/*@todo: build filter*/}
                </section>
                <div>
                    <section className={`account__product-lists`}>
                        <section className={`game-details _selected-page--MAIN`}>

                        </section>
                        <div className="module-header wallet__module-header cf">
                            <h1 className={`header__title`}>{t('favorite')}</h1>
                            {/*<i className={`wallet__spinner is-spinning${favorite.data && favorite.fetching ? '' : ' ng-hide'}`}/>*/}
                        </div>
                        <div className={`account__products list cf account__products--games shelf-skin--${this.state.skin.toLowerCase()}${this.state.viewMode === 'grid' ? ' list--grid' : ' list--rows list--rows--no-border'}`}>
                            <div className={`list-inner${favorite.fetching ? ' ng-hide' : ''}`}>
                                {/* ng-class="{'dimming-chooser__active-element-wrap': chooser.chosenID === product.id}" */}
                                {!!favorite.data && !!favorite.data.data && favorite.data.data.map(p => {
                                    return <SlotsCard key={p.gameId} product={p.game} module={'FavoritePage'} favorites={flattenFavorite(this.props.favorite.data.data || null)}/>
                                })}
                            </div>
                        </div>
                    </section>
                </div>
                <ABSpinner hidden={!(!favorite.data && favorite.fetching)} size={'big'}/>
                <div className={`container list__message${favorite.fetching || (!favorite.fetching && !favorite.error && !!favorite.data && !!favorite.data.data && favorite.data.data.length > 0) ? ' ng-hide' : ''}`}>
                    <span className="list__message-in">{t('No results found')}</span>
                </div>
                {/* ng-show="!view.isDataProcessing" */}
                <div className={`${favorite.fetching ? 'ng-hide' : ''}`}>
                    <div className={`${!(!!favorite.data && !!favorite.data.data && favorite.data.data.length > 0) ? ' ng-hide' : ''}`}>
                        <div className="">
                            <div className="pagin account__pagination list__pagination no-hl">
                                <div className={`skin-selector list-navigation__elem list-navigation__elem--right${this.state.viewMode === 'grid' ? '' : ' ng-hide'}`}>
                                    {t('Style')}:{' '}
                                    <StyleSelector t={t} current={this.state.skin} switcher={this.switchSkin}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
    }
    }

    Favorite.propTypes = {
        favorite: PropTypes.object.isRequired,
        cookies: PropTypes.instanceOf(Cookies).isRequired,
    }

    const mapStateToProps = (state) => {
        return {
            favorite: state.favorite,
        }
    }

    const mapDispatchToProps = (dispatch) => ({})


    export default connect(mapStateToProps, mapDispatchToProps)(translate()(withCookies(Favorite)))