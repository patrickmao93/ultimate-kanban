import React from "react";
import { PropTypes } from "prop-types";

class Editable extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    editing: PropTypes.bool,
    content: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onInputClick: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    editing: false
  };

  onInputClick = e => {
    this.props.onInputClick(this.props.id);
  };

  handleFinishEdit = e => {
    if (e.type === "keydown" && e.key !== "Enter") return;

    this.props.onEdit(this.props.id, e.target.value);
  };

  handleFocus = e => {
    e.target.select();
  };

  renderValue = () => {
    return (
      <input
        type="text"
        className={`editable ${this.props.className}`}
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
        className={`editable editable--editing ${this.props.className}`}
        onKeyDown={this.handleFinishEdit}
        onBlur={this.handleFinishEdit}
        defaultValue={this.props.content}
        onFocus={this.handleFocus}
        autoFocus={true}
      />
    );
  };

  render() {
    return this.props.editing ? this.renderEdit() : this.renderValue();
  }
}

export default Editable;
