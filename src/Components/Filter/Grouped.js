import React from 'react'
import PropTypes from 'prop-types'
import Base from './Base'
import Group from "./Group"

class Grouped extends React.Component {

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
            <Base {...this.props} selected={this.props.selected} clear={this._onClear}>
                {
                    this.props.filter.is_grouped &&
                    <div>
                        {Object.keys(this.props.filter.groups).map(v => {
                            return (
                                <Group
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
            </Base>
        )
    }
}

Grouped.propTypes = {
    filter: PropTypes.object.isRequired,
    filterChange: PropTypes.func.isRequired,
    selected: PropTypes.array.isRequired,
}

export default Grouped