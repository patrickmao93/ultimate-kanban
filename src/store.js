import throttle from "lodash/throttle";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "reducers";
import { loadState, saveState } from "./localStorage";

const persistedState = loadState();
const store = createStore(reducers, persistedState, composeWithDevTools());

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
