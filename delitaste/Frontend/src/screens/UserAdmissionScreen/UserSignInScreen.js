import React from "react";
import {useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import UserSignIn from "components/UserAdmission/UserSignIn";
import { Fragment } from "react";

function UserSignInScreen(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <Fragment>
      <UserSignIn />
    </Fragment>
  );
}

export default withRouter(UserSignInScreen);
