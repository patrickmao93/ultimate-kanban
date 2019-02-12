import * as actionTypes from "actions/types";

const defaultState = {
  addListEditor: {
    boardId: null,
    open: false
  },
  addCardEditor: {
    listId: null,
    open: false
  },
  boardDrawer: {
    open: false,
    pinned: false
  },
  createBoardModal: {
    open: false
  }
};

export default (state = defaultState, action) => {
  const copyAndUpdate = element => {
    return { ...state, [element]: { ...state[element], ...action.payload } };
  };

  switch (action.type) {
    case actionTypes.UI_ADD_LIST_EDITOR: {
      return copyAndUpdate("addListEditor");
    }

    case actionTypes.UI_ADD_CARD_EDITOR: {
      return copyAndUpdate("addCardEditor");
    }

    case actionTypes.UI_BOARD_DRAWER: {
      return copyAndUpdate("boardDrawer");
    }

    case actionTypes.UI_CREATE_BOARD_MODAL: {
      return copyAndUpdate("createBoardModal");
    }

    default:
      return state;
  }
};
