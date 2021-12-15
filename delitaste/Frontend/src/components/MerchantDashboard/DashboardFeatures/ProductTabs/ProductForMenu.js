import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "white",
  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

function ProductForMenu(props) {
  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <Droppable droppableId={props.type} type={`droppableSubItem-${props.type}`}>
      {(provided, snapshot) => (
        <div
          className="menu-product-wrapper"
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {props.subItems.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <div className="menu-table-wrapper">
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="menu-product-item"
                    {...provided.dragHandleProps}
                  >
                    <div className="menu-product-img">
                      <img src={item.picture} height={80} width={80} />
                    </div>
                    <span className="menu-product-name">
                      {item.productName}
                    </span>
                    <span className="menu-product-description">
                      {item.description}
                    </span>
                    <span className="menu-product-price">{item.price}</span>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
export default ProductForMenu;
