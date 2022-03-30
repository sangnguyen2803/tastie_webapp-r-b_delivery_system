import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import "./OrderReview.scss";

const checkout = {
  provider_id: 1000001,
  provider_name: "Le Pain Quotidien (81 W Broadway)",
  latitude: "10.760489416636473",
  longitude: "106.68064561161064",
  delivery_mode: 3,
  delivery_method: 1, // 1: standard 2:schedule
  payment_method: 1, // 1: cash, 2: momo/zalo pay, 3: credit card
  promo_code: "FREESHIP",
  items: [
    {
      product_id: 1000001,
      product_name: "Smoked Salmon Tartine",
      product_image:
        "https://d1ralsognjng37.cloudfront.net/e0fbee37-a7f4-4bb9-aeed-8f2bd60ea470.jpeg",
      product_options: [
        {
          label: "Choose Bread",
          value: "SuperSeed Bread",
          price: 0,
        },
        {
          label: "Add Edd?",
          value: "Add Soft Boiled Egg",
          price: 0,
        },
      ],
      quantity: 1,
      product_price: 15,
      special_instruction: "",
    },
    {
      product_id: 1000002,
      product_name: "Organic Apple Juice",
      product_image:
        "https://d1ralsognjng37.cloudfront.net/c12a87ff-1f7b-4e45-9b79-c1e8333f59e9.jpeg",
      product_options: [],
      quantity: 1,
      product_price: 5,
      special_instruction: "",
    },
  ],
  subtotal: 20.0,
  delivery_fee: 1.5,
  tips: "10%",
  total: 22.5,
};

function OrderReview(props) {
  return (
    <Fragment>
      <div className="oc-order-review">
        <div className="oc-or-main-text">
          <span className="oc-or-pre-text">Subtotal</span>
          <span className="oc-or-sur-text">${checkout.subtotal}</span>
        </div>
        <div
          className="oc-or-main-text"
          style={{ paddingBottom: "10px", borderBottom: "2px solid #D6D6D6" }}
        >
          <span className="oc-or-pre-text">Delivery fee</span>
          <span className="oc-or-sur-text">${checkout.delivery_fee}</span>
        </div>
        <div className="oc-or-main-text">
          <span className="oc-or-pre-text">Add a tip</span>
        </div>
        <div className="oc-or-sub-text">
          Tip is an optional way to say thanks to your delivery person
        </div>
        <div className="oc-or-radio-button-wrapper">
          <span name="option1" className="oc-or-rb-option">
            Not now
          </span>
          <span name="option2" className="oc-or-rb-option">
            10%
          </span>
          <span name="option3" className="oc-or-rb-option">
            20%
          </span>
          <span name="option4" className="oc-or-rb-option">
            30%
          </span>
          <span name="option5" className="oc-or-rb-option">
            Other
          </span>
        </div>
        <div className="oc-or-input-wrapper">
          <div className="oc-or-input-label">Enter other amount</div>
          <div className="oc-or-input-wrapper">
            $
            <input
              type="text"
              className="oc-or-input-field"
              defaultValue={"0"}
            />
          </div>
        </div>
        <div
          className="oc-or-main-text"
          style={{ paddingBottom: "10px", borderBottom: "2px solid #D6D6D6" }}
        >
          <span className="oc-or-pre-text">Tip</span>
          <span className="oc-or-sur-text">+ $0</span>
        </div>{" "}
        <div className="oc-or-main-text">
          <span className="oc-or-pre-text" style={{ fontSize: 22 }}>
            Total
          </span>
          <span className="oc-or-sur-text" style={{ fontSize: 22 }}>
            $21.5
          </span>
        </div>{" "}
        <ButtonGroup float="center">
          <Button
            color={"white"}
            bgColor={"black"}
            justifyContent={"center"}
            gap={"10px"}
            width={130}
            fontSize={15}
            height={40}
            label={"Place Order"}
          />
        </ButtonGroup>
      </div>
    </Fragment>
  );
}

OrderReview.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(connect(mapStateToProps, null)(OrderReview));
