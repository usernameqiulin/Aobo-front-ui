import React from 'react'
import PropTypes from 'prop-types'
import i18n from '../../i18n'

class LangDropdown extends React.Component {

    _switchLang = lang => {
        i18n.changeLanguage(lang.code/*, () => console.log(i18n.language)*/);
    }

    _getCurrentLanguage = () => {
        const l = i18n.language
        
        return l.startsWith('en') ? 'en-GB' : l
    }

    render() {
        return (
            <div className={`_dropdown footer__dropdown ${this.props.expanded ? 'is-expanded' : 'is-contracted'}`} onMouseLeave={this.props.hider}>
                <div className="_dropdown__toggle" onClick={this.props.toggler}>
                    <span>{!!this.props.options && this.props.options.length ? this.props.options.find(l => {
                        return l.code === this._getCurrentLanguage()
                    })['name'] : '...'}</span>
                    <span className="_dropdown__pointer-wrapper">
                        <i className="ic icon-dropdown-down footer-dropdown-down"/>
                        <i className="_dropdown__pointer-up"/>
                    </span>
                </div>
                <div className="_dropdown__items footer__dropdown-items" onMouseEnter={this.props.over}>
                    {!!this.props.options && this.props.options.length && this.props.options.map(o => {
                        return <div key={o.code} className="_dropdown__item footer__dropdown-item" onClick={e => this._switchLang(o)}>{o.name}</div>
                    })}
                </div>
            </div>
        )
    }
}

LangDropdown.propTypes = {
    toggler: PropTypes.func,
    hider: PropTypes.func,
    expanded: PropTypes.bool,
    over: PropTypes.func,
    // current: PropTypes.object,
    options: PropTypes.array,
};

export default LangDropdown