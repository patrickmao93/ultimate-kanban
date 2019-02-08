import * as actionTypes from "./types";

export const openAddListBox = () => {
  return {
    type: actionTypes.UI_ADD_LIST_BOX,
    payload: {
      open: true
    }
  };
};

export const closeAddListBox = () => {
  return {
    type: actionTypes.UI_ADD_LIST_BOX,
    payload: {
      open: false
    }
  };
};

export const openAddCardBox = listId => {
  return {
    type: actionTypes.UI_ADD_CARD_BOX,
    payload: {
      listId,
      open: true
    }
  };
};

export const closeAddCardBox = () => {
  return {
    type: actionTypes.UI_ADD_CARD_BOX,
    payload: {
      listId: null,
      open: false
    }
  };
};
