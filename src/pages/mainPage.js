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
import Util from '../utils';
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
            onPress={() => this.props.changeTab({
              title:'在线面试',
              selectedTab:'interview-online'
            })}
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
              onPress={() => this.props.changeTab({
                title:'现场面试',
                selectedTab:'interview-offline'
              })}
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
            onPress={() => this.props.changeTab({
              title:'消息中心',
              selectedTab:'message'
            })}
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
            onPress={() => this.props.changeTab({
              title:'我的',
              selectedTab:'mine'
            })}
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
export default connect((state) => {
  console.log(state);
  return {...state.Tab};
},(dispatch) => ({
  changeTab:(tab)=> dispatch(TabActions.tabChange(tab))
}))(MainPage);
