import React from "react";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import SignContractForm from "components/MerchantRegistration/SignContractForm/SignContractForm";

function SignContractScreen(props) {
  return (
    <Fragment>
      <SignContractForm />
    </Fragment>
  );
}

export default withRouter(withAuth(SignContractScreen));
