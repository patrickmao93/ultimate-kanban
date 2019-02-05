import React from "react";
import { PropTypes } from "prop-types";

class Editable extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    editing: PropTypes.bool.isRequired,
    content: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onInputClick: PropTypes.func.isRequired
  };

  state = { beforeEdit: "" };

  onInputClick = e => {
    this.setState({ beforeEdit: e.target.value });
    this.props.onInputClick(this.props.id);
  };

  handleFinishEdit = e => {
    if (e.type === "keydown" && e.key !== "Enter" && e.key !== "Escape") return;

    if (e.key === "Escape") {
      this.props.onEdit(this.props.id, this.state.beforeEdit); // BUG: doesn't return input to original state
      return;
    }

    this.props.onEdit(this.props.id, e.target.value);
  };

  renderValue = () => {
    return (
      <input
        type="text"
        className="editable"
        onClick={this.onInputClick}
        defaultValue={this.props.content}
        readOnly
      />
    );
  };

  renderEdit = () => {
    return (
      <input
        type="text"
        className="editable editable--editing"
        onKeyDown={this.handleFinishEdit}
        onBlur={this.handleFinishEdit}
        defaultValue={this.props.content}
      />
    );
  };

  render() {
    return this.props.editing ? this.renderEdit() : this.renderValue();
  }
}

export default Editable;
