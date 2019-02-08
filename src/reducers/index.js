import { combineReducers } from "redux";

import listsReducer from "reducers/lists";
import cardsReducer from "reducers/cards";
import uiReducer from "reducers/ui";

export default combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
  ui: uiReducer
});
