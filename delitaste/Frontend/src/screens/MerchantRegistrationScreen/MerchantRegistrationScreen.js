import React from "react";
import { useState, useEffect } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import GuidePage from "components/MerchantRegistration/GuidePage/GuidePage";
function MerchantRegistrationScreen(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <Fragment>
      <GuidePage />
    </Fragment>
  );
}

export default withRouter(withAuth(MerchantRegistrationScreen));
