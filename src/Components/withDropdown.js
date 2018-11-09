import React from 'react'

export default function withDropdown (WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                expanded: false,
            }
            this.timeout = null
        }

        _toggle = (e) => {
            e.stopPropagation()
            clearTimeout(this.timeout)
            this.setState({
                expanded: !this.state.expanded,
            })
        }

        _hide = (e) => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(function() {
                this.setState({expanded: false})
            }.bind(this), 500)
        }

        _over = (e) => {
            if (this.timeout) {
                clearTimeout(this.timeout)
            }
            this.setState({
                expanded: true,
            })
        }

        render() {
            return <WrappedComponent
                expanded={this.state.expanded}
                toggler={this._toggle}
                hider={this._hide}
                over={this._over}
                {...this.props}
            />
        }
    }
}