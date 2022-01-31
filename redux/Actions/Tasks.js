/*eslint-disable*/
import { GET_TASKS, ITEM_ADDED_ERROR, ITEM_ADDED_SUCCESS, RESET, DELETE_ERROR, DELETE_SUCCESS, FILTER_TASKS, COUNT_ALL_TASKS, COUNT_TASKS, COUNT_TASKS_DONE, COUNT_HIGH_TASK, COMPLETED_SUCCESS, RESET_TWO, UNDONE_SUCCESS, RESET_THREE, UPDATE_ITEM, RESET_FOUR } from "./ActionTypes";
import db from "../../config/dataBase";


export const getAllTasks = () => async (dispatch, getState) => {
  db.transaction(txn => {
    txn.executeSql("SELECT * FROM todo ORDER BY createdAt ASC", [],
      (sqlTnx, res) => {
        let len = res.rows.length;
        if (len > 0) {
          let result = [];
          for (let i = 0; i < len; i++) {
            let item = res.rows.item(i);
            result.push({
              id: item.id, title: item.title,
              description: item.description,
              priority: item.priority,
              imageUrl: item.imageUrl,
              createdAt: item.createdAt,
              completed: item.completed,
              modifiedAt: item.modifiedAt
            });
          }
          return dispatch({
            type: GET_TASKS,
            payload: result
          });
        }
      },
      error => {
        console.log("error fetching");
      });
  });

};

export const addItem = ({ title, description, priority, filePath, createdAt }) => async (dispatch, getState) => {
  let completed = 0;
  db.transaction(txn => {
    txn.executeSql(`INSERT INTO todo (title,description,priority,imageUrl,createdAt,completed) VALUES(?,?,?,?,?,?)`, [
      title, description, priority, filePath, createdAt, completed
    ], () => {
      return dispatch({
        type: ITEM_ADDED_SUCCESS,
        payload: false
      });
    },
      error => {
        return dispatch({
          type: ITEM_ADDED_ERROR,
          payload: error.message || "Task creation failed!"
        });
      });
  });
};

export const deleteTask = (id) => async (dispatch, getState) => {
  db.transaction(txn => {
    txn.executeSql("DELETE FROM todo WHERE id=?", [id], () => {
      dispatch({
        type: DELETE_SUCCESS
      });
    },
      error => {
        dispatch({
          type: DELETE_ERROR,
          payload: error.message || "Task deletion failed!"
        });
      });
  });
};

export const reset = () => async (dispatch, getState) => {
  return dispatch({
    type: RESET,
  });
};

export const filterTasks = (priority) => async (dispatch, getState) => {
  const { tasks } = getState();
  return dispatch({
    type: FILTER_TASKS,
    payload: tasks.allTasks.filter(t => t.priority === priority)
  });
};

export const countAllTasks = () => async (dispatch, getState) => {
  const { tasks } = getState();
  let Length = tasks.allTasks.length;
  return dispatch({
    type: COUNT_ALL_TASKS,
    payload: Length
  });
};

export const countTasksDone = () => async (dispatch, getState) => {
  const { tasks } = getState();
  let Length = tasks.allTasks.filter(x => x.completed === "1").length;
  return dispatch({
    type: COUNT_TASKS_DONE,
    payload: Length
  });
};

export const countHighTasks = () => async (dispatch, getState) => {
  const { tasks } = getState();
  let Length = tasks.allTasks.filter(x => x.completed === "0").length;
  return dispatch({
    type: COUNT_HIGH_TASK,
    payload: Length
  });
};

export const updateTaskToDone = (id) => async (dispatch, getState) => {
  let completed = 1;
  db.transaction(txn => {
    txn.executeSql("UPDATE todo SET completed =? WHERE id=?", [completed, id], () => {
      return dispatch({
        type: COMPLETED_SUCCESS,
      });
    }, err => {
      console.log("Error");
    });
  });
};

export const updateTaskTounDone = (id) => async (dispatch, getState) => {
  let completed = 0;
  db.transaction(txn => {
    txn.executeSql("UPDATE todo SET completed =? WHERE id=?", [completed, id], () => {
      return dispatch({
        type: UNDONE_SUCCESS,
      });
    }, err => {
      console.log("Error");
    });
  });
};

export const resetTwo = () => async (dispatch, getState) => {
  return dispatch({
    type: RESET_TWO,
  });
};

export const resetThree = () => async (dispatch, getState) => {
  return dispatch({
    type: RESET_THREE,
  });
};

export const updateItem = ({ id, title, description, priority, modifiedAt }) => async (dispatch, getState) => {
  db.transaction(txn => {
    txn.executeSql("UPDATE todo SET title=?,description=?,priority=? ,modifiedAt=? WHERE id=?", [title, description, priority, modifiedAt, id],
      () => {
        dispatch({
          type: UPDATE_ITEM
        });
      },
      err => {
        console.log("Error", err.message);
      });
  });
};

export const resetUpdateItem = () => async (dispatch, getState) => {
  return dispatch({
    type: RESET_FOUR,
  });
};