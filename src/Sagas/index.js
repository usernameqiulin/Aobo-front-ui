import {spawn, takeLatest, takeEvery, throttle, all, call} from 'redux-saga/effects'

import API from '../Services/Api'

/* ------------- Types ------------- */

import {MenuTypes} from '../Redux/MenuRedux'
import {SlotsFiltersTypes} from '../Redux/SlotsFiltersRedux'
import {GamesTypes} from '../Redux/GamesRedux'
import {PusherTypes} from "../Redux/PusherRedux"
import {LocaleTypes} from "../Redux/LocaleRedux"
import {LiveTypes} from "../Redux/LiveRedux"
import {AuthTypes} from "../Redux/AuthRedux"
import {PromotionTypes} from "../Redux/PromotionRedux"
import {VipTypes} from "../Redux/VipRedux"
import {SearchTypes} from "../Redux/SearchRedux"
import {ProfileTypes} from "../Redux/ProfileRedux"
import {SettingTypes} from "../Redux/SettingRedux"
import {CardTypes} from "../Redux/CardRedux"
import {WalletTypes} from "../Redux/WalletRedux"
import {BigwinTypes} from "../Redux/BigwinRedux"
import {ReliefTypes} from "../Redux/ReliefRedux"
import {DepositTypes} from "../Redux/DepositRedux"
import {WithdrawTypes} from "../Redux/WithdrawRedux"
import {RecordTypes} from "../Redux/RecordRedux"
import {RebateTypes} from "../Redux/RebateRedux"
import {FavoriteTypes} from "../Redux/FavoriteRedux"
import {CouponTypes} from "../Redux/CouponRedux"
import {JackpotTypes} from "../Redux/JackpotRedux"
import {PlayTypes} from "../Redux/PlayRedux"
import {TransactionTypes} from "../Redux/TransactionRedux"
import {RecentTypes} from "../Redux/RecentRedux"
import {TransferTypes} from "../Redux/TransferRedux"
import {ConfigTypes} from "../Redux/ConfigRedux"
import {SpotTypes} from "../Redux/SpotRedux"
import {AffiliateTypes} from '../Redux/AffiliateRedux'
import {MembersTypes} from '../Redux/MembersRedux';
import {GrossTypes} from '../Redux/GrossRedux';
import {GrossDetailTypes} from '../Redux/GrossDetailRedux';
import {VisitorsTypes} from "../Redux/VisitorsRedux"
import {ChargesTypes} from "../Redux/ChargesRedux"
import {ChargesDetailTypes} from "../Redux/ChargesDetailRedux"
import {HistoryTypes} from "../Redux/HistoryRedux"
import {NotificationTypes} from "../Redux/NotificationRedux"
import {SportsTypes} from "../Redux/SportsRedux"

/* ------------- Sagas ------------- */

import {getMenu} from './MenuSagas'
import {getFilters} from "./SlotsFiltersSagas"
import {getGames} from "./GamesSagas"
import {getPusher} from './PusherSagas'
import {getLocale} from "./LocaleSagas"
import {getLive} from "./LiveSagas"
import {logout, requestLogin, requestRegister, refresh} from "./AuthSagas"
import {getPromotion} from "./PromotionSagas"
import {getVip} from "./VipSagas"
import {getSearch} from './SearchSagas'
import {getProfile, updateProfile, updatePassword} from "./ProfileSagas"
import {getSetting, updateSetting} from "./SettingSagas"
import {getCards, addCard, deleteCard, updateCard} from "./CardSagas"
import {getWallets, updateWallet} from "./WalletSagas"
import {getBigwins, addBigwin} from "./BigwinSagas"
import {getReliefs, addRelief} from "./ReliefSagas"
import {getDeposits, addDeposit, getMethods} from "./DepositSagas"
import {getWithdraws, addWithdraw} from "./WithdrawSagas"
import {getRecord} from "./RecordSagas"
import {getRebates, addRebate, calculateRebate} from "./RebateSagas"
import {getFavorites, addFavorite, deleteFavorite} from "./FavoriteSagas"
import {getCoupons} from "./CouponSagas"
import {getJackpot} from "./JackpotSagas"
import {getPlay} from "./PlaySagas"
import {getTransactions} from "./TransactionSagas"
import {getRecent} from "./RecentSagas"
import {getTransfers, addTransfer} from "./TransferSagas"
import {getConfig} from "./ConfigSagas"
import withToken from "./withToken"
import {getSpot} from "./SpotSagas"
import {getStages} from './AffiliateSagas';
import {getMembers} from './MembersSagas';
import {getGross} from './GrossSagas';
import {getGrossDetail} from './GrossDetailSagas';

import {getVisitors} from "./VisitorsSagas"
import {getCharges} from "./ChargesSagas"
import {getChargesDetail} from "./ChargesDetailSagas"
import {getHistory} from "./HistorySagas"

import {getNotifications, consumeAllNotifications, clearNotifications} from "./NotificationSagas"
import {sportsLogin, sportsLogout} from "./SportsSagas"

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
    yield all([
        // some sagas only receive an action
        takeLatest(AuthTypes.AUTH_REQUEST, requestLogin),
        takeLatest(AuthTypes.REGISTER_REQUEST, requestRegister),
        takeLatest(AuthTypes.REFRESH_REQUEST, withToken(refresh, api)),
        takeLatest(AuthTypes.LOGOUT_REQUEST, withToken(logout, api)),  //清除数据放在logout sagas里面

        takeLatest(MenuTypes.MENU_REQUEST, withToken(getMenu, api)),

        // throttle(500, GamesTypes.GAMES_REQUEST, getGames, api),
        takeLatest(SlotsFiltersTypes.FILTERS_REQUEST, withToken(getFilters, api)),
        takeLatest(GamesTypes.GAMES_REQUEST, withToken(getGames, api)),
        takeLatest(PusherTypes.PUSHER_REQUEST, getPusher),
        takeLatest(LocaleTypes.LOCALE_REQUEST, withToken(getLocale, api)),
        takeLatest(LiveTypes.LIVE_REQUEST, withToken(getLive, api)),
        takeLatest(PromotionTypes.PROMOTION_REQUEST, withToken(getPromotion, api)),
        takeLatest(VipTypes.VIP_REQUEST, withToken(getVip, api)),
        takeLatest(SearchTypes.SEARCH_REQUEST, withToken(getSearch, api)),

        takeLatest(ProfileTypes.PROFILE_REQUEST, withToken(getProfile, api)),
        takeLatest(ProfileTypes.PROFILE_UPDATE_REQUEST, withToken(updateProfile, api)),
        takeLatest(ProfileTypes.PASSWORD_UPDATE_REQUEST, withToken(updatePassword, api)),

        takeLatest(SettingTypes.SETTING_REQUEST, withToken(getSetting, api)),
        takeLatest(SettingTypes.SETTING_UPDATE_REQUEST, withToken(updateSetting, api)),

        takeLatest(CardTypes.CARD_REQUEST, withToken(getCards, api)),
        takeLatest(CardTypes.CARD_ADD_REQUEST, withToken(addCard, api)),
        takeLatest(CardTypes.CARD_UPDATE_REQUEST, withToken(updateCard, api)),
        takeLatest(CardTypes.CARD_DELETE_REQUEST, withToken(deleteCard, api)),

        takeLatest(WalletTypes.WALLET_REQUEST, withToken(getWallets, api)),
        takeEvery(WalletTypes.WALLET_UPDATE_REQUEST, withToken(updateWallet, api)),

        takeLatest(BigwinTypes.BIGWIN_REQUEST, withToken(getBigwins, api)),
        takeLatest(BigwinTypes.BIGWIN_ADD_REQUEST, withToken(addBigwin, api)),

        takeLatest(ReliefTypes.RELIEF_REQUEST, withToken(getReliefs, api)),
        takeLatest(ReliefTypes.RELIEF_ADD_REQUEST, withToken(addRelief, api)),

        takeLatest(DepositTypes.DEPOSIT_REQUEST, withToken(getDeposits, api)),
        takeLatest(DepositTypes.METHOD_REQUEST, withToken(getMethods, api)),
        takeLatest(DepositTypes.DEPOSIT_ADD_REQUEST, withToken(addDeposit, api)),

        takeLatest(WithdrawTypes.WITHDRAW_REQUEST, withToken(getWithdraws, api)),
        takeLatest(WithdrawTypes.WITHDRAW_ADD_REQUEST, withToken(addWithdraw, api)),

        takeLatest(RecordTypes.RECORD_REQUEST, withToken(getRecord, api)),

        takeLatest(RebateTypes.REBATE_REQUEST, withToken(getRebates, api)),
        takeLatest(RebateTypes.REBATE_ADD_REQUEST, withToken(addRebate, api)),
        takeLatest(RebateTypes.REBATE_CALCULATE_REQUEST, withToken(calculateRebate, api)),

        takeLatest(FavoriteTypes.FAVORITE_REQUEST, withToken(getFavorites, api)),
        takeLatest(FavoriteTypes.FAVORITE_ADD_REQUEST, withToken(addFavorite, api)),
        takeLatest(FavoriteTypes.FAVORITE_DELETE_REQUEST, withToken(deleteFavorite, api)),

        takeLatest(CouponTypes.COUPON_REQUEST, withToken(getCoupons, api)),

        takeLatest(JackpotTypes.JACKPOT_REQUEST, withToken(getJackpot, api)),

        takeLatest(PlayTypes.PLAY_REQUEST, withToken(getPlay, api)),

        takeLatest(TransactionTypes.TRANSACTION_REQUEST, withToken(getTransactions, api)),

        takeLatest(RecentTypes.RECENT_REQUEST, withToken(getRecent, api)),

        takeLatest(TransferTypes.TRANSFER_REQUEST, withToken(getTransfers, api)),
        takeLatest(TransferTypes.TRANSFER_ADD_REQUEST, withToken(addTransfer, api)),

        takeLatest(ConfigTypes.CONFIG_REQUEST, withToken(getConfig, api)),
        takeLatest(SpotTypes.SPOT_REQUEST, withToken(getSpot, api)),

        takeLatest(AffiliateTypes.STAGES_REQUEST, function* (action){return yield call(getStages, api, action)} ),

        takeLatest(MembersTypes.MEMBERS_REQUEST, withToken(getMembers, api)),

        takeLatest(GrossTypes.GROSS_REQUEST, withToken(getGross, api)),
        takeEvery(GrossDetailTypes.GROSS_DETAIL_REQUEST, withToken(getGrossDetail, api)),

        takeLatest(VisitorsTypes.VISITORS_REQUEST, withToken(getVisitors, api)),

        takeLatest(ChargesTypes.CHARGES_REQUEST, withToken(getCharges, api)),
        takeLatest(HistoryTypes.HISTORY_REQUEST, withToken(getHistory, api)),
        takeLatest(ChargesDetailTypes.CHARGES_DETAIL_REQUEST, withToken(getChargesDetail, api)),

        takeLatest(NotificationTypes.NOTIFICATION_REQUEST, withToken(getNotifications, api)),
        takeLatest(NotificationTypes.NOTIFICATION_CONSUME_ALL_REQUEST, withToken(consumeAllNotifications, api)),
        takeLatest(NotificationTypes.NOTIFICATION_CLEAR_ALL_REQUEST, withToken(clearNotifications, api)),

        takeLatest(SportsTypes.SPORTS_LOGIN, sportsLogin),
        takeLatest(SportsTypes.SPORTS_LOGOUT, sportsLogout),

    ])
}
