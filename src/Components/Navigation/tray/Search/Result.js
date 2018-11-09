import React from 'react'
import PropTypes from 'prop-types'
import {translate} from "react-i18next"
import {Link} from "react-router-dom";
import NativeListener from 'react-native-listener'

import Item from "./Item"

const MAX_RESULT = 20

class Result extends React.Component {

    onContainerClick = e => {
        e.stopPropagation()
    }

    render() {
        const {t, data, isShow, searchCount} = this.props
        return (
                <div className={`menu-search__results${!!isShow ? '' : ' ng-hide'}`}>
                    {/* gog-menu-scrollbar="search" gog-menu-scrollbar-refresh="0" */}
                    <div className="menu-search__results-list _gog-menu-scrollbar">
                        <div className="js-gog-scrollbar-wrapper _gog-menu-scrollbar__wrapper">
                            <div className="js-gog-scrollbar-content _gog-menu-scrollbar__content menu-search__content js-menu-search-content">
                                <NativeListener onClick={this.onContainerClick}>
                                <div className="menu-search__results-rows list--rows">
                                    {!!data && !!isShow && data.map((product, i) => {
                                        return <Item
                                            key={i}
                                            product={product}
                                            isFirst={i === 0}
                                            isLast={i === data.length - 1}
                                            type={'list'}
                                            isAnimated={searchCount === 1}
                                            module={'search'}
                                        />
                                    })}
                                    {/* ng-show="search.selectedCategory == 'games' &amp;&amp; search.totalGames > 20" */}
                                    <Link className={`menu-btn menu-btn--full menu-search__results-more ng-hide`}
                                          to="/games?search=">
                                        浏览
                                        {/* ng-bind="search.totalGames" */}
                                        <span>0</span>款游戏
                                    </Link>
                                    {/* ng-show="search.selectedCategory == 'movies' &amp;&amp; search.totalMovies > 20" */}
                                    <Link className={`menu-btn menu-btn--full menu-search__results-more ng-hide`}
                                          to="/movies?search=">
                                        浏览
                                        {/* ng-bind="search.totalMovies" */}
                                        <span>0</span>部影片
                                    </Link>
                                </div>
                                </NativeListener>
                            </div>
                            <div className="js-gog-scrollbar-bar _gog-menu-scrollbar__bar is-disabled"/>
                        </div>
                    </div>
                </div>
        )
    }
}

Result.propTypes = {
    data: PropTypes.array,
    isShow: PropTypes.number.isRequired,
    searchCount: PropTypes.number,
}

export default translate()(Result)