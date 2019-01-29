import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "reducers";

const Root = props => {
  return (
    <Provider store={createStore(reducers, props.initialState || {})}>
      {props.children}
    </Provider>
  );
};

export default Root;
