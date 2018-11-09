import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import queryString from "query-string"

class Redirector extends React.Component {

    componentDidMount() {
        console.log('componentDidMount')
        this._compareSearch(this.props.default, this.props.location.search, 'replace')
    }

    _compareSearch = (dft, searchString, type) => {
        const current = queryString.parse(searchString), differences = R.difference(Object.keys(dft), Object.keys(current))
        if (differences.length > 0) {
            let o = R.merge(current, {})
            differences.map(d => o[d] = this.props.default[d])
            this.updateUrl(type, queryString.stringify(o))
        }
    }

    componentWillUpdate(nextProps) {
        console.log('componentWillUpdate')
        if (this.props.location.search !== nextProps.location.search) {
            this._compareSearch(this.props.default, nextProps.location.search)
        }
    }

    updateUrl = (type, search) => {
        const url = this.props.match.path + '?' + search + (this.props.location.hash ? this.props.location.hash : '')
        if (type && type === 'replace') {
            this.props.history.replace(url)
        } else {
            this.props.history.push(url)
        }
    }

    render() {
        return null
    }
}

Redirector.propTypes = {
    default: PropTypes.object.isRequired,
    urlUpdater: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
}

export default Redirector