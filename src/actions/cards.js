import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

export const createCard = content => {
  return {
    type: actionTypes.CREATE_CARD,
    payload: {
      id: uuid(),
      editing: false,
      content,
      labels: []
    }
  };
};

export const updateCard = card => {
  return {
    type: actionTypes.UPDATE_CARD,
    payload: card
  };
};

export const deleteCard = (listId, cardId) => {
  return {
    type: actionTypes.DELETE_CARD,
    payload: {
      cardId,
      listId
    }
  };
};
