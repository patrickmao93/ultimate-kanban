import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

const defaultState = [
  { id: uuid(), name: "Todo", cardIds: [] },
  { id: uuid(), name: "Doing", cardIds: [] },
  { id: uuid(), name: "Done", cardIds: [] }
];

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_LIST:
      const newList = {
        id: uuid(),
        name: "New List",
        notes: []
      };
      return [...state, newList];

    case actionTypes.ATTACH_TO_LIST:
      const { listId, cardId } = action.payload;
      const newState = state.slice(0);
      console.log(newState);
      newState.find(list => list.id === listId).cardIds.push(cardId);
      return newState;

    default:
      return state;
  }
};
