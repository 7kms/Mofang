import * as types from '../actions/actionTypes';
const tabInitialState = {
    title:'在线面试',
    selectedTab: 'interview-online'
};
export function Tab(state = tabInitialState, action = {}){
  const {tab} = action;
  switch (action.type) {
    case types.TAB_CHANGE:
      return {...state,...tab};
    default:
      return state;
  }
}
