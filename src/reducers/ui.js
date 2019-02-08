import * as actionTypes from "actions/types";

const defaultState = {
  addListBox: {
    open: false
  },
  addCardBox: {
    listId: null,
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

    case actionTypes.UI_ADD_CARD_BOX: {
      const addCardBox = {
        ...state.addCardox,
        ...action.payload
      };
      return { ...state, addCardBox };
    }

    default:
      return state;
  }
};
