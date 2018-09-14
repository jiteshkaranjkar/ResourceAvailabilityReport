import React from 'react';
import { connect } from 'react-redux';
import { fetchReport } from './Context/actions/reportActions'; 
import MiniDrawer from './Layout/SideBarMenu.jsx';
import './Dashboard.css'

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});


class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.props.fetchReport();
    this.state = { chartData:[], fieldColumn: ""};
    this.breakUpReportDataIntoColumnDataChildCallback = this.breakUpReportDataIntoColumnDataChildCallback.bind(this);
  }

  render() {
    // const { classes } = this.props;
    // debugger;
    if(this.props.report !== null && this.props.report !== undefined)
    {
      if(this.props.report.length === 0)
        return null
      else{
        let chartData = this.breakUpReportDataIntoColumnDataChildCallback("");
        return(
          <div>
              <MiniDrawer chartData={chartData}  containerStyle={{height: 'calc(100% - 64px)', top: 64}} getChartDataParentCallback={this.breakUpReportDataIntoColumnDataChildCallback}/>
          </div>
          );
      }
    }
    else
    return null;
  }

  handleColumn(event){
    event.preventDefault();
    return null;
  }
  
  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  uniqArray(arr){
    let newArray = []; 
    arr.forEach(item => 
      { 
        if(newArray.indexOf(item) === -1) 
        {
          newArray.push(item);
        } 
      });
      return newArray;
  } 
  
  handleSelect(event){
    event.preventDefault();
    return null;
  }
  
  getKeyValuePair(rptData, prop)
  {
      let keyValue = [];
      for(let i =0 ; i <= rptData.length; i++){
          if(rptData[i] !== undefined){
              var num = rptData[i][prop]
              keyValue[num] = keyValue[num] ? keyValue[num] + 1 :1; 
          }
      }
      return keyValue;
  }  
 
  getColumnsDyna(firstRow){
    let col = [];
    for(let key in firstRow){ 
        if(col.indexOf(key) === -1){
            col.push(key)
        } 
    }
    return col;
  }


  getColors(){
    var colors = ['#36A2EB', '#FF6384', '#FFCE56','Red','Green','Yellow','Orange','Pink','Purple','Violet','Blue'];
    return colors.swap(Math.random(),Math.random());
  } 

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  };

  getChartData(fieldName, field, fieldKeyValuePair){
    let officeKeys = [];
    let officeCounts = [];
    officeCounts.push(Object.values(fieldKeyValuePair));
    officeKeys.push(Object.keys(fieldKeyValuePair));
    let officeChart= {
        labels: officeKeys[0],
        datasets: [{
        label: fieldName,
        backgroundColor: this.getColors(),
        borderColor: this.getColors(),
        hoverBackgroundColor: this.getColors(),
        hoverBorderColor: this.getColors(),
        width:400,
        height:200,
        data: officeCounts[0],
        }]
      }
      return officeChart;
  }

  breakUpReportDataIntoColumnDataChildCallback(eventName, fieldName){
    //var employees = this.props.report.map((x) => x["Employee Name"]);  
    if(this === undefined || this.props === undefined)
      return;
      
    var field = []; 
    var fieldKeyValuePair = []; 
    var chartData = [];    
    switch(fieldName){
      case "Office":
        field = this.removeDuplicates(this.props.report, "Office").map(x => x["Office"]);
        fieldKeyValuePair = this.getKeyValuePair(this.props.report, "Office");
        chartData = this.getChartData("Office",field, fieldKeyValuePair);
        break;
      case "Employee Type":
        field = this.removeDuplicates(this.props.report, "Employee Type").map(x => x["Employee Type"]);
        fieldKeyValuePair = this.getKeyValuePair(this.props.report, "Employee Type");
        chartData = this.getChartData("Employee Type", field, fieldKeyValuePair);
      break;
      case "Service Area":
        field = this.removeDuplicates(this.props.report, "Service Area").map(x => x["Service Area"]);
        fieldKeyValuePair = this.getKeyValuePair(this.props.report, "Service Area");
        chartData = this.getChartData("Service Area", field, fieldKeyValuePair);
      break;
      case "Level":
        field = this.removeDuplicates(this.props.report, "Level").map(x => x["Level"]);
        fieldKeyValuePair = this.getKeyValuePair(this.props.report, "Level");
        chartData = this.getChartData("Level", field, fieldKeyValuePair);
      break;
      case "Business Unit":
        field = this.removeDuplicates(this.props.report, "Business Unit").map(x => x["Business Unit"]);
        fieldKeyValuePair = this.getKeyValuePair(this.props.report, "Business Unit");
        chartData = this.getChartData("Business Unit", field, fieldKeyValuePair);
      break;    
      default://Office
        field = this.removeDuplicates(this.props.report, "Office").map(x => x["Office"]);
        fieldKeyValuePair = this.getKeyValuePair(this.props.report, "Office");
        chartData = this.getChartData("Office", field, fieldKeyValuePair);
      break;    
    }
    return chartData;
  }
}

const mapStateToProps = state => ({
  report: state.report.items,
})

export default connect(mapStateToProps, { fetchReport })(Dashboard); 

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}