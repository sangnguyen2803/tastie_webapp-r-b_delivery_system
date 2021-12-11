import React from "react";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import withAuth from "components/HOC/withAuth";

import { withRouter } from "react-router-dom";
import Home from "components/HomePage/Home";
import { Fragment } from "react";
import Spinner from "components/Commons/Overlay/Spinner/Spinner";

function HomeScreen(props) {
  return <Fragment>{props.isLoader ? <Home /> : null}</Fragment>;
}

export default withRouter(withAuth(HomeScreen));
