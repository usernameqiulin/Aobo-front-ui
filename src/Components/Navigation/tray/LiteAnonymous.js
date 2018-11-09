import React from 'react'
import PropTypes from 'prop-types'
import {translate} from 'react-i18next'
import NativeListener from 'react-native-listener'
import MenuAnonymousHeader from "../MenuAnonymousHeader"

import withSwipe from '../../withSwipe'
import MenuAnonymousShelf from "../MenuAnonymousShelf"
import FeatureSlider from "../FeatureSlider"
import MenuAnonymousAbout from "../MenuAnonymousAbout"
import MenuAnonymousFeaturesHeader from "../MenuAnonymousFeaturesHeader"

class LiteAnonymous extends React.Component {
    _toggle = (e) => {
        e.stopPropagation()
        this.props.toggle()
    }

    render() {
        const {t} = this.props
        return (
            <div className={`menu-lite-anonymous${this.props.isHidden ? ' ng-hide' : ''}`}>
                {/* ng-click="menuSwipe.toggle()" */}
                <NativeListener onClick={this._toggle}>
                    <a className="menu-link menu-link--anonymous">
                        <span>{t('login')}</span>
                    </a>
                </NativeListener>
                <MenuAnonymousHeader
                    openRegistration={this.props.openRegistration}
                    openLogin={this.props.openLogin}
                />
                <MenuAnonymousShelf/>
                <MenuAnonymousAbout/>
                <MenuAnonymousFeaturesHeader/>
                <FeatureSlider isExpanded={false}/>
            </div>
        )
    }
}

LiteAnonymous.propTypes = {
    openLogin: PropTypes.func.isRequired,
    openRegistration: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
}

export default translate()(withSwipe(LiteAnonymous))