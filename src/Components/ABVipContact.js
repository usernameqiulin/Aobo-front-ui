import React from 'react'
import PropTypes from 'prop-types'

class ABVipContact extends React.Component {

    render() {
        const {t} = this.props
        return (
            <div className={`container center`}>
                <div className={`vip-contact`}>
                    <ul className={`vip-contact__list`}>
                        <li className={`vip-contact__item`}><a href={`skype:xileaff?chat`}><svg className={`icon-svg`}><use xlinkHref={`#icon-skype`}/></svg>xilevipcs</a></li>
                        <li className={`vip-contact__item`}><a href="https://wpa.qq.com/msgrd?v=3&uin=86263589&site=Xile&menu=yes"><svg className={`icon-svg`}><use xlinkHref={`#icon-qq`}/></svg>86263589</a></li>
                        <li className={`vip-contact__item`}><a href="###"><svg className="icon-svg"><use xlinkHref="#icon-chat"/></svg>{t('Online customer service')}</a></li>
                        <li className={`vip-contact__item`}><a href="mailto:vip@aooobo.com"><svg className="icon-svg"><use xlinkHref="#icon-email"/></svg>vip@aooobo.com</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

ABVipContact.propTypes = {
    t: PropTypes.func.isRequired,
}

export default ABVipContact