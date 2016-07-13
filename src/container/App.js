'use strict';
import React,{Component} from 'react';
import {Navigator,StatusBar,StyleSheet} from 'react-native';
import Util from '../utils';
import MainPage from '../pages/mainPage.js';

class MoFang extends Component{
  componentWillMount(){
    StatusBar.setBarStyle('light-content',true);
  }
  render(){
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          component: MainPage,
          title:'主页'
        }}
        configureScene={(route,routeStack)=> {
          if(Util.OS === 'android'){
            return Navigator.SceneConfigs.FloatFromBottom;
          }else{
            return Navigator.SceneConfigs.FloatFromRight;
          }
        }}
        renderScene={(route, navigator) => {
          let Component = route.component;
          return <Component navigator={navigator}/>
        }}
        />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1
  }
});
export default MoFang;
