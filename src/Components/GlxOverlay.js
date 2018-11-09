import React, {Component} from 'react';
import PropTypes from 'prop-types';

class GlxOverlay extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: !1,
        };
    }

    render() {
        return (
            <section className={`glx-overlay ${this.state.show ? '' : 'is-hidden'}`}>
                <div className={`glx-overlay__glass glx-overlay__glass--${this.props.type}`}/>
                <div className="glx-overlay__box glx-overlay__box--big glx-whats-new glx-about-update glx-about-update--1-2">
                    <div className="glx-line-header glx-whats-new__header">
                        <div className="glx-line-header__title glx-whats-new__title">UPDATE 1.2</div>
                    </div>
                    <div className="glx-whats-new__content">
                        <figure className="glx-about-update__version-circle glx-about-update__version-circle--1-2"/>
                        <div className="glx-about-update__subtitle">UPDATE 1.2 HIGHLIGHTS</div>
                        <ul className="glx-features-list glx-about-update__features-list">
                            <li className="glx-features-list__element">
                                <svg className="glx-icon">
                                    <use xlinkHref="#icon-cloud-arrow"/>
                                </svg>
                                <h2 className="glx-features-list__label">
                                    <span>Universal Cloud Saves</span>
                                </h2>
                                <p className="glx-features-list__text">
                                    Never lose your progress again! New games, as well as all-time classics are
                                    upgraded with saves syncing and cloud backup. (supported games only)
                                </p>
                            </li>
                            <li className="glx-features-list__element">
                                <svg className="glx-icon">
                                    <use xlinkHref="#icon-square-double-arrow-o"/>
                                </svg>
                                <h2 className="glx-features-list__label">
                                    <span>In-game overlay</span>
                                </h2>
                                <p className="glx-features-list__text">
                                    Chat with friends, check notifications or your achievement progress by
                                    pressing Shift+Tab in supported games.
                                </p>
                            </li>
                            <li className="glx-features-list__element">
                                <svg className="glx-icon">
                                    <use xlinkHref="#icon-switches"/>
                                </svg>
                                <h2 className="glx-features-list__label">
                                    <span>Choosing your features</span>
                                </h2>
                                <p className="glx-features-list__text">
                                    Customize the Client to your needs by selecting features you want to use,
                                    for a personalised experience and no feature-creep.
                                </p>
                            </li>
                        </ul>
                        <div className="glx-about-update__subtitle">OTHER IMPROVEMENTS AND FIXES</div>
                        <div className="glx-about-update__other-improvements">
                            <div className="glx-about-update__other-improvements-column">
                                <h3 className="glx-about-update__other-improvement-title">Bandwidth limit &amp;
                                    schedule</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    GOG Galaxy downloads as fast as it can, but sometimes you might want to
                                    limit that. And you can schedule limits too.
                                </p>
                                <h3 className="glx-about-update__other-improvement-title">New chat</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    Rewritten from scratch, it lets you stay connected with friends when playing
                                    a game or when using the Client.
                                </p>
                                <h3 className="glx-about-update__other-improvement-title">Out of beta</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    GOG Galaxy is out of beta - only new preview features will be beta limited.
                                </p>
                            </div>
                            <div className="glx-about-update__other-improvements-column">
                                <h3 className="glx-about-update__other-improvement-title">Screenshots</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    Press F12 in games supporting in-game overlay to capture that epic moment.
                                </p>
                                <h3 className="glx-about-update__other-improvement-title">New hibernation
                                    mode</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    On top of making GOG Galaxy even faster, auto-hibernation drastically
                                    reduces CPU usage when idle or playing games - to save your precious
                                    resources.
                                </p>
                                <h3 className="glx-about-update__other-improvement-title">New settings
                                    window</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    Control and customise Client’s features from the new settings window.
                                </p>
                            </div>
                            <div className="glx-about-update__other-improvements-column">
                                <h3 className="glx-about-update__other-improvement-title">FPS counter</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    Overlay includes frames per second counter to measure how well does the game
                                    perform on your glorious PC.
                                </p>
                                <h3 className="glx-about-update__other-improvement-title">Achievement
                                    rarity</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    Whenever you unlock an achievement you will see how common or unique it is
                                    among GOG community.
                                </p>
                                <h3 className="glx-about-update__other-improvement-title">Desktop
                                    notifications</h3>
                                <p className="glx-about-update__other-improvement-text">
                                    Receive new messages, game invites or friend request notifications when
                                    in-game or when GOG Galaxy is in the background.
                                </p>
                            </div>
                        </div>
                    </div>
                    {this.props.closer && <div className="glx-whats-new__close">×</div>}
                </div>
            </section>
        );
    }
}

GlxOverlay.PropTypes = {
    closer: PropTypes.bool,
    type: PropTypes.oneOf(['dark', 'naked']),
};

export default GlxOverlay;