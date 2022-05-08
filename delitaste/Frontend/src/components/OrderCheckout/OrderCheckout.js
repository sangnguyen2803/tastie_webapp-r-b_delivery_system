import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import React, { Fragment, useState, useEffect } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./OrderCheckout.scss";
import OrderDetail from "components/OrderCheckout/OrderDetail/OrderDetail";
import OrderReview from "components/OrderCheckout/OrderReview/OrderReview";
import { getCart } from "store/actions/CartAction/CartAction";
function OrderCheckout(props) {
  const { user, getCart } = props;
  const [orderForm, setOrderForm] = useState({
    delivery_mode: 1,
    customer_id: props.match.params.uid,
    customer_phone: "",
    delivery_address: "",
    delivery_method: 1,
    delivery_fee: 0,
    ecoupon_code: "",
    payment_method: 1,
    payment_status: 1,
    promotion_code: "",
    schedule_time: "",
    subtotal: 0,
    tips: 0,
    total: 0,
  });
  const [deliveryFee, setDeliveryFee] = useState(0); //(1)
  const [orderItem, setOrderItem] = useState([]);
  useEffect(() => {
    async function fetchingCart(id) {
      const cart = await getCart(id);
      setOrderItem(cart);
    }
    if (user.isUserAuthenticated) {
      fetchingCart(props.match.params.uid || user.profile.user_id);
    }
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <Fragment>
      <NavBar fixed={true} />
      <div className="order-checkout-container">
        <OrderDetail
          orderForm={orderForm}
          setOrderForm={setOrderForm}
          deliveryFee={deliveryFee}
          setDeliveryFee={setDeliveryFee}
        />
        <OrderReview
          orderForm={orderForm}
          setOrderForm={setOrderForm}
          deliveryFee={deliveryFee}
          setDeliveryFee={setDeliveryFee}
        />
      </div>
      <Footer />
      <ToolBar />
    </Fragment>
  );
}

OrderCheckout.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, { getCart })(OrderCheckout))
);
