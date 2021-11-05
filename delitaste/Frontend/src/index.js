import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import UserAdmission from "screens/UserAdmissionScreen/UserAdmission";
import MerchantRegistration from "./screens/MerchantRegistrationScreen/MerchantRegistration";
import Homepage from "./components/HomePage/Homepage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/home" component={Homepage} />
        <Route path="/auth" component={UserAdmission} />
        <Route path="/mms" component={MerchantRegistration} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
