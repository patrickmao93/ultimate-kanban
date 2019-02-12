import * as actionTypes from "actions/types";
import { id0, id1, id2 } from "./lists";

const id = 0;

const defaultState = {
  [id]: {
    id: 0,
    name: "tasks",
    listIds: [id0, id1, id2],
    editing: false
  },
  1: {
    id: 1,
    name: "something!",
    listIds: [id0],
    editing: false
  },
  _boards: [0, 1]
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_LIST: {
      const { boardId, listId } = action.payload;
      const newState = Object.assign({}, state);
      if (newState[boardId]) {
        const index = newState[boardId].listIds.indexOf(listId);
        newState[boardId].listIds.splice(index, 1);
      }
      return newState;
    }

    case actionTypes.ATTACH_TO_BOARD: {
      const { boardId, listId } = action.payload;
      const newState = Object.assign({}, state);
      if (newState[boardId]) {
        newState[boardId].listIds.push(listId);
      }
      return newState;
    }

    case actionTypes.UPDATE_BOARD: {
      const { boardId, name, editing } = action.payload;
      const newState = Object.assign({}, state);
      if (newState[boardId]) {
        newState[boardId].name = name;
        newState[boardId].editing = editing;
      }
      return newState;
    }

    default:
      return state;
  }
};
