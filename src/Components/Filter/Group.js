import React from 'react'
import PropTypes from 'prop-types'
import Choice from "../Filters/Choice"
import R from 'ramda'

class Group extends React.Component {

    _selectedChoicesCount = () => {
        const slugs = R.pluck('slug')(this.props.group)
        return R.intersection(this.props.selected, slugs).length
    }

    anySelected = () => {
        return this._selectedChoicesCount() > 0
    }

    allSelected = () => {
        return this._selectedChoicesCount() === this.props.group.length
    }

    _toggleGroup = (e) => {
        e.stopPropagation()
        let {selected} = this.props
        if (this.allSelected() || this.anySelected()) {
            selected = []
        } else {
            this.props.group.map(c => {
                selected.push(c.slug)
            })
        }
        this.props.toggle(this.props.title, selected)
    }

    _clear = () => {

    }

    render() {
        return (
            <div>
                <div
                    className={`_dropdown__item filter__item${this.anySelected() ? ' is-selected--mixed' : ''}${this.allSelected() ? ' is-selected' : ''}`}
                    onClick={this._toggleGroup}
                >
                    <i className="filter-checkbox"/>
                    {this.props.title}
                </div>
                {this.props.group.map((c, i) => {
                    return (
                        <Choice
                            key={i}
                            choice={c}
                            type="checkbox"
                            onChoice={this.props.onChoice}
                            selected={this.props.selected.indexOf(c.slug) !== -1}
                            isSub={true}
                        />
                    )
                })}
            </div>
        )
    }
}

Group.propTypes = {
    title: PropTypes.string,
    group: PropTypes.array,
    onChoice: PropTypes.func,
    selected: PropTypes.array.isRequired,
}

export default Group