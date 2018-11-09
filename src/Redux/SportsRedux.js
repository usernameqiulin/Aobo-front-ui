import {createReducer, createActions} from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
    sportsLogin: ['successCallback'],
    sportsLogout: null
})

export const SportsTypes = Types
export default Creators





