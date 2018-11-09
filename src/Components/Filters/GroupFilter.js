import React from 'react'
import PropTypes from 'prop-types'
import BaseFilter from './BaseFilter'
import ChoiceGroup from "./ChoiceGroup"

class GroupFilter extends React.Component {

    constructor(props) {
        super(props)
        this.groups = {}
    }

    _onChoice = (choice) => {
        let {selected} = this.props, i = selected.indexOf(choice)
        if (i !== -1) {
            selected.splice(i, 1)
        } else {
            selected.push(choice)
        }
        this.props.filterChange({slug: this.props.filter.slug, selected: selected})
    }

    _toggleGroup = (title, selected) => {
        this.props.filterChange({slug: this.props.filter.slug, selected: selected})
    }

    _onClear = (needFilterChange) => {
        Object.keys(this.groups).map(v => {
            this.groups[v]._clear()
        })
        needFilterChange && this.props.filterChange({slug: this.props.filter.slug, selected: []})
    }

    render() {
        return (
            <BaseFilter {...this.props} selected={this.props.selected} clear={this._onClear}>
                {
                    this.props.filter.is_grouped &&
                    <div>
                        {Object.keys(this.props.filter.groups).map(v => {
                            return (
                                <ChoiceGroup
                                    ref={ref => (this.groups[v] = ref)}
                                    key={v}
                                    onChoice={this._onChoice}
                                    title={v}
                                    group={this.props.filter.groups[v]}
                                    toggle={this._toggleGroup}
                                    selected={this.props.selected}
                                />
                            )
                        })}
                    </div>
                }
            </BaseFilter>
        )
    }
}

GroupFilter.propTypes = {
    filter: PropTypes.object.isRequired,
    filterChange: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
}

export default GroupFilter