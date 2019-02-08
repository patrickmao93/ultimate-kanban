import React from "react";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import Board from "components/Board";

const App = () => {
  return (
    <div className="app">
      <div id="clickCatcher" />
      <Board />
    </div>
  );
};

export default DragDropContext(HTML5Backend)(App);
