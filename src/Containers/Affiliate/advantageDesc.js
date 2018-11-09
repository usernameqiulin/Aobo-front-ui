import React,{PureComponent} from 'react';
import './advantageDesc.css';

class AdvantageDesc extends PureComponent{
    render(){
        const {className, title, p, color, to} = this.props;
        return (
            <div data-wow-delay={this.props['data-wow-delay']} data-wow-duration={this.props['data-wow-duration']} className={`advantageDesc-component ${className}`} style={{border: `2px solid ${color}`, float: to}}>
                <div className="triangle-container" style={to === 'right' ? {right: '-16px'} : {left: '-16px'}}>
                    <Triangle size={16} outerColor={color} innerColor='#ccc' to={to}></Triangle>
                </div>
                <h2 style={to === 'right' ? {textAlign: 'right'} : {textAlign: 'left'}}>{title}</h2>
                {
                    p.map((item, index)=>{
                        return <p style={to === 'right' ? {textAlign: 'right'} : {textAlign: 'left'}} key={index}>{item}</p>
                    })
                }
            </div>
        )
    }
}

class Triangle extends PureComponent{   //三角形
    setOuterStyle(size, outerColor, innerColor, to){
        return {
            position: 'relative',
            display: 'block',
            width: 0,
            height: 0,
            borderTop: to === 'bottom' ? `${size}px solid ${outerColor}` : to === 'top' ? '' :`${size/2}px solid transparent`,
            borderLeft: to === 'right' ? `${size}px solid ${outerColor}` : to === 'left' ? '' :`${size/2}px solid transparent`,
            borderBottom: to === 'top' ? `${size}px solid ${outerColor}` : to === 'bottom' ? '' :`${size/2}px solid transparent`,
            borderRight: to === 'left' ? `${size}px solid ${outerColor}` : to === 'right' ? '' :`${size/2}px solid transparent`,
        }
    }
    setInnerStyle(size, outerColor, innerColor, to){
        return {
            position: 'absolute',
            display: 'block',
            right: to === 'right' ? '4px' : '',
            bottom: to === 'bottom' ? '4px' : (to === 'right' || to === 'left') ? `-${size/2 - 2}px` : '',
            left: to === 'left' ? '4px' : (to === 'top' || to === 'bottom') ? `-${size/2 - 2}px` : '',
            top: (to === 'top') ? '4px' : '', 
            width: 0,
            height: 0,
            borderTop: to === 'bottom' ? `${size-4}px solid ${innerColor}` : to === 'top' ? '' : `${size/2 - 2}px solid transparent`,
            borderLeft: to === 'right' ? `${size-4}px solid ${innerColor}` : to === 'left' ? '' : `${size/2 - 2}px solid transparent`,
            borderBottom: to === 'top' ? `${size-4}px solid ${innerColor}` : to === 'bottom' ? '' : `${size/2 - 2}px solid transparent`,
            borderRight: to === 'left' ? `${size-4}px solid ${innerColor}` : to === 'right' ? '' : `${size/2 - 2}px solid transparent`
        }
    }
    render(){
        const {size, outerColor, innerColor, to} = this.props;
        return (
            <span style={this.setOuterStyle(size, outerColor, innerColor, to)} className="triangle-component">
                <span style={this.setInnerStyle(size, outerColor, innerColor, to)}></span>
            </span>
        )
    }
}

export default AdvantageDesc;