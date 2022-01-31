/*eslint-disable*/
import { COMPLETED_SUCCESS, COUNT_ALL_TASKS, COUNT_HIGH_TASK, COUNT_TASKS_DONE, DELETE_ERROR, DELETE_SUCCESS, FILTER_TASKS, GET_TASKS, ITEM_ADDED_ERROR, ITEM_ADDED_SUCCESS, RESET, RESET_FOUR, RESET_THREE, RESET_TWO, UNDONE_SUCCESS, UPDATE_ITEM } from "../Actions/ActionTypes";

const initialState = {
  allTasks: [],
  success: false,
  error: null,
  countTasks: '',
  taskDone: '',
  highTaskDone: '',
  completed: false,
  unDone: false,
  updated: false
};


export const TaskReducer = (state = initialState, { type, payload }) => {

  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        allTasks: payload
      };
    case ITEM_ADDED_SUCCESS:
      return {
        ...state,
        success: true,
        error: null
      };
    case ITEM_ADDED_ERROR:
      return {
        ...state,
        success: false,
        error: payload
      };
    case RESET:
      return {
        ...state,
        success: false,
        error: null
      };

    case DELETE_SUCCESS:
      return {
        ...state,
        success: true,
        error: null
      };

    case DELETE_ERROR:
      return {
        ...state,
        success: false,
        error: payload
      };

    case FILTER_TASKS:
      return {
        ...state,
        allTasks: payload
      };
    case COUNT_ALL_TASKS:
      return {
        ...state,
        countTasks: payload
      };
    case COUNT_TASKS_DONE:
      return {
        ...state,
        taskDone: payload
      };
    case COUNT_HIGH_TASK:
      return {
        ...state,
        highTaskDone: payload
      };
    case COMPLETED_SUCCESS:
      return {
        ...state,
        completed: true
      };
    case UNDONE_SUCCESS:
      return {
        ...state,
        unDone: true
      };
    case RESET_TWO:
      return {
        ...state,
        completed: false
      };
    case RESET_THREE:
      return {
        ...state,
        unDone: false
      };
    case UPDATE_ITEM:
      return {
        ...state,
        updated: true
      };
    case RESET_FOUR:
      return {
        ...state,
        updated: false
      };
    default:
      return state;
  }

};