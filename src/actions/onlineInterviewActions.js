import * as types from './actionTypes';
function essenceList(jobArr,getState){
  let oldDataArr = getState().OnlineJobArr && getState().OnlineJobArr;
  oldDataArr = [...oldDataArr,...jobArr];
  return {
    type: types.ONLINE_LIST_INDEX,
    jobArr : oldDataArr
  };
}
function downloaderr(getState){
  console.log(getState());
 return {
   type: types.DOWN_LOAD_ERROR,
   jobArr : getState().OnlineJobArr
 }
}
export function setCondition(conditionStore){
  return {
    type: types.SET_CONDITION,
    conditionStore
  };
}
export function getList(params){
  return (dispatch,getState) => {
    let url = "http://mofanghr.com/m/jobs/search?" + params;
    fetch(url,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    }).then(res => {
      console.log(res);
      return res.json();
    }).then(dataArr => {
      dispatch(essenceList(dataArr,getState));
    }).catch(error => {
      console.log(error);
      dispatch(downloaderr(getState));
    });
  };
}
export function changeIndicator(indicator){
  return {
    type: types.CHANGE_ONLINE_INDICATOR,
    indicator
  };
}
export function refresh(indicator){
  return {
    type: types.REFRESH_ONLINE_JOBLIST,
    indicator
  };
}
