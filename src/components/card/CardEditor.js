import React from "react";
import ComposerBox from "components/ui/ComposerBox";

const CardEditor = props => {
  const { onUpdate, value } = props;
  const { x, y } = props.location;
  return (
    <div className="card-editor" style={{ left: x - 8, top: y - 8 }}>
      <ComposerBox
        transparent
        type="textarea"
        buttonText="Save"
        onSubmit={onUpdate}
        value={value}
      />
    </div>
  );
};

export default CardEditor;
