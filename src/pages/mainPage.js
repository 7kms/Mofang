import React,{Component} from 'react';
import {
  View,
  TabBarIOS,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import * as TabActions from '../actions/TabActions';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from './util.js';
//import OnlineComponent from './online/index.js';

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
    title: React.PropTypes.string.isRequired,
    selectedTab:  React.PropTypes.string.isRequired,
    changeTab: React.PropTypes.func.isRequired
  };
  _changeTab(tabName){
    let title = '';
    switch (tabName) {
      case 'interview-online':
        title = '在线面试';
        break;
      case 'interview-offline':
        title = '现场面试';
        break;
      case 'message':
        title = '消息中心';
        break;
      case 'mine':
        title = '我的';
        break;
      default:
        title = '在线面试';
      break;
    }
    this.setState({
      title: title,
      selectedTab: tabName
    });
  }
  render (){
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
            onPress={() => this.props.changeTab('interview-online')}
            selected={this.props.selectedTab === 'interview-online'}
            >
            <View>
                <Header title={this.props.title}/>
            </View>
          </Icon.TabBarItem>

          <Icon.TabBarItem
              title="现场面试"
              iconName="ios-alarm-outline"
              selectedIconName="ios-alarm"
              onPress={() => this.props.changeTab('interview-offline')}
              selected={this.props.selectedTab === 'interview-offline'}
              >
              <View>
                  <Header title={this.props.title}/>
              </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="消息中心"
            iconName="ios-chatbubbles-outline"
            selectedIconName="ios-chatbubbles"
            onPress={() => this.props.changeTab('message')}
            selected={this.props.selectedTab === 'message'}
            >
            <View>
                <Header title={this.props.title}/>
            </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="我的"
            iconName="ios-person-add-outline"
            selectedIconName="ios-person-add"
            onPress={() => this.props.changeTab('mine')}
            selected={this.props.selectedTab === 'mine'}
            >
            <View>
                <Header title={this.props.title}/>
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
    title: React.PropTypes.string.isRequired,
    selectedTab:  React.PropTypes.string.isRequired,
    changeTab: React.PropTypes.func.isRequired
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
export default connect(state => ({
  tab: state.tab
}),dispatch => ({
  changeTab:(tab)=> dispatch(TabActions.tabChange(tab));
}))(MainPage);
