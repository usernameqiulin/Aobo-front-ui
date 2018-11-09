import React from 'react'
import PropTypes from 'prop-types'
import moment from "moment"
import 'moment/locale/zh-cn'
import 'moment/locale/en-gb'
import 'moment/locale/zh-tw'

import RangeCalendar from '../TimeRange/RangeCalendar'
import TimePickerPanel from '../TimeRange/Time/Panel'
import i18n from '../../i18n'

import '../../Styles/rc-calendar.css'
import '../../Styles/rc-time.css'

const timePickerElement = (
    <TimePickerPanel
        defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
    />
)

class TimeRange extends React.Component {

    formatStr = this.props.withTime ? process.env.REACT_APP_TIME_FORMAT : process.env.REACT_APP_DATE_FORMAT

    format = (v) => {
        return v ? v.format(this.formatStr) : ''
    }

    disabledDate = (current) => {
        if (!current) return false
        return !current.isBetween(this.props.available[0], this.props.available[1])
    }

    constructor(props) {
        super(props)
        this.state = {
            isExpanded: false,
            start_time: props.value[0],
            end_time: props.value[1],
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                start_time: nextProps.value[0],
                end_time: nextProps.value[1],
            })
        }
    }

    _toggleDropdown = (e) => {
        e.stopPropagation()
        this.setState({
            isExpanded:!this.state.isExpanded,
        })
    }

    onChange = (value) => {
        this.setState({
            start_time: value[0] && this.format(value[0]),
            end_time: value[1] && this.format(value[1]),
        })
    }

    onOk = (e) => {
        let a = [,], obj = {}
        obj.slug = 'time'
        a[0] = this.state['start_time']
        a[1] = this.state['end_time']
        obj.selected = a
        this.props.onChange(obj)
        this.onLeave()
    }

    onLeave = (e) => {
        setTimeout(function() {
            this.setState({isExpanded: !1});
        }.bind(this), 200)
    }

    reset = () => this.setState({
        start_time: this.props.value[0],
        end_time: this.props.value[1],
    })

    render() {
        const {t, extraClass} = this.props, locale = {
            today: t('Today'),
            now: t('Now'),
            backToToday: t('Back to today'),
            ok: t('OK'),
            clear: t('Clear'),
            month: t('Month'),
            year: t('Year'),
            timeSelect: t('Select time'),
            dateSelect: t('Select date'),
            monthSelect: t('Choose a month'),
            yearSelect: t('Choose a year'),
            decadeSelect: t('Choose a decade'),
            yearFormat: 'YYYY',
            dateFormat: 'M/D/YYYY',
            dayFormat: 'D',
            dateTimeFormat: 'M/D/YYYY HH:mm:ss',
            monthBeforeYear: true,
            previousMonth: t('Previous month'),
            nextMonth: t('Next month'),
            previousYear: t('Last year'),
            nextYear: t('Next year'),
            previousDecade: t('Last decade'),
            nextDecade: t('Next decade'),
            previousCentury: t('Last century'),
            nextCentury: t('Next century'),
        }
        return (
            <div className={`filters__section filters__section--time-range${extraClass?' '+extraClass:''}`}>
                <div
                    className={`filtr _dropdown${this.state.isExpanded ? ' is-expanded' : ' is-contracted'}`}
                    onClick={this._toggleDropdown}
                    onMouseLeave={this.onLeave}
                >
                    <div className={`filtr filter--search _search${this.props.isLoading ? ' is-spinning' : ''}`}>
                        <input type="search" className="_search__input" readOnly={true} value={this.state.start_time + ' - ' + this.state.end_time}/>
                        <i className="ic icon-clock _search__icon"/>
                        <i className="_search__spinner"/>
                    </div>
                    <i className="ic ic--small icon-dropdown-down filter__icon"/>
                    <i className={`ic icon-close2 js-not-toggle no-hl filter__icon`} onClick={this._clearFilter}/>
                    <i className="_dropdown__pointer-up _dropdown__pointer--light filter__pointer"/>
                    <div className="filter__items _dropdown__items">
                        <div className={`_dropdown__item filter__item`} onClick={e => e.stopPropagation()}>
                            <RangeCalendar
                                showToday={true}
                                showOk={true}
                                format={this.formatStr}
                                timePicker={this.props.withTime ? timePickerElement : false}
                                onSelect={this.onChange}
                                onOk={this.onOk}
                                showDateInput={false}
                                showClear={false}
                                selectedValue={[moment(this.state.start_time).locale(i18n.language.toLowerCase()), moment(this.state.end_time).locale(i18n.language.toLowerCase())]}
                                disabledDate={this.disabledDate}
                                locale={locale}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TimeRange.propTypes = {
    defaultValue: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
    available: PropTypes.arrayOf(PropTypes.instanceOf(moment)),
    withTime: PropTypes.bool,
    isLoading: PropTypes.bool,
    onChange: PropTypes.func,
    t: PropTypes.func.isRequired,
    extraClass: PropTypes.string,
}

export default TimeRange