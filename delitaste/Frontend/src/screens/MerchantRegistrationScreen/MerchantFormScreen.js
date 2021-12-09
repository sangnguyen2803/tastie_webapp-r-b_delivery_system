import React, { Fragment } from "react";
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { setDialogBox } from "store/actions/UIComponents/DialogBoxAction";

import MerchantForm from "components/MerchantRegistration/Forms/MerchantForm";
import ServiceInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ServiceInfoForm";
import RegisteredRepresentativeForm from "components/MerchantRegistration/Forms/DetailMerchantForm/RegisteredRepresentativeForm";
import BusinessUnitForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BusinessUnitForm";
import ProductDetailForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ProductDetailForm";
import BankInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BankInfoForm";

function MerchantFormScreen(props) {
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
  const mapMerchantForm = () => {
    switch (props.match.params.form) {
      case "service-info":
        return <ServiceInfoForm />;
      case "representative-info":
        return <RegisteredRepresentativeForm />;
      case "business-unit-info":
        return <BusinessUnitForm />;
      case "product-info":
        return <ProductDetailForm />;
      case "bank-info":
        return <BankInfoForm />;
      case "four":
        return <ComponentD />;
      default:
        return <h1>No project match</h1>;
    }
  };
  return (
    <Fragment>
      <MerchantForm>{mapMerchantForm()}</MerchantForm>
    </Fragment>
  );
}
MerchantFormScreen.propTypes = {
  merchant: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setDialogBox: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.RegistrationReducers,
  merchant: state.MerchantRegistrationReducers,
});
export default withRouter(
  connect(mapStateToProps, {
    setDialogBox,
  })(MerchantFormScreen)
);
