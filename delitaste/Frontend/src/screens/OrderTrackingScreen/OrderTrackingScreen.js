import React from "react";
import { withRouter } from "react-router-dom";
import { Fragment } from "react";
import OrderTracking from "components/OrderTracking/OrderTracking";
function OrderTrackingScreen(props) {
  return (
    <Fragment>
      <OrderTracking />
    </Fragment>
  );
}

export default withRouter(OrderTrackingScreen);
