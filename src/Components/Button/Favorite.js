import React from 'react'
import PropTypes from 'prop-types'

import './Favorite.css'

class Favorite extends React.Component {

    render() {
        return (
            //gog-likes="{'namespace':'activities','id':'9172174547818980484','userName':'devnz6s'}"
            //                  ng-show="likes.isVisible" ng-click="likes.toggleLike()" ng-mouseenter="likes.getUsernames()" ng-class="{
            //         'prof-likes__icon--liked': likes.isLiked
            //     }"
            <div className="favorites">
                <div className="dropdown dropdown--top-right" ng-class="{'dropdown--is-open': dropdown.isOpen}" ng-mouseout="dropdown.hideWithDelay()" ng-mouseover="dropdown.cancelHiding()">
                    <span className="dropdown__trigger favorites__dropdown-trigger hide-on-touch-device" ng-mouseenter="dropdown.show()">
                        <svg className="favorites__icon">
                            <use xlinkHref="#heart"/>
                        </svg>
                    </span>
                    <span className="dropdown__trigger favorites__dropdown-trigger show-on-touch-device" ng-click="dropdown.toggle()">
                        <svg className="favorites__icon">
                            <use xlinkHref="#heart"/>
                        </svg>
                    </span>
                    <div className="dropdown__layer">
                        <div className="favorites__dropdown">
                            <span className="favorites__dropdown-header">赞好的用户：</span>
                            <span className="favorites__dropdown-users"/>
                        </div>
                    </div>
                </div>
                <span className="favorites__count">0</span>
            </div>
        )
    }
}

Favorite.propTypes = {

}

export default Favorite