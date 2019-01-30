import * as actionTypes from "actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.CREATE_CARD:
      return [...state, action.payload];

    default:
      return state;
  }
};
