/*eslint-disable*/
import { combineReducers } from "redux";
import { TaskReducer } from "./tasks";

export const reducer = combineReducers({
  tasks: TaskReducer
});