'use strict';
import {connect} from 'react-redux';
import React,{Component} from 'react';
import {NavigatorIOS,StatusBar,StyleSheet,Text,TouchableHighlight,View} from 'react-native';
import Util from '../utils';
import MainPage from '../pages/mainPage.js';

class MoFang extends Component{
  componentWillMount(){
    StatusBar.setBarStyle('light-content',true);
  }
  render(){
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          component: MainPage,
          barTintColor: Util.themeColor,
          tintColor:'#fff',
          titleTextColor :'#fff',
          title:"机会",
          navigationBarHidden:true
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
