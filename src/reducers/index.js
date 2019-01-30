import { combineReducers } from "redux";

import listsReducer from "reducers/lists";
import cardsReducer from "reducers/cards";

export default combineReducers({
  lists: listsReducer,
  cards: cardsReducer
});
