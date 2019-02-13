import React from "react";

import { Input } from "semantic-ui-react";

const InputWrapper = props => {
  return <Input {...props} ref={props.forwardref} />;
};

InputWrapper.displayName = "input";

export default InputWrapper;
