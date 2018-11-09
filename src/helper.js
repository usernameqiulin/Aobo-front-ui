/**
 * Created by darkmoon on 7/8/17.
 */

import moment from "moment"
import R from "ramda"

const DATETIME_FORMATS = {
    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
    AMPMS: ["AM", "PM"],
    medium: "MMM d, y h:mm:ss a",
    short: "M/d/yy h:mm a",
    fullDate: "EEEE, MMMM d, y",
    longDate: "MMMM d, y",
    mediumDate: "MMM d, y",
    shortDate: "M/d/yy",
    mediumTime: "h:mm:ss a",
    shortTime: "h:mm a",
    ERANAMES: ["Before Christ", "Anno Domini"],
    ERAS: ["BC", "AD"]
}

export function isCssAnimationSupported() {
    let animation = false,
        animationstring = 'animation',
        keyframeprefix = '',
        domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
        pfx = '',
        elm = document.createElement('div')

    if (elm.style.animationName !== undefined) {
        animation = true
    }

    if (animation === false) {
        for (let i = 0; i < domPrefixes.length; i++) {
            if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
                pfx = domPrefixes[i];
                animationstring = pfx + 'Animation';
                keyframeprefix = '-' + pfx.toLowerCase() + '-';
                animation = true;
                break;
            }
        }
    }
    return animation
}

export function isMobile() {
    return /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)
}

export function formatTime(timeStr, timezone) {
    return moment(timeStr).utcOffset(timezone).format('YYYY/MM/DD HH:mm:ss')
}

export function MenuAimFactory() {
    const MenuAim = function () {
        function MenuAim(menuElement, tolerance, delay, direction) {
            this.menuElement = menuElement, this.tolerance = tolerance, this.delay = delay, this.direction = direction, this.mouseLocations = [], this.lastDelayLocation = !1, this.assignEvents()
        }

        return MenuAim.prototype.getActivationDelay = function () {
            let offset = this.menuElement.getBoundingClientRect(),
                location = this.mouseLocations[this.mouseLocations.length - 1],
                prevLocation = this.mouseLocations[0];
            if (!location) return 0;
            if (prevLocation || (prevLocation = location), prevLocation.x < offset.left || prevLocation.x > this.getLowerRight(offset).x || prevLocation.y < offset.Top || prevLocation.y > this.getLowerRight(offset).y) return 0;
            if (this.lastDelayLocation && location.x === this.lastDelayLocation.x && location.y === this.lastDelayLocation.y) return 0;
            let decreasingCorner = this.getDecreasingCorner(offset),
                increasingCorner = this.getIncreasingCorner(offset),
                decreasingSlope = this.getSlope(location, decreasingCorner),
                increasingSlope = this.getSlope(location, increasingCorner),
                prevDecreasingSlope = this.getSlope(prevLocation, decreasingCorner),
                prevIncreasingSlope = this.getSlope(prevLocation, increasingCorner);
            return decreasingSlope < prevDecreasingSlope && increasingSlope > prevIncreasingSlope ? (this.lastDelayLocation = location, this.delay) : (this.lastDelayLocation = null, 0)
        }, MenuAim.prototype.getIncreasingCorner = function (offset) {
            switch (this.direction) {
                case "right":
                    return this.getLowerRight(offset);
                case "left":
                    return this.getUpperLeft(offset);
                case "below":
                    return this.getLowerLeft(offset);
                case "above":
                    return this.getUpperRight(offset)
            }
        }, MenuAim.prototype.getDecreasingCorner = function (offset) {
            switch (this.direction) {
                case "right":
                    return this.getUpperRight(offset);
                case "left":
                    return this.getLowerLeft(offset);
                case "below":
                    return this.getLowerRight(offset);
                case "above":
                    return this.getUpperLeft(offset)
            }
        }, MenuAim.prototype.assignEvents = function () {
            window.document.addEventListener("mousemove", this.mouseTrack.bind(this))
        }, MenuAim.prototype.mouseTrack = function (e) {
            this.mouseLocations.push({
                x: e.pageX,
                y: e.pageY
            }), this.mouseLocations.length > 3 && this.mouseLocations.shift()
        }, MenuAim.prototype.getUpperLeft = function (offset) {
            return {
                x: offset.left,
                y: offset.top - this.tolerance
            }
        }, MenuAim.prototype.getUpperRight = function (offset) {
            return {
                x: offset.left + offset.width,
                y: offset.top - this.tolerance
            }
        }, MenuAim.prototype.getLowerLeft = function (offset) {
            return {
                x: offset.left,
                y: offset.top + offset.height + this.tolerance
            }
        }, MenuAim.prototype.getLowerRight = function (offset) {
            return {
                x: offset.left + offset.width,
                y: offset.top + offset.height + this.tolerance
            }
        }, MenuAim.prototype.getSlope = function (a, b) {
            return (b.y - a.y) / (b.x - a.x)
        }, MenuAim
    }();
    return {
        getForMenu: function (menuElement, tolerance, delay, direction) {
            return void 0 === tolerance && (tolerance = 75), void 0 === delay && (delay = 300), void 0 === direction && (direction = "right"), new MenuAim(menuElement, tolerance, delay, direction)
        }
    }
}

export const selectToken = (state) => !!state.auth.data ? state.auth.data : null

export const selectPlay = (state) => state.play

export const selectGame = (state) => state.game

export const getName = (name, locale) => {
    return name.hasOwnProperty(locale) ? name[locale] : (name.hasOwnProperty('en-GB') ? name['en-GB']: '...')
    // const obj = name.find(o => o.locale === locale)
    // return typeof(obj) === 'undefined' ? name.find(o => o.locale === 'en-GB') : obj
}

export const genBirthYearOptions = () => {
    const maxYear = (new Date()).getFullYear() - 18, years = 100
    let options = []
    for (let i = maxYear; i > maxYear - years; i--) {
        options.push({
            label: '' + i,
            value: '' + i,
        })
    }
    return options
}

export const genBirthDayOptions = () => {
    let options = []
    for (let i = 1; i <= 31; i++) {
        options.push({
            label: numberFormat(i, 2),
            value: numberFormat(i, 2),
        })
    }
    return options
}

export const genMonthOptions = () => {
    let options = []
    for (let i = 1; i <= 12; i++) {
        options.push({
            label: numberFormat(i, 2),
            value: numberFormat(i, 2),
        })
    }
    return options
}

export const numberFormat = (num, size) => {
    let s = num + ""
    while (s.length < size) s = "0" + s
    return s
}

export const verifyBirthday = (birthday) => {
    const {year, month, day} = birthday, days = {
        '1': 31,
        '3': 31,
        '4': 30,
        '5': 31,
        '6': 30,
        '7': 31,
        '8': 31,
        '9': 30,
        '10': 31,
        '11': 30,
        '12': 31,
    }, iMonth = parseInt(month, 10), iDay = parseInt(day, 10)
    if (isNaN(year) || isNaN(iMonth) || isNaN(iDay)) {
        return false;
    }
    let febDays = 28
    if (year % 100 === 0) {
        if (year % 400 === 0) {
            febDays = 29
        }
    } else if (year % 4 === 0) {
        febDays = 29
    }

    if (iMonth === 2 && iDay > febDays) {
        return false
    }
    return !(iMonth !== 2 && iDay > days[iMonth])
}

export const randomImgServer = (image) => process.env.REACT_APP_IMAGE_SERVER_PREFIX + (Math.floor(Math.random() * 4) + 1) + process.env.REACT_APP_IMAGE_SERVER_POSTFIX + '/' + image

export const randomGameImg = (image, suffix) => {
    const prefix = '//img'
    return {
        x1: prefix + '.sc172.com/game/' + image + '.1x.' + suffix,
        x2: prefix + '.sc172.com/game/' + image + '.2x.' + suffix,
    }
}
export const randomGameIcon = (image, suffix) => {
    const prefix = '//img'
    return {
        x1: prefix + '.sc172.com/game/' + image + '.' + suffix,
        x2: prefix + '.sc172.com/game/' + image + '@2x.' + suffix,
    }
}

export const convertSearchToObj = (str) => {
    const search = str.slice(1).split('&')
    let obj = {}
    search.map((a) => {
        let aa = a.split('=')
        obj[aa[0]] = isNaN(aa[1]) ? aa[1] : parseInt(aa[1])
    })
    return obj
}

export const toUnixTimestamp = (strAtomTimestamp, shouldExcludeOffset) => {
    return null == shouldExcludeOffset && (shouldExcludeOffset = !1), shouldExcludeOffset && (strAtomTimestamp = strAtomTimestamp.slice(0, 19)), Math.floor(new Date(strAtomTimestamp).getTime() / 1e3)
}

export const paddingFilter = (input, n) => {
    let zeros
    return typeof input !== 'undefined' || (input = ""), typeof input === 'number' && (input = input.toString()), input.length >= n ? input : (zeros = new Array(n - input.length + 1), (zeros = zeros.join("0")) + input)
}

export const toInt = (str) => parseInt(str, 10)

export const Timer = () => {
    let callbacks, callbacksAmount, haltTimer, isTimerRunning, lastTime, runCallbacks, startTimer, timerLoop, timerObject;
    return lastTime = Math.floor((new Date).getTime() / 1e3),
        callbacks = [],
        callbacksAmount = 0,
        isTimerRunning = !1,
        timerObject = null,
        startTimer = function() {
            return isTimerRunning = !0, timerLoop()
        },
        haltTimer = function() {
            isTimerRunning = !1, clearTimeout(timerObject)
        },
        runCallbacks = function(newTime) {
            let callback, i, len;
            if (callbacksAmount <= 0) return !1;
            for (i = 0, len = callbacks.length; i < len; i++)(callback = callbacks[i]) && callback(newTime)
        },
        timerLoop = function() {
            let newTime;
            if (newTime = Math.floor((new Date).getTime() / 1e3), newTime > lastTime && (runCallbacks(newTime), lastTime = newTime), !isTimerRunning) return !1;
            timerObject = setTimeout(timerLoop, 1e3)
        },
        {
            addCallback: function(newCallback) {
                return callbacks.indexOf(newCallback) === -1 && (callbacksAmount = callbacks.push(newCallback), isTimerRunning || startTimer(), newCallback(lastTime))
            },
            removeCallback: function(callbackToRemove) {
                let indexOfCallback;
                return (indexOfCallback = callbacks.indexOf(callbackToRemove)) !== -1 && (callbacks.splice(indexOfCallback, 1), callbacksAmount -= 1, 0 === callbacksAmount && isTimerRunning ? haltTimer() : void 0)
            }
        }
}

export const Countdown = function() {
    function Countdown(listenersManager, _gogTimer, _paddingFilter, _toUnixTimestamp) {
        this._gogTimer = _gogTimer,
            this._paddingFilter = _paddingFilter,
            this._toUnixTimestamp = _toUnixTimestamp,
            this._unixNow = 0,
            this._unixNowLocal = Math.floor((new Date).getTime() / 1e3),
            this._unixStartCountdown = this._unixNowLocal,
            this._unixTarget = 0,
            this._unixDelta = 0,
            this._countdownListeners = listenersManager.getManager(),
            this._countdownFinishListeners = listenersManager.getManager(),
            this._userNotLoggedInListeners = listenersManager.getManager(),
            this._formattedCountdown = {},
            this._unixNow = this._unixNowLocal,
            // null != $window.gogData.nowAtom ? this._unixNow = this._toUnixTimestamp($window.gogData.nowAtom, !1) : null != $window.gogData.now ? this._unixNow = $window.gogData.now : this._unixNow = this._unixNowLocal,
            this._countdownTickBound = this._countdownTick.bind(this)
    }
    return Countdown._DAYS_DIVIDER = 86400,
        Countdown._HOURS_DIVIDER = 3600,
        Countdown._MINUTES_DIVIDER = 60,
        Countdown.prototype.registerCountdownListener = function(listener) {
            return this._countdownListeners.addListener(listener)
        },
        Countdown.prototype.registerCountdownFinishListener = function(listener) {
            let listenerDestructor;
            return listenerDestructor = this._countdownFinishListeners.addListener(listener), this._hasFinished && this._countdownFinishListeners.callListeners(), listenerDestructor
        },
        Countdown.prototype.getDelta = function() {
            return this._unixTarget - this._unixNow
        },
        Countdown.prototype.getHasFinished = function() {
            return this.getDelta() <= 0
        },
        Countdown.prototype.initialize = function(unixTarget) {
            this._unixTarget = unixTarget, this._hasInitialized = !0, this._startCountdown()
        },
        Countdown.prototype._startCountdown = function() {
            this._unixDelta = this.getDelta(), this._gogTimer.addCallback(this._countdownTickBound)
        },
        Countdown.prototype._finishCountdown = function() {
            this._countdownFinishListeners.callListeners(), this._gogTimer.removeCallback(this._countdownTickBound)
        },
        Countdown.prototype._calcUnixTimePassed = function(unixNowLocal) {
            return this._unixDelta - (unixNowLocal - this._unixStartCountdown)
        },
        Countdown.prototype._countdownTick = function(unixNowLocal) {
            let unixTimePassed;
            if ((unixTimePassed = this._calcUnixTimePassed(unixNowLocal)) <= 0) return void this._finishCountdown();
            this._countdownListeners.callListeners(this._updateCounter(unixTimePassed))
        },
        Countdown.prototype._updateCounter = function(unixTimePassed) {
            let days, hours, minutes, seconds;
            return days = Math.floor(unixTimePassed / Countdown._DAYS_DIVIDER),
                unixTimePassed -= days * Countdown._DAYS_DIVIDER,
                hours = Math.floor(unixTimePassed / Countdown._HOURS_DIVIDER),
                unixTimePassed -= hours * Countdown._HOURS_DIVIDER,
                minutes = Math.floor(unixTimePassed / Countdown._MINUTES_DIVIDER),
                unixTimePassed -= minutes * Countdown._MINUTES_DIVIDER,
                seconds = unixTimePassed,
                this._formattedCountdown.days = this._paddingFilter(days, 2),
                this._formattedCountdown.hours = this._paddingFilter(hours, 2),
                this._formattedCountdown.hours48 = this._paddingFilter(hours + 24 * days, 2),
                this._formattedCountdown.minutes = this._paddingFilter(minutes, 2),
                this._formattedCountdown.seconds = this._paddingFilter(seconds, 2),
                this._formattedCountdown.isLast48Hours = days < 2,
                this._formattedCountdown
        },
        Countdown
}()

export const CountdownService = function() {
    function CountdownService() {
        this._listenersManager = listenersManager(),
            this._timer = Timer(),
            this._paddingFilter = paddingFilter,
            this._toUnixTimestamp = toUnixTimestamp,
            this._listenersManager.getManager()
    }
    return CountdownService._lstCountdown = {},
        CountdownService._lstCountdownInitListeners = {},
        CountdownService.prototype.create = function(countdownId, unixTarget) {
            let countdown;
            if (CountdownService._lstCountdown.hasOwnProperty(countdownId)) throw new Error("CountdownService: attempt to redefine already existing counter with id " + countdownId);
            return countdown = new Countdown(this._listenersManager, this._timer, this._paddingFilter, this._toUnixTimestamp),
                countdown.initialize(unixTarget),
                CountdownService._lstCountdown[countdownId] = countdown,
                this._callInitListeners(countdownId, countdown),
                countdown
        },
        CountdownService.prototype.get = function(countdownId) {
            return CountdownService._lstCountdown[countdownId]
        },
        CountdownService.prototype.registerInitListener = function(countdownId, shouldCallAnyway, listener) {
            return null == shouldCallAnyway && (shouldCallAnyway = !1),
                CountdownService._lstCountdown.hasOwnProperty(countdownId)
                    ? (shouldCallAnyway ? listener(CountdownService._lstCountdown[countdownId]) : Function.prototype)
                    : (
                        CountdownService._lstCountdownInitListeners.hasOwnProperty(countdownId) || (CountdownService._lstCountdownInitListeners[countdownId] = this._listenersManager.getManager()),
                            CountdownService._lstCountdownInitListeners[countdownId].addListener(listener)
                    )
        },
        CountdownService.prototype._callInitListeners = function(countdownId, countdown) {
            CountdownService._lstCountdownInitListeners.hasOwnProperty(countdownId) && CountdownService._lstCountdownInitListeners[countdownId].callListeners(countdown)
        },
        CountdownService
}()

export const listenersManager = function() {
    let ListenerManager;
    return ListenerManager = function() {
        function ListenerManager() {
            this.__listeners = [],
                this.__amountOfListeners = 0,
                this.__listenersToRemove = [],
                this.__amountToRemove = 0,
                this.__stateListeners = [],
                this.__isActive = !1
        }
        return ListenerManager.prototype.__createCancelFunction = function(listenerToCancel, afterCancelCallback) {
            return function() {
                return afterCancelCallback(listenerToCancel), listenerToCancel = afterCancelCallback = null
            }
        }, ListenerManager.prototype.__afterCancel = function(listenerToRemove) {
            return this.__amountToRemove = this.__listenersToRemove.push(listenerToRemove)
        }, ListenerManager.prototype.__cleanRemovedListeners = function() {
            let i, indexOf, len, ref, toRemove;
            for (ref = this.__listenersToRemove, i = 0, len = ref.length; i < len; i++) toRemove = ref[i], (indexOf = this.__listeners.indexOf(toRemove)) !== -1 && this.__listeners.splice(indexOf, 1);
            return this.__amountOfListeners = this.__listeners.length, this.__amountToRemove = 0, this.__listenersToRemove.length = 0, this.__updateState(this.__amountOfListeners > 0)
        }, ListenerManager.prototype.__updateState = function(newActiveState) {
            let i, len, ref;
            if (this.__isActive !== newActiveState)
                for (this.__isActive = newActiveState, ref = this.__stateListeners, i = 0, len = ref.length; i < len; i++) ref[i](this.__isActive)
        }, ListenerManager.prototype.addListener = function(newListener) {
            return this.__amountOfListeners = this.__listeners.push(newListener), this.__updateState(!0), this.__createCancelFunction(newListener, this.__afterCancel.bind(this))
        }, ListenerManager.prototype.callListeners = function() {
            let i, len, listener, ref;
            if (0 !== this.__amountToRemove && this.__cleanRemovedListeners(), this.__isActive) {
                if (1 === this.__amountOfListeners) return this.__listeners[0].apply(null, arguments);
                for (ref = this.__listeners, i = 0, len = ref.length; i < len; i++) listener = ref[i], listener.apply(null, arguments)
            }
        }, ListenerManager.prototype.onStateChange = function(stateListener) {
            return this.__stateListeners.push(stateListener)
        }, ListenerManager
    }(), {
        getManager: function() {
            return new ListenerManager
        }
    }
}

export function selectText(elem) {
    if (document.selection) {
        const range = document.body.createTextRange()
        range.moveToElementText(elem)
        range.select()
    } else if (window.getSelection) {
        const range = document.createRange(), selection = window.getSelection()
        range.selectNode(elem)
        selection.removeAllRanges()
        selection.addRange(range)
    }
}

export function flattenFavorite(favorite) {
    return !favorite ? [] : R.pluck('gameId')(favorite)
}

export function isFlexSupported() {
    if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
        const { documentElement } = window.document
        return 'flex' in documentElement.style ||
            'webkitFlex' in documentElement.style ||
            'Flex' in documentElement.style ||
            'msFlex' in documentElement.style
    }
    return false
}

export const amountFormat = (x) => {
    x = !x ? 0 : x;
    if (typeof (x) !== 'number') {
        x = parseFloat(x)
    }
    const parts = x.toFixed(2).toString().split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".");
}

export const flattenWallet = (walletObj) => {
    let wallets = []
    walletObj.main && wallets.push({
        title: walletObj.main.wallet.name,
        slug: 'MAIN',
        icon: '<svg class="wallets__icon"><use xlink:href="#icon-bank"></use></svg>',
    })
    walletObj.other && walletObj.other.map(w => wallets.push({
        title: w.wallet.name,
        slug: w.wallet.code,
        icon: '<svg class="wallets__icon"><use xlink:href="#icon-wallet"></use></svg>',
    }))
    return wallets
}

export const flattenDepositMethods = (methodArray) => {
    let methods = []
    // console.log(methodArray)
    !!methodArray && Object.keys(methodArray).map(m => methods.push({
        title: methodArray[m].name,
        slug: methodArray[m].code,
        icon: getPaymentIcon(methodArray[m].code),
    }))
    return methods
}

export const getPaymentIcon = (method) => {
    if (method.startsWith('CNY') && method.endsWith('CC')) {
        return '<i class="img-card img-card--union_pay"></i>'
    }
    if (method.startsWith('CNY') && method.endsWith('QT')) {
        return '<i class="img-card img-card--union_pay"></i>'
    }
    if (!method.startsWith('CNY') && method.endsWith('CC')) {
        return '<i class="img-card img-card--visa"></i><i class="img-card img-card--mastercard"></i><i class="img-card img-card--amex"></i><i class="img-card img-card--jcb"></i>'
    }
    if (method.endsWith('WX')) {
        return '<i class="img-card img-card--we_chat"></i>'
    }
    if (method.endsWith('ALI')) {
        return '<i class="img-card img-card--alipay"></i>'
    }
    return '<i class="img-card img-card--' + method.toLowerCase() + '"></i>'
}

export const getCurrencyDetail = (currency, currencies) => {
    return currencies.find(c => c.code === currency)
}

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            const o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            const len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            const thisArg = arguments[1];

            // 5. Let k be 0.
            let k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                const kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
        }
    });
}

// Opera 8.0+
export const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0

// Firefox 1.0+
export const isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]"
export const isSafari = navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0

// Internet Explorer 6-11
export const isIE = /*@cc_on!@*/false || !!document.documentMode

// Edge 20+
export const isEdge = !isIE && !!window.StyleMedia

// Chrome 1+
export const isChrome = !!window.chrome && !!window.chrome.webstore

// Blink engine detection
export const isBlink = (isChrome || isOpera) && !!window.CSS;

export const noop = () => {};

export const getI18n = (object, locale) => {
    return object.hasOwnProperty(locale) ? object[locale] : (object['en-GB'] ? object['en-GB']: '')
}

export const isPlayable = (product) => {
    return (
        isMobile()
            ? product.worksOn.mobileBrowser
            : (product.worksOn.pcBrowser || product.worksOn.mobileBrowser)
    ) && !product.isComingSoon
}

export const isDemoable = (product) => {
    return (
        isMobile()
            ? product.worksOn.mobileBrowser && product.demo.html5
            : (product.worksOn.pcBrowser && product.demo.flash) || (product.worksOn.mobileBrowser && product.demo.html5)
    ) && !product.isComingSoon
}

export const getGameCategories = (categories, language) => {
    if (!!categories) {
        let cats = []
        categories.map(category => {
            cats.push(getName(category.name, language))
        })
        return cats.join('/')
    }
    return ''
}
