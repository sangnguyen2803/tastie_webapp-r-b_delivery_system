import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "components/Commons/Button/Button";
import CartImage from "assets/cart.png";
import "./Cart.scss";
import { getCart, removeCartItem } from "store/actions/CartAction/CartAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/fontawesome-free-solid";
import { calculateSubTotalPrice } from "utils/BusinessUtils";

const Cart = (props) => {
  const { user, getCart, removeCartItem } = props;
  const [subTotal, setSubTotal] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  useEffect(() => {
    async function fetchingCart(id) {
      const cart = await getCart(id);
      setCartItemList(cart);
      console.log(cart);
    }
    if (user.isUserAuthenticated) {
      fetchingCart(user.profile?.user_id);
    }
  }, []);
  useEffect(() => {
    var result = 0;
    if (cartItemList?.cart) result = calculateSubTotalPrice(cartItemList.cart);
    setSubTotal(result);
  }, [cartItemList]);

  const removeItemFromCart = (productId, code) => {
    async function removeItem(userId, productId, code) {
      await removeCartItem(userId, productId, code);
      var result = 0;
      if (cartItemList?.cart)
        result = calculateSubTotalPrice(cartItemList.cart);
      setSubTotal(result);
    }
    removeItem(user.profile?.user_id, productId, code);
  };

  return (
    <Fragment>
      <div className="cart-content-wrapper">
        <div className="cart-header">
          <div className="cart-title" style={{ fontSize: 14 }}>
            {cartItemList?.provider_name !== -1
              ? cartItemList?.provider_name
              : ""}
          </div>
        </div>
        {!cartItemList?.cart ? (
          <div className="cart-body" style={{ justifyContent: "center" }}>
            <img src={CartImage} alt="cart_image" className="cart-image" />
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
                <img
                  src={cart.product_image}
                  alt="cart_item_image"
                  className="cart-item-image"
                />
                <div
                  className="cart-main-text-section"
                  onClick={() =>
                    props.history.push(
                      `/provider-detail/${cartItemList.provider_id}`
                    )
                  }
                >
                  <span className="cart-item-main-text">
                    {cart.product_name}
                  </span>
                  {cart?.product_options?.map((option) => (
                    <Fragment>
                      <span className="cart-item-option-text-1">{`${
                        option.label
                      } ${
                        parseInt(option.price) === 0
                          ? "(FREE)"
                          : `(€ ${option.price})`
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
                  € {((cart.product_price || 0.0) * cart.quantity).toFixed(2)}
                </span>
                <span className="cart-surfix-pos-wrapper">
                  <FontAwesomeIcon
                    className="cart-close-icon"
                    onClick={() =>
                      removeItemFromCart(cart.product_id, cart.item_code)
                    }
                    icon={faTimes}
                  />
                </span>
              </div>
            ))}
          </div>
        )}
        {cartItemList?.cart && (
          <div className="cart-footer">
            <Button
              color={"white"}
              bgColor={"#2c2c2c"}
              justifyContent={"center"}
              gap={"10px"}
              width={180}
              fontSize={13}
              height={35}
              label={`Go to checkout • € ${parseFloat(subTotal).toFixed(2)}`}
              onClick={() => {
                props.history.push(`/order-checkout/${user.userCart?.user_id}`);
              }}
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  user: PropTypes.object.isRequired,
  getCart: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});
export default withRouter(
  connect(mapStateToProps, { getCart, removeCartItem })(Cart)
);
