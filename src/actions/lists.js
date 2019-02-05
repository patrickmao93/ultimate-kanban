import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

export const createList = () => {
  return {
    type: actionTypes.CREATE_LIST,
    payload: {
      id: uuid(),
      name: "New list",
      cards: []
    }
  };
};

export const attachToList = (cardId, listId) => {
  return {
    type: actionTypes.ATTACH_TO_LIST,
    payload: {
      listId,
      cardId
    }
  };
};
