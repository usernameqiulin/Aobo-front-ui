import React from 'react'
import {Route, Switch} from "react-router-dom"
import withAuthorization from './Components/RouteProtector'

import HomePage from './Containers/HomePage'
import SlotsPage from './Containers/SlotsPage'
import LivePage from './Containers/LivePage'
import SportsPage from './Containers/SportsPage'
import LotteryPage from './Containers/LotteryPage'
import PromotionPage from './Containers/PromotionPage'
import VipPage from './Containers/VipPage'
import AccountPage from './Containers/Account'
import NotFound from './Containers/NotFound'
import Affiliate from './Containers/Affiliate'

const Routers = (
    <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route path="/slots" component={SlotsPage}/>
        <Route path="/live" component={LivePage}/>
        <Route path="/sports" component={SportsPage}/>
        <Route path="/lottery" component={LotteryPage}/>
        <Route path="/promotion" component={PromotionPage}/>
        <Route path="/vip" component={VipPage}/>
        {/* ACCOUNT */}
        <Route path="/account" component={withAuthorization(AccountPage, true)}/>
        <Route path="/affiliate" component={Affiliate}/>
        <Route component={NotFound}/>
    </Switch>
)

export default Routers