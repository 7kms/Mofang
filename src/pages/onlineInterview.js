import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import JobList from '../components/onlineJobList.js';
import Util from '../utils';
class Header extends Component{
  constructor(props){
    super(props);
  }
  static propTypes = {
    title: React.PropTypes.string.isRequired
  };
  render(){
    return(
      <View style={headerStyle.header}>
        <Text style={headerStyle.title}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}
class JobPage extends Component{
  constructor(props) {
    super(props);
    console.log(props);
  }
  _refresh(){
    this.props.refresh();
  }
  _pullUp(){
    console.log("pullUp");
    this._getJobData();
  }
  _getParameters(){
    let params = this.props.conditionStore;
    let search = "";
    Object.keys(params).forEach(key => {
      if(key === 'jobType'){
        params[key].forEach(obj=>{
          search += 'jobTypes='+obj.code;
        });
      }else{
        search += key + '=' + encodeURIComponent(params[key]);
      }
      search += '&';
    });
    if(search.length > 1){
      search = search.slice(0,-1);
    }
    return search;
  }
  _getJobData(){
    this.props.getJobList(this._getParameters());
  }
  _goJobDeatail(job){
    console.log(job);
  }
  componentWillMount(){
    //this._getJobData();
  }
  render(){
    let content;
    if(JobPage.loading){
      content = (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <View style={{height:100}}>
            <ActivityIndicator
              color={Util.themeColor}
              size="large"
              />
            <Text style={{color:Util.themeColor,fontSize:14,marginTop:15}}>
              正在拉取数据
            </Text>
          </View>
        </View>
      );
    }else{
      content = (
        <JobList
           dataList={this.props.jobArr}
           onPress={this._goJobDeatail.bind(this)}
           pullUp={this._pullUp.bind(this)}
           onRefresh={this._refresh.bind(this)}
           indicator = {this.props.indicator}
           />
      );
    }
    return content;
  }
}
class OnlineInterview extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#eee'}}>
        <Header title={this.props.title}/>
        <JobPage {...this.props}/>
      </View>
    );
  }
}
const headerStyle = StyleSheet.create({
  header:{
    height:64,
    backgroundColor:Util.themeColor,
    justifyContent:'flex-end',
    alignItems:'center'
  },
  title:{
    marginBottom:11,
    color:'#fff',
    fontSize:20
  }
});
export default OnlineInterview;
