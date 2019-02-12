import React from "react";

import Editor from "components/ui/Editor";

class CreateBoardModal extends React.Component {
  render() {
    return (
      <div className="create-board-modal">
        <Editor
          className="create-board-modal__editor"
          placeholder="Add board title"
          onSubmit={this.props.onSubmit}
        >
          <Editor.Input />
          <Editor.Button content="Create Board" />
        </Editor>
      </div>
    );
  }
}

export default CreateBoardModal;
