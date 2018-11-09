import React from 'react'
import PropTypes from 'prop-types'

const isSelectedClass = "is-selected", isOptionChosenClass = "set--chosen"

class OptionSet extends React.Component {
    selectedOption = []

    deactivateOption = (optionLabel) => {
        return optionLabel.removeClass(isSelectedClass), this.selectedOption = [], $scope.$emit("sectionResize")
    }
    activateOption = (optionLabel) => {
        return optionLabel.addClass(isSelectedClass), this.selectedOption = optionLabel, $scope.$emit("sectionResize")
    }
    activateSet = () => {
        return $element.addClass(isOptionChosenClass)
    }
    deactivateSet = () => {
        return $element.removeClass(isOptionChosenClass)
    }
    selectOption = (optionLabel) => {
        if (optionLabel[0] !== this.selectedOption[0]) {
            return this.selectedOption[0] && this.deactivateOption(this.selectedOption), this.activateOption(optionLabel), this.activateSet()
        }
    }
    deselectOption = (optionLabel) => {
        if (optionLabel[0] === this.selectedOption[0]) {
            return this.deactivateOption(optionLabel), this.deactivateSet()
        }
    }
}