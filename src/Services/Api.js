// a library to wrap and simplify api calls
import apisauce from 'apisauce'
// our "constructor"
const create = (baseURL = process.env.REACT_APP_API_URL) => {
    // ------
    // STEP 1
    // ------
    //
    // Create and configure an apisauce-based api object.
    //
    const api = apisauce.create({
        // base URL is read from the "constructor"
        baseURL,
        // here are some default headers
        headers: {
            // 'Cache-Control': 'no-cache',
            'App-Name': process.env.REACT_APP_APP_ID,
            'App-Token': process.env.REACT_APP_APP_TOKEN,
        },
        // 10 second timeout...
        timeout: 10000
    })
    // Force OpenWeather API Key on all requests
    api.addRequestTransform((request) => {
      console.log(request)
      // request.params['APPID'] = '0e44183e8d1018fc92eb3307d885379c'
    })
    // api.addResponseTransform(response => {
    //   console.log(response)
    // })
    // Wrap api's addMonitor to allow the calling code to attach
    // additional monitors in the future.  But only in __DEV__ and only
    // if we've attached Reactotron to console (it isn't during unit tests).
    // if (__DEV__ && console.tron) {
    //   api.addMonitor(console.tron.apisauce)
    // }

    // ------
    // STEP 2
    // ------
    //
    // Define some functions that call the api.  The goal is to provide
    // a thin wrapper of the api layer providing nicer feeling functions
    // rather than "get", "post" and friends.
    //
    // I generally don't like wrapping the output at this level because
    // sometimes specific actions need to be take on `403` or `401`, etc.
    //
    // Since we can't hide from that, we embrace it by getting out of the
    // way at this level.
    //

    const tokenHeader = (token) => !!token ? {headers: {'Authorization': 'Bearer ' + token}} : null
    // const tokenHeader = (token) => token ? {headers: {'X-Auth-UserId': token}} : null

    const getMenu = (token = null) => api.get('/menu', null, tokenHeader(token))
    const getFilters = (token = null) => api.get('/filters', null, tokenHeader(token))
    const getGames = (params, token = null) => api.get('/games', params, tokenHeader(token))
    const getLocales = (token = null) => api.get('/locales', null, tokenHeader(token))
    const getLive = (token = null) => api.get('/live', null, tokenHeader(token))
    const getPromotion = (token = null) => api.get('/promotions', null, tokenHeader(token))
    const getVip = (params, token = null) => api.get('/ranks', params, tokenHeader(token))
    const search = (params, token = null) => api.get('/search', params, tokenHeader(token))

    const getProfile = (token) => api.get('/profile', null, tokenHeader(token))
    const updateProfile = (profile, token) => api.patch('/profile', profile, tokenHeader(token))
    const updatePassword = (params, token) => api.patch('/password', params, tokenHeader(token))
    const refresh = (params, token) => api.post('/refresh', params, tokenHeader(token))

    const getSetting = (token) => api.get('/setting', null, tokenHeader(token))
    const updateSetting = (setting, token) => api.patch('/setting', setting, tokenHeader(token))

    const getCards = (token) => api.get('/cards', null, tokenHeader(token))
    const addCard = (card, token) => api.post('/cards', card, tokenHeader(token))
    const updateCard = (cardId, card, token) => api.patch('/cards/' + cardId, card, tokenHeader(token))
    const deleteCard = (cardId, params, token) => api.delete('/cards/' + cardId, params, tokenHeader(token))

    const getWallets = (token) => api.get('/wallets', null, tokenHeader(token))
    const updateWallet = (code, token) => api.get('/wallets/' + code, null, tokenHeader(token))

    const getBigwins = (params, token) => api.get('/bigwins', params, tokenHeader(token))
    const addBigwin = (tot, token) => api.post('/bigwins', tot, tokenHeader(token))

    const getReliefs = (params, token) => api.get('/reliefs', params, tokenHeader(token))
    const addRelief = (relief, token) => api.post('/reliefs', relief, tokenHeader(token))

    const getDepositOrders = (params, token) => api.get('/orders', params, tokenHeader(token))
    const getDepositMethods = (token) => api.get('/methods', null, tokenHeader(token))
    const addDepositOrder = (order, token) => api.post('/orders', order, tokenHeader(token))
    const checkoutDepositOrder = (orderId, checkout, token) => api.post('/orders/' + orderId + '/checkout', checkout, tokenHeader(token))

    const getWithdraws = (params, token) => api.get('/withdraws', params, tokenHeader(token))
    const addWithdraw = (withdraw, token) => api.post('/withdraws', withdraw, tokenHeader(token))

    const getTransfers = (params, token) => api.get('/transfers', params, tokenHeader(token))
    const addTransfer = (transfer, token) => api.post('/transfers', transfer, tokenHeader(token))

    const getRecords = (params, token) => api.get('/records', params, tokenHeader(token))

    const getTransactions = (params, token) => api.get('/transactions', params, tokenHeader(token))

    const getRebates = (params, token) => api.get('/rebates', params, tokenHeader(token))
    const addRebate = (rebate, token) => {
        rebate.claim = true
        return api.post('/rebates', rebate, tokenHeader(token))
    }
    const calculateRebate = (params, token) => api.post('/rebates', params, tokenHeader(token))

    const getFavorites = (params, token) => api.get('/favorites', params, tokenHeader(token))
    const addFavorite = (params, token) => api.post('/favorites', params, tokenHeader(token))
    const deleteFavorite = (gameId, token) => api.delete('/favorites/' + gameId, null, tokenHeader(token))

    const getCoupons = (params, token) => api.get('/coupons', params, tokenHeader(token))

    const logout = (token) => api.get('/logout', null, tokenHeader(token))

    const getPlay = (gameId, params, mode, token) => api.get('/games/' + gameId + '/' + mode, params, tokenHeader(token))
    // const getDemo = (gameId, params, token = null) => api.get('/games/' + gameId + '/demo', params, tokenHeader(token))

    const getJackpot = (token = null) => api.get('/jackpot', null, tokenHeader(token))

    const getRecommend = (token = null) => api.get('/recommends', null, tokenHeader(token))

    const getRecent = (token = null) => api.get('/recent', null, tokenHeader(token))

    const getConfig = (token = null) => api.get('/config', null, tokenHeader(token))

    const getSpot = (token = null) => api.get('/config/slots', null, tokenHeader(token))

    const getMembers = (params, token) => api.get('/members', params, tokenHeader(token))

    const getGross = (params, token) => api.get('/gross', params, tokenHeader(token))

    const getGrossDetail = (params, token) => api.get('/gross-details/' + params.userId, params ,tokenHeader(token))
    
    const getStages = () => api.get('/plan', null, null)

    const getVisitors = (params, token) => api.get('/visitors', params, tokenHeader(token))

    const getCharges = (params, token) => api.get('/charges', params, tokenHeader(token))

    const getHistory = (params,token) => api.get('/statements', null, tokenHeader(token))

    const getNotifications = (token) => api.get('/notifications', null, tokenHeader(token))

    const clearNotifications = (token) => api.delete('/notifications', null, tokenHeader(token))

    const getChargesDetail = (params,token) => api.get('/charge-details/'+ params.day, null, tokenHeader(token))


    // ------
    // STEP 3
    // ------
    //
    // Return back a collection of functions that we would consider our
    // interface.  Most of the time it'll be just the list of all the
    // methods in step 2.
    //
    // Notice we're not returning back the `api` created in step 1?  That's
    // because it is scoped privately.  This is one way to create truly
    // private scoped goodies in JavaScript.
    //
    return {
        getMenu,
        getFilters,
        getGames,
        getLocales,
        getLive,
        getPromotion,
        getVip,
        search,
        getProfile,
        updateProfile,
        updatePassword,
        getSetting,
        updateSetting,
        getCards,
        addCard,
        updateCard,
        deleteCard,
        getWallets,
        updateWallet,
        getBigwins,
        addBigwin,
        getReliefs,
        addRelief,
        getDepositOrders,
        getDepositMethods,
        addDepositOrder,
        checkoutDepositOrder,
        getWithdraws,
        addWithdraw,
        getRecords,
        getTransactions,
        getRebates,
        addRebate,
        calculateRebate,
        getFavorites,
        addFavorite,
        deleteFavorite,
        getCoupons,
        logout,
        getPlay,
        getJackpot,
        getRecommend,
        getRecent,
        getTransfers,
        addTransfer,
        getConfig,
        refresh,
        getSpot,
        getMembers,
        getGross,
        getGrossDetail,
        getStages,
        getVisitors,
        getCharges,
        getHistory,
        getChargesDetail,
        getNotifications,
        clearNotifications,
    }
}

// let's return back our create method as the default.
export default {
    create
}
