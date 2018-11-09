import {createStore, applyMiddleware, compose} from 'redux'
import {persistStore} from 'redux-persist'
import {createLogger} from 'redux-logger'
import Config from '../Config/DebugSettings'
import createSagaMiddleware from 'redux-saga'
import R from 'ramda'

// creates the store
export default (rootReducer, rootSaga) => {
    /* ------------- Redux Configuration ------------- */

    const middleware = []
    const enhancers = []

    /* ------------- Saga Middleware ------------- */

    // const sagaMonitor = process.env.NODE_ENV === 'development' ? console.tron.createSagaMonitor() : null
    const sagaMonitor = null
    const sagaMiddleware = createSagaMiddleware({sagaMonitor})
    middleware.push(sagaMiddleware)

    /* ------------- Logger Middleware ------------- */

    const SAGA_LOGGING_BLACKLIST = [/*'EFFECT_TRIGGERED', 'EFFECT_RESOLVED', 'EFFECT_REJECTED', 'persist/REHYDRATE'*/]

    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        // the logger master switch
        const USE_LOGGING = Config.reduxLogging
        // silence these saga-based messages
        // create the logger
        const logger = createLogger({
            predicate: (getState, {type}) => USE_LOGGING && R.not(R.contains(type, SAGA_LOGGING_BLACKLIST))
        })
        middleware.push(logger)
    }

    /* ------------- Assemble Middleware ------------- */

    enhancers.push(applyMiddleware(...middleware))

    // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
    const store = createStore(
        rootReducer,
        (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() : {},
        compose(...enhancers)
    )

    // kick off root saga
    if(process.env.NODE_ENV !== 'test'){
        const rootTask = sagaMiddleware.run(rootSaga)
        rootTask.done.catch(function (err) {
            console.log("Error in Sagas: ", err)
        })
    }
    

    let persistor = persistStore(
        store,
        null,
        () => {
            // console.log(store.getState()) // if you want to get restoredState
        },
    )
    return {store, persistor}
}
