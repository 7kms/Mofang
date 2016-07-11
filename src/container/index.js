import React,{Component} from 'react';
import MofangApp from './App';
import { createStore,applyMiddleware,combineReducers } from 'redux';
import reducers from '../reducers';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

let middlewares = [
  thunk
];
let reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducer);
export default class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <MofangApp />
      </Provider>
    );
  }
}
