import * as types from './actionTypes';
function essenceList(jobArr,getState,isFresh){
  let oldDataArr = getState().OnlineJobArr && getState().OnlineJobArr;
  if(isFresh){
    oldDataArr = [...jobArr];
  }else{
    oldDataArr = [...oldDataArr,...jobArr];
  }
  return {
    type: types.ONLINE_LIST_INDEX,
    jobArr : oldDataArr
  };
}
function downloaderr(getState){
   return {
     type: types.DOWN_LOAD_ERROR,
     jobArr : getState().OnlineJobArr
   }
}
function changeDownLoadStatus(canLoadMore){
  return {
    type: types.DOWN_LOAD_END,
    canLoadMore: canLoadMore
  }
}
function getParameters(params) {
  let search = "";
  Object.keys(params).forEach(key => {
    if(key === 'jobType'){
      params[key].forEach(obj=>{
        search += 'jobTypes='+obj.code;
      });
    }else{
      search += key + '=' + encodeURIComponent(params[key]);
    }
    search += '&';
  });
  if(search.length > 1){
    search = search.slice(0,-1);
  }
  return search;
}
export function setCondition(conditionStore){
  return {
    type: types.SET_CONDITION,
    conditionStore
  };
}
function query(search,isFresh){
  return (dispatch,getState) => {
    let url = "http://mofanghr.com/m/jobs/search?" + search;
    fetch(url,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    }).then(res => {
        return res.json();
    }).then(dataArr => {
        let condition = Object.assign({},getState().OnlineConditionStore);
        condition.start += condition.count;
        if(dataArr.length < condition.count){
          dispatch(changeDownLoadStatus(false));
        }
        dispatch(setCondition(condition));
        dispatch(essenceList(dataArr,getState,isFresh));
    }).catch(error => {
        console.log(error);
        dispatch(downloaderr(getState));
    }).finally(()=>{
        dispatch(changeIndicator({isRefreshing:false,freshText:'下拉刷新'}));
        console.log("finally");
    });
  };
}
export function getList(){
  return (dispatch,getState) => {
    let condition = Object.assign({},getState().OnlineConditionStore);
    let search = getParameters(condition);
    dispatch(query(search));
  }
}
export function changeIndicator(indicator){
  return {
    type: types.CHANGE_ONLINE_INDICATOR,
    indicator
  };
}
export function refresh(indicator){
  return (dispatch,getState) => {
    let condition = Object.assign({},getState().OnlineConditionStore,{start:0});
    let search = getParameters(condition);
    dispatch(changeIndicator(indicator));
    dispatch(query(search,'fresh'));
  }
}
