import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import JobList from './jobList.js';
import Util from '../util.js';
class Header extends Component{
  constructor(props){
    super(props);
  }
  static propTypes = {
    title:React.PropTypes.string.isRequired
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
    this.state = {
      jobArr:[],
      loading:true
    };
  }
  static renderFlag = true;
  static isBusy = false;
  static conditionStore = {
    start:0,
    count:15,
    source:'wechat',
    province: "北京",
    district: "",
    jobType : [{name:"",code:""}],
    salaryRange : "",
    workingYear : "",
    searchText: ""
  };
  _changeCondion(item,value){
    JobPage.conditionStore[item] = value;
  }
  _refresh(){
    if(!JobPage.isBusy){
      JobPage.conditionStore.start = 0;
      JobPage.isBusy = true;
      // this.setState({
      //   jobArr:[]
      // });
      this._getJobData("fresh");
    }
  }
  _pullUp(){
    console.log('pull up');
    if(JobPage.renderFlag){
      let storeObj = JobPage.conditionStore;
      let start = storeObj.start + storeObj.count;
      JobPage.renderFlag = false;
      storeObj.start = start;
      this._getJobData();
    }
  }
  _getParameters(){
    let url = new URL("http://mofanghr.com/m/jobs/search");
    let params = this.conditionStore;
    Object.keys(params).forEach(key => {
      if(key === 'jobType'){
        url.searchParams.append('jobTypes', params[key][0].code);
      }else{
        url.searchParams.append(key, params[key]);
      }
    });
    return url;
  }
  _getParameters2(){
    let url = "http://mofanghr.com/m/jobs/search";
    let params = JobPage.conditionStore;
    let search = "?";
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
      url += search;
    }
    console.log(url);
    return url;
  }
  _getJobData(isRefresh){
    //let url = this._getParameters();
    let url = this._getParameters2();
    fetch(url,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(res=>{
      return res.json();
    })
    .then(dataArr => {
      let oldArr = isRefresh ? [] : this.state.jobArr;
      let newArr = [...oldArr,...dataArr];
      let flag = dataArr.length == JobPage.conditionStore.count ? true : false;
      JobPage.renderFlag = flag;
      JobPage.isBusy = false;
      this.setState({
        jobArr: newArr,
        loading: false
      });
    })
    .catch(error => {
      JobPage.renderFlag = true;
      JobPage.isBusy = false;
    });
  }
  _goJobDeatail(job){
    console.log(job);
    // this.props.navigator.push({
    //   title: `${job.name}`,
    //   component: JobDetail,
    //   passProps: { movie:movie }
    // });
  }
  componentWillMount(){
    this._getJobData();
  }
  render(){
    let content;
    if(this.state.loading){
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
           dataList={this.state.jobArr}
           onPress={this._goJobDeatail.bind(this)}
           pullUp={this._pullUp.bind(this)}
           onRefresh={this._refresh.bind(this)}
           />
      );
    }
    return content;
  }
}
class OnlineComponent extends Component{
  constructor(props) {
    super(props);
  }
  static Props = {
    navigator: React.PropTypes.object
  };
  render(){
    return(
    <View style={{flex:1,backgroundColor:'#eee'}}>
      <Header title={this.props.title}/>
      <JobPage navigator={this.props.navigator}/>
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
export default OnlineComponent;
