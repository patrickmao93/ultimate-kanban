import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

export const createList = name => {
  return {
    type: actionTypes.CREATE_LIST,
    payload: {
      id: uuid(),
      name,
      editing: false,
      cardIds: []
    }
  };
};

export const deleteList = (boardId, listId) => {
  return {
    type: actionTypes.DELETE_LIST,
    payload: { boardId, listId }
  };
};

export const updateList = (listId, name, editing = false) => {
  return {
    type: actionTypes.UPDATE_LIST,
    payload: {
      listId,
      name,
      editing
    }
  };
};

export const attachToList = (listId, cardId) => {
  return {
    type: actionTypes.ATTACH_TO_LIST,
    payload: {
      cardId,
      listId
    }
  };
};

export const detachFromList = (listId, cardId) => {
  return {
    type: actionTypes.DETACH_FROM_LIST,
    payload: {
      listId,
      cardId
    }
  };
};
