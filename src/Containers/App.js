import 'babel-polyfill'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import {translate} from 'react-i18next'
import Helmet from 'react-helmet'
import {connect} from 'react-redux'

import '../Styles/App.css'
import '../Styles/Overlay.css'

import i18n from '../i18n'
import Footer from '../Components/Footer'
import Navigation from '../Components/Navigation'

import Routers from '../routes'
import ConfigActions from '../Redux/ConfigRedux'
import PusherActions from '../Redux/PusherRedux'
import PlayActions from '../Redux/PlayRedux'

import ABAlert from "../Components/ABAlert"
import Player from "../Components/Player/Player"

import Account from '../Components/ABAccount'
import ConfirmBox from "../Components/ConfirmBox"

//todo: put portal player component in here, like singleton
class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuOverlayVisible: false,
        }
    }

    componentWillMount() {
        !this.props.config.data && this.props.getConfig()
        !this.props.pusher.data && this.props.getPusher()
        window.ABAccount = new Account(process.env.REACT_APP_OAUTH, process.env.REACT_APP_AUTH_URL, i18n.language)
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.pusher.data && nextProps.pusher.data) {
            const pusher = nextProps.pusher.data.client
            const bindings = {
                jackpot: {
                    event: 'jackpot.updated',
                    handler:
                        (message) => {
                            console.log(message)
                        }
                },
                announcement: {
                    event: 'announcement.created',
                    handler: message => console.log(message)
                },
            }
            pusher.subscribe('public-jackpot').bind(bindings.jackpot.event, bindings.jackpot.handler)
            pusher.subscribe('public-announcement').bind(bindings.announcement.event, bindings.announcement.handler)
        }
    }

    toggleMenuOverlay = (show) => {
        this.setState({
            menuOverlayVisible: show,
        })
    }

    htmlClasses = document.getElementsByTagName('html')[0].className

    genClasses = () => {
        const htmlClasses = this.htmlClasses.split(' ')
        const filteredClasses = htmlClasses.filter(c => {
            return !/lang--/g.test(c) && !/prices-in-/g.test(c)
        })
        return filteredClasses.join(' ') + ' lang--' + i18n.language
    }

    render() {
        const currency = !this.props.profile.fetching && !!this.props.profile.data
            ? this.props.profile.data.currency.toLowerCase()
            : !this.props.config.fetching && !!this.props.config.data ? this.props.config.data.currency.toLowerCase() : 'cny'
        const languages = !!this.props.config.data ? this.props.config.data.locales : []
        return (
            <React.Fragment>
                <Helmet htmlAttributes={{
                    lang: i18n.language,
                    class: this.genClasses() + ' prices-in-' + currency,
                }}/>
                <ABAlert/>
                <ConfirmBox/>
                <div className={`menu-overlay${this.state.menuOverlayVisible ? ' is-visible' : ''}`}/>
                <Navigation
                    languages={languages}
                    currency={currency}
                    overlayToggle={this.toggleMenuOverlay}
                    language={i18n.language}
                />
                <div className="wrapper cf">
                    <div className="content cf">
                        {Routers}
                        <div className="footer-spacer"/>
                    </div>
                    <Footer languages={languages}/>
                </div>
                {Object.keys(this.props.play.data).length > 0 && <Player
                    play={this.props.play}
                    onClose={this.props.closePlayer}
                />}
            </React.Fragment>
        )
    }
}

App.propTypes = {
    // auth: PropTypes.object.isRequired,
    getConfig: PropTypes.func.isRequired,
    pusher: PropTypes.object.isRequired,
    getPusher: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    getConfig: () => dispatch(ConfigActions.configRequest()),
    getPusher: () => dispatch(PusherActions.pusherRequest()),
    closePlayer: (brand) => dispatch(PlayActions.playClose(brand)),
})

const mapStateToProps = (state) => {
    return {
        pusher: state.pusher,
        config: state.config,
        profile: state.profile,
        play: state.play,
    }
}

// export default App;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(App)))