import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import GuidePage from "components/MerchantRegistration/GuidePage/GuidePage";

function MerchantRegistration(props) {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Route exact path="/mms" component={GuidePage} />
        </Router>
      </Provider>
    </>
  );
}

export default MerchantRegistration;
