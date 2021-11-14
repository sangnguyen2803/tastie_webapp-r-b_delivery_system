import React from "react";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import GuidePage from "components/MerchantRegistration/GuidePage/GuidePage";
function MerchantRegistrationScreen(props) {
  return (
    <Fragment>
      <GuidePage />
    </Fragment>
  );
}

export default withRouter(MerchantRegistrationScreen);
