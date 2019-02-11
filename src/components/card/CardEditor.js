import React from "react";

import Editor from "./../ui/Editor";

const CardEditor = props => {
  const { onUpdate, value } = props;
  const { x, y } = props.location;
  return (
    <div className="card-editor" style={{ left: x - 8, top: y - 8 }}>
      <Editor onSubmit={onUpdate} value={value} limit={80}>
        <Editor.TextArea autoHeight />
        <Editor.Button content="Save" />
      </Editor>
    </div>
  );
};

export default CardEditor;
