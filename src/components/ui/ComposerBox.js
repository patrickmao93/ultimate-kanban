import React from "react";
import { Form, Input, TextArea, Icon, Button } from "semantic-ui-react";

import ClickCatcher from "./ClickCatcher";
import { PropTypes } from "prop-types";

class ComposerBox extends React.Component {
  static propTypes = {
    buttonText: PropTypes.string.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    limit: PropTypes.number,
    transparent: PropTypes.bool,
    className: PropTypes.string,
    onDismiss: PropTypes.func,
    onSubmit: PropTypes.func
  };

  state = {
    content: this.props.value || "",
    count: this.props.value ? this.props.value.length : 0,
    error: {}
  };

  boxRef = React.createRef();
  inputRef = React.createRef();

  handleDismiss = () => {
    const addBoxStyle = this.boxRef.current.style;
    addBoxStyle.opacity = 0;
    addBoxStyle.maxHeight = "36px";
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

  handleSubmit = e => {
    if (e.type === "keydown" && e.key !== "Enter") return;
    else if (e.key === "Enter") e.preventDefault(); //prevents textarea from starting new line when pressing Enter
    const content = this.state.content.trim();
    if (!content || this.state.error.exceedMaxCount) return;
    this.setState({ content: "" });
    this.props.onSubmit(content);
    this.inputRef.current.focus();
  };

  componentDidMount() {
    const addBoxStyle = this.boxRef.current.style;
    addBoxStyle.opacity = 1;
    addBoxStyle.maxHeight = "200px";
  }

  render() {
    const { content, error } = this.state;
    const { placeholder, buttonText, type, limit, transparent } = this.props;
    let { className } = this.props;
    let input = null;

    if (type === "textarea") {
      input = (
        <TextArea
          autoHeight
          autoFocus={true}
          placeholder={placeholder}
          value={content}
          onChange={this.handleInputChange}
          onKeyDown={this.handleSubmit}
          ref={this.inputRef}
          onClick={e => e.stopPropagation()}
        />
      );
    } else {
      input = (
        <Input
          fluid
          autoFocus={true}
          placeholder={placeholder}
          value={content}
          onChange={this.handleInputChange}
          onKeyDown={this.handleSubmit}
          ref={this.inputRef}
        />
      );
    }

    return (
      <div
        className={`composer-box ${className} ${transparent &&
          "composer-box--transparent"}`}
        ref={this.boxRef}
      >
        <Form
          className={`composer-box__input ${className &&
            className + "__input"}`}
        >
          <div
            className={`composer-box__input__count ${error.exceedMaxCount &&
              "composer-box__input__count--error"}`}
          >
            <span>{limit && `${this.state.count}/${limit}`}</span>
          </div>
          {input}
        </Form>
        <div
          className={`composer-box__ops ${className && className + "__ops"}`}
        >
          <Button primary onClick={() => this.handleSubmit(content)}>
            {buttonText}
          </Button>
          <div
            className={`composer-box__ops__close ${className &&
              className + "__ops__close"}`}
            onClick={this.handleDismiss}
          >
            <Icon name="times" size="large" />
          </div>
        </div>
        <ClickCatcher onDismiss={this.handleDismiss} />
      </div>
    );
  }
}

export default ComposerBox;
