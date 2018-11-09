import React from 'react'
import GoogleAnalytics from 'react-ga'
import queryString from "query-string"
import {Redirect} from "react-router-dom"

const SLOTS_DEFAULT_PARAMS = {
    page: 1,
    sort: 'popularity',
}

const DEFAULT_SEARCH = {
    page: 1,
}

const REDIRECT_PATHS = {
    '/slots': SLOTS_DEFAULT_PARAMS,
    '/account/records': DEFAULT_SEARCH,
    '/account/transactions': DEFAULT_SEARCH,
    '/account/rebate': DEFAULT_SEARCH,
    '/account/relief': DEFAULT_SEARCH,
    '/account/bigwin': DEFAULT_SEARCH,
    '/account/deposit': DEFAULT_SEARCH,
    '/account/withdraw': DEFAULT_SEARCH,
    '/account/transfer': DEFAULT_SEARCH,
}

GoogleAnalytics.initialize(process.env.REACT_APP_GA_ID, {
    debug: true,
    titleCase: false,
    // gaOptions: {
    //     userId: 123
    // }
})
const withTracker = (WrappedComponent, options = {}) => {
    const trackPage = page => {
        GoogleAnalytics.set({
            page,
            ...options,
        });
        GoogleAnalytics.pageview(page)
    }

    return class extends React.Component {
        componentDidMount() {
            const page = this.props.location.pathname;
            trackPage(page);
        }

        componentWillReceiveProps(nextProps) {
            const currentPage = this.props.location.pathname;
            const nextPage = nextProps.location.pathname;

            if (currentPage !== nextPage) {
                trackPage(nextPage);
            }
        }
        render() {
            if (Object.keys(REDIRECT_PATHS).includes(this.props.location.pathname) && !this.props.location.search) {
                return (
                    <Redirect
                        to={{
                            pathname: this.props.location.pathname,
                            search: '?' + queryString.stringify(REDIRECT_PATHS[this.props.location.pathname]),
                            hash: this.props.location.hash ? this.props.location.hash : null,
                        }}
                    />
                )
            }
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withTracker