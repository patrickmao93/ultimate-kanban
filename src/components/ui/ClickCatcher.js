import React from "react";
import ReactDOM from "react-dom";

const ClickCatcher = props => {
  return ReactDOM.createPortal(
    <div className="click-catcher" onClick={props.onDismiss} />,
    document.getElementById("clickCatcher")
  );
};

export default ClickCatcher;
