import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

export const createList = title => {
  return {
    type: actionTypes.CREATE_LIST,
    payload: {
      id: uuid(),
      name: title,
      editing: false,
      cardIds: []
    }
  };
};

export const deleteList = id => {
  return {
    type: actionTypes.DELETE_LIST,
    payload: { id }
  };
};

export const updateListName = (id, name) => {
  return {
    type: actionTypes.UPDATE_LIST_NAME,
    payload: {
      id,
      name,
      editing: false
    }
  };
};

export const updateEditingStatus = (id, editing) => {
  return {
    type: actionTypes.UPDATE_EDITING_STATUS,
    payload: {
      id,
      editing
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

export const detachFromList = (cardId, listId) => {
  return {
    type: actionTypes.DETACH_FROM_LIST,
    payload: {
      listId,
      cardId
    }
  };
};
