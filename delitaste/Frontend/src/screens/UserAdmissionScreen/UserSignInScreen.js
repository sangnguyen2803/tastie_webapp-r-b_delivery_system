import React from "react";
import { withRouter } from "react-router-dom";
import UserSignIn from "components/UserAdmission/UserSignIn";
import { Fragment } from "react";

function UserSignInScreen(props) {
  return (
    <Fragment>
      <UserSignIn />
    </Fragment>
  );
}

export default withRouter(UserSignInScreen);
