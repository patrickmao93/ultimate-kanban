import React from "react";
import { PropTypes } from "prop-types";
import { Input, TextArea, Button, Form, Ref } from "semantic-ui-react";

import ClickCatcher from "./ClickCatcher";

class Editor extends React.Component {
  state = {
    content: this.props.value || "",
    count: this.props.value ? this.props.value.length : 0,
    error: {}
  };
  editorRef = React.createRef();
  inputRef = React.createRef();

  static propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    limit: PropTypes.number,
    className: PropTypes.string,
    onDismiss: PropTypes.func,
    onSubmit: PropTypes.func
  };

  static Input = Input;
  static TextArea = TextArea;
  static Button = Button;

  handleDismiss = () => {
    const style = this.editorRef.current.style;
    style.opacity = 0;
    style.maxHeight = "36px";

    setTimeout(() => {
      this.props.onDismiss();
    }, 160);
  };

  handleInputChange = e => {
    if (!this.props.limit) {
      return this.setState({ content: e.target.value });
    }
    //if limit is set, check if input length exceeds limit
    const count = e.target.value.trim().length;
    if (count >= this.props.limit) {
      this.setState({ error: { exceedMaxCount: true } });
    } else if (this.state.error.exceedMaxCount) {
      this.setState({ error: { exceedMaxCount: false } });
    }
    this.setState({ content: e.target.value, count });
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      return this.handleSubmit(e);
    }
  };

  handleSubmit = e => {
    e && e.preventDefault();
    const content = this.state.content.trim();
    if (!content || this.state.error.exceedMaxCount) return;
    this.setState({ content: "" });
    this.inputRef.current.focus();

    this.props.onSubmit(content);
  };

  //renders Input component
  renderInput = child => {
    const { placeholder } = this.props;

    return (
      <div className={`editor__input`}>
        {React.cloneElement(child, {
          placeholder,
          value: this.state.content,
          onChange: this.handleInputChange,
          onKeyDown: this.handleKeyDown,
          ref: this.inputRef
        })}
        {this.renderCount()}
      </div>
    );
  };

  //renders Input component
  renderTextArea = child => {
    const { placeholder } = this.props;

    return (
      <div className={`editor__textarea`}>
        <Ref innerRef={this.inputRef}>
          {React.cloneElement(child, {
            placeholder,
            value: this.state.content,
            onChange: this.handleInputChange,
            onKeyDown: this.handleKeyDown
          })}
        </Ref>
        {this.renderCount()}
      </div>
    );
  };

  renderCount = () => {
    const { limit } = this.props;
    const { count, error } = this.state;

    return (
      <div
        className={`editor__count ${error.exceedMaxCount &&
          "editor__count--error"}`}
      >
        <span>{limit && count + "/" + limit}</span>
      </div>
    );
  };

  renderButton = child => {
    return (
      <div className="editor__button">
        {React.cloneElement(child, {
          primary: true,
          onClick: this.handleSubmit
        })}
      </div>
    );
  };

  renderChildren = () => {
    const { children } = this.props;
    return React.Children.map(children, child => {
      const name = child.type.name;
      switch (name) {
        case "Input":
          return this.renderInput(child);
        case "TextArea":
          return this.renderTextArea(child);
        case "Button":
          return this.renderButton(child);
        default:
          return child;
      }
    });
  };

  componentDidMount() {
    this.inputRef.current.focus();
    this.inputRef.current.select();

    const style = this.editorRef.current.style;
    style.opacity = 1;
    style.maxHeight = "200px";
  }

  render() {
    const { className } = this.props;
    return (
      <Ref innerRef={this.editorRef}>
        <Form className={`editor ${className}`} onSubmit={this.handleSubmit}>
          {this.renderChildren()}
          <ClickCatcher onDismiss={this.handleDismiss} />
        </Form>
      </Ref>
    );
  }
}

export default Editor;
