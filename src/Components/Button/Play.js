import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {translate} from "react-i18next"
import GoogleAnalytics from "react-ga"
import NativeListener from 'react-native-listener'

import PlayActions from "../../Redux/PlayRedux"
import {isMobile} from "../../helper"
import i18n from "../../i18n"

class Play extends React.Component {
    gaEvent = (action) => {
        GoogleAnalytics.event({
            category: this.props.module,
            action: action,
            label: this.props.title
        })
    }

    launch = (mode, id, brand) => {

        this.gaEvent(mode)

        //mobile - demo: type=html5 && demo.html5
        //mobile - play: type=html5 && html5

        this.props.launch(
            id,
            {type: isMobile() ? 'html5' : 'flash', locale: i18n.language},
            mode,
            brand
        )
    }

    onClick = e => {
        e.stopPropagation()
        const {mode, id, brand, play} = this.props
        if (this.props.isDisabled || (play.fetching === id/* && play.fetchingMode === mode*/)) return
        this.launch(mode, id, brand)
    }

    render() {
        const {t, mode, classes, isDisabled, textClasses, play, id} = this.props
        return (
            <NativeListener onClick={this.onClick}>
                <a className={'_spinner ' + classes.join(' ') + (isDisabled ? ' is-disabled' : '') + (play.fetching === id/* && play.fetchingMode === mode*/ ? ' is-spinning' : '')}>
                    <span className={textClasses.join(' ')}>{t(mode)}</span>
                </a>
            </NativeListener>
        )
    }
}

Play.propTypes = {
    play: PropTypes.object.isRequired,
    mode: PropTypes.oneOf(['demo', 'play']).isRequired,
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    launch: PropTypes.func.isRequired,
    module: PropTypes.string.isRequired,
    classes: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    textClasses: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => {
    return {
        play: state.play,
    }
}
const mapDispatchToProps = (dispatch) => ({
    launch: (gameId, params, mode, brand) => dispatch(PlayActions.playRequest(gameId, params, mode, brand)),
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(Play))