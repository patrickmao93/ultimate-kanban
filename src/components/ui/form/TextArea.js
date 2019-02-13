import React from "react";

import { TextArea } from "semantic-ui-react";

const TextAreaWrapper = props => {
  return <TextArea {...props} />;
};

TextAreaWrapper.displayName = "textarea";

export default TextAreaWrapper;
