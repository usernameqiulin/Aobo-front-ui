import React,{PureComponent} from 'react';
import './produce.css';

class Produce extends PureComponent{   //我们的产品
    render(){
        const {img, text} = this.props;
        return (
            <div className="produce-component wow fadeIn animated" data-wow-duration="2s">
                <img src={img} alt=""/>
                <h2>{text}</h2>
            </div>
        )
    }
}

export default Produce;