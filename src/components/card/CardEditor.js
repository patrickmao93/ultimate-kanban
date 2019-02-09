import React from "react";
import ComposerBox from "components/ui/ComposerBox";

const CardEditor = props => {
  const { x, y } = props.location;
  console.log(x, y);
  return (
    <div className="card-editor" style={{ left: x - 8, top: y - 8 }}>
      <ComposerBox transparent type="textarea" buttonText="Save" />
    </div>
  );
};

export default CardEditor;
