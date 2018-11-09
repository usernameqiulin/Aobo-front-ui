import React from 'react'
const PaymentIcon = ({method}) => {
    if (method.startsWith('CNY') && method.endsWith('CC')) {
        return <i className={`img-card img-card--union_pay`}/>
    }
    if (method.startsWith('CNY') && method.endsWith('QT')) {
        return <i className={`img-card img-card--union_pay`}/>
    }
    if (!method.startsWith('CNY') && method.endsWith('CC')) {
        return (
            <React.Fragment>
                <i className="img-card img-card--visa"/>
                <i className="img-card img-card--mastercard"/>
                <i className="img-card img-card--amex"/>
                <i className="img-card img-card--jcb"/>
            </React.Fragment>
        )
    }
    if (method.endsWith('WX')) {
        return <i className={`img-card img-card--we_chat`}/>
    }
    if (method.endsWith('ALI')) {
        return <i className={`img-card img-card--alipay`}/>
    }
    return <i className={`img-card img-card--${method.toLowerCase()}`}/>
}

export default PaymentIcon
