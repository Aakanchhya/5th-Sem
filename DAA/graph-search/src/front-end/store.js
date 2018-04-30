import { createStore, combineReducers,applyMiddleware } from "redux";

import { createLogger } from "redux-logger";
import graphReducer  from './reducers/graph-reducer'
import {movableReducer} from './reducers/drawable-reducers'
export default createStore(
  combineReducers({graphReducer,movableReducer}),
  {},
  applyMiddleware(createLogger())
  
);
