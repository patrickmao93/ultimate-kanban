import React from "react";
import { DragSource } from "react-dnd";
import { Icon } from "semantic-ui-react";

import * as ItemTypes from "constants/ItemTypes";
import CardEditor from "./CardEditor";
import Overlay from "../ui/Overlay";

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      listId: props.listId
    };
  },
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDraggin: monitor.isDragging()
  };
};

class Card extends React.Component {
  cardRef = React.createRef();

  getLocation = () => {
    const { x, y } = this.cardRef.current.getClientRects()[0];
    return { x, y };
  };

  renderEditor = () => {
    const { id, content, onUpdate } = this.props;
    const location = this.getLocation();
    return (
      <Overlay onDismiss={() => onUpdate(id, content, false)}>
        <CardEditor
          location={location}
          value={content}
          onUpdate={content => onUpdate(id, content)}
        />
      </Overlay>
    );
  };

  renderCard = () => {
    const { connectDragSource, id, onDelete, editing, content } = this.props;
    return connectDragSource(
      // react-dnd doesn't like refs in outter div
      <div>
        <div
          ref={this.cardRef}
          className="card"
          onClick={() => this.props.onClick(id)}
        >
          <div className="card__labels">
            {/* <Label circular empty color="red" /> */}
          </div>
          <div className="card__content">
            <p>{content}</p>
          </div>
          <div className="card__close" onClick={() => onDelete(id)}>
            <Icon name="times" />
          </div>
          {editing && this.renderEditor()}
        </div>
      </div>
    );
  };

  render() {
    const { isDragging } = this.props;
    return isDragging ? null : this.renderCard();
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
