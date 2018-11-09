import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export default (ProtectedRoute, passes = {}) => {
    class AuthHOC extends Component {

        constructor(props, context) {
            super(props, context)
            // console.log(props)
        }

        // Check if there is validated user logged
        isLoggedin = () => {
            return !!this.props.auth.data && !!this.props.auth.data.access_token
        }

        // Check if the Authorization query is loading
        isLoading = () => {
            return this.props.auth.fetching
        }

        render () {
            this.props = {...this.props, passes}
            // console.log(this.props)
            // Return a Loading component while the isLoading function is 'true'
            if (this.isLoading()) {
                // return <Loading/>
            }
            // Pass the received 'props' and created functions to the ProtectedRoute component
            return (
                <ProtectedRoute
                    {...this.props}
                    isLoggedin={this.isLoggedin}
                    isLoading={this.isLoading}
                />
            )
        }
    }

    AuthHOC.contextTypes = {
        router: PropTypes.object.isRequired
    }

    const mapStateToProps = (state) => {
        return {
            auth: state.auth,
        }
    }
    const mapDispatchToProps = (dispatch) => ({

    })

    return connect(mapStateToProps, mapDispatchToProps)(AuthHOC)
}