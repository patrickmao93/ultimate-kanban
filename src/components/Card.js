import React from "react";
import { DragSource } from "react-dnd";
import { Icon } from "semantic-ui-react";

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
  renderCard() {
    const { connectDragSource, children, id, onDelete } = this.props;
    return connectDragSource(
      <div className="card">
        <div className="card__content">{children}</div>
        <div className="card__close" onClick={() => onDelete(id)}>
          <Icon name="times" />
        </div>
      </div>
    );
  }

  render() {
    const { isDragging } = this.props;
    return isDragging ? null : this.renderCard();
  }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);
