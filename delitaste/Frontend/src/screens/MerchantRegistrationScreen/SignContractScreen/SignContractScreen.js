import React from "react";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import SignContractForm from "components/MerchantRegistration/SignContractForm/SignContractForm";

function SignContractScreen(props) {
  return (
    <Fragment>
      <SignContractForm />
    </Fragment>
  );
}

export default withRouter(SignContractScreen);
