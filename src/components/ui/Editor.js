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

  componentDidMount() {
    this.inputRef.current.focus();
    this.inputRef.current.select();
  }

  //renders either input or textarea
  renderInput = child => {
    const { className, placeholder, limit } = this.props;
    const { count, error } = this.state;

    const renderCount = () => {
      let countClassName = "editor__input__count ";
      if (error.exceedMaxCount) {
        countClassName += "editor__input__count--error";
      }

      if (className) {
        countClassName = className + "__input__count ";
        if (error.exceedMaxCount) {
          countClassName += className + "__input__count--error";
        }
      }

      return (
        <div className={countClassName}>
          <span>{limit && count + "/" + limit}</span>
        </div>
      );
    };

    return (
      <div className={className ? className + "__input" : "editor__input"}>
        <Ref innerRef={this.inputRef}>
          {React.cloneElement(child, {
            placeholder,
            value: this.state.content,
            onChange: this.handleInputChange,
            onKeyDown: this.handleKeyDown
          })}
        </Ref>
        {renderCount()}
      </div>
    );
  };

  renderButton = child => {
    const { className } = this.props;
    return (
      <div className={className ? className + "__button" : "editor__button"}>
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
        case "TextArea":
          return this.renderInput(child);
        case "Button":
          return this.renderButton(child);
        default:
          return child;
      }
    });
  };

  render() {
    const { className, onDismiss } = this.props;
    return (
      <Form className={className || "editor"} onSubmit={this.handleSubmit}>
        {this.renderChildren()}
        <ClickCatcher onDismiss={onDismiss} />
      </Form>
    );
  }
}

export default Editor;
