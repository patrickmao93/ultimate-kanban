import React from "react";
import Board from "./Board";
import Boards from "./Boards";
import { Switch, Route } from "react-router-dom";

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Boards} />
        <Route
          path="/:id"
          exact
          render={props => (
            // key is set this way to ensure board is re-rendered
            // every time the router param changes
            <Board key={props.match.params.id} {...props} />
          )}
        />
      </Switch>
    );
  }
}

export default Content;
