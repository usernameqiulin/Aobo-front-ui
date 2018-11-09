import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import Cache from 'i18next-localstorage-cache';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
    .use(XHR)
    .use(Cache)
    .use(LanguageDetector)
    .init({
        whitelist: ['en', 'en-GB', 'en-US', 'zh', 'zh-CN', 'zh-TW'],
        fallbackLng: 'en',
        initImmediate: true,
        react: {
            wait: true, // globally set to wait for loaded translations in translate hoc
            // bindI18n: 'languageChanged loaded',
            // exposeNamespace: true // exposes namespace on data-i18next-options to be used in eg. locize-editor
        },
        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',
        load: 'currentOnly',
        // load: 'all',
        nonExplicitWhitelist: false,
        debug: false,
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json"
        },

        cache: {
          // enabled: true
        },
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
            lookupQuerystring: 'locale',
            lookupCookie: 'aobo_locale',
            lookupLocalStorage: 'aobo_locale',
            caches: ['localStorage', 'cookie'],
            excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
            cookieMinutes: 99999,
            cookieDomain: '',
            htmlTag: document.documentElement,
        },
        interpolation: {
            escapeValue: false, // not needed for react!!
            formatSeparator: ',',
            format: function (value, format, lng) {
                if (format === 'uppercase') return value.toUpperCase();
                return value;
            }
        }
    });


export default i18n;
