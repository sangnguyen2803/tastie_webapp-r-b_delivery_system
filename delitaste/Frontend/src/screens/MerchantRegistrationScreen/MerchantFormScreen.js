import React from "react";
import {useState, useEffect } from "react";

import { withRouter } from "react-router-dom";
import MerchantForm from "components/MerchantRegistration/Forms/MerchantForm";
import ServiceInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ServiceInfoForm";
import RegisteredRepresentativeForm from "components/MerchantRegistration/Forms/DetailMerchantForm/RegisteredRepresentativeForm";
import BusinessUnitForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BusinessUnitForm";
import ProductDetailForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ProductDetailForm";
import BankInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BankInfoForm";

function MerchantFormScreen({ match }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  switch (match.params.form) {
    case "service-info":
      return <MerchantForm form={<ServiceInfoForm />} />;
    case "representative-info":
      return <MerchantForm form={<RegisteredRepresentativeForm />} />;
    case "business-unit-info":
      return <MerchantForm form={<BusinessUnitForm />} />;
    case "product-info":
      return <MerchantForm form={<ProductDetailForm />} />;
    case "bank-info":
      return <MerchantForm form={<BankInfoForm />} />;
  }
}

export default withRouter(MerchantFormScreen);
