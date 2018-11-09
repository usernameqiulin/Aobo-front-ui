import React from 'react'
import PropTypes from 'prop-types'

import LiveCard from '../../Components/Card/Slots'

import {flattenFavorite, getName} from "../../helper"
import i18n from '../../i18n'

class GamePage extends React.Component {

    render() {
        const {brand, favorite} = this.props, name = getName(brand.name, i18n.language)
        return (
            <div className={`_page _page--${brand.code}`}>
                <a className="btn btn--tall btn--blue game-details__header__button" href="/download">下载{name}专用客户端</a>
                <div className={`list cf list--grid`}>
                    <div className={`list-inner`}>
                        <div>
                            {brand.games.map(p => {
                                p.brand = {code: brand.code}
                                return <LiveCard
                                    key={p.id}
                                    product={p}
                                    module={'LivePage'}
                                    favorites={!!favorite.data ? flattenFavorite(favorite.data.data) : []}
                                />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

GamePage.propTypes = {
    brand: PropTypes.object.isRequired,
    favorite: PropTypes.object.isRequired,
}

export default GamePage