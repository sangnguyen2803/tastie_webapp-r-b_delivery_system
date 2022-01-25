import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/fontawesome-free-solid";
import React from "react";
import Button from "components/Commons/Button/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
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
  const { setShowHandlerPanel, selectedProduct, setSelectedProduct } = props;
  return (
    <Droppable
      droppableId={String(props.type)}
      type={`droppableSubItem-${props.type}`}
    >
      {(provided, snapshot) => (
        <div
          className="menu-product-wrapper"
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {props.subItems.map((item, index) => (
            <Draggable
              key={String(item.product_id)}
              draggableId={String(item.product_id)}
              index={index}
            >
              {(provided, snapshot) => (
                <div
                  className="menu-table-wrapper"
                  onClick={() => {
                    setShowHandlerPanel(1);
                    setSelectedProduct([item.product_id, props.type]);
                  }}
                  style={{
                    backgroundColor:
                      selectedProduct[0] === item.product_id
                        ? "#E4E4E4"
                        : "white",
                  }}
                >
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="menu-product-item"
                    {...provided.dragHandleProps}
                  >
                    <div className="menu-product-img">
                      <img src={item.product_image} />
                    </div>
                    <span className="menu-product-name">
                      {item.product_name}
                    </span>
                    <span className="menu-product-description">
                      {item.description}
                    </span>
                    <span className="menu-product-price">{item.price}</span>
                    <div className="menu-product-price">
                      <ButtonGroup
                        float="flex-start"
                        mgTop={10}
                        gap={12}
                        mgBottom={5}
                      >
                        <Button
                          onClick={() => {
                            setShowHandlerPanel(1);
                            setSelectedProduct([item.product_id, props.type]);
                          }}
                          color={"black"}
                          bglight={true}
                          border={"#B6B6B6 1px solid"}
                          prefix={
                            <FontAwesomeIcon
                              className="button-icon"
                              icon={faPencilAlt}
                            />
                          }
                          gap={"10px"}
                          justifyContent={"center"}
                          width="80px"
                          height={30}
                          label="Edit"
                        />
                      </ButtonGroup>
                    </div>
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
