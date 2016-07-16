import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text
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
  }
  static propTypes = {
    refresh: React.PropTypes.func.isRequired,
    getJobList: React.PropTypes.func.isRequired,
    jobArr: React.PropTypes.array.isRequired,
    conditionStore:  React.PropTypes.object.isRequired,
    indicator:  React.PropTypes.object.isRequired,
    canLoadMore: React.PropTypes.bool.isRequired
  };
  _refresh(){
    this.props.refresh({isRefreshing:true,freshText:'正在加載'});
  }
  _pullUp(){
    this._getJobData();
  }
  _getJobData(){
    this.props.getJobList();
  }
  _goJobDeatail(job){
    console.log(job);
  }
  componentWillMount(){
    this._getJobData();
  }
  render(){
    return (
      <JobList
        dataList={this.props.jobArr}
        onPress={this._goJobDeatail.bind(this)}
        pullUp={this._pullUp.bind(this)}
        onRefresh={this._refresh.bind(this)}
        indicator = {this.props.indicator}
        canLoadMore = {this.props.canLoadMore}
        />
    );
  }
}
class OnlineInterview extends Component{
  constructor(props) {
    super(props);
  }
  static propTypes = {
    title: React.PropTypes.string.isRequired
  };
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
