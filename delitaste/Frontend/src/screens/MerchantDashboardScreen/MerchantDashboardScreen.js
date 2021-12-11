import React, { Fragment } from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import RouteWithSubRoutes from "components/Commons/RouteWithSubRoutes";
import { setDialogBox } from "store/actions/UIComponents/DialogBoxAction";
import { Route } from "react-router-dom";
import withAuth from "components/HOC/withAuth";
import { routes } from "config/routes";
import LoginForm from "components/UserAdmission/LoginForm/LoginForm";
import NavBar from "components/Commons/Layout/NavBar/NavBar";

function MerchantDashboardScreen(props) {
  useEffect(() => console.log(props));
  const { match, routes } = props;

  return (
    <Fragment>
      hello
      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </Fragment>
  );
}
MerchantDashboardScreen.propTypes = {
  merchant: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducers,
  merchant: state.MerchantRegistrationReducers,
});
export default withRouter(
  connect(mapStateToProps, null)(withAuth(MerchantDashboardScreen))
);
