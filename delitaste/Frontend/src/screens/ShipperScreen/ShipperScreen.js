import React from "react";
import { withRouter } from "react-router-dom";
import { Fragment } from "react";
import Shipper from "components/Shipper/Shipper";
function ShipperScreen(props) {
  return (
    <Fragment>
      <Shipper />
    </Fragment>
  );
}

export default withRouter(ShipperScreen);
