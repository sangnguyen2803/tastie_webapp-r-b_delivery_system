import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPercentage, faTrashAlt } from "@fortawesome/fontawesome-free-solid";
import React from "react";
import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import {
  removeProductAPI,
  getProductListAPI,
} from "store/actions/ProductAction/ProductAction";
import { setDialogBox } from "store/actions/UIComponentAction/DialogBoxAction";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DialogBox from "components/Commons/Overlay/DialogBox/DialogBox";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";
import { applyDiscountProviderAPI } from "store/actions/ProviderAction/ProviderAction";
import "style/Common.scss";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
});

function ProductForMenu(props) {
  const { selectedProduct, discounts } = props;
  const [productInDiscount, setProductInDiscount] = useState({});
  const [selectedDiscount, setSelectedDiscount] = useState(
    discounts[0]?.discount_id
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [productIdForDelete, setProductIdForDelete] = useState(-1);
  const showDialogForDelete = (e, productId) => {
    e.stopPropagation();
    setProductIdForDelete(productId);
    setShowDeleteDialog(true);
  };
  const applyDiscount = async (productId, discountId) => {
    console.log(productId, discountId);
    const res = await props.applyDiscountProviderAPI(productId, discountId);
    console.log(res);
    if (res) {
      setShowDiscount(false);
    }
  };
  const removeProduct = async (productId) => {
    if (productId === -1 || !productId) return;
    const { product, user } = props;
    const status = await props.removeProductAPI(productId);
    if (status) {
      if (user.provider_id !== -1 && user.provider_id !== null) {
        const productList = await props.getProductListAPI(user.provider_id);
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
            close={() => setShowDeleteDialog(false)}
          >
            <div className="dialog-detail-wrapper">
              <div className="dialogbox-content">
                <span className="dialogbox-content-detail-main">
                  Are you sure you want to delete this product?
                </span>
                <span className="dialogbox-content-detail-sub">
                  This product will be deleted immediately. You can't undo this
                  action.
                </span>
              </div>
              <div className="dialogbox-action">
                <ButtonGroup gap={5} mgRight={5}>
                  <Button
                    color={"black"}
                    bgColor={"#ECECEC"}
                    justifyContent={"center"}
                    gap={"10px"}
                    width={80}
                    height={30}
                    label={"Cancel"}
                    onClick={() => {
                      setShowDeleteDialog(false);
                    }}
                  />
                  <Button
                    color={"white"}
                    bgColor={"#800000"}
                    justifyContent={"center"}
                    gap={"10px"}
                    width={80}
                    height={30}
                    label={"Delete"}
                    onClick={() => removeProduct(productIdForDelete)}
                  />
                </ButtonGroup>
              </div>
            </div>
          </DialogBox>
          {props.subItems?.map((item, index) => (
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
                      <img alt="product_image" src={item.product_image} />
                    </div>
                    <span className="menu-product-name">
                      {item.product_name}
                    </span>
                    <span className="menu-product-description">
                      {item.description}
                    </span>
                    <span className="menu-product-price">
                      &#36; {item.price?.toFixed(2)}
                    </span>
                    <div className="menu-product-price">
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faTrashAlt}
                        onClick={(e) => showDialogForDelete(e, item.product_id)}
                        style={{ marginRight: "10px" }}
                      />
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faPercentage}
                        onClick={() => {
                          setProductInDiscount(item);
                          setShowDiscount(true);
                        }}
                      />
                    </div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          <Modal
            openModal={showDiscount}
            title={"Pick-up restaurant location"}
            width={30}
            height={450}
            heightAuto={true}
            transparent={0.2}
            closeModal={() => {
              setShowDiscount(false);
            }}
          >
            <Fragment>
              <span className="menu-product-name">
                Product name: {productInDiscount.product_name}
              </span>
              <div className="product-table">
                <table className="table table-wrapper">
                  <tbody className="text-capitalize">
                    <tr className="table-row-wrapper">
                      <th
                        style={{ backgroundColor: "#790000", color: "white" }}
                      >
                        Discount name
                      </th>
                      <th
                        style={{ backgroundColor: "#790000", color: "white" }}
                      >
                        Value
                      </th>
                      <th
                        style={{ backgroundColor: "#790000", color: "white" }}
                      >
                        Remaining
                      </th>
                      <th
                        style={{ backgroundColor: "#790000", color: "white" }}
                      >
                        Expire at
                      </th>
                    </tr>
                    {discounts?.map((d, index) => (
                      <tr
                        className="table-row-wrapper"
                        style={
                          selectedDiscount === d.discount_id
                            ? {
                                backgroundColor: "#F5F5F5",
                                cursor: "pointer",
                                fontWeight: 700,
                              }
                            : { cursor: "pointer" }
                        }
                        onClick={() => {
                          setSelectedDiscount(d.discount_id);
                        }}
                        key={index}
                      >
                        <td>{d.discount_name}</td>
                        <td>{d.discount_value?.toFixed(1) * 100}%</td>
                        <td>{d.limited_offer || "—"}</td>
                        <td
                          style={{
                            textAlign: "center",
                            width: "30%",
                          }}
                        >
                          {new Date(d.expire_at).toLocaleDateString() || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <ButtonGroup width={100} mgTop={10} float="center" mgBottom={15}>
                <Button
                  color={"white"}
                  bgColor={"#101010"}
                  justifyContent={"center"}
                  gap={"10px"}
                  width={120}
                  height={35}
                  label={"Apply Discount"}
                  onClick={() =>
                    applyDiscount(
                      productInDiscount.product_id,
                      selectedDiscount
                    )
                  }
                />
              </ButtonGroup>
            </Fragment>
          </Modal>
        </div>
      )}
    </Droppable>
  );
}

ProductForMenu.propTypes = {
  removeProductAPI: PropTypes.func.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
  applyDiscountProviderAPI: PropTypes.func.isRequired,
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
    applyDiscountProviderAPI,
    setDialogBox,
  })(ProductForMenu)
);
