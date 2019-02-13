import React from "react";
import { PropTypes } from "prop-types";
import { Form, Ref } from "semantic-ui-react";
// import { Input, TextArea, Button, Form, Ref } from "semantic-ui-react";
// When produce minified build "child.type.name" doesn't work, plus I don't
// have access to the semantic components so I wrapped them in my component
import Button from "./form/Button";
import Input from "./form/Input";
import TextArea from "./form/TextArea";

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

  handleClick = e => {
    e.stopPropagation();
  };

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
      <div className="editor__input">
        {React.cloneElement(child, {
          placeholder,
          value: this.state.content,
          onChange: this.handleInputChange,
          onKeyDown: this.handleKeyDown,
          forwardref: this.inputRef
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
      const name = child.type.displayName;
      switch (name) {
        case "input":
          return this.renderInput(child);
        case "textarea":
          return this.renderTextArea(child);
        case "button":
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
        <Form
          className={`editor ${className || ""}`}
          onSubmit={this.handleSubmit}
          onClick={this.handleClick}
        >
          {this.renderChildren()}
          <ClickCatcher onDismiss={this.handleDismiss} />
        </Form>
      </Ref>
    );
  }
}

export default Editor;
