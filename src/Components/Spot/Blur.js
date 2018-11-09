import React from 'react'
import PropTypes from 'prop-types'

class Blur extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fading: -1,
            current: 0,
        }
    }

    addFadingClass = (event) => {
        this.setState({
            isFading: true,
        })
    }

    removeFadingClass = (event) => {
        this.setState({
            fading: -1,
        })
    }

    rotate = (fading, current) => {
        this.setState({
            fading: fading,
            current: current,
        })
    }

    render() {
        const {spots} = this.props
        return (
            <div className="big-spots__blurs">
                {
                    spots.map(function(s, i) {
                        return [
                            <style key={'style' + i}>
                                {`@media (min-width:850px) {
                                    #big-spot-blur--${i} { background-image:url(${s.blur}_1366.jpeg);}
                                }
                                @media (min-width:1367px) {
                                    #big-spot-blur--${i} { background-image:url(${s.blur}_1680.jpeg);}
                                }
                                @media (min-width:1681px) {
                                    #big-spot-blur--${i} { background-image:url(${s.blur}_1920.jpeg);}
                                }
                                @media (min-width:1921px) {
                                    #big-spot-blur--${i} { background-image:url(${s.blur}.jpeg);}
                                }`}
                            </style>
                            ,
                            <div
                                key={'blur' + i}
                                id={`big-spot-blur--${i}`}
                                className={`big-spot-blur embed-chrome-fix-transform${i === this.state.current ? ' is-active' : ''}${this.state.fading === i ? ' is-fading' : ''}`}
                                onTransitionEnd={this.removeFadingClass}
                            />
                        ]
                    }, this)
                }
            </div>
        )
    }
}

Blur.propTypes = {
    spots: PropTypes.array.isRequired,
    // onTransitionEnd: PropTypes.func.isRequired,
}

export default Blur