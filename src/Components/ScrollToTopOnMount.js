/**
 * Created by darkmoon on 7/6/17.
 */
import React, {Component} from 'react'

export default class ScrollToTopOnMount extends Component {
    componentDidMount(prevProps) {
        window.scrollTo(0, 0)
    }

    render() {
        return null
    }
}