import React from 'react'
import ReactDOM from "react-dom"
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import Tab from './Tab'
import Content from "./Content"

import './Player.css'

class Player extends React.Component {

    state = {
        size: 'maximized',
        isLoaded: true,
        active: null,
    }

    getActive = () => {
        const active = !!this.props.play.data ? Object.keys(this.props.play.data).pop() : null
        this.setState({
            active: active,
            size: 'maximized',
        })
    }

    setActive = (id) => {
        this.setState({
            active: id,
            size: 'maximized',
        })
    }

    componentDidMount() {
        this.getActive()
    }

    componentDidUpdate(prevProps) {
        if (!!prevProps.play.data && !!this.props.play.data && this.props.play.data !== prevProps.play.data) {
            this.getActive()
        }
    }

    onClose = e => this.props.onClose()

    onMinimize = e => this.setState({size: 'minimized'})

    onMaximize = e => this.setState({size: 'maximized'})

    onRestore = e => this.setState({size: 'normalized'})

    renderControllers = () => {
        const {t} = this.props
        return (
            <div className={`controllers`}>
                <i className={`ic icon-window-minimize${this.state.size !== 'minimized' ? '' : ' is-invisible--safe'}`} onClick={this.onMinimize} title={t('Minimize')}/>
                {/*<span className={`${this.state.size !== 'minimized' ? '' : ' is-invisible--safe'}`} onClick={this.onMinimize} title={t('Minimize')}>*/}
                    {/*<svg className={`icon-svg`}><use xlinkHref={`#hide`}/></svg>*/}
                {/*</span>*/}
                <i className={`ic icon-window-maximize${this.state.size !== 'maximized' ? '' : ' ng-hide'}`} onClick={this.onMaximize} title={t('Maximize')}/>
                <i className={`ic icon-window-restore${this.state.size === 'maximized' ? '' : ' ng-hide'}`} onClick={this.onRestore} title={t('Restore')}/>
                {/*<span><svg className={`icon-svg`}><use xlinkHref={`#icon-close-thin`}/></svg></span>*/}
                <i className={`ic icon-window-close`} onClick={this.onClose} title={t('Close')}/>
            </div>
        )
    }

    closeGame = gameId => this.props.onClose(gameId)

    render() {
        const {play} = this.props, keys = Object.keys(play.data)
        return ReactDOM.createPortal(
            <React.Fragment>
                <section className={`player-view__tabs`}>
                    {this.renderControllers()}
                    <section className={`game-tabs-list`}>
                        <div className={`tabs-list__scroll-wrapper _gog-iscroll is-on-top is-on-bottom`}>
                            <div style={{
                                transitionTimingFunction: 'cubic-bezier(0.1, 0.57, 0.1, 1)',
                                transitionDuration: '0ms',
                                transform: 'translate(0px, 0px) translateZ(0px)',
                            }}>
                                {/* sortable */}
                                <div>
                                    {!!keys.length && keys.map((b) => <Tab
                                        icon={'2272'}
                                        key={play.data[b].gameId}
                                        onClose={this.closeGame}
                                        id={play.data[b].gameId}
                                        switcher={this.setActive}
                                        isActive={play.data[b].gameId === this.state.active}
                                    />)}
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                {this.state.size !== 'minimized' && <div className={`GalaxyAccountsFrameContainer__overlay`}/>}
                <div className={`GalaxyAccountsFrameContainer${this.state.isLoaded ? ' l-loaded' : ''}`}>
                    <div className={`GalaxyAccountsFrameContainer__container player${this.state.size === 'minimized' ? ' ng-hide' : ''}`}>
                        <section className={`player-view__game${this.state.size === 'normalized' ? ' tiled' : ''}`}>
                            {/* ng-controller="errorMainNotificationCtrl as errorMainNotification" ng-class="{ 'is-visible':errorMainNotification.isVisible }" */}
                            {!!keys.length && keys.map((b) => <Content
                                url={play.data[b].url}
                                key={play.data[b].gameId}
                                isActive={play.data[b].gameId === this.state.active}
                            />)}
                        </section>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
    }
}

Player.propTypes = {
    play: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default translate()(Player)