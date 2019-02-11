import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

export const id0 = uuid();
export const id1 = uuid();
export const id2 = uuid();

const defaultState = {
  [id0]: { id: id0, name: "Todo", cardIds: [], editing: false },
  [id1]: { id: id1, name: "Doing", cardIds: [], editing: false },
  [id2]: { id: id2, name: "Done", cardIds: [], editing: false }
};

const copyState = state => {
  return Object.assign({}, state);
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LIST: {
      return { ...state, [action.payload.id]: action.payload };
    }

    case actionTypes.DELETE_LIST: {
      const newState = Object.assign({}, state);
      if (newState[action.payload.listId]) {
        delete newState[action.payload.listId];
      }
      return newState;
    }

    case actionTypes.ATTACH_TO_LIST: {
      const { listId, cardId } = action.payload;
      const newState = Object.assign({}, state);
      newState[listId].cardIds.push(cardId);
      return newState;
    }

    case actionTypes.DETACH_FROM_LIST: {
      const { listId, cardId } = action.payload;
      const newState = Object.assign({}, state);
      const index = newState[listId].cardIds.indexOf(cardId);
      newState[listId].cardIds.splice(index, 1);
      return newState;
    }

    case actionTypes.UPDATE_LIST: {
      const { listId, name, editing } = action.payload;
      const newState = Object.assign({}, state);
      newState[listId].name = name;
      newState[listId].editing = editing;
      return newState;
    }

    case actionTypes.DELETE_CARD: {
      const { cardId, listId } = action.payload;
      const newState = copyState(state);
      const list = newState[listId];

      if (!list) {
        return state;
      }

      const index = list.cardIds.findIndex(id => cardId === id);
      list.cardIds.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};
