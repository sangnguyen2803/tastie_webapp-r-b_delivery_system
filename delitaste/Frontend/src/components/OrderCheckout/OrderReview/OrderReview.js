import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { calculateSubTotalPrice } from "utils/BusinessUtils";
import {
  submitOrderCheckoutAPI,
  submitOrderItemAPI,
} from "store/actions/OrderAction/OrderAction";
import "./OrderReview.scss";

function OrderReview(props) {
  const {
    user,
    orderForm,
    setOrderForm,
    submitOrderCheckoutAPI,
    submitOrderItemAPI,
    deliveryOption,
    setDeliveryOption,
  } = props;
  const [subTotal, setSubTotal] = useState();
  const [tip, setTip] = useState(0);
  const [tipOption, setTipOption] = useState(1);
  const tipOptionStyle = { backgroundColor: "#2c2c2c", color: "#ffffff" };
  const submitOrderForm = async () => {
    const { uid } = props.match.params;
    setOrderForm((prevState) => ({
      ...prevState,
      customer_id: uid,
      tips: tip || 0,
    }));
    var code = await submitOrderCheckoutAPI(orderForm);
    if (code && uid !== -1) {
      let submitOrder = await submitOrderItemAPI(uid, code);
      if (submitOrder) props.history.push(`/order-tracking/${code}`);
    }
  };
  useEffect(() => {
    var result;
    if (user.userCart.cart)
      result = calculateSubTotalPrice(user.userCart?.cart);
    setOrderForm((prevState) => ({ ...prevState, subtotal: result }));
    setSubTotal(result);
  }, [user.userCart, setOrderForm]);
  return (
    <Fragment>
      <div className="oc-order-review">
        <div className="oc-or-main-text">
          <span className="oc-or-pre-text">Subtotal</span>
          <span className="oc-or-sur-text">
            {(subTotal && `$${subTotal?.toFixed(2)}`) || ""}
          </span>
        </div>
        <div
          className="oc-or-main-text"
          style={{ paddingBottom: "10px", borderBottom: "2px solid #D6D6D6" }}
        >
          <span className="oc-or-pre-text">Delivery fee</span>
          <span
            className="oc-or-sur-text"
            style={
              deliveryOption === 1 ? { textDecorationLine: "line-through" } : {}
            }
          >
            {(props.deliveryFee && `$${props.deliveryFee?.toFixed(2)}`) ||
              "$ 0.00"}
          </span>
        </div>
        <div className="oc-or-main-text">
          <span className="oc-or-pre-text">Add a tip</span>
        </div>
        <div className="oc-or-sub-text">
          Tip is an optional way to say thanks to your delivery person
        </div>
        <div className="oc-or-radio-button-wrapper">
          <span
            name="option1"
            style={tipOption === 1 ? tipOptionStyle : {}}
            onClick={() => {
              setTipOption(1);
              setTip(0);
            }}
            className="oc-or-rb-option"
          >
            Not now
          </span>
          <span
            name="option2"
            style={tipOption === 2 ? tipOptionStyle : {}}
            onClick={() => {
              setTipOption(2);
              setTip(subTotal * 0.1);
            }}
            className="oc-or-rb-option"
          >
            10%
          </span>
          <span
            name="option3"
            style={tipOption === 3 ? tipOptionStyle : {}}
            onClick={() => {
              setTipOption(3);
              setTip(subTotal * 0.2);
            }}
            className="oc-or-rb-option"
          >
            20%
          </span>
          <span
            name="option4"
            style={tipOption === 4 ? tipOptionStyle : {}}
            onClick={() => {
              setTipOption(4);
              setTip(subTotal * 0.3);
            }}
            className="oc-or-rb-option"
          >
            30%
          </span>
          <span
            name="option5"
            style={tipOption === 5 ? tipOptionStyle : {}}
            onClick={() => {
              setTipOption(5);
            }}
            className="oc-or-rb-option"
          >
            Other
          </span>
        </div>
        <div className="oc-or-input-wrapper">
          <div className="oc-or-input-label">Enter other amount</div>
          <div className="oc-or-input-wrapper">
            $
            <input
              pattern="[0-9]{3}"
              type="text"
              className="oc-or-input-field"
              defaultValue={"0"}
              onChange={(e) => {
                setTip(e.target.value);
              }}
              disabled={tipOption !== 5}
            />
          </div>
        </div>
        <div
          className="oc-or-main-text"
          style={{
            paddingBottom: "10px",
            borderBottom: "2px solid #D6D6D6",
          }}
        >
          <span className="oc-or-pre-text">
            {deliveryOption === 1 ? "Service Tip" : "Shipper Tip"}
          </span>
          <span className="oc-or-sur-text">
            + ${tip !== "" ? parseFloat(tip)?.toFixed(2) : "0.00"}
          </span>
        </div>
        <div className="oc-or-main-text">
          <span className="oc-or-pre-text" style={{ fontSize: 22 }}>
            Total
          </span>
          <span className="oc-or-sur-text" style={{ fontSize: 22 }}>
            ${" "}
            {parseFloat(
              subTotal +
                (tip !== "" ? parseFloat(tip) : 0.0) +
                (deliveryOption === 0 ? props.deliveryFee : 0.0)
            ).toFixed(2)}
          </span>
        </div>{" "}
        {deliveryOption === 0 ? (
          <ButtonGroup float="center">
            <Button
              color={"white"}
              bgColor={"#2c2c2c"}
              justifyContent={"center"}
              gap={"10px"}
              width={120}
              fontSize={15}
              height={35}
              label={"Place Order"}
              onClick={() => submitOrderForm()}
            />
          </ButtonGroup>
        ) : (
          <ButtonGroup float="center">
            <Button
              color={"white"}
              bgColor={"#2c2c2c"}
              justifyContent={"center"}
              gap={"10px"}
              width={120}
              fontSize={15}
              height={35}
              label={"Pick up"}
              onClick={() => submitOrderForm()}
            />
          </ButtonGroup>
        )}
      </div>
    </Fragment>
  );
}

OrderReview.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  submitOrderCheckoutAPI: PropTypes.func.isRequired,
  submitOrderItemAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { submitOrderCheckoutAPI, submitOrderItemAPI })(
    OrderReview
  )
);
