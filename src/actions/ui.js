import * as actionTypes from "./types";

export const openAddListEditor = () => {
  return {
    type: actionTypes.UI_ADD_LIST_EDITOR,
    payload: {
      open: true
    }
  };
};

export const closeAddListEditor = () => {
  return {
    type: actionTypes.UI_ADD_LIST_EDITOR,
    payload: {
      open: false
    }
  };
};

export const openAddCardEditor = listId => {
  return {
    type: actionTypes.UI_ADD_CARD_EDITOR,
    payload: {
      listId,
      open: true
    }
  };
};

export const closeAddCardEditor = () => {
  return {
    type: actionTypes.UI_ADD_CARD_EDITOR,
    payload: {
      listId: null,
      open: false
    }
  };
};
