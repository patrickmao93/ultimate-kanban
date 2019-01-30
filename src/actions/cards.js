import uuid from "uuid/v4";

import * as actionTypes from "actions/types";

export const createCard = content => {
  return {
    type: actionTypes.CREATE_CARD,
    payload: {
      id: uuid(),
      editing: false,
      content
    }
  };
};
