import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDollarSign, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  removeProductAPI,
  getProductListAPI,
} from "store/actions/ProductAction/ProductAction";
import { setDialogBox } from "store/actions/UIComponentAction/DialogBoxAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DialogBox from "components/Commons/Overlay/DialogBox/DialogBox";

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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [productIdForDelete, setProductIdForDelete] = useState(-1);
  const { selectedProduct } = props;

  const showDialogForDelete = (e, productId) => {
    e.stopPropagation();
    setProductIdForDelete(productId);
    setShowDeleteDialog(true);
  };
  const removeProduct = async (productId) => {
    if (productId === -1 || !productId) return;
    const { product, user } = props;
    const status = await props.removeProductAPI(productId);
    if (status) {
      if (user.providerId !== -1 && user.providerId !== null) {
        const productList = await props.getProductListAPI(user.providerId);
        console.log(productList);
        props.setShowHandlerPanel(0);
        props.setSelectedProduct([]);
        props.setProductForEdit();
        props.setItems(productList);
      }
    }
    setShowDeleteDialog(false);
  };

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
          <DialogBox
            visibility={showDeleteDialog}
            headerText={"Delete"}
            bodyText={"Are you sure you want to delete this item?"}
            confirmOptionHandler={() => removeProduct(productIdForDelete)}
            close={() => setShowDeleteDialog(false)}
            cancelOptionText={"Cancel"}
            confirmOptionText={"Delete"}
          />
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
                    props.setShowHandlerPanel(1);
                    props.setSelectedProduct([item.product_id, props.type]);
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
                    <span className="menu-product-price">
                      &#36; {item.price}
                    </span>
                    <div className="menu-product-price">
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faTrashAlt}
                        onClick={(e) => showDialogForDelete(e, item.product_id)}
                      />
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

ProductForMenu.propTypes = {
  removeProductAPI: PropTypes.func.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
  setDialogBox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    removeProductAPI,
    getProductListAPI,
    setDialogBox,
  })(ProductForMenu)
);
