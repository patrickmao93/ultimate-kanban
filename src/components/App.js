import React from "react";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

import AppBar from "components/AppBar";
import Boards from "components/Boards";
import Board from "components/Board";

const App = props => {
  return (
    <div className="app">
      <AppBar />
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Boards} />
          <Route exact path="/:id" component={Board} />
        </Switch>
      </HashRouter>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    boards: state.boards
  };
};

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(App));
