import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import GuidePage from "components/MerchantRegistration/GuidePage/GuidePage";
import SignContractForm from "components/MerchantRegistration/SignContractForm/SignContractForm";
function MerchantRegistration(props) {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Route
            exact
            path="/mms/merchant-registration"
            component={GuidePage}
          />
          <Route
            exact
            path="/mms/merchant-registration/sign-contract"
            component={SignContractForm}
          />
        </Router>
      </Provider>
    </>
  );
}

export default MerchantRegistration;
