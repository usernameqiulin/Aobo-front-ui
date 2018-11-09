const getArrayOfElements = function(nodeList) {
    return [].slice.call(nodeList, 0)
}

const classes = {
    isMouseOver: "is-hovered",
    isDragged: "is-dragged",
    controlButton: "big-spots__btn",
    promoSpot: "big-spot--promo",
    largeSpot: "big-spot--big",
    blurForSpot: "big-spot-blur"
}

const spotState = function() {
    var addFadingClass,
        allLargeSpots,
        allPromoSpots,
        amountLargeSpots,
        amountPromoSpots,
        assignLargeElements,
        assignPromoElements,
        bigSpotsBlurs,
        blurSpots,
        classActiveSpot,
        classFadingSpot,
        currentLargeSpot,
        currentPromoSpot,
        determineSpotsDimensions,
        dimensions,
        elementCurrentBlur,
        elementCurrentLargeSpot,
        elementCurrentPromoSpot,
        elementNextBlur,
        elementNextLargeSpot,
        elementNextPromoSpot,
        elementPrevBlur,
        elementPrevLargeSpot,
        elementPrevPromoSpot,
        elementSpotsContainer,
        init,
        isAnimationOn,
        isPromoSpotPresent,
        isRotatorNeeded,
        largeSpots,
        promoSpots,
        removeFadingClass,
        resolveNextSpot,
        setupAnimations,
        updateSpotDisplay;

    return amountLargeSpots = 0,
        amountPromoSpots = 0,
        currentPromoSpot = 1,
        currentLargeSpot = 1,
        "big-spot--promo",
        classActiveSpot = "is-active",
        classFadingSpot = "is-fading",
        isPromoSpotPresent = false,
        isRotatorNeeded = false,
        isAnimationOn = false,
        elementNextLargeSpot = null,
        elementNextPromoSpot = null,
        elementPrevLargeSpot = null,
        elementCurrentBlur = null,
        elementNextBlur = null,
        elementPrevBlur = null,
        elementPrevPromoSpot = null,
        elementCurrentPromoSpot = null,
        elementCurrentLargeSpot = null,
        elementSpotsContainer = document.querySelector(".big-spots"),
        largeSpots = null,
        promoSpots = null,
        blurSpots = [],
        dimensions = {
            largeWidth: 0,
            largeRightEdge: 0,
            largeChangePoint: 0,
            largeDistance: 0,
            promoRightEdge: 0,
            promoChangePoint: 0,
            promoWidth: 0,
            promoDistance: 0,
            containerWidth: 0
        },
        allLargeSpots = null,
        allPromoSpots = null,
        bigSpotsBlurs = null,
        init = function() {
            // console.log(allLargeSpots, allPromoSpots, bigSpotsBlurs)
            // return
            return largeSpots = allLargeSpots,
                promoSpots = allPromoSpots,
                blurSpots = bigSpotsBlurs,
                amountLargeSpots = largeSpots.length,
                amountPromoSpots = promoSpots.length,
            amountPromoSpots > 1 && (isPromoSpotPresent = true),
            amountLargeSpots > 1 && (isRotatorNeeded = true),
                assignLargeElements(),
                assignPromoElements(),
                setupAnimations()
        },
        setupAnimations = function() {
            return isAnimationOn = true, largeSpots.on("transitionend", removeFadingClass), promoSpots.on("transitionend", removeFadingClass), blurSpots.on("transitionend", removeFadingClass)
        },
        addFadingClass = function() {
            this.classList && this.classList.add(classFadingSpot)
        },
        removeFadingClass = function() {
            this.classList && this.classList.remove(classFadingSpot)
        },
        assignLargeElements = function() {
            var currentLargeIndex, nextLargeIndex, prevLargeIndex;
            return currentLargeIndex = currentLargeSpot - 1,
                nextLargeIndex = currentLargeSpot < amountLargeSpots ? currentLargeIndex + 1 : 0,
                prevLargeIndex = currentLargeIndex > 0 ? currentLargeIndex - 1 : amountLargeSpots - 1,
                elementCurrentLargeSpot = largeSpots[currentLargeIndex],
                elementNextLargeSpot = largeSpots[nextLargeIndex],
                elementPrevLargeSpot = largeSpots[prevLargeIndex],
                elementCurrentBlur = blurSpots[currentLargeIndex],
                elementNextBlur = blurSpots[nextLargeIndex],
                elementPrevBlur = blurSpots[prevLargeIndex]
        },
        assignPromoElements = function() {
            var currentPromoIndex, nextPromoIndex, prevPromoIndex;
            if (isPromoSpotPresent) {
                return currentPromoIndex = currentPromoSpot - 1,
                    nextPromoIndex = currentPromoSpot < amountPromoSpots ? currentPromoIndex + 1 : 0,
                    prevPromoIndex = currentPromoIndex > 0 ? currentPromoIndex - 1 : amountPromoSpots - 1,
                    elementCurrentPromoSpot = promoSpots[currentPromoIndex],
                    elementNextPromoSpot = promoSpots[nextPromoIndex],
                    elementPrevPromoSpot = promoSpots[prevPromoIndex]
            }
        },
        determineSpotsDimensions = function() {
            var largeSpot, promoSpot;
            if (
                largeSpot = elementCurrentLargeSpot[0],
                    dimensions.containerWidth = elementSpotsContainer.offsetWidth,
                    dimensions.largeWidth = largeSpot.offsetWidth,
                    dimensions.largeRightEdge = dimensions.largeWidth,
                    dimensions.largeChangePoint = Math.floor(dimensions.largeWidth / 2),
                    dimensions.largeDistance = dimensions.largeRightEdge - dimensions.largeChangePoint,
                    isPromoSpotPresent
            )
                return promoSpot = elementCurrentPromoSpot[0],
                    dimensions.promoWidth = promoSpot.offsetWidth,
                    dimensions.promoRightEdge = promoSpot.offsetLeft + dimensions.promoWidth,
                    dimensions.promoChangePoint = dimensions.promoRightEdge - dimensions.promoWidth,
                    dimensions.promoDistance = dimensions.promoWidth
        },
        resolveNextSpot = function(direction, currentSpot, amountSpots) {
            return currentSpot += direction,
            currentSpot > amountSpots && (currentSpot = 1),
            currentSpot <= 0 && (currentSpot = amountSpots),
                currentSpot
        },
        updateSpotDisplay = function(prevSpot, currentSpot) {
            if (
                prevSpot && isAnimationOn && addFadingClass.call(prevSpot[0]),
                prevSpot && prevSpot.removeClass(classActiveSpot),
                    currentSpot
            )
                return currentSpot.addClass(classActiveSpot)
        },
        {
            initWithSpotsContainer: function(spotsContainerEl) {
                return allLargeSpots = getArrayOfElements(spotsContainerEl.querySelectorAll("." + classes.largeSpot)),
                    allPromoSpots = getArrayOfElements(spotsContainerEl.querySelectorAll("." + classes.promoSpot)),
                    bigSpotsBlurs = getArrayOfElements(document.querySelectorAll("." + classes.blurForSpot)),
                    init()
            },
            nextLargeSpot: function() {
                return currentLargeSpot = resolveNextSpot(1, currentLargeSpot, amountLargeSpots),
                    assignLargeElements(),
                    updateSpotDisplay(elementPrevLargeSpot, elementCurrentLargeSpot),
                    updateSpotDisplay(elementPrevBlur, elementCurrentBlur)
            },
            nextPromoSpot: function() {
                if (isPromoSpotPresent)
                    return currentPromoSpot = resolveNextSpot(1, currentPromoSpot, amountPromoSpots),
                        assignPromoElements(),
                        updateSpotDisplay(elementPrevPromoSpot, elementCurrentPromoSpot)
            },
            prevLargeSpot: function() {
                return currentLargeSpot = resolveNextSpot(-1, currentLargeSpot, amountLargeSpots),
                    assignLargeElements(),
                    updateSpotDisplay(elementNextLargeSpot, elementCurrentLargeSpot),
                    updateSpotDisplay(elementNextBlur, elementCurrentBlur)
            },
            prevPromoSpot: function() {
                if (isPromoSpotPresent)
                    return currentPromoSpot = resolveNextSpot(-1, currentPromoSpot, amountPromoSpots),
                        assignPromoElements(),
                        updateSpotDisplay(elementNextPromoSpot, elementCurrentPromoSpot)
            },
            getCurrentPromoSpot: function() {
                return elementCurrentPromoSpot
            },
            getCurrentLargeSpot: function() {
                return elementCurrentLargeSpot
            },
            getNextPromoSpot: function() {
                return elementNextPromoSpot
            },
            getNextLargeSpot: function() {
                return elementNextLargeSpot
            },
            getPromoSpots: function() {
                return isPromoSpotPresent ? promoSpots : []
            },
            getLargeSpots: function() {
                return largeSpots
            },
            getDimensionsData: function() {
                return dimensions
            },
            isRotatorNeeded: function() {
                return isRotatorNeeded
            },
            onWindowResize: /*debounce(*/determineSpotsDimensions/*, 200)*/
        }
}()

export default spotState