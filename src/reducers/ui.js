import * as actionTypes from "actions/types";

const defaultState = {
  addListEditor: {
    boardId: null,
    open: false
  },
  addCardEditor: {
    listId: null,
    open: false
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UI_ADD_LIST_EDITOR: {
      const addListEditor = {
        ...state.addListEditor,
        ...action.payload
      };
      return { ...state, addListEditor };
    }

    case actionTypes.UI_ADD_CARD_EDITOR: {
      const addCardEditor = {
        ...state.addCardEditor,
        ...action.payload
      };
      return { ...state, addCardEditor };
    }

    default:
      return state;
  }
};
