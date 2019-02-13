import React from "react";

import { Button } from "semantic-ui-react";

const ButtonWrapper = props => {
  return <Button {...props} />;
};

ButtonWrapper.displayName = "button";

export default ButtonWrapper;
