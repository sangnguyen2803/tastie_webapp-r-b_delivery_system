import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { setDialogBox } from "store/actions/UIComponents/DialogBoxAction";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
//components
import MerchantDashboard from "components/MerchantDashboard/MerchantDashboard";

function MerchantDashboardScreen(props) {
  return (
    <Fragment>
      <MerchantDashboard />
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
