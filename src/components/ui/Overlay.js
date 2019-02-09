import React from "react";
import ReactDOM from "react-dom";

const Overlay = props => {
  return ReactDOM.createPortal(
    <div className="overlay" onClick={props.onDismiss}>
      {props.children}
    </div>,
    document.getElementById("overlay")
  );
};

export default Overlay;
