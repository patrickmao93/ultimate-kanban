import * as actionTypes from "actions/types";
import { id0, id1, id2 } from "./lists";

const id = 0;

const defaultState = {
  [id]: {
    id: 0,
    name: "tasks",
    listIds: [id0, id1, id2],
    editing: false
  }
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

    default:
      break;
  }
  return state;
};
