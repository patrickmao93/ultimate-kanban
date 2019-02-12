import React from "react";
import Board from "./Board";
import Boards from "./Boards";
import { Switch, Route } from "react-router-dom";

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Boards} />
        <Route exact path="/:id" component={Board} />
      </Switch>
    );
  }
}

export default Content;
