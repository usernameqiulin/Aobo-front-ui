/**
 * Created by darkmoon on 7/2/17.
 */
import React, {Component} from 'react'

import './404.css'
import NotFoundImg from '../../images/404/404_ccc.3.jpg'
import BearImg from '../../images/404/bear.png'

export default class NotFound extends Component {
    render() {
        return (
            <div className="error404">
                <div className="nav-spacer menu-spacer"/>
                <span className="error404__wrapper">
                    <img className="error404__img" src={NotFoundImg}/>
                    <span className="bear">
                        <span className="bear__text">
                            The page you‘re<br/>
                            trying to reach does not<br/>
                            exist :(. Check the address<br/>
                            or <span className="un">report an error</span>.
                        </span>
                        <img className="bear__img" src={BearImg}/>
                    </span>
                </span>
            </div>
        )
    }
}
