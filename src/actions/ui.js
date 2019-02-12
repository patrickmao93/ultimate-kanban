import * as actionTypes from "./types";

export const openAddListEditor = boardId => {
  return {
    type: actionTypes.UI_ADD_LIST_EDITOR,
    payload: {
      boardId,
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

export const toggleBoardDrawer = open => {
  return {
    type: actionTypes.UI_BOARD_DRAWER,
    payload: {
      open
    }
  };
};

export const pinBoardDrawer = pinned => {
  return {
    type: actionTypes.UI_BOARD_DRAWER,
    payload: {
      pinned
    }
  };
};

export const toggleCreateBoardModal = open => {
  return {
    type: actionTypes.UI_CREATE_BOARD_MODAL,
    payload: {
      open
    }
  };
};
