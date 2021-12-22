import React, { Fragment } from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { Route, withRouter, Switch } from "react-router-dom";
import PropTypes from "prop-types";

import { setDialogBox } from "store/actions/UIComponents/DialogBoxAction";

import MerchantForm from "components/MerchantRegistration/Forms/MerchantForm";
import ServiceInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ServiceInfoForm";
import RegisteredRepresentativeForm from "components/MerchantRegistration/Forms/DetailMerchantForm/RegisteredRepresentativeForm";
import BusinessUnitForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BusinessUnitForm";
import ProductDetailForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ProductDetailForm";
import BankInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BankInfoForm";

import withAuth from "components/HigherOrderComponents(HOC)/withAuth";

function MerchantFormScreen(props) {
  /*
  useEffect(() => {
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
    });
  }, []);
  */
  /*
  const mapMerchantForm = () => {
    switch (match.path) {
      case "service-info":
        return <ServiceInfoForm />;
      case "/:id/representative-info":
        return <RegisteredRepresentativeForm />;
      case "/:id/business-unit-info":
        return <BusinessUnitForm />;
      case "/:id/product-info":
        return <ProductDetailForm />;
      case "/:id/bank-info":
        return <BankInfoForm />;
      default:
        return <h1>No project match</h1>;
    }
  };*/
  const { match } = props;
  return (
    <Fragment>
      <MerchantForm>
        <Switch>
          <Route
            exact
            path={`${match.path}/:id/service`}
            component={ServiceInfoForm}
          />
          <Route
            exact
            path={`${match.path}/:id/representative`}
            component={RegisteredRepresentativeForm}
          />
          <Route
            exact
            path={`${match.path}/:id/business-unit`}
            component={BusinessUnitForm}
          />
          <Route
            exact
            path={`${match.path}/:id/merchandise`}
            component={ServiceInfoForm}
          />
          <Route
            exact
            path={`${match.path}/:id/bank`}
            component={BankInfoForm}
          />
        </Switch>
      </MerchantForm>
    </Fragment>
  );
}
MerchantFormScreen.propTypes = {
  merchant: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setDialogBox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducers,
  merchant: state.MerchantRegistrationReducers,
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
