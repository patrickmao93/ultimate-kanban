import React from "react";

const LinkButton = props => {
  const { content } = props;
  return <div className="link-button">{content}</div>;
};

export default LinkButton;
