import React from "react";

import { withRouter } from "react-router-dom";
import MerchantForm from "components/MerchantRegistration/Forms/MerchantForm";
import ServiceInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ServiceInfoForm";
import RegisteredRepresentativeForm from "components/MerchantRegistration/Forms/DetailMerchantForm/RegisteredRepresentativeForm";
import BusinessUnitForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BusinessUnitForm";
import ProductDetailForm from "components/MerchantRegistration/Forms/DetailMerchantForm/ProductDetailForm";
import BankInfoForm from "components/MerchantRegistration/Forms/DetailMerchantForm/BankInfoForm";

function MerchantFormScreen({ match }) {
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
