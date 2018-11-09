import React from 'react'
//color: '', light
//size: big, small
const ABSpinner = ({hidden, color, size}) => (
    <div className={`account__list-spinner list__spinner${hidden ? ' is-hidden' : ''}`}>
        <div className={`loading-wrapper`}>
            <div className={`is-spinning spinner spinner--${size}${color ? ' spinner--' + size + '-' + color : ' spinner--' + size}`}/>
        </div>
    </div>
)

export default ABSpinner
