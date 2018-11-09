
import {createReducer, createActions} from 'reduxsauce'
// import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    chargesDetailRequest: ['params'],
    chargesDetailSuccess: ['data'],
    chargesDetailFailure: null,
    chargesDetailReset: null,
    chargesDetailFetching: null,
})

export const ChargesDetailTypes = Types

export default Creators


/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    fetching: false,
    data: {
        data: [],
    },
    error: false,
    show:false
}


/* ------------- Reducers ------------- */

// export const loading= (state, action) => {
//     // console.log('loading', action)
//     const { data } = action;
//     return {...state, fetching: data.fetching }
// }

// export const loading1= (state) => {
//     return {...state, fetching: true }
// }

// export const loading2= (state) => {
//     return {...state, fetching: false }
// }
// request the data from an api
export const request = (state) => {
    return {...state, fetching: true,error: false}
}

// successful api lookup
export const success = (state, action) => {
    const {data} = action
    // console.log('success11', action)
    // console.log(data)
    return {...state, fetching: false, show: true, data}
}


// Something went wrong somewhere.
export const failure = (state) => {
    return {...state, data: { ...state.data, data: [] }, fetching: false,show: false, error: true}
}

export const reset = (state) => INITIAL_STATE
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.CHARGES_DETAIL_REQUEST]: request,
    [Types.CHARGES_DETAIL_SUCCESS]: success,
    [Types.CHARGES_DETAIL_FAILURE]: failure,
    [Types.CHARGES_DETAIL_RESET]: reset,
    [Types.CHARGES_DETAIL_FETCHING]: request,
})

//persist/REHYDRATE