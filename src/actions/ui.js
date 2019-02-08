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
