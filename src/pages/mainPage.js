import React,{Component} from 'react';
import {
  View,
  TabBarIOS,
  StyleSheet,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import * as TabActions from '../actions/TabActions';
import * as onlineInterviewActions from '../actions/onlineInterviewActions';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../utils';
import OnlineInterview from './onlineInterview';

class Header extends Component {
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
class MofangTab extends Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    Tab: React.PropTypes.object.isRequired,
    OnlineJobArr: React.PropTypes.array.isRequired,
    OnlineConditionStore: React.PropTypes.object.isRequired,
    OnlineJobIndicator: React.PropTypes.object.isRequired,
    changeTab: React.PropTypes.func.isRequired,
    changeIndicator: React.PropTypes.func.isRequired,
    getJobList: React.PropTypes.func.isRequired,
    refresh: React.PropTypes.func.isRequired,
    canLoadMore: React.PropTypes.bool.isRequired
  };
  _isActive (currentTab){
    const {selectedTab} = this.props.Tab;
    if(selectedTab === currentTab){
      return true;
    }
    return false;
  }
  render (){
    const {title} = this.props.Tab;
    return(
      <TabBarIOS
        barTintColor='#fff'
        tintColor={Util.themeColor}
        translucent={true}
        >
          <Icon.TabBarItem
            title="在线面试"
            iconName="ios-appstore-outline"
            selectedIconName="ios-appstore"
            onPress={() => this.props.changeTab({
              title:'在线面试',
              selectedTab:'interview-online'
            })}
            selected={this._isActive('interview-online')}
            >
            <OnlineInterview
              canLoadMore = {this.props.canLoadMore}
              indicator = {this.props.OnlineJobIndicator}
              refresh = {this.props.refresh}
              getJobList = {this.props.getJobList}
              jobArr = {this.props.OnlineJobArr}
              conditionStore = {this.props.OnlineConditionStore}
              title = {title}/>
          </Icon.TabBarItem>

          <Icon.TabBarItem
              title="现场面试"
              iconName="ios-alarm-outline"
              selectedIconName="ios-alarm"
              onPress={() => this.props.changeTab({
                title:'现场面试',
                selectedTab:'interview-offline'
              })}
              selected={this._isActive('interview-offline')}
              >
              <View>
                  <Header title={title}/>
              </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="消息中心"
            iconName="ios-chatbubbles-outline"
            selectedIconName="ios-chatbubbles"
            onPress={() => this.props.changeTab({
              title:'消息中心',
              selectedTab:'message'
            })}
            selected={this._isActive('message')}
            >
            <View>
                  <Header title={title}/>
            </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="我的"
            iconName="ios-person-add-outline"
            selectedIconName="ios-person-add"
            onPress={() => this.props.changeTab({
              title:'我的',
              selectedTab:'mine'
            })}
            selected={this._isActive('mine')}
            >
            <View>
                <Header title={title}/>
            </View>
         </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}

class MainPage extends Component{
  constructor(props){
    super(props);
  }
  static propTypes = {
    Tab: React.PropTypes.object.isRequired,
    OnlineJobArr: React.PropTypes.array.isRequired,
    OnlineConditionStore: React.PropTypes.object.isRequired,
    canLoadMore: React.PropTypes.bool.isRequired
  };
  render(){
    return (
      <View style={styles.pageContainer}>
          <MofangTab {...this.props}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  pageContainer:{
    width:Util.size.width,
    flex:1,
    justifyContent:'center',
  }
});
export default connect((state) => {
  return {
    Tab: state.Tab,
    canLoadMore: state.DownloadIndicator,
    OnlineJobArr: state.OnlineJobArr,
    OnlineConditionStore: state.OnlineConditionStore,
    OnlineJobIndicator: state.OnlineJobIndicator
  };
},(dispatch) => ({
  getJobList:(params)=> dispatch(onlineInterviewActions.getList(params)),
  changeTab:(tab)=> dispatch(TabActions.tabChange(tab)),
  changeIndicator:(indicator)=> dispatch(onlineInterviewActions.changeIndicator(indicator)),
  refresh:(indicator)=> {
    dispatch(onlineInterviewActions.refresh(indicator))
  }
}))(MainPage);
