import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "components/MerchantDashboard/DashboardFeatures/Panel.scss";
import "style/Common.scss";
import "components/MerchantDashboard/DashboardFeatures/MDOrder/OrderHandler/OrderHandler.scss";
import { Formik, ErrorMessage, Form, Field } from "formik";
import CartImage from "assets/cart.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDesktop, faStickyNote } from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import axios from "axios";
import { appendOrderList } from "store/actions/ProviderAction/ProviderAction";
import { updateOrderList } from "store/actions/ProviderAction/ProviderAction";
import { faBiking } from "@fortawesome/free-solid-svg-icons";
function ViewOrderDetail({ orderSummary, orderItems, socket, ...rest }) {
  const [orderStatus, setOrderStatus] = useState(rest.orderStatus);
  const DeclineOrder = async () => {
    const order = {
      order_id: orderSummary.order_id,
      order_code: orderSummary.order_code,
      total_amount: orderSummary.subtotal,
      status: 6,
      user_first_name: "Sang",
      user_last_name: "Nguyen",
      update_at: new Date().toISOString(),
      payment_name: orderSummary.payment_name,
      subtotal: orderSummary.subtotal + orderItems.delivery_fee,
    };
    rest.updateOrderList(order);
    socket.emit("provider-decline-order", orderSummary.order_code);
    try {
      const res = await axios.post("/v1/api/tastie/order/update_order_status", {
        order_code: orderSummary.order_code,
        status: 6, // confirmed
        shipper_id: null, // edit actual shiper_id here
        update_at: new Date().toISOString(),
      });
      setOrderStatus(6);
      rest.setOrderItems([]);
      rest.setOrderSummary(null);
    } catch (error) {
      console.error("Cannot update order status", error);
    }

    return;
  };
  const AcceptOrder = async () => {
    const order = {
      order_id: orderSummary.order_id,
      order_code: orderSummary.order_code,
      total_amount: orderSummary.subtotal || 0,
      status: 3,
      user_first_name: "Sang",
      user_last_name: "Nguyen",
      update_at: new Date().toISOString(),
      payment_name: orderSummary.payment_name || "Cash",
      subtotal: orderSummary.subtotal || 0 + orderItems.delivery_fee || 0,
    };
    rest.appendOrderList(order);
    socket.emit("provider-confirmed", orderSummary.order_code);
    try {
      const res = await axios.post("/v1/api/tastie/order/update_order_status", {
        order_code: orderSummary.order_code,
        status: 3, // confirmed
        shipper_id: null, // edit actual shiper_id here
        update_at: new Date().toISOString(),
      });
      setOrderStatus(3);
      rest.setOrderItems([]);
      rest.setOrderSummary(null);
    } catch (error) {
      console.error("Cannot update order status", error);
    }
    return;
  };

  return orderSummary ? (
    <Fragment>
      <div className="od-handler-wrapper">
        <div className="od-header-wrapper">
          <div className="od-header-title">{orderItems?.merchant_name}</div>
          <div className="od-header-sub-title">{orderSummary?.order_code}</div>
          <div className="od-header-sub-title">
            {orderSummary?.delivery_mode === 1 ? (
              <FontAwesomeIcon icon={faDesktop} />
            ) : (
              <FontAwesomeIcon icon={faBiking} />
            )}
          </div>
        </div>
        <div className="od-body-wrapper">
          {orderItems?.items ? (
            orderItems.items?.map((product, index) => (
              <Fragment key={index}>
                <div className="od-product-box">
                  <div className="od-product-quantity">
                    {product.quantity} &#215;
                  </div>
                  <div className="od-product-image">
                    <img
                      alt="product_image"
                      src={product.image}
                      width={50}
                      height={50}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="od-product-detail-wrapper">
                    <div className="od-product-detail-main">
                      <div className="od-product-detail-name">
                        {product.product_name}
                      </div>
                      <div className="od-product-detail-price">
                        $ {product.price?.toFixed(2)}
                      </div>
                    </div>
                    {product.item_additional_options ? (
                      product.item_additional_options.map((option) => (
                        <div className="od-product-option-wrapper">
                          <div className="od-product-option-label">
                            <div className="od-product-option-name">
                              {option.option_name}
                            </div>
                            <div className="od-product-option-selected">
                              {option.selected_option}
                            </div>
                          </div>
                          <div className="od-product-option-price">
                            {option.option_price}
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {product.special_instruction ? (
                  <div className="note-wrapper">
                    <FontAwesomeIcon
                      className="note-icon"
                      icon={faStickyNote}
                    />
                    **
                    {product.special_instruction}
                  </div>
                ) : (
                  <Fragment></Fragment>
                )}
              </Fragment>
            ))
          ) : (
            <Fragment></Fragment>
          )}
        </div>
        <div className="od-footer-wrapper">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
            }}
          >
            Delivery method:{" "}
            {orderSummary?.delivery_mode === 1 ? (
              <div>
                <FontAwesomeIcon icon={faDesktop} /> Booking Shipper
              </div>
            ) : (
              <div>
                <FontAwesomeIcon icon={faBiking} /> Pick up
              </div>
            )}
          </div>
          <div className="od-footer-row">
            <div className="od-footer-title">Subtotal</div>
            <div className="od-footer-sub-title">
              $ {orderSummary.subtotal?.toFixed(2)}
            </div>
          </div>
          <div className="od-footer-row">
            <div
              className="od-footer-title"
              style={{ fontSize: "12px", color: "rgb(156, 156, 156)" }}
            >
              Delivery Fee
            </div>
            <div
              className="od-footer-sub-title"
              style={{ fontSize: "12px", color: "rgb(156, 156, 156)" }}
            >
              $ {orderSummary.delivery_fee?.toFixed(2) || 0?.toFixed(2)}
            </div>
          </div>
          <div className="od-footer-row">
            <div className="od-footer-title">Total</div>
            <div className="od-footer-sub-title">
              $ {orderSummary.subtotal?.toFixed(2)}
            </div>
          </div>
        </div>
        {rest.orderStatus === 2 && (
          <ButtonGroup
            width={100}
            float={"center"}
            mgTop={20}
            gap={30}
            mgBottom={10}
          >
            <Button
              bgColor={"white"}
              color="black"
              border={"2px solid rgb(170, 170, 170)"}
              buttonType="secondary"
              width={120}
              height={30}
              radius={"0px"}
              label={"Decline"}
              onClick={() => DeclineOrder()}
            />
            <Button
              buttonType="primary"
              width={120}
              height={30}
              radius={"0px"}
              label={"Accept"}
              onClick={() => AcceptOrder()}
            />
          </ButtonGroup>
        )}
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="od-handler-wrapper">
        <div className="cart-body" style={{ justifyContent: "center" }}>
          <img src={CartImage} alt="cart_image" className="cart-image" />
          <span className="cart-image-description" style={{ fontSize: 14 }}>
            Your restaurant or store currently has no new orders.
          </span>
        </div>
      </div>
    </Fragment>
  );
}
ViewOrderDetail.propTypes = {
  appendOrderList: PropTypes.func.isRequired,
  updateOrderList: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, { appendOrderList, updateOrderList })(
    ViewOrderDetail
  )
);
