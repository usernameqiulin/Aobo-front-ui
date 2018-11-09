import React from 'react';
import PropTypes from 'prop-types';
import GroupFilter from "./GroupFilter";

class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: [],
        };
    }

    _clearFilter = () => {
        this.setState({
            selected: [],
        });
    };

    _isSelected = () => {
        return this.state.selected.length > 0;
    };

    _toggleGroup = (e, group) => {
        e.stopPropagation();
        console.log('toggleGroup(filter, group)');
    };


    render() {
        return (
            <div className={`filter _dropdown is-contracted filter--${this.props.filter.slug} ${this._isSelected() ? 'is-selected' : ''}`}>
                {this.props.filter.title}
                <i className={`ic ic--small icon-dropdown-down ${!this._isSelected() ? '' : 'ng-hide'}`}/>
                <i className={`ic ic--small icon-dropdown-down js-not-toggle no-hl ${this._isSelected() ? '' : 'ng-hide'}`}
                   onClick={this._clearFilter}/>
                <i className="_dropdown__pointer-up _dropdown__pointer--light filter__pointer"/>
                <div className="filter__items _dropdown__items">
                    {this.props.filter.is_grouped &&
                    <GroupFilter filter={this.props.filter}/>}
                    {this.props.filter.is_multichoice &&
                    <div>
                        <div ng-repeat="choices in filter.pages track by $index"
                             ng-className="{ 'filter-page' : $index > 0 }"
                             ng-show="$index == filter.currentPage - 1">
                            <div ng-repeat="choice in choices" className="_dropdown__item filter__item"
                                 ng-className="{'is-selected': choice.isSelected}"
                                 ng-click="$event.stopPropagation();toggleChoice(filter, choice)">
                                <i className="filter-checkbox"/>
                                <span ng-bind-html="::choice.title"/>
                            </div>
                        </div>
                    </div>}
                    {!this.props.filter.is_multichoice &&
                    <div>
                        <div ng-repeat="choices in filter.pages track by $index"
                             ng-className="{ 'filter-page' : $index > 0 }"
                             ng-show="$index == filter.currentPage - 1">
                            <div ng-repeat="choice in choices" className="_dropdown__item filter__item"
                                 ng-className="{'is-selected': choice.isSelected}"
                                 ng-click="toggleChoice(filter, choice)">
                                <i className="filter-radio"/>
                                <span ng-bind-html="::choice.title"></span>
                            </div>
                        </div>
                    </div>}
                    <div className="pagin filter__items-pagination _fake_dropdown__item no-hl no-ho"
                         ng-click="$event.stopPropagation()"
                         ng-show="filter.totalPages > 1">
                        <span className="pagin__prev"
                              ng-click="filter.prevPage()"
                              ng-className="{ 'pagin__part--inactive' : filter.currentPage <= 1 }">
                            <i className="ic icon-arrow-left2"/>
                        </span>
                        <div className="pagin__current">
                            <input type="" className="pagin__input" ng-model="filter.chosenPage" ng-change="filter.changePage()"/>
                        </div>
                        of
                        <span className="pagin__total" ng-bind="::filter.totalPages"></span>
                        <span className="pagin__next" ng-click="filter.nextPage()"
                              ng-className="{ 'pagin__part--inactive' : filter.currentPage >= filter.totalPages }">
                            <i className="ic icon-arrow-right2"/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

Filter.PropTypes = {
    filter: PropTypes.object,
};

export default Filter;