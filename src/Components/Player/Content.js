import React from 'react'
import PropTypes from 'prop-types'

import Iframe from "./Iframe"
import Favorite from "../Button/Favorite"

class Content extends React.Component {
    state = {
        loaded: false
    }

    onLoad = () => this.setState({loaded: true})

    render() {
        const {url, isActive} = this.props
        return (
            <div className={`player-view__game-content _spinner${!this.state.loaded?' is-spinning':''}${isActive ? ' active' : ''}`}>
                <Favorite/>
                <Iframe url={url} onLoad={this.onLoad}/>
            </div>
        )
    }
}

Content.propTypes = {
    url: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
}

export default Content

