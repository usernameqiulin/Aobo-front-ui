/**
 * Created by darkmoon on 7/2/17.
 */
import React, {Component} from 'react'
import {translate} from 'react-i18next'
import {Helmet} from "react-helmet"
import GoogleAnalytics from 'react-ga'

import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"
import './index.css'

class LotteryPage extends Component {
    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('lotteryPage')
        })
    }

    render() {
        const {t} = this.props
        return (
            <div className='lottrey-page cf'>
                <Helmet>
                    <title>{t('AB Gaming')} : {t('lotteryPage')}</title>
                    <meta name="description" content={t('lotteryPageMetaDescription')}/>
                    <body className="lottrey-page"></body>
                </Helmet>
                <ScrollToTopOnMount/>
            </div>
        )
    }
}

export default translate()(LotteryPage)
