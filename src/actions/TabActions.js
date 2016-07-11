import * as types from './actionTypes';

export function tabChange(tab={
  title:'在线面试',
  selectedTab: 'interview-online'
}){
  return {
    type : types.TAB_CHANGE,
    tab
  }
}
