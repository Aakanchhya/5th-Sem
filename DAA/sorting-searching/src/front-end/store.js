import { createStore,combineReducers, applyMiddleware } from "redux";
import {createLogger  } from "redux-logger";
import listReducer from "./Reducers/ListReducer";

export default createStore(
    combineReducers({
        listReducer
    }),
    applyMiddleware(createLogger())
)