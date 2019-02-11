import React from "react";
import ReactDOM from "react-dom";

const Overlay = props => {
  const handleClick = e => {
    e.stopPropagation();
    props.onDismiss();
  };

  return ReactDOM.createPortal(
    <div className="overlay" onClick={handleClick}>
      {props.children}
    </div>,
    document.getElementById("overlay")
  );
};

export default Overlay;
