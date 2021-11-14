import React from "react";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import MerchantForm from "components/MerchantRegistration/Forms/MerchantForm";
function MerchantFormScreen(props) {
  const step = 1;
  switch (step) {
    case 1:
      return <MerchantForm />;
    default:
      return <h1>Hello</h1>;
  }
}

export default withRouter(MerchantFormScreen);
