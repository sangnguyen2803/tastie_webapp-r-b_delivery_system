import { Fragment } from "react";
import { Provider } from "react-redux";
import store from "store";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RouteWithSubRoutes from "components/Commons/RouteWithSubRoutes";

import MerchantRegistration from "screens/MerchantRegistrationScreen/MerchantRegistration";
import Homepage from "components/HomePage/Homepage";
import UserRegistrationScreen from "./UserAdmissionScreen/UserRegistrationScreen";
import UserSignInScreen from "./UserAdmissionScreen/UserSignInScreen";

function RootScreen(props) {
  return (
    <Fragment>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/mms" component={MerchantRegistration} />
            <Route exact path="/auth/sign-in" component={UserSignInScreen} />
            <Route path="/auth/sign-up" component={UserRegistrationScreen} />
          </Switch>
        </Router>
      </Provider>
    </Fragment>
  );
}

export default RootScreen;
