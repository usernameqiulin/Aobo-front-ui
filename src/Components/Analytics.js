import React from 'react'
import GoogleAnalytics from 'react-ga'
import {Route} from "react-router-dom"

GoogleAnalytics.initialize(process.env.REACT_APP_GA_ID, {
    debug: true,
    titleCase: false,
    gaOptions: {
        alwaysSendReferrer: true,
        siteSpeedSampleRate: 10,
    }
})

class Analytics extends React.PureComponent {
    componentDidMount() {
        this.sendPageChange(this.props.location.pathname, this.props.location.search)
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname
            || this.props.location.search !== prevProps.location.search) {
            this.sendPageChange(this.props.location.pathname, this.props.location.search)
        }
    }

    sendPageChange(pathname, search) {
        const page = pathname + search
        GoogleAnalytics.set({page})
        GoogleAnalytics.pageview(page)
    }

    render() {
        return null
    }
}

const AnalyticsTracker = () => {
    return <Route component={Analytics} />
}

export default AnalyticsTracker
