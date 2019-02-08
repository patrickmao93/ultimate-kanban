import * as actionTypes from "actions/types";

const defaultState = {
  addListBox: {
    open: false
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UI_ADD_LIST_BOX: {
      const addListBox = {
        ...state.addListBox,
        ...action.payload
      };
      return { ...state, addListBox };
    }

    default:
      return state;
  }
};
