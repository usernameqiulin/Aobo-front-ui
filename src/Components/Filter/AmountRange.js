import React from 'react'
import PropTypes from 'prop-types'
import FieldFrame from "./Frame"

class AmountRange extends React.Component {

    onMinChange = (e) => {
        const slug = 'min_' + this.props.slug
        let obj = {}
        obj[slug] = e.target.value
        this.props.onInputChange(obj)
    }

    onMaxChange = (e) => {
        const slug = 'max_' + this.props.slug
        let obj = {}
        obj[slug] = e.target.value
        this.props.onInputChange(obj)
    }

    isApplied = () => {
        return this.props.value.min !== '' || this.props.value.max !== ''
    }

    apply = (e) => {
        this.props.onChange(this.props.slug)
    }

    reset = () => {
        this.props.onReset(this.props.slug)
    }

    render() {
        const {t} = this.props
        return (
            <FieldFrame
                title={this.props.title}
                extraClasses={'amount-range'}
                clear={this.reset}
                applied={this.isApplied()}
            >
                <div className={`_dropdown__item filter__item`} onClick={e => e.stopPropagation()}>
                    <input
                        type={'number'}
                        className={`_search__input`}
                        value={this.props.value.min}
                        onChange={this.onMinChange}
                        placeholder={t('min')}
                    />
                    {' - '}
                    <input
                        type={'number'}
                        className={`_search__input`}
                        value={this.props.value.max}
                        onChange={this.onMaxChange}
                        placeholder={t('max')}
                    />
                    <a className={`module-btn`} onClick={this.apply}>
                        {t('OK')}
                    </a>
                </div>
            </FieldFrame>
        )
    }
}

AmountRange.propTypes = {
    onReset: PropTypes.func,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func,
    onInputChange: PropTypes.func,
}

export default AmountRange