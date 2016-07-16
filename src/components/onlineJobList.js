import React,{Component} from 'react';
import {
  View,
  StyleSheet,
  ListView,
  TouchableHighlight,
  RefreshControl,
  ActivityIndicator,
  Text
} from 'react-native'
//import RefreshableListView from 'react-native-refreshable-listview';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../utils';
export default class JobList extends Component {
  constructor(props) {
    super(props);
    console.log('joblist is rendering');
  }
  static propTypes = {
    dataList: React.PropTypes.array.isRequired,
    onPress: React.PropTypes.func.isRequired,
    onRefresh: React.PropTypes.func.isRequired,
    pullUp: React.PropTypes.func.isRequired,
    indicator: React.PropTypes.object.isRequired,
    canLoadMore: React.PropTypes.bool.isRequired
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

  _renderFooter(){
    console.log(this.props.canLoadMore);
    return (
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:60}}>
      {
        this.props.canLoadMore?
        <ActivityIndicator
          animating={true}
          color={Util.themeColor}
        />: null
      }
      {
        this.props.canLoadMore?
          <Text style={{color:Util.themeColor}}>正在加载</Text>: null
      }
      </View>
    )
  }
  _onRefresh(){
    this.props.onRefresh({isRefreshing:true,freshText:'正在加载'});
  }
  render(){
    const {dataList,indicator} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    console.log("render listview");
    return(
      <View style={{flex:1}}>
        {
          dataList.length > 0 ?
          <ListView
              style={{flex:1,backgroundColor:'#eee'}}
              scrollRenderAheadDistance={100}
              onEndReachedThreshold={200}
              showsVerticalScrollIndicator={false}
              enableEmptySections = {true}
              dataSource={ds.cloneWithRows(dataList)}
              renderRow={this._renderRow.bind(this)}
              renderFooter={this._renderFooter.bind(this)}
              onEndReached={this.props.canLoadMore ? this.props.pullUp.bind(this): null}
              automaticallyAdjustContentInsets = {false}
              contentInset={{bottom:49}}
              refreshControl={
                <RefreshControl
                  refreshing={indicator.isRefreshing}
                  onRefresh={()=>this._onRefresh()}
                  title={indicator.freshText}
                  titleColor={Util.themeColor}
                  tintColor={Util.themeColor}/>}
            />:
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
        }
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
    marginRight:20
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
