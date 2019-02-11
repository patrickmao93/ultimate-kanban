import { combineReducers } from "redux";

import boardReducer from "reducers/boards";
import listsReducer from "reducers/lists";
import cardsReducer from "reducers/cards";
import uiReducer from "reducers/ui";

export default combineReducers({
  boards: boardReducer,
  lists: listsReducer,
  cards: cardsReducer,
  ui: uiReducer
});
