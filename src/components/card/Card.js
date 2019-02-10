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

  renderEditor = () => {
    const location = this.getEditorSpawnLocation();
    return (
      <Overlay
        onDismiss={() =>
          this.props.onUpdate(this.props.id, this.props.content, false)
        }
      >
        <CardEditor
          location={location}
          value={this.props.content}
          onUpdate={content => this.props.onUpdate(this.props.id, content)}
        />
      </Overlay>
    );
  };

  getEditorSpawnLocation = () => {
    const { x, y } = this.cardRef.current.getClientRects()[0];
    return { x, y };
  };

  renderCard = () => {
    const { connectDragSource, children, id, onDelete } = this.props;
    return connectDragSource(
      // react-dnd doesn't like refs in outter div
      <div>
        <div
          ref={this.cardRef}
          className="card"
          onClick={() => this.props.onClick(this.props.id)}
        >
          <div className="card__content">{children}</div>
          <div className="card__close" onClick={() => onDelete(id)}>
            <Icon name="times" />
          </div>
          {this.props.editing && this.renderEditor()}
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
