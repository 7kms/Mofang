import * as types from '../actions/actionTypes';
const tabInitialState = {
    title:'在线面试',
    selectedTab: 'interview-online'
};
export function Tab(state = tabInitialState, action = {}){
  switch (action.type) {
    case types.TAB_CHANGE:
      const {tab} = action;
      return {...state,...tab};
      break;
    default:
      return state;
  }
}
