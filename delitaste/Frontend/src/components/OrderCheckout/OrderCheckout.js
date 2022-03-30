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

function OrderCheckout(props) {
  const [orderItem, setOrderItem] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("persist:user")) return;
    const cart = JSON.parse(
      JSON.parse(localStorage.getItem("persist:user")).userCart
    );

    setOrderItem(cart);
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <Fragment>
      <NavBar fixed={true} />
      <div className="order-checkout-container">
        <OrderDetail orderItem={orderItem} setOrderItem={setOrderItem} />
        <OrderReview orderItem={orderItem} setOrderItem={setOrderItem} />
      </div>
      <Footer />
      <ToolBar />
    </Fragment>
  );
}

OrderCheckout.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, null)(OrderCheckout))
);
