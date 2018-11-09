import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class ABJackpot extends React.Component {

    render() {
        return (
            ''
        )
    }
}

ABJackpot.propTypes = {
    jackpot: PropTypes.object.isRequired,
    getJackpot: PropTypes.func,
}
const mapStateToProps = (state) => {
    return {
        jackpot: state.jackpot,
    }
};

const mapDispatchToProps = (dispatch) => ({
    // getJackpot: () => dispatch(LiveActions.liveRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ABJackpot)