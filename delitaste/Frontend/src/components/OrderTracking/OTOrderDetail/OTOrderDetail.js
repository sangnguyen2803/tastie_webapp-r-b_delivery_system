import { useState, useEffect, Fragment } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./OTOrderDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle, faTimes } from "@fortawesome/fontawesome-free-solid";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function OTOrderDetail(props) {
  const [orderDetail, setOrderDetail] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  useEffect(() => {
    console.log(props.orderItems, props.orderSummary);
  }, [props.orderItems, props.orderSummary]);

  return (
    <Fragment>
      {props.showOrderDetail && (
        <div className="ot-order-detail-container">
          <div className="ot-order-detail-top">
            <span
              className="ot-order-detail-title"
              style={{ fontSize: 14, color: "#810000" }}
            >
              {props.orderSummary.order_code}:
            </span>
            <FontAwesomeIcon
              icon={faTimes}
              className="close-tab-button"
              onClick={() => props.setShowOrderDetail(false)}
            />
          </div>
          <div className="ot-od-items-container">
            {props.orderItems?.items?.map((order, index) => (
              <div key={index} className="oc-od-item-row">
                <div className="oc-od-item-number">
                  <span className="oc-od-item-number-inner">
                    {order.quantity}
                  </span>
                </div>

                <img
                  className="oc-od-item-img"
                  src={order.image}
                  alt={"product_img"}
                />
                <div className="oc-od-item-main-text">
                  <span className="oc-od-mt-1" style={{ fontWeight: 700 }}>
                    {order.product_name}
                  </span>
                  <span className="oc-od-mt-2">
                    € {order.price?.toFixed(2)}
                  </span>
                  {order.special_instruction && (
                    <span className="oc-od-cart-note">
                      Special instruction: {order.special_instruction}
                    </span>
                  )}
                  {order?.product_options?.map((option) => (
                    <div className="oc-od-mt-ao-wrapper">
                      <span className="oc-od-cart-note">{`+ ${
                        option.option_name
                      } ${
                        parseInt(option.price) === 0
                          ? "(FREE)"
                          : `($${option.price})`
                      }:`}</span>
                      <span className="oc-od-cart-note">
                        {` ${option.value} `}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="oc-od-item-sub-text">
                  ${" "}
                  {(
                    parseFloat(order.price) * parseFloat(order.quantity)
                  ).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="ot-od-head">
            {orderDetail?.cart?.map((order) => (
              <div className="ot-od-head-item">
                <div className="ot-od-item-number">
                  <span className="ot-od-item-number-inner">
                    &#xd7; {order?.quantity}
                  </span>
                </div>
                <img
                  className="ot-od-item-img"
                  alt="product_image"
                  src={order?.product_image}
                />
                <div className="ot-od-item-main-text">
                  <span className="ot-od-main">{order?.product_name}</span>
                  <div className="oc-od-item-row-underline ot-od-sub">
                    <div>
                      {order?.product_options?.map((option) => (
                        <Fragment>
                          •{" "}
                          <span className="oc-od-cart-note">{`${
                            option.option_name
                          } ${
                            parseInt(option.price?.toFixed(2)) === 0
                              ? "(FREE)"
                              : `($${option.price?.toFixed(2)})`
                          }:`}</span>
                          <span className="oc-od-cart-note">
                            {` ${option.value} `}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                  </div>
                  {order.note && (
                    <span className="oc-od-cart-note">
                      • NOTE: {order.note}
                    </span>
                  )}
                </div>
                <div className="ot-od-item-sub-text">
                  € {order?.product_price?.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="ot-od-body">
            <div className="ot-od-body-item">
              <span className="ot-od-body-item-left-text">
                <FontAwesomeIcon
                  icon={faDotCircle}
                  style={{ marginRight: 10 }}
                />
                <b>Delivery address:</b> {props.orderSummary.customer_address}
              </span>
            </div>
            <div className="ot-od-body-item">
              <span className="ot-od-body-item-left-text">
                <FontAwesomeIcon icon={faPhone} style={{ marginRight: 10 }} />
                <b>Contact:</b> {props.orderSummary.customer_phone}
              </span>
            </div>
            <div className="ot-od-body-item">
              <span className="ot-od-body-item-left-text">
                Subtotal ({orderDetail?.cart?.length} items)
              </span>
              <span className="ot-od-body-item-right-text">
                $ {props.orderSummary.subtotal?.toFixed(2) || 0?.toFixed(2)}
              </span>
            </div>
            <div className="ot-od-body-item">
              <span className="ot-od-body-item-left-text">Delivery fee</span>
              <span className="ot-od-body-item-right-text">
                $ {props.orderSummary.delivery_fee?.toFixed(2) || 0?.toFixed(2)}
              </span>
            </div>
            <div
              className="ot-od-body-item"
              style={{ color: "rgb(145, 0, 0)" }}
            >
              <span className="ot-od-body-item-left-text">Coupon</span>
              <span className="ot-od-body-item-right-text">
                <span className="ot-od-minus">-</span>$ 1.50
              </span>
            </div>
            <div className="ot-od-body-item">
              <span className="ot-od-body-item-left-text">Tip</span>
              <span className="ot-od-body-item-right-text">
                $ {props.orderSummary.tip?.toFixed(2) || 0?.toFixed(2)}
              </span>
            </div>
            <div className="ot-od-body-item">
              <span className="ot-od-body-item-left-text">Payment method</span>
              <span className="ot-od-body-item-right-text">Cash</span>
            </div>
          </div>
          <div className="ot-od-foot">
            <div className="ot-od-foot-item">
              <span
                className="ot-od-body-item-left-text"
                style={{ fontSize: 15, fontWeight: 700 }}
              >
                Total
              </span>
              <span
                className="ot-od-body-item-right-text"
                style={{ fontSize: 15, fontWeight: 700 }}
              >
                ${" "}
                {(
                  props.orderSummary.subtotal +
                  props.orderSummary.tip +
                  props.orderSummary.delivery_fee
                )?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

OTOrderDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, null)(OTOrderDetail))
);
