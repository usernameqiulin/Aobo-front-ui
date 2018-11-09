import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Swipeable from 'react-swipeable'
const ADJUST = 0

class ABScroll extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            enable: false,
            position: 0,
        }
    }
    componentDidMount() {
        const node = ReactDOM.findDOMNode(this)
        this.elContext = node.querySelector("._cs-content")
        this.elContent = node.querySelector("._cs-content__in")
        window.addEventListener('resize', this._checkScrollState)
        window.addEventListener('rotate', this._checkScrollState)
        window.addEventListener('orientationchange', this._checkScrollState)

        window.setTimeout(this._checkScrollState)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._checkScrollState)
        window.removeEventListener('rotate', this._checkScrollState)
        window.removeEventListener('orientationchange', this._checkScrollState)
    }

    _showLeft = () => {
        return this.state.enabled && this.state.position < 0
    }

    _showRight = () => {
        return this.state.enabled && this.state.position > -1 * (this.contentWidth - this.elemWidth)
    }

    _left = () => {
        if (this.state.enabled) {
            this._setPosition(this.state.position + this.elemWidth)
        }
    }

    _right = () => {
        if (this.state.enabled) {
            this._setPosition(this.state.position - this.elemWidth)
        }
    }

    _checkScrollState = () => {
        return this._calculateSize(), this.state.enabled || (this.state.position = 0), this._setPosition(this.state.position)
    }

    _calculateSize = () => {
        // console.log(this.elContext.classList, this.elContent.classList)
        this.elemWidth = this.elContext.clientWidth
        this.contentWidth = this.elContent.clientWidth + ADJUST
        this.contentWidth <= this.elemWidth ? this._disable() : this._enable()
    }

    _enable = () => {
        this.setState({
            enabled: true
        })
    }

    _disable = () => {
        this.setState({enabled: false}, () => {
            this._setPosition(0)
        })
    }

    _setPosition = (newPosition) => {
        let posToSet = Math.max(newPosition, -1 * (this.contentWidth - this.elemWidth));
        posToSet = Math.min(posToSet, 0);
        this.elContent.style.left = posToSet + "px";
        this.setState({position: posToSet})
    }

    render() {
        return (
            <div className="_cs-wrapper">
                <Swipeable className="_cs-content" onSwipedLeft={this._right} onSwipedRight={this._left}>
                    <div className="_cs-content__in">
                        {this.props.children}
                    </div>
                </Swipeable>
                <div className={`_cs-left${this._showLeft() ? '' : ' ng-hide'}`} onClick={this._left}>
                    <i className="ic icon-arrow-left"/>
                </div>
                <div className={`_cs-right${this._showRight() ? '' : ' ng-hide'}`} onClick={this._right}>
                    <i className="ic icon-arrow-right"/>
                </div>
            </div>
        )
    }
}

ABScroll.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default ABScroll