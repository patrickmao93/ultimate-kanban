import React from "react";
import { DragSource } from "react-dnd";

import * as ItemTypes from "constants/ItemTypes";

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
  render() {
    const { isDragging, connectDragSource } = this.props;
    const { id, children, onDelete } = this.props;
    return connectDragSource(
      <div className="card">
        <div className="card__content">{children}</div>
        <div className="card__close" onClick={() => onDelete(id)}>
          <i className="fas fa-times" />
        </div>
      </div>
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
