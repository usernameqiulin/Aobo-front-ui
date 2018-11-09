import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import {I18nextProvider} from 'react-i18next'
import {PersistGate} from 'redux-persist/es/integration/react'
import { CookiesProvider } from 'react-cookie'

// import {syncHistoryWithStore} from 'react-router-redux'

import i18n from './i18n'
import createStore from './Redux'
import App from './Containers/App'
import registerServiceWorker from './registerServiceWorker'
import AnalyticsTracker from "./Components/Analytics"

const {persistor, store} = createStore()
const supportsHistory = 'pushState' in window.history
const onBeforeLift = () => {
    console.log('take some action before the gate lifts')
}
window.__dispatch = store.dispatch
ReactDOM.render(
    (<Provider store={store}>
        <PersistGate
            loading={<h1>'加载中...'</h1>}
            onBeforeLift={onBeforeLift}
            persistor={persistor}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter forceRefresh={!supportsHistory}>
                    <CookiesProvider>
                        <AnalyticsTracker/>
                        <App/>
                    </CookiesProvider>
                </BrowserRouter>
            </I18nextProvider>
        </PersistGate>
    </Provider>)
    ,
    document.getElementById('root')
);
registerServiceWorker()
