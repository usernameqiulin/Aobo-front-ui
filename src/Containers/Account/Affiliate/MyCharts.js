import React,{Component} from 'react';
import ReactHighcharts from 'react-highcharts';
import i18n from "../../../i18n"

class MyCharts extends Component{
    constructor(props){
        super(props);
        this.firstShould = false
    }
    componentDidMount(){
        i18n.on('languageChanged', this.languageChanged);
    }
    componentWillUnmount(){
        i18n.off('languageChanged', this.languageChanged);
    }
    languageChanged = () => {
        this.firstShould = true
    }
    shouldComponentUpdate(nextProps){
        if(this.firstShould){
            this.firstShould = false;
            return true
        }
        return this.props.traversal(this.props.oData, nextProps.oData);
    }  
    setConfig = () => {
        const {oData} = this.props;
        return this.props.setConfig(oData);
    }
    render(){
        const {oData} = this.props;
        return <ReactHighcharts config={this.setConfig()}></ReactHighcharts>
    }
}
// traversal, setConfig

export default MyCharts;