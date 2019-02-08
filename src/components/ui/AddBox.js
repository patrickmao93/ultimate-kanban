import React from "react";
import { Input } from "semantic-ui-react";

const AddListBox = props => {
  const { placeholder, onAdd, onDismiss, children } = props;
  return (
    <div className="add-box">
      <div className="add-box__input">
        <Input />
      </div>
      <div className="add-box__operations">{children}</div>
    </div>
  );
};

export default AddListBox;
