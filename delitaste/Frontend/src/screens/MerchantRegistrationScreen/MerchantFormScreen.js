import React, { Fragment } from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { setDialogBox } from "store/actions/UIComponentAction/DialogBoxAction";

import MerchantForm from "components/MerchantRegistration/Forms/MerchantForm";
import ServiceInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ServiceInfoForm";
import RegisteredRepresentativeForm from "components/MerchantRegistration/Forms/DetailMerchantForm/RegisteredRepresentativeForm";
import BusinessUnitForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BusinessUnitForm";
import ProductDetailForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ProductDetailForm";
import BankInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BankInfoForm";

import withAuth from "components/HigherOrderComponents(HOC)/withAuth";

function MerchantFormScreen(props) {
  useEffect(() => {
    /*
    if (!props.user.isUserAuthenticated) {
      props.setDialogBox(
        "You must sign up to access to this features.",
        "Warning",
        5000
      );
      props.history.push("/");

      return;
    }
    if (props.merchant.isMerchantAuthenticated) {
      props.setDialogBox(
        "You have already registered a business account in Tastie.",
        "Warning",
        5000
      );
      props.history.push("/");

      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });*/
  }, []);
  return (
    <Fragment>
      <MerchantForm>{props.children}</MerchantForm>
    </Fragment>
  );
}
MerchantFormScreen.propTypes = {
  merchant: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setDialogBox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  merchant: state.ProviderReducer,
});
export default withRouter(
  connect(mapStateToProps, {
    setDialogBox,
  })(withAuth(MerchantFormScreen))
);

/*
        <Switch>
          <Route
            exact
            path={`${match.path}/service`}
            component={ServiceInfoForm}
          />
          <Route
            exact
            path={`${match.path}/representative`}
            component={RegisteredRepresentativeForm}
          />
          <Route
            exact
            path={`${match.path}/business-unit`}
            component={RegisteredRepresentativeForm}
          />
        </Switch>
        */
