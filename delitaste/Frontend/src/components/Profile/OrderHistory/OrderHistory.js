import withAuth from "components/HigherOrderComponents(HOC)/withAuth";

import React, { Fragment, useState, useEffect } from "react";
import {
  useLocation,
  withRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function OrderHistory(props) {
  return <Fragment>Order history</Fragment>;
}

OrderHistory.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, null)(OrderHistory))
);
