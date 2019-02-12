import React from "react";

const LinkButton = props => {
  const { content } = props;
  return (
    <div className="link-button" onClick={props.onClick}>
      {content}
    </div>
  );
};

export default LinkButton;
