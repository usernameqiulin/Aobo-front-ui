import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

class CssData extends React.Component {

    constructor(props) {
        super(props)
        this.cssDataStr = ''
        this.oldDataStr = ''
        this.windowResizeDebounced = debounce(this.windowResize, 200)
    }

    componentDidMount() {
        window.addEventListener("resize", this.windowResizeDebounced)
        window.addEventListener("orientationchange", this.windowResizeDebounced)
        this.windowResize()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.windowResizeDebounced)
        window.removeEventListener("orientationchange", this.windowResizeDebounced)
    }

    shouldComponentUpdate() {
        return false
    }

    broadcastUpdate = () => {
        this.props.listener(JSON.parse(this.cssDataStr))
    }

    windowResize = () => {
        this.cssDataStr = this.getCssData()
        if (this.cssDataStr !== this.oldDataStr) {
            this.oldDataStr = this.cssDataStr
            this.broadcastUpdate()
        }
    }

    getCssData = () => {
        let data
        return window.getComputedStyle && window.getComputedStyle(this.holder, "::before") && (data = window.getComputedStyle(this.holder, "::before"), data = data.content),
            data = data.replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, ""), 0 === data.length && (data = false), data
    }

    render() {
        return (
            <var className="css-data-holder" ref={ref => this.holder = ref}/>
        )
    }
}

CssData.propTypes = {
    listener: PropTypes.func.isRequired,
}

export default CssData