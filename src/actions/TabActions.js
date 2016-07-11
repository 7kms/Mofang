import * as types from './actionTypes';

export function tabChange(tab){
  return {
    type : types.TAB_CHANGE,
    tab
  }
}
