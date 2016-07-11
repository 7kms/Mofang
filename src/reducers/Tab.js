import * as types from '../actions/actionTypes';
const tabInitialState = {
  title:'在线面试',
  selectedTab: 'interview-online'
};
export default function Tab(state = tabInitialState, action = {}){
  switch (action.type) {
    case types.TAB_CHANGE:
      return {...state, action.tab};
      break;
    default:
      return state;
  }
}
