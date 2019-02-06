import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

const defaultState = [
  { id: uuid(), name: "Todo", cardIds: [], editing: false },
  { id: uuid(), name: "Doing", cardIds: [], editing: false },
  { id: uuid(), name: "Done", cardIds: [], editing: false }
];

const copyState = state => {
  const newState = state.slice(0);
  return newState;
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LIST:
      return [...state, action.payload];

    case actionTypes.ATTACH_TO_LIST: {
      const { listId, cardId } = action.payload;
      const newState = copyState(state);
      newState.find(list => list.id === listId).cardIds.push(cardId);
      return newState;
    }

    case actionTypes.UPDATE_LIST_NAME: {
      const { id, name, editing } = action.payload;
      const newState = copyState(state);
      newState.find(list => list.id === id).name = name;
      newState.find(list => list.id === id).editing = editing;
      return newState;
    }

    case actionTypes.UPDATE_EDITING_STATUS: {
      const { id, editing } = action.payload;
      const newState = copyState(state);
      newState.find(list => list.id === id).editing = editing;
      return newState;
    }

    default:
      return state;
  }
};
