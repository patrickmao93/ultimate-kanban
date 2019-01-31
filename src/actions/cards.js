import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

export const createCard = content => {
  return {
    type: actionTypes.CREATE_CARD,
    payload: {
      id: uuid(),
      editing: false,
      content
    }
  };
};

export const updateCard = card => {
  return {
    type: actionTypes.UPDATE_CARD,
    payload: card
  };
};

export const deleteCard = id => {
  return {
    type: actionTypes.DELETE_CARD,
    payload: id
  };
};
