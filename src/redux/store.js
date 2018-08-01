import { createStore, combineReducers, applyMiddleware } from "redux";
import cartReducer from "./cartReducer";
import promiseMiddleware from "redux-promise-middleware";

export default createStore(
  combineReducers({ cartReducer }),
  applyMiddleware(promiseMiddleware())
);
