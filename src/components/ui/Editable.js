import React from "react";
import { PropTypes } from "prop-types";

class Editable extends React.Component {
  state = { content: this.props.content };
  inputRef = React.createRef();

  static propTypes = {
    id: PropTypes.string,
    editing: PropTypes.bool,
    content: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    editing: false
  };

  handleFinishEdit = e => {
    const { content, id, onEdit } = this.props;
    if (e.type === "keydown" && e.key !== "Enter") return;

    const formatted = this.state.content.trim();
    if (!formatted) {
      this.setState({ content });
      return onEdit(id, content);
    }

    onEdit(id, e.target.value);
  };

  handleInputChange = e => {
    this.setState({ content: e.target.value });
  };

  renderValue = () => {
    return (
      <input
        type="text"
        className={`editable ${this.props.className}`}
        onClick={this.props.onClick}
        value={this.state.content}
        onChange={this.handleInputChange}
        readOnly
      />
    );
  };

  renderEdit = () => {
    return (
      <input
        ref={this.inputRef}
        type="text"
        className={`editable editable--editing ${this.props.className}`}
        onKeyDown={this.handleFinishEdit}
        onBlur={this.handleFinishEdit}
        onChange={this.handleInputChange}
        defaultValue={this.props.content}
        autoFocus={true}
        value={this.state.content}
      />
    );
  };

  componentDidMount() {
    // if (this.inputRef.current) {
    //   this.inputRef.current.select();
    // }
  }

  render() {
    return this.props.editing ? this.renderEdit() : this.renderValue();
  }
}

export default Editable;
