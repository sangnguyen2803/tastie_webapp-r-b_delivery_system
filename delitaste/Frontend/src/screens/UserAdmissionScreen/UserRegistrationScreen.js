import React from "react";
import {useState, useEffect } from "react";
import UserRegistration from "components/UserAdmission/UserRegisteration";
import { Fragment } from "react";

function UserRegistrationScreen(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <Fragment>
      <UserRegistration />
    </Fragment>
  );
}

export default UserRegistrationScreen;
