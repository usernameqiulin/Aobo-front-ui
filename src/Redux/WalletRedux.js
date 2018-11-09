/**
 * Created by darkmoon on 7/6/17.
 */
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    walletRequest: null,
    walletSuccess: ['data'],
    walletFailure: null,
    
    walletUpdateRequest: ['code'],
    walletUpdateSuccess: ['wallet'],
    walletReset: null,
    walletUpdateBalance: ['object'],
})

export const WalletTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    main: null,
    other: null,
    error: false,
    updating: '',
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) => {
    return {...state, fetching: true}
}

// successful api lookup
export const success = (state, action) => {
    const {data} = action
    let main = {}, other = []
    data.map(w => {
        if (w.wallet.code === 'MAIN') {
            main = w
        } else {
            other.push(w)
        }
    })
    // console.log(data)
    return {...state, fetching: false, error: false, main, other}
}

// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, fetching: false, error: true, updating: ''}
}

export const updateRequest = (state, action) => {
    const {code} = action
    return {...state, updating: code}
}

export const updateSuccess = (state, action) => {
    const {wallet} = action
    if (wallet.wallet.code === 'MAIN') {
        return {...state, main: wallet, updating: ''}
    }
    let {other} = state
    for (let i = 0; i < other.length; i++) {
        if (wallet.wallet.code === other[i].wallet.code) {
            other[i] = wallet
            break
        }
    }
    return {...state, updating: '', other}
}

export const updateBalance = (state, action) => {
    const {object} = action
    let {main, other} = state
    if (object.wallet === 'MAIN') {
        main.balances = object.balances
    } else {
        for (let i = 0; i < other.length; i++) {
            if (object.wallet === other[i].wallet.code) {
                other[i].balances = object.balances
                break
            }
        }
    }
    return {...state, other, main}
}

export const reset = (state) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.WALLET_REQUEST]: request,
    [Types.WALLET_SUCCESS]: success,
    [Types.WALLET_FAILURE]: failure,
    [Types.WALLET_UPDATE_REQUEST]: updateRequest,
    [Types.WALLET_UPDATE_SUCCESS]: updateSuccess,
    [Types.WALLET_RESET]: reset,
    [Types.WALLET_UPDATE_BALANCE]: updateBalance,
})
