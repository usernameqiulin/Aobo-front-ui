import storage from 'redux-persist/es/storage'

const REDUX_PERSIST = {
    active: true,
    storeConfig: {
        key: 'aobo',
        version: 1,
        storage: storage,
        blacklist: ['pusher', 'play', 'checkout', 'confirm', 'alert', 'chargesDetail', 'notification'],
        // whitelist: [], //Optionally, just specify the keys you DO want stored to
        debug: true,
        // throttle: 300,
        // transforms: [immutableTransform()],
        // debounce: 300,
    }
};

export default REDUX_PERSIST
