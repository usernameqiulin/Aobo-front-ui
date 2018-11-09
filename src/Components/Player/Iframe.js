import React from 'react'
import PropTypes from 'prop-types'

class Iframe extends React.Component {

    onLoad = e => this.props.onLoad()

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.url !== this.props.url) {
            return true
        }
        return false
    }

    render() {
        const {url} = this.props
        return (
            <iframe
                frameBorder={0}
                src={url}
                onLoad={this.onLoad}
            />
        )
    }
}

Iframe.propTypes = {
    url: PropTypes.string.isRequired,
    onLoad: PropTypes.func.isRequired,
}

export default Iframe