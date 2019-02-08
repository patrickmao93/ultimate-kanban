import React from "react";
import { Input, Icon } from "semantic-ui-react";

class AddListBox extends React.Component {
  boxRef = React.createRef();

  handleDismiss = () => {
    const addBoxStyle = this.boxRef.current.style;
    addBoxStyle.opacity = 0;
    addBoxStyle.maxHeight = "56px";
    setTimeout(() => {
      this.props.onDismiss();
    }, 160);
  };

  componentDidMount() {
    const addBoxStyle = this.boxRef.current.style;
    addBoxStyle.opacity = 1;
    addBoxStyle.maxHeight = "120px";
  }

  render() {
    const { placeholder, onAdd, onDismiss, children } = this.props;
    return (
      <div className="add-box" ref={this.boxRef}>
        <div className="add-box__input">
          <Input fluid autoFocus={true} placeholder={placeholder} />
        </div>
        <div className="add-box__ops">
          {children}
          <div className="add-box__ops__close" onClick={this.handleDismiss}>
            <Icon name="times" size="large" />
          </div>
        </div>
      </div>
    );
  }
}

export default AddListBox;
