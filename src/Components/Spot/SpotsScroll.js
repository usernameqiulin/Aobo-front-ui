import React from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash/debounce'

const stringPlaceholderRegEx = new RegExp("%s", "g")

const obtainOffsetLeft = function(element, offsetLeft) {
    return offsetLeft = offsetLeft || 0,
        element === bodyElem || null === element ? offsetLeft : (offsetLeft += element.offsetLeft, obtainOffsetLeft(element.offsetParent, offsetLeft))
}

class SpotsScroll extends React.Component {
    constructor(props) {
        super(props)
    }

    SpotsPosition = function() {
        var contentToScrollNgEl,
            cssRule,
            cssRules,
            dimensionsScroll,
            hasContent,
            isActive,
            lastContentElementEl,
            resolveScrollPosition,
            scrollContent,
            scrollPosition,
            scrollWidth,
            spotsContainerNgEl,
            updateContentSize,
            updateContentSizeDebounced,
            updateDimensions,
            updateWindowSize,
            validatePosition;
        return scrollPosition = 0,
            scrollWidth = 0,
            isActive = !1,
            hasContent = !1,
            spotsContainerNgEl = angular.element(),
            contentToScrollNgEl = [],
            lastContentElementEl = void 0,
            dimensionsScroll = {
                window: 0,
                leftEdge: 0,
                rightEdge: 0,
                width: 0
            },
            cssRule = "transform: translateX(%s)",
            cssRules = "-webkit-%s; -moz-%s; -ms-%s; %s;".replace(stringPlaceholderRegEx, cssRule),
            updateContentSize = function() {
                if (
                    dimensionsScroll.leftEdge = obtainOffsetLeft(spotsContainerNgEl[0]),
                        dimensionsScroll.width = lastContentElementEl.offsetWidth + obtainOffsetLeft(lastContentElementEl),
                        dimensionsScroll.rightEdge = dimensionsScroll.width + dimensionsScroll.leftEdge,
                        scrollWidth = dimensionsScroll.rightEdge - dimensionsScroll.window,
                        isActive
                )
                    return scrollPosition = validatePosition(scrollWidth, scrollPosition),
                        scrollContent(scrollPosition)
            },
            updateContentSizeDebounced = debounce(updateContentSize, 25),
            updateWindowSize = function() {
                return dimensionsScroll.window = $window.innerWidth
            },
            updateDimensions = function() {
                if (updateWindowSize(), hasContent)
                    return updateContentSize()
            },
            validatePosition = function(currentScrollWidth, newScrollPosition) {
                return newScrollPosition <= -currentScrollWidth ? -currentScrollWidth : newScrollPosition >= 0 ? 0 : newScrollPosition
            },
            resolveScrollPosition = function(dragDeltaX) {
                var newScrollPosition;
                return newScrollPosition = scrollPosition + dragDeltaX,
                    scrollPosition = validatePosition(scrollWidth, newScrollPosition)
            },
            scrollContent = function(positionValue) {
                var cssValue, rules;
                return cssValue = positionValue + "px", rules = cssRules.replace(stringPlaceholderRegEx, cssValue), spotsContainerNgEl.attr("style", rules)
            },
            {
                move: function(delta) {
                    return scrollContent(resolveScrollPosition(delta))
                },
                addContentToScroll: function(newContentNgEl) {
                    return hasContent = !0,
                        lastContentElementEl = newContentNgEl[0],
                        contentToScrollNgEl.push(newContentNgEl),
                        updateContentSizeDebounced()
                },
                removeContentFromScroll: function(contentToRemoveNgEl) {
                    var index;
                    return index = contentToScrollNgEl.indexOf(contentToRemoveNgEl),
                        contentToScrollNgEl.splice(index, 1),
                        0 === contentToScrollNgEl.length ? (lastContentElementEl = null, hasContent = !1) : (lastContentElementEl === contentToRemoveNgEl[0] && (lastContentElementEl = contentToScrollNgEl[index - 1][0]), updateContentSizeDebounced())
                },
                init: function() {
                    return isActive = true,
                        updateDimensions()
                },
                reset: function() {
                    return isActive = !1,
                        scrollPosition = 0, scrollContent(0)
                },
                updateDimensionsDebounced: debounce(updateDimensions, 200),
                registerContainer: function(containerNgEl) {
                    return spotsContainerNgEl = containerNgEl
                }
            }
    }

    SpotsScroll = function() {
        var bindHammer,
            classes,
            currentScrolledElementNgEl,
            hammerElements,
            hammerOptions,
            isEmpty,
            isEventValid,
            isScrollActive,
            lastDelta,
            positionManager,
            resetEvent,
            resetHammeredElements,
            scroll,
            scrollEnd,
            scrollStart,
            scrollingElementsNgEl,
            unbindHammer,
            validDirections;
        return isScrollActive = !1,
            lastDelta = 0,
            currentScrolledElementNgEl = null,
            scrollingElementsNgEl = [],
            hammerElements = [],
            validDirections = ["right", "left"],
            positionManager = null,
            classes = {
                isDragged: "is-dragged"
            },
            isEmpty = function(arrayToCheck) {
                return 0 === arrayToCheck.length
            },
            isEventValid = function(event) {
                return !!event.gesture && validDirections.indexOf(event.gesture.direction) !== -1
            },
            resetEvent = function(event) {
                if (event.preventDefault(), isEventValid(event)) return event.gesture.stopPropagation(), event.gesture.preventDefault()
            },
            hammerOptions = {
                preventDefault: true,
                dragBlockHorizontal: true,
                preventMouse: true
            },
            bindHammer = function(hammerElement) {
                return hammerElement.on("dragleft", scroll),
                    hammerElement.on("dragright", scroll),
                    hammerElement.on("dragstart", scrollStart),
                    hammerElement.on("dragend", scrollEnd)
            },
            resetHammeredElements = function() {
                var hammerElement, i, len, results;
                if (!isEmpty(hammerElements)) {
                    for (results = [], i = 0, len = hammerElements.length; i < len; i++)
                        hammerElement = hammerElements[i], results.push(unbindHammer(hammerElement));
                    return results
                }
            },
            unbindHammer = function(hammerElement) {
                return hammerElement.off("dragleft dragright", scroll),
                    hammerElement.off("dragstart", scrollStart),
                    hammerElement.off("dragend", scrollEnd)
            },
            scroll = function(event) {
                var currentDelta;
                return currentDelta = event.gesture.deltaX, positionManager.move(currentDelta - lastDelta), lastDelta = currentDelta, resetEvent(event)
            },
            scrollStart = function(event) {
                return currentScrolledElementNgEl = angular.element(this), currentScrolledElementNgEl.addClass(classes.isDragged), resetEvent(event)
            },
            scrollEnd = function(event) {
                return lastDelta = 0, currentScrolledElementNgEl.removeClass(classes.isDragged), resetEvent(event)
            },
            {
                addElement: function(elementToAddNgEl) {
                    var elsAmount;
                    if (elsAmount = 0, scrollingElementsNgEl.push(elementToAddNgEl), elsAmount = hammerElements.push(new Hammer(elementToAddNgEl[0], hammerOptions)), isScrollActive)
                        return bindHammer(hammerElements[elsAmount - 1])
                },
                removeElement: function(toRemoveNgEl) {
                    var index;
                    return index = scrollingElementsNgEl.indexOf(toRemoveNgEl),
                        scrollingElementsNgEl.splice(index, 1),
                        unbindHammer(hammerElements[index]),
                        hammerElements.splice(index, 1)
                },
                initScroll: function() {
                    var element, i, len, results;
                    if (isScrollActive = !0, !isEmpty(hammerElements)) {
                        for (results = [], i = 0, len = hammerElements.length; i < len; i++)
                            element = hammerElements[i], results.push(bindHammer(element));
                        return results
                    }
                },
                resetScroll: function() {
                    return isScrollActive = !1,
                        resetHammeredElements()
                },
                registerPositionManager: function(manager) {
                    return positionManager = manager
                }
            }
    }

    spotsPosition = this.SpotsPosition()

    spotsScroll = this.SpotsScroll()

    addSpot = (newSpotNgEl) => {
        return this.spotsPosition.addContentToScroll(newSpotNgEl),
            this.spotsScroll.addElement(newSpotNgEl)
    }

    removeSpot = (spotToRemoveNgEl) => {
        return this.spotsScroll.removeElement(spotToRemoveNgEl),
            this.spotsPosition.removeContentFromScroll(spotToRemoveNgEl)
    }
    init = () => {
        return this.spotsPosition.registerContainer(spotsContainerNgEl),
            this.spotsScroll.registerPositionManager(this.spotsPosition)
            // $scope.$watch("cssData.isScrollingActive", function(newVal) {
            //     return newVal ? startUp() : shutDown()
            // })
    }
    startUp = () => {
        return this.spotsScroll.initScroll(),
            this.spotsPosition.init(),
            window.addEventListener("resize", this.spotsPosition.updateDimensionsDebounced, false)
    }
    shutDown = () => {
        return window.removeEventListener("resize", this.spotsPosition.updateDimensionsDebounced),
            this.spotsScroll.resetScroll(),
            this.spotsPosition.reset()
    }

    componentDidMount() {
        this.init()
    }

}

SpotsScroll.PropTypes = {

}

export default SpotsScroll