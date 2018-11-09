/**
 * Created by darkmoon on 7/1/17.
 */
import React, {Component} from 'react'
import skrollr from 'skrollr'
import { translate } from 'react-i18next'
import {Helmet} from "react-helmet"
import GoogleAnalytics from 'react-ga'

import {isMobile} from "../../helper"
import './home.css'
import ScrollToTopOnMount from "../../Components/ScrollToTopOnMount"

import intro_screen_left_1x from '../../images/galaxy/sections/intro/left-1x.png';
import intro_screen_left_2x from '../../images/galaxy/sections/intro/left-2x.png';
import intro_screen_right_1x from '../../images/galaxy/sections/intro/right-1x.png';
import intro_screen_right_2x from '../../images/galaxy/sections/intro/right-2x.png';
import intro_screen_middle_1x from '../../images/galaxy/sections/intro/middle-1x.png';
import intro_screen_middle_2x from '../../images/galaxy/sections/intro/middle-2x.png';

import intro_screen_left_1x_mob from '../../images/galaxy/sections/intro/left-1x-mob.png';
import intro_screen_left_2x_mob from '../../images/galaxy/sections/intro/left-2x-mob.png';
import intro_screen_right_1x_mob from '../../images/galaxy/sections/intro/right-1x-mob.png';
import intro_screen_right_2x_mob from '../../images/galaxy/sections/intro/right-2x-mob.png';
import intro_screen_middle_1x_mob from '../../images/galaxy/sections/intro/middle-1x-mob.png';
import intro_screen_middle_2x_mob from '../../images/galaxy/sections/intro/middle-2x-mob.png';

import slots_screen_middle_1x from '../../images/galaxy/sections/slots/middle-1x.png';
import slots_screen_middle_2x from '../../images/galaxy/sections/slots/middle-2x.png';

import slots_screen_middle_1x_mob from '../../images/galaxy/sections/slots/middle-1x-mob.png';
import slots_screen_middle_2x_mob from '../../images/galaxy/sections/slots/middle-2x-mob.png';

import live_screen_1x from '../../images/galaxy/sections/live/middle-1x.png';
import live_screen_2x from '../../images/galaxy/sections/live/middle-2x.png';
import live_screen_1x_mob from '../../images/galaxy/sections/live/middle-1x-mob.png';
import live_screen_2x_mob from '../../images/galaxy/sections/live/middle-2x-mob.png';

import lottery_screen_1x from '../../images/galaxy/sections/lottery/middle.1x.png';
import lottery_screen_2x from '../../images/galaxy/sections/lottery/middle.2x.png';
import lottery_screen_1x_mob from '../../images/galaxy/sections/lottery/middle.1x-mob.png';
import lottery_screen_2x_mob from '../../images/galaxy/sections/lottery/middle.2x-mob.png';

import more_screen_falling1_1x from '../../images/galaxy/sections/more/falling1.1x.png';
import more_screen_falling1_2x from '../../images/galaxy/sections/more/falling1.2x.png';
import more_screen_falling2_1x from '../../images/galaxy/sections/more/falling2.1x.png';
import more_screen_falling2_2x from '../../images/galaxy/sections/more/falling2.2x.png';
import more_screen_falling3_1x from '../../images/galaxy/sections/more/falling3.1x.png';
import more_screen_falling3_2x from '../../images/galaxy/sections/more/falling3.2x.png';

import more_screen_falling1_1x_mob from '../../images/galaxy/sections/more/falling1.1x-mob.png';
import more_screen_falling1_2x_mob from '../../images/galaxy/sections/more/falling1.2x-mob.png';
import more_screen_falling2_1x_mob from '../../images/galaxy/sections/more/falling2.1x-mob.png';
import more_screen_falling2_2x_mob from '../../images/galaxy/sections/more/falling2.2x-mob.png';
import more_screen_falling3_1x_mob from '../../images/galaxy/sections/more/falling3.1x-mob.png';
import more_screen_falling3_2x_mob from '../../images/galaxy/sections/more/falling3.2x-mob.png';

const topDistancePc = {top: '6813px'};
const topDistancePhone = {top: '9346px'};

class HomePage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            top: isMobile() ? topDistancePhone : topDistancePc,
        }
    }

    componentWillMount() {
        const {t} = this.props
        GoogleAnalytics.set({
            title: t('AB Gaming') + ' : ' + t('homePage')
        })
    }

    glueMe = () => {
        this.setState({
            top: document.querySelector('#glx-faq').offsetTop
        })
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.glueMe)
    }

    componentDidMount() {
        this.glueMe();
        if (!window.s) {
            window.s = skrollr.init({
                forceHeight: !1,
                smoothScrolling: !1,
                mobileCheck: function () {
                    return !1
                }
            })
        } else {
            window.s.refresh()
        }
        window.addEventListener("resize", this.glueMe)
    }

    render() {
        const { t } = this.props
        return (
            <div className="glx-universe">
                <Helmet>
                    <title>{t('AB Gaming')} : {t('homePage')}</title>
                    <meta name="description" content={t('homePageMetaDescription')}/>
                    <body class={"page_galaxy_landing_page"}/>
                </Helmet>
                <ScrollToTopOnMount/>
                <svg style={{width: 0, height: 0, overflow: 'hidden', position: 'fixed', visibility: 'hidden'}}>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-camera">
                        <title>camera</title>
                        <g id="camera-_x33_5px">
                            <path fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M30.2,7.5h-3.4c-0.5,0-0.9-0.3-1.2-0.7l-2-3.7c-0.2-0.4-0.7-0.7-1.2-0.7h-9.9c-0.5,0-0.9,0.3-1.2,0.7l-2,3.7C9.2,7.2,8.7,7.5,8.3,7.5H4.8c-2.3,0-4.3,1.5-4.3,4V28c0,2.5,1.9,4.5,4.3,4.5h25.5c2.3,0,4.2-2,4.2-4.5V11.5C34.5,9.1,32.6,7.5,30.2,7.5z M32.5,29.1c0,0.8-0.6,1.5-1.4,1.5H3.9c-0.8,0-1.4-0.7-1.4-1.5V11c0-0.8,0.6-1.5,1.4-1.5h5.5c0.5,0,0.9-0.3,1.2-0.7l2-3.3c0.2-0.4,0.7-0.9,1.2-0.9h7.6c0.5,0,0.9,0.4,1.2,0.8l1.8,3.5c0.2,0.4,0.7,0.7,1.2,0.7h5.7c0.8,0,1.4,0.7,1.4,1.5V29.1z M17.5,13.5c-3.3,0-6,2.7-6,6c0,3.3,2.7,6,6,6s6-2.7,6-6C23.5,16.2,20.8,13.5,17.5,13.5z M17.5,23.5c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C21.5,21.7,19.7,23.5,17.5,23.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-chip-smile">
                        <title>chip-smile</title>
                        <g id="chip-smile-_x33_5px">
                            <path fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M31.5,18.5c0.5,0,1-0.5,1-1s-0.5-1-1-1h-2v-4h2c0.5,0,1-0.5,1-1s-0.5-1-1-1h-2v-4c0-0.5-0.5-1-1-1h-4v-2c0-0.5-0.5-1-1-1s-1,0.5-1,1v2h-4v-2c0-0.5-0.5-1-1-1s-1,0.5-1,1v2h-4v-2c0-0.5-0.5-1-1-1s-1,0.5-1,1v2h-4c-0.5,0-1,0.5-1,1v4h-2c-0.5,0-1,0.5-1,1s0.5,1,1,1h2v4h-2c-0.5,0-1,0.5-1,1s0.5,1,1,1h2v4h-2c-0.5,0-1,0.5-1,1s0.5,1,1,1h2v4c0,0.5,0.5,1,1,1h4v2c0,0.5,0.5,1,1,1s1-0.5,1-1v-2h4v2c0,0.5,0.5,1,1,1s1-0.5,1-1v-2h4v2c0,0.5,0.5,1,1,1s1-0.5,1-1v-2h4c0.5,0,1-0.5,1-1v-4h2c0.5,0,1-0.5,1-1s-0.5-1-1-1h-2v-4H31.5z M27.5,26.5c0,0.5-0.5,1-1,1h-18c-0.5,0-1-0.5-1-1v-18c0-0.5,0.5-1,1-1h18c0.5,0,1,0.5,1,1V26.5z M17.5,22.5c-2,0-3-0.8-4.6-2.4l1.3-1.4c2.5,2.7,3.9,2.7,6.5,0l1.3,1.4C20.5,21.7,19.5,22.5,17.5,22.5z M14,12.5c0.8,0,1.5,0.7,1.5,1.5c0,0.8-0.7,1.5-1.5,1.5c-0.8,0-1.5-0.7-1.5-1.5C12.5,13.2,13.2,12.5,14,12.5z M21,12.5c0.8,0,1.5,0.7,1.5,1.5c0,0.8-0.7,1.5-1.5,1.5s-1.5-0.7-1.5-1.5C19.5,13.2,20.2,12.5,21,12.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-circle-plus-o">
                        <title>circle-plus-o</title>
                        <g id="circle-plus-o-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M17.5,2.5c-8.3,0-15,6.7-15,15c0,8.3,6.7,15,15,15c8.3,0,15-6.7,15-15C32.5,9.2,25.8,2.5,17.5,2.5z M17.5,30.5c-7.2,0-13-5.8-13-13c0-7.2,5.8-13,13-13c7.2,0,13,5.8,13,13C30.5,24.7,24.7,30.5,17.5,30.5z M18.5,16.5h6v2h-6v6h-2v-6h-6v-2h6v-6h2V16.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-circle-thunder-o">
                        <title>circle-thunder-o</title>
                        <g id="circle-thunder-o-_x33_5px">
                            <path
                                d="M30.3,9.6c-4.4-7-13.6-9.2-20.6-4.9c-7,4.4-9.2,13.6-4.9,20.6c4.4,7,13.6,9.2,20.6,4.9S34.6,16.7,30.3,9.6z M6.5,24.3c-3.8-6.1-1.9-14.1,4.2-17.9c3.7-2.3,8-2.5,11.7-1l-9.9,13.8h3.7l-4.1,10C9.8,28.3,7.9,26.6,6.5,24.3z M24.3,28.5c-3.7,2.3-8.2,2.5-12,0.9l10.1-13.7h-3.7l3.9-10.1c2.3,1,4.4,2.7,5.8,5.1C32.3,16.8,30.4,24.8,24.3,28.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-clock-undo">
                        <title>clock-undo</title>
                        <g id="clock-undo-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M33.5,17.4c0.1,8.3-6.6,15.1-14.9,15.1c-4.6,0-8.8-2-11.6-5.3l1.7-1.1c2.4,2.7,5.9,4.4,9.8,4.4c7.2-0.1,12.9-5.9,12.9-13.1c-0.1-7.2-5.9-12.9-13.1-12.9c-6.1,0-11.2,4.3-12.5,10h2.6l-3.5,6l-3.5-6h2.3c1.4-6.8,7.3-11.9,14.6-12C26.7,2.4,33.4,9.1,33.5,17.4z M18.7,9.5h-0.3c-0.4,0-0.8,0.3-0.8,0.8v7.5c0,0.3,0.2,0.5,0.4,0.7c0,0,0,0,0.1,0.1l5.7,2.9c0.5,0.3,1,0.1,1.3-0.4c0.3-0.5,0.1-1-0.4-1.3L19.4,17v-6.8C19.4,9.8,19.1,9.5,18.7,9.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-cloud-arrow">
                        <title>cloud-arrow</title>
                        <g id="cloud-arrow-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M34.5,18v2c0,5-4,9-9,9h-4v-2h4c3.9,0,7-3.1,7-7v-2c0-1.5-0.4-2.8-1.2-3.9c-0.5-0.7-1.1-1.3-1.8-1.8c0-1.1-0.5-2.1-1.2-2.8C27.5,8.6,26.3,8,25,8c-0.8,0-1.6,0.2-2.3,0.6c-0.2,0.1-0.3,0.2-0.5,0.4c-0.4,0.3-0.8,0.7-1,1.2C21,9.8,20.8,9.4,20.6,9c-0.1-0.3-0.3-0.5-0.5-0.8C18.8,6.3,16.5,5,14,5c-3,0-5.6,1.8-6.8,4.3c-0.4,0.7-0.6,1.5-0.7,2.4c-0.8,0.4-1.5,0.8-2,1.4c-1.3,1.3-2,3-2,4.9v2c0,3.9,3.1,7,7,7h4v2h-4c-5,0-9-4-9-9v-2c0-3.2,1.7-6,4.2-7.6C5.7,6.1,9.5,3,14,3c3.2,0,6,1.5,7.7,3.9C22.7,6.3,23.8,6,25,6c3.1,0,5.8,2.2,6.4,5.2C33.3,12.8,34.5,15.3,34.5,18z M13.5,20L13.5,20L13.5,20L13.5,20C13.5,20,13.5,20,13.5,20z M17.5,14l-4,6c0,0,0,0,0,0h3v13h2V20h3L17.5,14z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-crossroads-sign">
                        <title>crossroads-sign</title>
                        <g id="crossroads-sign-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M27.5,17h-9v-2h3V6h-3V4l-1-1l-1,1v2h-9l-5,4.5l5,4.5h9v2h-3v9h3v7h2v-7h9l5-4.5L27.5,17z M8.5,13l-3-2.5l3-2.5h11v5H8.5z M26.5,24h-11v-5h11l3,2.5L26.5,24z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-cup">
                        <title>cup</title>
                        <g id="cup-_x33_5px">
                            <path d="M26,2.5C25.9,2.5,25.9,2.5,26,2.5c-0.1,0-0.1,0-0.1,0H9.5c-0.5,0-1,0.4-1,0.9v2.1h-4c0,0-0.1,0-0.1,0c-0.5,0-0.8,0.4-0.9,0.9c-0.2,2.6,0.1,8.2,1.3,10c1.1,1.8,2.1,3.8,4.8,4c0.4,0.5,0.9,0.1,1.4,0.5c0.8,0.7,2.6,1.1,3.1,1.7c0.4,0.4,0.4,2.9,0.5,3.4c-3.2,0.9-4.6,1.9-6,4.6c-0.2,0.5,0,1.6,0.4,1.9c0.1,0.1,0.3,0.1,0.4,0.1h8.4h7.5c0.5,0,1-0.4,1-0.9c0-0.1,0-0.9-0.1-1c-1.4-2.7-2.8-3.7-6-4.6c0.1-0.5,0.1-3,0.5-3.4c0.5-0.6,2.3-1,3.1-1.7c0.5-0.4,1,0,1.4-0.5c0,0,0,0,0,0c2.7-0.2,3.7-2.3,4.8-4c1.1-1.8,1.5-7.3,1.3-9.9c0-0.5-0.5-0.9-1-0.9h-4V3.4C26.5,2.9,26.5,2.5,26,2.5C26,2.5,26,2.5,26,2.5L26,2.5z M10.5,4.5h14v11.7c0,0,0,0.1,0,0.1c0.3,2.6-1.3,1.8-2.9,3.1c-0.8,0.6-1.6,0.7-2.3,1.5c-0.7,0.8-1.3,3.5-1.3,4.7c0,0.2,0.1,0.4,0.2,0.6c0.1,0.3,0.7,2.1,1,2.2c2.5,0.6,3.1,0.5,4.4,2h-5.7h-6.6c1.3-1.5,2-1.4,4.4-2c0.3-0.1,0.8-1.9,0.9-2.2c0.2-0.2,0.2-0.4,0.2-0.6c0-1.2-0.6-4-1.3-4.7c-0.7-0.8-2.6-0.8-3.3-1.4c-1.5-1.2-2.2-0.5-1.9-3.1c0,0,0-0.1,0-0.1V4.5L10.5,4.5zM5.4,7.5h3.1v6.7h0c-0.1,1.2-0.4,2.4-0.1,3.2c-1.4-0.3-1.4-1.2-2-2.2C5.7,14.2,5.4,9.5,5.4,7.5z M26.5,7.5h3c0,2-0.3,6.7-1,7.8c-0.6,1-0.6,1.8-2.1,2.2c0.3-0.9,0.1-2.1,0-3.2h0V7.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-dandelion">
                        <title>dandelion</title>
                        <g id="dandelion-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M32.5,17.5c0,1.1-0.9,2-2,2c-0.9,0-1.7-0.6-1.9-1.5h-8.1c-0.1,0.4-0.2,0.8-0.5,1.2l5.6,5.6c0.7-0.4,1.7-0.3,2.3,0.3c0.8,0.8,0.8,2,0,2.8c-0.8,0.8-2,0.8-2.8,0c-0.7-0.7-0.7-1.7-0.3-2.4l-5.6-5.6c-0.4,0.3-0.8,0.5-1.3,0.5v8.1c0.9,0.2,1.5,1,1.5,1.9c0,1.1-0.9,2-2,2c-1.1,0-2-0.9-2-2c0-0.9,0.6-1.7,1.5-1.9v-8.1c-0.5-0.1-0.9-0.3-1.3-0.5L10,25.6c0.5,0.8,0.4,1.8-0.3,2.5c-0.8,0.8-2,0.8-2.8,0c-0.8-0.8-0.8-2,0-2.8c0.6-0.6,1.6-0.7,2.4-0.3l5.8-5.8c-0.2-0.3-0.4-0.8-0.5-1.2H6.4c-0.2,0.9-1,1.5-1.9,1.5c-1.1,0-2-0.9-2-2s0.9-2,2-2c0.9,0,1.7,0.6,1.9,1.5h8.1c0.1-0.5,0.3-0.9,0.5-1.3l-5.6-5.6c-0.8,0.5-1.8,0.4-2.4-0.3c-0.8-0.8-0.8-2,0-2.8c0.8-0.8,2-0.8,2.8,0c0.6,0.6,0.7,1.6,0.3,2.3l5.6,5.6c0.3-0.2,0.8-0.4,1.2-0.5V6.4c-0.9-0.2-1.5-1-1.5-1.9c0-1.1,0.9-2,2-2c1.1,0,2,0.9,2,2c0,0.9-0.6,1.7-1.5,1.9v8.1c0.4,0.1,0.8,0.2,1.2,0.5L25,9.3c-0.4-0.8-0.3-1.7,0.3-2.4c0.8-0.8,2-0.8,2.8,0c0.8,0.8,0.8,2,0,2.8c-0.7,0.7-1.7,0.8-2.5,0.3l-5.7,5.7c0.3,0.4,0.5,0.8,0.5,1.3h8.1c0.2-0.9,1-1.5,1.9-1.5C31.6,15.5,32.5,16.4,32.5,17.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-disk-arrow-down">
                        <title>disk-arrow-down</title>
                        <g id="disk-arrow-down-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M31.8,23.2L29.5,12c0,0-0.9-5.5-4.5-5.5h-3.5v2H25c2.5,0,2.5,3.5,2.5,3.5l1.8,8.8c-0.5-0.2-1.1-0.3-1.8-0.3h-20c-0.7,0-1.3,0.1-1.8,0.3L7.5,12c0,0,0-3.5,2.5-3.5h3.5v-2H10C6.4,6.5,5.5,12,5.5,12L3.2,23.2c-0.5,0.9-0.7,2.1-0.7,3.3c0,3.3,1.7,6,5,6h20c3.3,0,5-2.7,5-6C32.5,25.3,32.3,24.2,31.8,23.2z M27.5,30.5h-20c-2.2,0-3-1.8-3-4L5,24c0.5-0.9,1.2-1.5,2.5-1.5h20c1.2,0,2,0.6,2.5,1.5l0.5,2.5C30.5,28.7,29.7,30.5,27.5,30.5z M27.5,26.5c0,0.6-0.4,1-1,1c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1C27.1,25.5,27.5,25.9,27.5,26.5z M13.5,11.5h3v-9h2v9h3l-4,6L13.5,11.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-monitor-arrow-down">
                        <title>monitor-arrow-down</title>
                        <g id="monitor-arrow-down-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M13.5,11.5h3v-9h2v9h3l-4,6L13.5,11.5z M31.5,10.5v15c0,2.2-1.9,4-4,4H20l4.9,3H10.1l4.9-3H7.5c-2.1,0-4-1.8-4-4v-15c0-2.2,1.9-4,4-4h6v2h-5c-1.6,0-3,1-3,2.3v12.4c0,1.4,1.4,2.3,3,2.3h17.9c1.6,0,3-1,3-2.3V10.8c0-1.4-1.4-2.3-3-2.3h-5v-2h6C29.6,6.5,31.5,8.3,31.5,10.5z M27.5,27.5c0-0.6-0.4-1-1-1c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1C27.1,28.5,27.5,28.1,27.5,27.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-orbit">
                        <title>orbit</title>
                        <g id="orbit-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M7.5,2.5c-2.8,0-5,2.2-5,5c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C12.5,4.7,10.3,2.5,7.5,2.5z M7.5,10.5c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3c1.7,0,3,1.3,3,3C10.5,9.2,9.2,10.5,7.5,10.5z M27.5,22.5c-2.8,0-5,2.2-5,5c0,2.8,2.2,5,5,5c2.8,0,5-2.2,5-5C32.5,24.7,30.3,22.5,27.5,22.5z M27.5,30.5c-1.7,0-3-1.3-3-3c0-1.7,1.3-3,3-3c1.7,0,3,1.3,3,3C30.5,29.2,29.2,30.5,27.5,30.5z M32.2,14.6l-2,0.5c-0.1-0.7-0.3-1.3-0.5-1.9l2-0.5C31.9,13.3,32.1,13.9,32.2,14.6z M28.8,7.6l-1.4,1.4c-0.4-0.5-0.9-1-1.4-1.4l1.4-1.4C27.9,6.7,28.3,7.1,28.8,7.6z M17.4,2.5c0.4,0,0.7,0,1.1,0v2c-0.4,0-0.7,0-1.1,0c-0.3,0-0.6,0-0.9,0.1v-2C16.8,2.5,17.1,2.5,17.4,2.5z M20.4,2.8c0.7,0.1,1.3,0.3,1.9,0.5l-0.5,1.9c-0.6-0.2-1.3-0.4-1.9-0.5L20.4,2.8z M5,25.8c-0.2-0.4-0.5-0.7-0.7-1.1l0,0c-0.1-0.2-0.2-0.4-0.3-0.6l1.7-1c0.3,0.6,0.6,1.2,1,1.7L5,25.8z M30.4,16.5h2c0,0.3,0,0.6,0.1,0.9c0,0.4,0,0.7,0,1.1h-2c0-0.4,0-0.7,0-1.1C30.5,17.1,30.5,16.8,30.4,16.5z M4.6,18.5h-2c0-0.3,0-0.6-0.1-0.9c0-0.4,0-0.7,0-1.1h2c0,0.4,0,0.7,0,1.1C4.5,17.9,4.5,18.2,4.6,18.5z M30,9.2c0.2,0.4,0.5,0.7,0.7,1.1l0,0c0.1,0.2,0.2,0.4,0.3,0.6l-1.7,1c-0.3-0.6-0.6-1.2-1-1.7L30,9.2z M24.1,4c0.6,0.3,1.2,0.6,1.7,1l-1,1.8c-0.5-0.4-1.1-0.7-1.7-1L24.1,4z M22.3,31.7c-0.6,0.2-1.3,0.4-1.9,0.5l-0.5-2c0.7-0.1,1.3-0.3,1.9-0.5L22.3,31.7z M17.6,32.5c-0.4,0-0.7,0-1.1,0v-2c0.4,0,0.7,0,1.1,0c0.3,0,0.6,0,0.9-0.1v2C18.2,32.5,17.9,32.5,17.6,32.5z M14.6,32.2c-0.7-0.1-1.3-0.3-1.9-0.5l0.5-1.9c0.6,0.2,1.3,0.4,1.9,0.5L14.6,32.2z M31.7,22.3l-1.9-0.5c0.2-0.6,0.4-1.3,0.5-1.9l2,0.5C32.1,21.1,31.9,21.7,31.7,22.3z M3.3,12.7l1.9,0.5c-0.2,0.6-0.4,1.3-0.5,1.9l-2-0.5C2.9,13.9,3.1,13.3,3.3,12.7z M3.3,22.3c-0.2-0.6-0.4-1.3-0.5-1.9l2-0.5c0.1,0.7,0.3,1.3,0.5,1.9L3.3,22.3z M12.7,3.3c0.6-0.2,1.3-0.4,1.9-0.5l0.5,2c-0.7,0.1-1.3,0.3-1.9,0.5L12.7,3.3z M6.2,27.4l1.4-1.4c0.4,0.5,0.9,1,1.4,1.4l-1.4,1.4C7.1,28.3,6.7,27.9,6.2,27.4z M10.9,31c-0.6-0.3-1.2-0.6-1.7-1l1-1.8c0.5,0.4,1.1,0.7,1.7,1L10.9,31z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 10 10" id="icon-registered-symbol">
                        <title>registered-symbol</title>
                        <g id="registered-symbol-_x31_0px">
                            <path
                                d="M5,0.7c0.4,0,0.8,0.1,1.1,0.2c0.4,0.1,0.7,0.2,1,0.4c0.3,0.2,0.6,0.4,0.9,0.7c0.3,0.3,0.5,0.6,0.7,0.9c0.2,0.3,0.3,0.7,0.4,1C9.3,4.2,9.3,4.6,9.3,5c0,0.4-0.1,0.8-0.2,1.2c-0.1,0.4-0.2,0.7-0.4,1C8.5,7.5,8.3,7.8,8.1,8.1C7.8,8.3,7.5,8.6,7.2,8.7c-0.3,0.2-0.7,0.3-1,0.4C5.8,9.3,5.4,9.3,5,9.3c-0.4,0-0.8-0.1-1.2-0.2c-0.4-0.1-0.7-0.2-1-0.4C2.5,8.6,2.2,8.3,1.9,8.1C1.7,7.8,1.5,7.5,1.3,7.2c-0.2-0.3-0.3-0.7-0.4-1C0.7,5.8,0.7,5.4,0.7,5c0-0.4,0.1-0.8,0.2-1.1c0.1-0.4,0.2-0.7,0.4-1c0.2-0.3,0.4-0.6,0.7-0.9c0.3-0.3,0.6-0.5,0.9-0.7c0.3-0.2,0.7-0.3,1-0.4C4.2,0.7,4.6,0.7,5,0.7z M5,9c0.4,0,0.7,0,1.1-0.1c0.3-0.1,0.7-0.2,1-0.4c0.3-0.2,0.6-0.4,0.8-0.6C8.1,7.6,8.3,7.3,8.4,7c0.2-0.3,0.3-0.6,0.4-1C8.9,5.7,9,5.4,9,5c0-0.6-0.1-1.1-0.3-1.6S8.2,2.5,7.8,2.2S7,1.5,6.6,1.3C6.1,1.1,5.6,1,5,1S3.9,1.1,3.4,1.3C3,1.5,2.5,1.8,2.2,2.2C1.8,2.5,1.5,3,1.3,3.4S1,4.4,1,5c0,0.6,0.1,1.1,0.3,1.6s0.5,0.9,0.8,1.3C2.5,8.2,3,8.5,3.4,8.7C3.9,8.9,4.4,9,5,9z M4.9,2.3c0.6,0,1.1,0.1,1.4,0.3c0.3,0.2,0.5,0.6,0.5,1.1c0,0.4-0.1,0.7-0.4,1C6.1,5,5.7,5.1,5.3,5.2c0.1,0,0.2,0.1,0.2,0.2l1.7,2.2H6.7c0,0-0.1,0-0.1,0c0,0-0.1,0-0.1-0.1L4.9,5.5c0,0-0.1-0.1-0.1-0.1c0,0-0.1,0-0.2,0H3.9v2.3H3.4V2.3H4.9z M4.8,4.9c0.5,0,0.8-0.1,1.1-0.3c0.2-0.2,0.4-0.5,0.4-0.8c0-0.4-0.1-0.6-0.3-0.8s-0.6-0.3-1-0.3h-1v2.2H4.8z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-shield-check-o">
                        <title>shield-check-o</title>
                        <g id="shield-check-o-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M17.5,2.5l-15,2c0,0,0.5,16.8,4.9,22.9c2.6,3.5,10.1,5.2,10.1,5.2s7.5-1.6,10.1-5.2c4.4-6,4.9-22.9,4.9-22.9L17.5,2.5z M26.4,25.9c-2.2,3-8.9,4.7-8.9,4.7s-6.7-1.7-8.9-4.7C4.9,20.7,4.4,6.4,4.4,6.4l13.1-2l13.1,2C30.6,6.4,30.1,20.7,26.4,25.9z M23.3,10.2l1.4,1.4l-6.8,11.7l-0.3,0.5l-6.3-6.2l1.4-1.4l4.5,4.5L23.3,10.2z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-square-check-o">
                        <title>square-check-o</title>
                        <g id="square-check-o-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M27.5,2.5h-20c-2.8,0-5,2.2-5,5v20c0,2.8,2.2,5,5,5h20c2.8,0,5-2.2,5-5v-20C32.5,4.7,30.3,2.5,27.5,2.5z M30.5,25.5c0,2.8-2.2,5-5,5h-16c-2.8,0-5-2.2-5-5v-16c0-2.8,2.2-5,5-5h16c2.8,0,5,2.2,5,5V25.5zM24.8,10.8l1.4,1.4L16.1,25.4l-6.3-6.2l1.4-1.4l4.6,4.6L24.8,10.8z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-square-double-arrow-o">
                        <title>square-double-arrow-o</title>
                        <g id="square-double-arrow-o-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M27.1,7.5l0.4,0.4v7.6h-2v-3c0-0.5-0.1-0.9-0.3-1.3l-14,14c0.4,0.2,0.8,0.3,1.3,0.3h3v2H7.9l-0.4-0.4v-7.6h2v3c0,0.5,0.1,0.9,0.3,1.3l14-14c-0.4-0.2-0.8-0.3-1.3-0.3h-3v-2H27.1z M32.5,5.5v24c0,1.7-1.3,3-3,3h-24c-1.7,0-3-1.3-3-3v-24c0-1.7,1.3-3,3-3h24C31.2,2.5,32.5,3.8,32.5,5.5z M30.5,7.2c0-1.7-1.1-2.8-2.8-2.8H7.2c-1.7,0-2.8,1.1-2.8,2.8v20.4c0,1.7,1.2,2.8,2.8,2.8h20.2c1.7,0,3-1.3,3-3V7.2z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-square-notification-o">
                        <title>square-notification-o</title>
                        <g id="square-notification-o-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M32.5,8.5c0-3.3-2.7-6-6-6c-2.6,0-4.8,1.7-5.7,4H5.5c-1.7,0-3,1.3-3,3v20c0,1.7,1.3,3,3,3h20c1.7,0,3-1.3,3-3V14.2C30.8,13.3,32.5,11.1,32.5,8.5z M26.5,27.5c0,1.7-1.3,3-3,3h-16c-1.7,0-3-1.3-3-3v-16c0-1.7,1.3-3,3-3h13c0,3.3,2.7,6,6,6V27.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-switches">
                        <title>switches</title>
                        <g id="switches-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M26,2.5H9C5.4,2.5,2.5,5.4,2.5,9v1c0,3.6,2.9,6.5,6.5,6.5h17c3.6,0,6.5-2.9,6.5-6.5V9C32.5,5.4,29.6,2.5,26,2.5z M25.5,14.5h-16c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5h16c2.8,0,5,2.2,5,5C30.5,12.3,28.3,14.5,25.5,14.5z M26,18.5H9c-3.6,0-6.5,2.9-6.5,6.5v1c0,3.6,2.9,6.5,6.5,6.5h17c3.6,0,6.5-2.9,6.5-6.5v-1C32.5,21.4,29.6,18.5,26,18.5z M25.5,30.5h-16c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5h16c2.8,0,5,2.2,5,5C30.5,28.3,28.3,30.5,25.5,30.5z M9.5,5.5c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4c-2.2,0-4-1.8-4-4C5.5,7.3,7.3,5.5,9.5,5.5z M25.5,21.5c2.2,0,4,1.8,4,4c0,2.2-1.8,4-4,4s-4-1.8-4-4C21.5,23.3,23.3,21.5,25.5,21.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-timer">
                        <title>timer</title>
                        <g id="timer-_x33_5px">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M16.4,8h2v2h-2V8z M16.4,28h2v2h-2V28z M6.4,18h2v2h-2V18z M26.4,18h2v2h-2V18zM23.4,11h2v2h-2V11z M9.4,25h2v2h-2V25z M11.4,11h-2v2h2V11z M25.4,25h-2v2h2V25z M22.9,13.4C22.9,13.4,22.9,13.3,22.9,13.4L22.9,13.4C22,14,16.6,17.8,16.4,18c-0.2,0.3-0.1,2-0.1,2l0,0c0,0,1.8,0.1,2-0.1C18.7,19.8,22.3,14.3,22.9,13.4L22.9,13.4C23,13.4,22.9,13.4,22.9,13.4z M31.1,9.5l-4.2-4.2l-2.3,2.3c-1.4-0.9-3-1.5-4.7-1.9c-0.1-0.2-0.2-0.5-0.2-0.7c0-0.7,0.7-1.5,0.8-1.5h0.5v-1h-7v1h0.5c0,0,0.8,0.7,0.8,1.5c0,0.3-0.1,0.5-0.2,0.7c-6.3,1.2-11,6.7-11,13.3c0,7.5,6,13.5,13.5,13.5c7.5,0,13.5-6,13.5-13.5c0-2.6-0.8-5.1-2.1-7.2L31.1,9.5z M17.4,30.5C11,30.5,5.9,25.4,5.9,19S11,7.5,17.4,7.5S28.9,12.6,28.9,19S23.7,30.5,17.4,30.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 35 35" id="icon-users">
                        <title>users</title>
                        <g id="users-_x33_5px">
                            <path
                                d="M6.5,28.4c0,0.4,0,0.7,0.1,1c-3-0.2-6.1-0.8-6.1-3.1c0-2.9,2.5-8,6.3-8c-2-1.3-3.3-3.7-3.3-6.3c0-4.1,3.2-7.5,7.1-7.5c1,0,1.9,0.2,2.7,0.6c-0.5,0.5-0.9,1.1-1.2,1.8c-0.5-0.3-1-0.4-1.6-0.4c-2.5,0-5.1,2.9-5.1,5.6s2.7,4.5,5.1,4.5c0.4,0,0.8-0.1,1.2-0.2c0.3,0.4,0.7,0.8,1.4,1.2c-1,0-1.8,0.3-2.5,0.8c0,0,0,0,0,0c-4.8,0-8,5.2-8.1,7.7c0.3,0.3,1.8,0.8,4.1,1.1C6.5,27.6,6.5,28.1,6.5,28.4z M34.5,27.6c0,4.1-9.1,4.9-13,4.9c-3.9,0-13-0.8-13-4.9c0-3.4,4.8-9.2,8.9-9.1c-2.2-1.5-3.9-4.2-3.9-7.3c0-4.8,3.8-8.7,8.1-8.7s7.9,3.9,7.9,8.7c0,3.1-1.6,5.8-3.7,7.3C30.1,18.5,34.5,24.1,34.5,27.6zM21.6,17.6c2.8,0,6-3.3,6-6.4c0-3.2-3.1-6.7-6-6.7c-2.8,0-6.1,3.6-6.1,6.7C15.5,14.3,18.8,17.6,21.6,17.6z M32.4,27.5c-0.2-3.1-4.5-8.1-10.8-8.1c-6.5,0-10.8,5-11,8.1c0.6,0.6,4.9,3,10.9,3C27.5,30.5,31.8,28.1,32.4,27.5z"/>
                        </g>
                    </symbol>
                    <symbol preserveAspectRatio="xMidYMax meet" viewBox="0 0 34 35" id="icon-program">
                        <title>program</title>
                        <path d="M32.0362372,21.9005009 C32.4200273,20.5062577 32.6254213,19.0348391 32.6254213,17.5140373 C32.6254213,8.64641559 25.642183,1.45778787 17.0279219,1.45778787 C8.41366086,1.45778787 1.4304225,8.64641559 1.4304225,17.5140373 C1.4304225,26.381659 8.41366086,33.5702867 17.0279219,33.5702867 C17.6722556,33.5702867 18.3074641,33.5300676 18.9313075,33.4519353 L18.7846682,34.4050099 C18.203262,34.4687686 17.6128404,34.5014693 17.0149994,34.5014693 C7.89401708,34.5014693 0.5,26.8899812 0.5,17.5007347 C0.5,8.11148817 7.89401708,0.5 17.0149994,0.5 C26.1359817,0.5 33.5299988,8.11148817 33.5299988,17.5007347 C33.5299988,19.1927291 33.2898851,20.8269926 32.8428214,22.369386 C33.2649256,22.7636463 33.5299988,23.3328585 33.5299988,23.9658028 C33.5299988,25.155989 32.592729,26.1208255 31.4365482,26.1208255 C30.2803673,26.1208255 29.3430975,25.155989 29.3430975,23.9658028 C29.3430975,22.7756166 30.2803673,21.8107801 31.4365482,21.8107801 C31.6449602,21.8107801 31.846259,21.8421308 32.0362372,21.9005009 Z M31.7556275,22.8141866 C31.6542367,22.7844742 31.5471969,22.7685679 31.4365482,22.7685679 C30.7942255,22.7685679 30.27352,23.3045882 30.27352,23.9658028 C30.27352,24.6270173 30.7942255,25.1630376 31.4365482,25.1630376 C32.0788709,25.1630376 32.5995763,24.6270173 32.5995763,23.9658028 C32.5995763,23.4926974 32.3329991,23.0836858 31.9460338,22.8892567 L31.7414018,22.8558929 C31.7461617,22.8419995 31.7509036,22.8280974 31.7556275,22.8141866 Z M24.757045,9.56785664 L25.3888019,9.54822199 L25.3888019,19.0494776 C25.3888019,21.5435573 24.5625867,25.1663899 17.4662543,27.9473269 L17.2522571,28.0364012 L17.0289557,27.9473269 C9.93262331,25.1759678 9.10640813,21.5435573 9.10640813,19.0494776 L9.10640813,9.54822199 L9.73816501,9.56785664 C14.6763824,9.73642731 16.776346,7.48945697 16.7954197,7.46982232 L17.2429529,6.96506811 L17.7095598,7.45976555 C17.718864,7.47987909 19.711829,9.57791342 24.2318215,9.57791342 C24.4072062,9.57791342 24.5821256,9.57791342 24.757045,9.56785664 Z M23.8988233,10.2890274 C23.7438947,10.2981699 23.588966,10.2981699 23.4336253,10.2981699 C19.4302034,10.2981699 17.6650058,8.39086596 17.656765,8.37258092 L17.2434846,7.92285598 L16.847098,8.38172344 C16.8302042,8.39957312 14.9702364,10.4422734 10.5963867,10.2890274 L10.0368306,10.2711777 L10.0368306,18.9086828 C10.0368306,21.1760279 10.7686212,24.4782193 17.0539442,26.9976367 L17.2517255,27.0786134 L17.4412658,26.9976367 C23.7265888,24.4695121 24.4583794,21.1760279 24.4583794,18.9086828 L24.4583794,10.2711777 L23.8988233,10.2890274 Z M15.8636015,19.6605463 L14.2181494,17.9666985 C14.0343909,17.7775354 13.7427035,17.7804087 13.5608059,17.9676563 C13.3779778,18.1558616 13.3789083,18.4575647 13.5598754,18.6438545 L15.4532852,20.5929528 C15.4672416,20.6073196 15.4816631,20.6202498 15.4965499,20.6322221 C15.5081801,20.6475467 15.5212061,20.6623924 15.5346972,20.6767592 C15.7175252,20.8649646 16.0110735,20.8635279 16.1929711,20.6762803 L20.7976321,15.9361882 C20.9804601,15.7479829 20.9795297,15.4458008 20.7980973,15.2585533 C20.614804,15.0703479 20.321721,15.0717846 20.1398234,15.2590322 L15.8636015,19.6605463 L15.8636015,19.6605463 Z"/>
                    </symbol>
                </svg>
                <div className="nav-spacer menu-spacer"/>
                <div className="glx-wrapper">
                    {/* Background */}
                    <section className="glx-section glx-section--background">
                        <div className="glx-background glx-background--stars" data-200-top="transform: translate3d(-50%, -500px, 0);" data--4200-top="transform: translate3d(-50%, 600px, 0);"/>
                        <div className="glx-background glx-background--clouds is-ready" data-background-glue="'glx-faq'" data-anchor-target="#glx-faq" data-300-bottom-top="transform: translate3d(-50%, 150px, 0);" data--560-bottom-top="transform: translate3d(-50%, -200px, 0);" style={{top: this.state.top}}/>
                        <div className="glx-background glx-background--planets is-ready" data-background-glue="'glx-faq'" data-anchor-target="#glx-faq" data-1750-bottom-top="transform: translate3d(-50%, -450px, 0);" data--560-bottom-top="transform: translate3d(-50%, 450px, 0);" style={{top: this.state.top}}/>
                    </section>
                    {/* End Background */}

                    {/* Advert Screen */}
                    <section className="glx-section glx-section--intro" id="glx-advert">
                        <div className="glx-section__inner">
                            <header className="glx-big-header glx-text--centered ">
                                <h1>
                                    GOG GALAXY
                                    <svg className="glx-icon glx-big-header__label-icon">
                                        <use xlinkHref="#icon-registered-symbol"/>
                                    </svg>
                                </h1>
                                <p className="glx-big-header__intro">
                                    The gaming Client designed for a convenient purchasing, playing and updating games, as well as an online play between gaming platforms, GOG Galaxy is also built with optionality in mind, and a belief that you should own the games you buy.
                                </p>
                            </header>
                            <div className="glx-text--centered" id="glx-downloads">
                                {/* ng-show="landingPage.downloads.os == 'Mac'" gog-track-event="{'Action': 'clickOnGalaxyDownload'}" */}
                                <a className="glx-button glx-button--big glx-button--wide glx-button--blue ng-hide"
                                   href="https://cdn.gog.com/open/galaxy/client/galaxy_client_1.2.12.11.pkg">
                                    Download GOG Galaxy
                                </a>
                                {/* ng-show="landingPage.downloads.os != 'Mac'" gog-track-event="{'Action': 'clickOnGalaxyDownload'}" */}
                                <a className="glx-button glx-button--big glx-button--wide glx-button--blue"
                                   href="https://cdn.gog.com/open/galaxy/client/setup_galaxy_1.2.12.10a.exe">
                                    Download GOG Galaxy
                                </a>
                                {/* ng-click="landingPage.showOurVisionOverlay()" */}
                                <button className="glx-button glx-button--big">
                                    DISCOVER OUR VISION
                                </button>
                                <div>
                                    <small>
                                        {/* ng-show="landingPage.downloads.os == 'Mac'" */}
                                        <span className="ng-hide">
                                            GOG Galaxy Client requires Mac OS X 10.8 or newer. Also available for <a className="glx-text--underlined" href="https://cdn.gog.com/open/galaxy/client/setup_galaxy_1.2.12.10a.exe">Windows</a> and soon for Linux.
                                        </span>
                                        {/* ng-show="landingPage.downloads.os == 'Windows'" */}
                                        <span>
                                            GOG Galaxy Client requires Windows 7 or newer. Also available for <a className="glx-text--underlined" href="https://cdn.gog.com/open/galaxy/client/galaxy_client_1.2.12.11.pkg">Mac OS X</a> and soon for Linux.
                                        </span>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* end Advert Screen */}

                    {/* Intro Screen */}
                    <section className="glx-section glx-section--hero" id="glx-hero">
                        <div className="glx-section__inner">
                            <div className="glx-images">
                                <picture className="glx-image glx-image--screen-hero-chat" data-1000-top="transform: translate3d(-50%, 0px, 0);" data--1000-top="transform: translate3d(-50%, 200px, 0);">
                                    <source media="(max-width: 890px)" srcSet={intro_screen_left_1x_mob + ", " + intro_screen_left_2x_mob + " 2x"}/>
                                    <source media="screen" srcSet={intro_screen_left_1x + ", " + intro_screen_left_2x + " 2x"}/>
                                    <img src={intro_screen_left_1x} alt="screen-slots-png"/>
                                </picture>
                                <picture className="glx-image glx-image--screen-hero-main" data-1000-top="transform: translate3d(-50%, -50px, 0);" data--1000-top="transform: translate3d(-50%, 100px, 0);">
                                    <source media="(max-width: 890px)"
                                            srcSet={intro_screen_middle_1x_mob + ", " + intro_screen_middle_2x_mob + " 2x"}/>
                                    <source media="screen" srcSet={intro_screen_middle_1x + ", " + intro_screen_middle_2x + " 2x"}/>
                                    <img src={intro_screen_middle_1x} alt="screen-intro-main"/>
                                </picture>
                                <picture className="glx-image glx-image--screen-hero-friends"
                                         data-1000-top="transform: translate3d(-50%, 0px, 0);"
                                         data--1000-top="transform: translate3d(-50%, 300px, 0);">
                                    <source media="(max-width: 890px)"
                                            srcSet={intro_screen_right_1x_mob + ", " + intro_screen_right_2x_mob + " 2x"}/>
                                    <source media="screen"
                                            srcSet={intro_screen_right_1x + ", " + intro_screen_right_2x + " 2x"}/>
                                    <img src={intro_screen_right_1x} alt="screen-hero-friends"/>
                                </picture>
                            </div>
                            {/* rotator */}
                            {/*<div className="glx-text-rotator" ng-controller="galaxyRotatorCtrl as rotator">*/}
                                {/*<blockquote js-galaxy-rotator-item className="glx-text-rotator__item is-active">*/}
                                    {/*<q className="glx-text-rotator__quote">GOG Galaxy Is A Smart, Pro-Gamer Alternative To Steam</q>*/}
                                    {/*<cite className="glx-text-rotator__title">Forbes</cite>*/}
                                {/*</blockquote>*/}
                                {/*<blockquote js-galaxy-rotator-item className="glx-text-rotator__item">*/}
                                    {/*<q className="glx-text-rotator__quote">GOG Galaxy is an optional convenience, not a requirement.</q>*/}
                                    {/*<cite className="glx-text-rotator__title">PC World</cite>*/}
                                {/*</blockquote>*/}
                                {/*<blockquote js-galaxy-rotator-item className="glx-text-rotator__item">*/}
                                    {/*<q className="glx-text-rotator__quote">GOG Galaxy is a necessary break from Steam&#039;s feature creep</q>*/}
                                    {/*<cite className="glx-text-rotator__title">PC GAMER</cite>*/}
                                {/*</blockquote>*/}
                                {/*<blockquote js-galaxy-rotator-item className="glx-text-rotator__item">*/}
                                    {/*<q className="glx-text-rotator__quote">GOG Galaxy is a welcome alternative</q>*/}
                                    {/*<cite className="glx-text-rotator__title">The Verge</cite>*/}
                                {/*</blockquote>*/}
                            {/*</div>*/}
                            {/* End rotator */}
                        </div>
                    </section>
                    {/* end Intro Screen */}

                    {/* Intro text section */}
                    <section className="glx-section glx-section--update-1-2" id="glx-update-1-2">
                        <div className="glx-section__inner">
                            <header className="glx-big-header glx-text--centered glx-big-header--iconed">
                                <div className="glx-big-header__icon"/>
                                <h1>{t('AB Gaming')}</h1>
                                <p className="glx-big-header__intro">Universal Cloud Saves, in-game overlay, bandwidth limiting, capturing screenshots, desktop notifications and more…</p>
                            </header>
                            <div className="glx-text--centered">
                                {/* ng-click="landingPage.showChangelogOverlay()" */}
                                <button className="glx-button glx-button--big">
                                    Learn more about update 1.2
                                </button>
                            </div>
                        </div>
                    </section>
                    {/* end Intro text section */}

                    {/* Slots section */}
                    <section className="glx-section glx-section--library">
                        <div className="glx-section__inner">
                            <div className="glx-images">
                                <picture className="glx-image glx-image--screen-client-library"
                                         data-1000-top="transform: translate3d(-50%, -100px, 0);"
                                         data--1000-top="transform: translate3d(-50%, 100px, 0);">
                                    <source media="(max-width: 890px)"
                                            srcSet={slots_screen_middle_1x_mob + ", " + slots_screen_middle_2x_mob + " 2x"}/>
                                    <source media="screen"
                                            srcSet={slots_screen_middle_1x + ", " + slots_screen_middle_2x + " 2x"}/>
                                    <img src={slots_screen_middle_1x} alt="Slots"/>
                                </picture>
                            </div>
                            <header className="glx-big-header glx-text--centered glx-big-header--iconed">
                                <div className="glx-big-header__icon"/>
                                <h1>LIBRARY FEATURES</h1>
                                <p className="glx-big-header__intro">
                                    Installing, updating and syncing saves - with you in charge.
                                </p>
                            </header>
                            <ul className="glx-features-list ">
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-monitor-arrow-down"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span>Install & auto-update</span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        Install any game with a single click, and GOG Galaxy will keep it always up to date. Optional bandwidth limiting and scheduling gives you additional control.
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-cloud-arrow"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span className="glx-feature-badgeWrapper">
                                            Cloud saves
                                            <span className="glx-feature-badge">new</span>
                                        </span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        Never lose your progress again! Your saves will automatically backup to the Cloud and will stay synced between your computers. (supported games only)
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-circle-thunder-o"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span>Offline mode</span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        It’s up to you when and how to play your games. GOG Galaxy will always work without an internet connection, and so will your GOG Galaxy installed games.
                                    </p>
                                </li>
                                {/*<li className="glx-features-list__element">*/}
                                    {/*<svg className="glx-icon">*/}
                                        {/*<use xlinkHref="#icon-clock-undo"/>*/}
                                    {/*</svg>*/}
                                    {/*<h2 className="glx-features-list__label">*/}
                                        {/*<span>Rollbacks</span>*/}
                                    {/*</h2>*/}
                                    {/*<p className="glx-features-list__text">*/}
                                        {/*Sometimes game updates break things. Thanks to the built-in Rollback feature, you can restore your game to prior states with just a single click.*/}
                                    {/*</p>*/}
                                {/*</li>*/}
                                {/*<li className="glx-features-list__element">*/}
                                    {/*<svg className="glx-icon">*/}
                                        {/*<use xlinkHref="#icon-square-check-o"/>*/}
                                    {/*</svg>*/}
                                    {/*<h2 className="glx-features-list__label">*/}
                                        {/*<span>Optional auto-updates</span>*/}
                                    {/*</h2>*/}
                                    {/*<p className="glx-features-list__text">*/}
                                        {/*Don’t like being forced to update? In GOG Galaxy you can turn off auto-updating for any game and receive notifications when new updates are available.*/}
                                    {/*</p>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </section>
                    {/* end Slots section */}

                    {/* Live section */}
                    <section className="glx-section glx-section--in-game" id="glx-in-game">
                        <div className="glx-section__inner">
                            <div className="glx-images">
                                <picture className="glx-image glx-image--screen-game-overlay"
                                         data-1000-top="transform: translate3d(-50%, -100px, 0);"
                                         data--1000-top="transform: translate3d(-50%, 100px, 0);">
                                    <source media="(max-width: 890px)"
                                            srcSet={live_screen_1x_mob + ", " + live_screen_2x_mob + " 2x"}/>
                                    <source media="screen"
                                            srcSet={live_screen_1x + ", " + live_screen_2x + " 2x"}/>
                                    <img src={live_screen_1x} alt="screen-game-overlay"/>
                                </picture>
                            </div>
                            <header className="glx-big-header glx-text--centered glx-big-header--iconed">
                                <div className="glx-big-header__icon"/>
                                <h1>GAME FEATURES</h1>
                                <p className="glx-big-header__intro">
                                    Enriching games with additional features, online and offline.
                                </p>
                            </header>
                            <ul className="glx-features-list ">
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-cup"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span>Achievements & playtime</span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        Unlock achievement laid out by the developers and track your playtime. Win bragging rights or just do it for the sake of your inner completionist.
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-square-double-arrow-o"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span className="glx-feature-badgeWrapper">
                                            In-game overlay
                                            <span className="glx-feature-badge">new</span>
                                        </span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        See notifications, chat with friends or check how many FPS your glorious PC is pushing by pressing Shift+Tab in-game. (supported games only)
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-camera"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span className="glx-feature-badgeWrapper">
                                            Screenshots
                                            <span className="glx-feature-badge">new</span>
                                        </span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        For all overlay supported games, you can capture a screenshot to immortalise that epic moment - simply press F12 when the time is right.
                                    </p>
                                </li>
                                {/*<li className="glx-features-list__element">*/}
                                    {/*<svg className="glx-icon">*/}
                                        {/*<use xlinkHref="#icon-dandelion"/>*/}
                                    {/*</svg>*/}
                                    {/*<h2 className="glx-features-list__label">*/}
                                        {/*<span>Multiplayer & matchmaking</span>*/}
                                    {/*</h2>*/}
                                    {/*<p className="glx-features-list__text">*/}
                                        {/*GOG Galaxy-powered multiplayer games offer matchmaking and online play. In new and classic games alike, meet other players and make friends... or enemies.*/}
                                    {/*</p>*/}
                                {/*</li>*/}
                                {/*<li className="glx-features-list__element">*/}
                                    {/*<svg className="glx-icon">*/}
                                        {/*<use xlinkHref="#icon-orbit"/>*/}
                                    {/*</svg>*/}
                                    {/*<h2 className="glx-features-list__label">*/}
                                        {/*<span>Crossplay</span>*/}
                                    {/*</h2>*/}
                                    {/*<p className="glx-features-list__text">*/}
                                        {/*Crossplay-enabled games offer online play between GOG and Steam. Because where you buy your games shouldn&#039;t prevent you from playing with friends.*/}
                                    {/*</p>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </section>
                    {/* end Live section */}

                    {/* Lottery section */}
                    <section className="glx-section glx-section--community" id="glx-community">
                        <div className="glx-section__inner">
                            <div className="glx-images">
                                <picture className="glx-image glx-image--screen-game-overlay"
                                         data-1000-top="transform: translate3d(-50%, -100px, 0);"
                                         data--1000-top="transform: translate3d(-50%, 100px, 0);">
                                    <source media="(max-width: 890px)"
                                            srcSet={lottery_screen_1x_mob + ", " + lottery_screen_2x_mob + " 2x"}/>
                                    <source media="screen"
                                            srcSet={lottery_screen_1x + ", " + lottery_screen_2x + " 2x"}/>
                                    <img src={lottery_screen_1x} alt="screen-game-overlay"/>
                                </picture>
                            </div>
                            <header className="glx-big-header glx-text--centered glx-big-header--iconed">
                                <div className="glx-big-header__icon"/>
                                <h1>COMMUNITY FEATURES</h1>
                                <p className="glx-big-header__intro">More ways to build friendships and stay in touch.</p>
                            </header>
                            <ul className="glx-features-list ">
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-users"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span>Friends list</span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        Add people you like to your friends list. Keep track of their activities, see if they are online, what are they playing, start a new chat or invite them to a game.
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-chat"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span className="glx-feature-badgeWrapper">
                                            Online chat
                                            <span className="glx-feature-badge">new</span>
                                        </span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        No matter if your friends are playing a game, using GOG Galaxy or browsing GOG website, you can always chat with them. Stay connected!
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-circle-plus-o"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span>Game inviting & joining</span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        Enjoy playing games in good company? Invite friends from within the game, or join their games from GOG Galaxy Client. (supported games only)
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </section>
                    {/* end Lottery section */}

                    {/* More section */}
                    <section className="glx-section glx-section--more" id="glx-more">
                        <div className="glx-section__inner">
                            <div className="glx-images">
                                <picture className="glx-image glx-image--screen-grid-bottom"
                                         data-1000-top="transform: translate3d(-50%, 50px, 0);"
                                         data--1000-top="transform: translate3d(-50%, -50px, 0);">
                                    <source media="(max-width: 890px)"
                                            srcSet={more_screen_falling1_1x_mob + ", " + more_screen_falling1_2x_mob + " 2x"}/>
                                    <source media="screen"
                                            srcSet={more_screen_falling1_1x + ", " + more_screen_falling1_2x + " 2x"}/>
                                    <img src={more_screen_falling1_1x} alt="screen-grid-bottom"/>
                                </picture>
                                <picture className="glx-image glx-image--screen-grid-middle"
                                         data-1000-top="transform: translate3d(-50%, 0px, 0);"
                                         data--1000-top="transform: translate3d(-50%, 150px, 0);">
                                    <source media="(max-width: 890px)"
                                            srcSet={more_screen_falling2_1x_mob + ", " + more_screen_falling2_2x_mob + " 2x"}/>
                                    <source media="screen"
                                            srcSet={more_screen_falling2_1x + ", " + more_screen_falling2_2x + " 2x"}/>
                                    <img src={more_screen_falling2_1x} alt="screen-grid-middle"/>
                                </picture>
                                <picture className="glx-image glx-image--screen-grid-front"
                                         data-1000-top="transform: translate3d(-50%, -50px, 0);"
                                         data--1000-top="transform: translate3d(-50%, 300px, 0);">
                                    <source media="(max-width: 890px)"
                                            srcSet={more_screen_falling3_1x_mob + ", " + more_screen_falling3_2x_mob + " 2x"}/>
                                    <source media="screen"
                                            srcSet={more_screen_falling3_1x + ", " + more_screen_falling3_2x + " 2x"}/>
                                    <img src={more_screen_falling3_1x} alt="screen-grid-front"/>
                                </picture>
                            </div>
                            <header className="glx-big-header glx-text--centered glx-big-header--iconed">
                                <div className="glx-big-header__icon"/>
                                <h1>MORE</h1>
                                <p className="glx-big-header__intro">
                                    简单，从来都不简单
                                </p>
                            </header>
                            <ul className="glx-features-list ">
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-switches"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span className="glx-feature-badgeWrapper">
                                            Choose your features
                                            <span className="glx-feature-badge">new</span>
                                        </span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        GOG Galaxy is about freedom of choice. Not into achievements? Desktop notifications distract you? Adjust the Client to your needs and stay clutter-free.
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-shield-check-o"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span>Privacy</span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        We deeply respect our users, so we’ve also built GOG Galaxy to respect your privacy. We don’t track your personal data... we don’t even look for it.
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-square-notification-o"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span className="glx-feature-badgeWrapper">
                                            Notifications
                                            <span className="glx-feature-badge">new</span>
                                        </span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        No matter if GOG Galaxy sleeps in the background or if you are playing a game, you won’t miss that new message, invite for a round of multiplayer or a friend request.
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon">
                                        <use xlinkHref="#icon-chip-smile"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span>Constantly optimised</span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        We believe that GOG Galaxy should be as lightweight as possible, and with every version we do our best to decrease its CPU footprint.
                                    </p>
                                </li>
                                <li className="glx-features-list__element">
                                    <svg className="glx-icon" style={{width: '75px', height: '75px'}}>
                                        <use xlinkHref="#icon-program"/>
                                    </svg>
                                    <h2 className="glx-features-list__label">
                                        <span>Always optional</span>
                                    </h2>
                                    <p className="glx-features-list__text">
                                        Beyond all these features, GOG Galaxy will never be mandatory. And that’s great motivation for us - we want to make it so good, that you actually want to use it.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </section>
                    {/* end More section */}

                    {/* glx-faq */}
                    <section className="glx-section glx-section--faq" id="glx-faq">
                        <div className="glx-section__inner">
                            <header className="glx-big-header glx-text--centered glx-big-header--iconed">
                                <div className="glx-big-header__icon"/>
                                <h1>COMMON QUESTIONS</h1>
                            </header>
                            <section className="glx-faq-list">
                                <ul className="glx-list">
                                    {/* galaxy-accordion */}
                                    <li className="glx-faq-list__item">
                                        {/* galaxy-accordion-trigger */}
                                        <h3 className="glx-faq-list__question">
                                            1. Why create GOG Galaxy?
                                        </h3>
                                        <p className="glx-faq-list__answer">
                                            GOG Galaxy is as much about bringing the GOG.com experience up to modern par, as it is about offering completely new features and standards.<br/>
                                            GOG Galaxy will make it possible for us to support new games that require online features, but it’s equally important to offer an even better experience to our existing users, and to support our community in seamlessly transitioning between our website, into games, and inbetween. We're introducing quality of life features and the means to stay connected whether you're in your browser, in the client, or in-game.<br/>
                                            Most importantly, we want to redefine what it means to use a gaming client. Most GOG Galaxy functionality is optional and toggleable, but we also want to introduce a few features that you haven't seen before. Like rolling back patches.
                                        </p>
                                    </li>
                                </ul>
                                <ul className="glx-list">
                                    {/* galaxy-accordion */}
                                    <li className="glx-faq-list__item">
                                        {/* galaxy-accordion-trigger */}
                                        <h3 className="glx-faq-list__question">
                                            8. Will you still support GOG downloader? Will you develop it further?
                                        </h3>
                                        <p className="glx-faq-list__answer">
                                            We won't disable the GOG downloader on launch day, but we will no longer actively support it. The downloader may be affected as we continue updating our infrastructure, but we don't plan to disable it intentionally.
                                        </p>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </section>
                    {/* end glx-faq */}

                    {/* footer */}
                    <section className="glx-section glx-section--footer">
                        <div className="glx-section__inner">
                            <p>
                                Made with love in Warsaw, Poland. Share your <a href=""><strong>feedback</strong></a> or send <a href=""><strong>bug report</strong></a> and help us to make GOG Galaxy even better.
                            </p>
                        </div>
                    </section>
                    {/* end footer */}
                </div>
            </div>
        );
    }
}
export default translate()(HomePage);