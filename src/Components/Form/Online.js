import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import ABBankSelector from '../Selector/Bank'
import ABScroll from '../ABScroll'


class Online extends React.Component {

    selectBank = e => (!this.props.currentExtra || this.props.currentExtra.bank !== e) && this.props.onChange({bank: e})

    render() {
        return (
            <ABScroll>
                {!!this.props.extraSetting && !!this.props.extraSetting.bank && this.props.extraSetting.bank.map((b, i) => {
                    return <ABBankSelector
                        selectable
                        selected={this.props.currentExtra ? this.props.currentExtra.bank : ''}
                        onSelect={this.selectBank}
                        code={b}
                        name={b}
                        key={i}
                    />
                })}
            </ABScroll>
        )
    }
}

Online.propTypes = {
    profile: PropTypes.object.isRequired,
    config: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        config: state.config,
    }
}

export default connect(mapStateToProps)(Online)