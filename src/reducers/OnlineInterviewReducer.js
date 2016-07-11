import * as types from '../actions/actionTypes';
let initialState = {
  conditionStore:{
    start:0,
    count:15,
    source:'wechat',
    province: "北京",
    district: "",
    jobType : [{name:"",code:""}],
    salaryRange : "",
    workingYear : "",
    searchText: ""
  },
  jobArr:[]
};
export function OnlineConditionStore(state = initialState.conditionStore,action={}){
  switch (action.type) {
    case types.SET_CONDITION:
      return {...state,...action.conditionStore};
    default:
      return state;
  }
}
export function OnlineJobIndicator(state={isRefreshing:false,freshText:'下拉刷新'},action={}){
  switch (action.type) {
    case types.CHANGE_ONLINE_INDICATOR:
      return {...state, ...action.indicator}
    default:
      return state;
  }
}
export function OnlineJobArr(state = initialState.jobArr, action = {}){
  switch (action.type) {
    case types.ONLINE_LIST_INDEX:
    case types.DOWN_LOAD_ERROR:
    case types.ONLINE_LIST_EMPTY:
      return action.jobArr;
    default:
      return state;
  }
}
