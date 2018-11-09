import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from "react-dom";

class ABSwipe extends React.Component {

    constructor(props) {
        super(props)
        this.visible = false
        this.startPosition = {x: 0, y: 0}
        this.endPosition = {x: 0, y: 0}
        this.delta = {x: 0, y: 0}
        this.originalTransform = ""
        this.translate = this.props.direction === 'vertical' ? 'translateY' : 'translateX'
    }

    componentDidMount() {
        this.element = ReactDOM.findDOMNode(this)
        // this.handler = this.element.querySelector('.menu-link')
        // console.log(this.handler)
        // console.log(ReactDOM.findDOMNode(WrappedComponent))
        // this.handler.addEventListener('click', this.toggle)
        this.element.addEventListener('touchstart', this.swipeStart)
        this.element.addEventListener('touchend', this.swipeEnd)
        this.element.addEventListener('touchmove', this.swipeMove)
    }

    componentWillUnmount() {
        this.element.removeEventListener('touchstart', this.swipeStart)
        this.element.removeEventListener('touchend', this.swipeEnd)
        this.element.removeEventListener('touchmove', this.swipeMove)
        // this.handler.removeEventListener('click', this.toggle)
    }

    getCoordinates = (event) => {
        const originalEvent = event.originalEvent || event,
            touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent],
            e = originalEvent.changedTouches && originalEvent.changedTouches[0] || touches[0]
        return {
            x: e.clientX,
            y: e.clientY,
        }
    }

    toggle = (event) => {
        this.visible
            ? (this.element.style.transform = "", this.visible = false)
            : (this.element.style.transform = "" + this.translate + "(-100%) " + this.translate + "(" + this.props.size + "px)", this.visible = true)
    }

    reset = () => {
        this.element.classList.remove("is-swiped")
        this.element.style.transform = ""
    }

    swipeStart = (event) => {
        // console.log(event.target);
        event.target.classList.contains("menu-btn") || event.target.classList.contains("menu-account-link") || event.target.classList.contains("menu-features-slider__nav") || (event.preventDefault(), event.stopPropagation()), this.startPosition = this.getCoordinates(event), this.delta = {
            x: 0,
            y: 0
        }, this.element.classList.add("is-swiped"), this.originalTransform = this.element.style.transform
    }

    swipeEnd = (event) => {
        event.target.classList.contains("menu-btn") || event.target.classList.contains("menu-account-link") || event.target.classList.contains("menu-features-slider__nav") || (event.preventDefault(), event.stopPropagation()), this.endPosition = this.getCoordinates(event), this.delta.x = this.startPosition.x - this.endPosition.x, this.delta.y = this.startPosition.y - this.endPosition.y, this.delta.y > 0 ? (this.element.style.transform = "" + this.translate + "(-100%) " + this.translate + "(" + this.props.size + "px)", this.visible = true) : this.delta.y < 0 && (this.element.style.transform = "", this.visible = false), this.element.classList.remove("is-swiped")
    }

    swipeMove = (event) => {
        event.target.classList.contains("menu-account-link") || event.target.classList.contains("menu-features-slider__nav") || (event.preventDefault(), event.stopPropagation());
        // ({
        //     x: this.delta.x,
        //     y: this.delta.y,
        // });
        this.delta.x = this.startPosition.x - this.getCoordinates(event).x, this.delta.y = this.startPosition.y - this.getCoordinates(event).y, (this.delta.y <= this.element.offsetHeight - this.props.size && !this.visible || this.delta.y <= 0 && this.visible) && (this.element.style.transform = this.originalTransform + " " + this.translate + "(" + this.delta.y * -1 + "px)")
    }

    render() {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }
}

ABSwipe.propTypes = {
    direction: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
    size: PropTypes.number,
}

export default ABSwipe