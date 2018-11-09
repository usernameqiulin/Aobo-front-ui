import React from 'react'
import PropTypes from 'prop-types'

class ABCheckbox extends React.Component {
    render() {
        return (
            <span>
                {/* ng-class="{ 'subscriptions-option--on': subs.is.info.set }" */}
                <label className={`subscriptions-option _checkbox-container${this.props.checked ? ' subscriptions-option--on' : ''}`}>
                    <span className="subscriptions-item__option">
                            {/* ng-model="subs.is.info.set" ng-change="subs.changeInfo()" */}
                            <input
                                className="hidden-input ng-pristine ng-untouched ng-valid"
                                type="checkbox"
                                checked={this.props.checked}
                                name="user_info_subscription"
                                onChange={this.props.onChange}
                                disabled={this.props.isProcessing}
                            />
                            {/* ng-show="!subs.is.info.processing" */}
                            <i className={`checkbox checkbox--green checkbox--big${this.props.isProcessing ? ' ng-hide': ''}`}/>
                            {/* ng-show="subs.is.info.processing" */}
                            <i className={`_spinner is-spinning subscriptions-option__spinner${this.props.isProcessing ? '': ' ng-hide'}`}/>
                    </span>
                    <div className="subscriptions-item__description">
                        <span className="subscriptions-item__title">{this.props.label}</span>
                        {this.props.description && <span className="subscriptions-item__details">{this.props.description}</span>}
                    </div>
                </label>
            </span>
        )
    }
}

ABCheckbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    isProcessing: PropTypes.bool,
}

export default ABCheckbox