import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  ListView,
  TouchableHighlight,
  RefreshControl,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import Util from '../utils';
export default class JobList extends Component {
  constructor(props) {
    super(props);
    console.log('joblist is rendering');
  }
  static count = 1;
  static propTypes = {
    dataList: React.PropTypes.array.isRequired,
    onPress: React.PropTypes.func.isRequired,
    onRefresh: React.PropTypes.func.isRequired,
    pullUp: React.PropTypes.func.isRequired,
    indicator: React.PropTypes.object.isRequired,
  };
  componentWillMount(){
    console.log("componentWillMount");
  }
  componentDidMount(){
    console.log("componentDidMount");
  }
  componentWillReceiveProps(nextProps){
    console.log("componentWillReceiveProps",nextProps);
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log("shouldComponentUpdate",nextProps,nextState);
    return true;
  }
  componentWillUpdate(nextProps, nextState){
    console.log("componentWillUpdate");
  }
  componentDidUpdate(prevProps, prevState){

    console.log("componentDidUpdate",prevProps,prevState);
  }
  componentWillUnmount(){
    console.log("componentWillUnmount");
  }
  _renderRow(job) {
    return (
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor="#fefef4"
        onPress={ ()=> this.props.onPress(job) }>
        <View style={jobStyles.jobItem}>
          <View style={[jobStyles.itemInfo,jobStyles.jobMain]}>
            <View style={jobStyles.jobName}>
              <Text style={[jobStyles.jobNameText]} numberOfLines={1}>
                {job.jobName}
              </Text>
              <Icon name='logo-octocat' style={[jobStyles.icon,jobStyles.IconCommnicate]}></Icon>
            </View>
            <View style={jobStyles.jobSalary}>
                <Text style={jobStyles.jobSalaryText}>
                  {'¥' + job.minSalary + '-' + job.maxSalary}
                </Text>
            </View>
          </View>
          <View style={[jobStyles.itemInfo,jobStyles.jobCompany]}>
            <Text style={[jobStyles.companyText,{flex:1}]} numberOfLines={1}>
              {job.companyBriefName}
            </Text>
          </View>
          <View style={[jobStyles.itemInfo,jobStyles.jobLabel]}>
            <View style={jobStyles.label}>
              <Icon name='ios-pin-outline' style={[jobStyles.icon,jobStyles.IconLabel]}></Icon>
              <Text style={jobStyles.labelText} numberOfLines={1}>{job.province + '-' + job.district}</Text>
            </View>
            <View style={jobStyles.label}>
              <Icon name='ios-briefcase-outline' style={[jobStyles.icon,jobStyles.IconLabel]}></Icon>
              <Text style={jobStyles.labelText} numberOfLines={1}>{job.workingYear==='不限'? '经验不限':job.workingYear}</Text>
            </View>
            <View style={jobStyles.label}>
              <Icon name='ios-school-outline' style={[jobStyles.icon,jobStyles.IconLabel]}></Icon>
              <Text style={jobStyles.labelText} numberOfLines={1}>{job.degree==='不限'? '学历不限':job.degree}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _onRefresh(){
    this.props.onRefresh({isRefreshing:true,freshText:'正在加载'});
  }
  render(){
    let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    let theDataSource = ds.cloneWithRows(this.props.dataList);
    console.log("render listview");
    return(
      <View style={{flex:1}}>
        <ListView
            style={{flex:1,backgroundColor:'#eee',paddingHorizontal:0}}
            scrollRenderAheadDistance={100}
            onEndReachedThreshold={100}
            showsVerticalScrollIndicator={false}
            enableEmptySections = {true}
            dataSource={theDataSource}
            renderRow={this._renderRow.bind(this)}
            onEndReached={this.props.pullUp.bind(this)}
            automaticallyAdjustContentInsets = {false}
            contentInset={{bottom:49}}
            refreshControl={
              <RefreshControl
                refreshing={this.props.indicator.isRefreshing}
                onRefresh={()=>this._onRefresh()}
                title={this.props.indicator.freshText}
                titleColor={Util.themeColor}
                tintColor={Util.themeColor}/>}
          />
      </View>
    );
  }
}
const jobStyles = StyleSheet.create({
  jobItem:{
    backgroundColor:'#fff',
    marginBottom:10,
    paddingBottom:5,
    paddingHorizontal:5,
    shadowColor:'#000',
    shadowOpacity:0.3,
    shadowRadius: 2,
    shadowOffset:{
      height:1,
      width:0
    }
  },
  itemInfo:{
    height:35,
    paddingHorizontal:10,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  jobName:{
    //flex:1,
    width:Util.size.width/2,
    flexDirection:'row',
    //justifyContent:'space-between',
    alignItems:'center',
    overflow:'hidden'
  },
  jobSalary:{
    justifyContent:'center',
    alignItems:'center'
  },
  jobNameText:{
    //flex:1,
    color:'#333',
    fontSize: 16,
    marginRight:20,
    backgroundColor:'#fafafa'
  },
  IconCommnicate:{
    width:25,
    textAlign:'center'
  },

  jobSalaryText:{
    color:'#f27522',
    fontSize: 16
  },
  jobCompany:{
    height:30,
    //backgroundColor:'#fafafa',
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#a0a09e'
  },
  companyText:{
    color:'#a0a09e'
  },
  jobLabel:{
    justifyContent:'flex-start'
  },
  label:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    height:30
  },
  IconLabel:{
    fontSize:18,
    marginRight:5,
    justifyContent:'center',
    alignItems:'center'
  },
  labelText:{
    color:'#656565'
  },
  icon:{
    color:Util.themeColor,
    fontSize:25
  }
});
