// @flow

import {persistCombineReducers} from 'redux-persist'
import {routerReducer} from 'react-router-redux'

import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import PersistConfig from '../Config/ReduxPersist'

export default () => {
    /* ------------- Assemble The Reducers ------------- */
    const rootReducer = persistCombineReducers(
        PersistConfig.storeConfig,
        {
            pusher: require('./PusherRedux').reducer,
            menu: require('./MenuRedux').reducer,
            slotsFilters: require('./SlotsFiltersRedux').reducer,
            games: require('./GamesRedux').reducer,
            live: require('./LiveRedux').reducer,
            auth: require('./AuthRedux').reducer,
            promotion: require('./PromotionRedux').reducer,
            vip: require('./VipRedux').reducer,
            search: require('./SearchRedux').reducer,
            profile: require('./ProfileRedux').reducer,
            setting: require('./SettingRedux').reducer,
            card: require('./CardRedux').reducer,
            wallet: require('./WalletRedux').reducer,
            bigwin: require('./BigwinRedux').reducer,
            relief: require('./ReliefRedux').reducer,
            deposit: require('./DepositRedux').reducer,
            withdraw: require('./WithdrawRedux').reducer,
            record: require('./RecordRedux').reducer,
            rebate: require('./RebateRedux').reducer,
            favorite: require('./FavoriteRedux').reducer,
            coupon: require('./CouponRedux').reducer,
            jackpot: require('./JackpotRedux').reducer,
            play: require('./PlayRedux').reducer,
            transaction: require('./TransactionRedux').reducer,
            alert: require('./AlertRedux').reducer,
            recent: require('./RecentRedux').reducer,
            transfer: require('./TransferRedux').reducer,
            config: require('./ConfigRedux').reducer,
            checkout: require('./CheckoutRedux').reducer,
            spot: require('./SpotRedux').reducer,
            confirm: require('./ConfirmRedux').reducer,
            affiliate: require('./AffiliateRedux').reducer,
            members: require('./MembersRedux').reducer,
            gross: require('./GrossRedux').reducer,
            grossDetail: require('./GrossDetailRedux').reducer,
            visitors: require('./VisitorsRedux').reducer,
            charges: require('./ChargesRedux').reducer,
            chargesDetail: require('./ChargesDetailRedux').reducer,
            history: require('./HistoryRedux').reducer,
            notification: require('./NotificationRedux').reducer,
            // router: routerReducer,
        }
    )

    return configureStore(rootReducer, rootSaga)
}
