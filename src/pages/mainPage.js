import React,{Component} from 'react';
import {
  View,
  TabBarIOS,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from './util.js';
import OnlineComponent from './online/index.js';
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
  constructor() {
    super();
    this.state = {
      title:'在线面试',
      selectedTab: 'interview-online'
    };
  }
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
            onPress={() => this._changeTab('interview-online')}
            selected={ this.state.selectedTab === 'interview-online' }
            >
            <View style={{flex:1}}>
              <OnlineComponent title={this.state.title}/>
            </View>
          </Icon.TabBarItem>

          <Icon.TabBarItem
              title="现场面试"
              iconName="ios-alarm-outline"
              selectedIconName="ios-alarm"
              onPress={() => this._changeTab('interview-offline')}
              selected={this.state.selectedTab==='interview-offline'}
              >
              <View>
                <Header title={this.state.title}/>
              </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="消息中心"
            iconName="ios-chatbubbles-outline"
            selectedIconName="ios-chatbubbles"
            onPress={() => this._changeTab('message')}
            selected={this.state.selectedTab==='message'}
            >
            <View>
              <Header title={this.state.title}/>
            </View>
          </Icon.TabBarItem>
          <Icon.TabBarItem
            title="我的"
            iconName="ios-person-add-outline"
            selectedIconName="ios-person-add"
            onPress={() => this._changeTab('mine')}
            selected={this.state.selectedTab==='mine'}
            >
            <View>
              <Header title={this.state.title}/>
            </View>
         </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
}
class MainPage extends Component{
  render(){
    return (
      <View style={styles.pageContainer}>
        <MofangTab />
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
export default connect(state=>({

}),dispatch=>({

}))(MainPage);
