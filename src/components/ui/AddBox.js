import React from "react";
import { Input, Icon, Button } from "semantic-ui-react";

import ClickCatcher from "./ClickCatcher";

class AddListBox extends React.Component {
  state = { content: "" };

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
    this.setState({ content: e.target.value });
  };

  handleSubmit = e => {
    if (e.type === "keydown" && e.key !== "Enter") return;
    const content = this.state.content.trim();
    if (!content) return;
    this.setState({ content: "" });
    this.props.onAdd(content);
    this.inputRef.current.focus();
  };

  componentDidMount() {
    const addBoxStyle = this.boxRef.current.style;
    addBoxStyle.opacity = 1;
    addBoxStyle.maxHeight = "120px";
  }

  render() {
    const { content } = this.state;
    const { placeholder, buttonText } = this.props;
    let { className } = this.props;

    return (
      <div className={`composer-box ${className}`} ref={this.boxRef}>
        <div
          className={`composer-box__input ${className &&
            className + "__input"}`}
        >
          <Input
            fluid
            transparent={this.props.transparent}
            autoFocus={true}
            placeholder={placeholder}
            value={content}
            onChange={this.handleInputChange}
            onKeyDown={this.handleSubmit}
            ref={this.inputRef}
          />
        </div>
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

export default AddListBox;
