import React from "react";
import { withRouter } from "react-router-dom";
import { Fragment } from "react";
import OrderCheckout from "components/OrderCheckout/OrderCheckout";
function OrderCheckoutScreen(props) {
  return (
    <Fragment>
      <OrderCheckout />
    </Fragment>
  );
}

export default withRouter(OrderCheckoutScreen);
