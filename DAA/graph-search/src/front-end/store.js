import { createStore, applyMiddleware, combineReducers } from "redux";

import { createLogger } from "redux-logger";
import graphReducer  from './reducers/graph-reducer'
export default createStore(
  combineReducers({graphReducer}),
  {},
  
);
