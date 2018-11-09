import React from 'react'

const BrandIcon = (props) => (
    <svg className={`icon-svg`}>
        <use xlinkHref={`${'#icon-' + props.code.toLowerCase()}`}/>
    </svg>
)

export default BrandIcon