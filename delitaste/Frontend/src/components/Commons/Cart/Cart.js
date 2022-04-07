import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Button from "components/Commons/Button/Button";
import CartImage from "assets/cart.png";
import "./Cart.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Cart = (props) => {
  const [cartItemList, setCartItemList] = useState([]);
  useEffect(() => {
    const cart = JSON.parse(
      JSON.parse(localStorage.getItem("persist:user")).userCart
    );
    setCartItemList(cart);
  }, []);
  return (
    <Fragment>
      <div className="cart-content-wrapper">
        <div className="cart-header">
          <div className="cart-title">Burger King - Lyon Garibaldi Davinci</div>
        </div>
        {cartItemList?.cart?.length === 0 ? (
          <div className="cart-body" style={{ justifyContent: "center" }}>
            <img src={CartImage} className="cart-image" />
            <span className="cart-image-description">
              Add items from a restaurant or store to start a new cart
            </span>
          </div>
        ) : (
          <div className="cart-body">
            {cartItemList?.cart?.map((cart) => (
              <div className="cart-item-wrapper" key={cart.product_id}>
                <span className="cart-item-quantity">
                  &times; {cart.quantity}
                </span>
                <img src={cart.product_image} className="cart-item-image" />
                <div className="cart-main-text-section">
                  <span className="cart-item-main-text">
                    {cart.product_name}
                  </span>
                  {cart?.product_options?.map((option) => (
                    <Fragment>
                      <span className="cart-item-option-text-1">{`${
                        option.option_name
                      } ${
                        parseInt(option.price) === 0
                          ? "(FREE)"
                          : `(€ ${option.price.toFixed(2)})`
                      }:`}</span>
                      <span className="cart-item-option-text-2">
                        • {`${option.value} `}
                      </span>
                    </Fragment>
                  ))}
                  {cart.note && (
                    <span className="cart-note">• NOTE: {cart.note}</span>
                  )}
                </div>
                <span className="cart-item-sub-text">
                  € {cart?.totalPrice?.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
        {cartItemList?.cart?.length !== 0 && (
          <div className="cart-footer">
            <Button
              color={"white"}
              bgColor={"black"}
              justifyContent={"center"}
              gap={"10px"}
              width={180}
              fontSize={13}
              height={35}
              label={"Go to checkout • $ 3.99"}
              onClick={() => {
                props.history.push("/order-checkout");
              }}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default withRouter(Cart);
