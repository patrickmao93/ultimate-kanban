import * as actionTypes from "actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_CARD:
      return [...state, action.payload];

    case actionTypes.UPDATE_CARD: {
      const newState = state.slice(0);
      const index = newState.findIndex(card => card.id === action.payload.id);
      newState[index] = { ...newState[index], ...action.payload };
      return newState;
    }

    case actionTypes.DELETE_CARD: {
      const newState = state.slice(0);
      const index = newState.findIndex(
        card => card.id === action.payload.cardId
      );
      newState.splice(index, 1);
      return newState;
    }

    default:
      return state;
  }
};
