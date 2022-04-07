import { useState, useEffect, Fragment } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./OTOrderDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";

function OTOrderDetail(props) {
  const [orderDetail, setOrderDetail] = useState([]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  useEffect(() => {
    //fetching from database only
    async function fetchingOrderDetail() {}
    if (!localStorage.getItem("persist:user")) return;
    const cart = JSON.parse(
      JSON.parse(localStorage.getItem("persist:user")).userCart
    );
    setOrderDetail(cart);
  }, []);

  return (
    <Fragment>
      {props.showOrderDetail && (
        <div className="ot-order-detail-container">
          <div className="ot-order-detail-top">
            <span className="ot-order-detail-title">Your items</span>
            <FontAwesomeIcon
              icon={faTimes}
              className="close-tab-button"
              onClick={() => props.setShowOrderDetail(false)}
            />
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
                Subtotal ({orderDetail?.cart?.length} items)
              </span>
              <span className="ot-od-body-item-right-text">€ 33.00</span>
            </div>
            <div className="ot-od-body-item">
              <span className="ot-od-body-item-left-text">Delivery fee</span>
              <span className="ot-od-body-item-right-text">€ 1.50</span>
            </div>
            <div
              className="ot-od-body-item"
              style={{ color: "rgb(145, 0, 0)" }}
            >
              <span className="ot-od-body-item-left-text">Coupon</span>
              <span className="ot-od-body-item-right-text"><span className="ot-od-minus">-</span>€ 1.50</span>
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
                style={{ fontSize: 16, fontWeight: 700 }}
              >
                Total
              </span>
              <span
                className="ot-od-body-item-right-text"
                style={{ fontSize: 16, fontWeight: 700 }}
              >
                € 33.00
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
