import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Button from "components/Commons/Button/Button";
import CartImage from "assets/cart.png";
import "./Cart.scss";
const Cart = (props) => {
  return (
    <Fragment>
      <div className="cart-content-wrapper">
        <div className="cart-header">
          <div className="cart-title">Burger King - Lyon Garibaldi Davinci</div>
        </div>
        <div className="cart-body">
          <img src={CartImage} className="cart-image" />
          <span className="cart-image-description">
            Add items from a restaurant or store to start a new cart
          </span>
        </div>
        <div className="cart-footer">
          <Button
            color={"white"}
            bgColor={"black"}
            justifyContent={"center"}
            gap={"10px"}
            width={200}
            fontSize={14}
            height={35}
            label={"Go to checkout • $ 3.99"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default withRouter(Cart);
