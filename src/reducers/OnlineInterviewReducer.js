import * as types from '../actions/actionTypes';
let initialState = {
  conditionStore:{
    start:0,
    count:15,
    source:'wechat',
    province: "武汉",
    district: "",
    jobType : [{name:"",code:"0a0107"}],
    salaryRange : "10001-15000",
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
export function DownloadIndicator(state=true,action={}){
  switch (action.type) {
    case types.DOWN_LOAD_END:
        return action.canLoadMore;
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
