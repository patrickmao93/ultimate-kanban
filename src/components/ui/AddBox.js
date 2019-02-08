import React from "react";
import { Input, Icon, Button } from "semantic-ui-react";

import ClickCatcher from "./ClickCatcher";

class AddListBox extends React.Component {
  state = { title: "" };

  boxRef = React.createRef();
  inputRef = React.createRef();

  handleDismiss = () => {
    const addBoxStyle = this.boxRef.current.style;
    addBoxStyle.opacity = 0;
    addBoxStyle.maxHeight = "56px";
    setTimeout(() => {
      this.props.onDismiss();
    }, 160);
  };

  handleInputChange = e => {
    this.setState({ title: e.target.value });
  };

  handleSubmit = e => {
    if (e.type === "keydown" && e.key !== "Enter") return;
    const title = this.state.title.trim();
    if (!title) return;
    this.setState({ title: "" });
    this.props.onAdd(title);
    this.inputRef.current.focus();
  };

  componentDidMount() {
    const addBoxStyle = this.boxRef.current.style;
    addBoxStyle.opacity = 1;
    addBoxStyle.maxHeight = "120px";
  }

  render() {
    const { placeholder } = this.props;
    const { title } = this.state;
    return (
      <div className="add-box" ref={this.boxRef}>
        <div className="add-box__input">
          <Input
            fluid
            autoFocus={true}
            placeholder={placeholder}
            value={title}
            onChange={this.handleInputChange}
            onKeyDown={this.handleSubmit}
            ref={this.inputRef}
          />
        </div>
        <div className="add-box__ops">
          <Button primary onClick={() => this.handleSubmit(title)}>
            Add List
          </Button>
          <div className="add-box__ops__close" onClick={this.handleDismiss}>
            <Icon name="times" size="large" />
          </div>
        </div>
        <ClickCatcher onDismiss={this.handleDismiss} />
      </div>
    );
  }
}

export default AddListBox;
