import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./UserAdmission.css";
import LoginForm from "components/UserAdmission/LoginForm/LoginForm";
import SignUpForm from "components/UserAdmission/SignUpForm/SignUpForm";

import NavBar from "components/Common/NavBar/NavBar";
import SlideShow from "components/Common/SlideShow/SlideShow";
import Footer from "components/Common/Footer/Footer";
import ToolBar from "components/Common//Toolbar/Toolbar";

import Picture1 from "assets/SlideShowImg/Picture1.jpg";
import Picture2 from "assets/SlideShowImg/Picture2.jpg";
import Picture3 from "assets/SlideShowImg/Picture3.jpg";
import Picture4 from "assets/SlideShowImg/Picture4.jpg";

import { Provider } from "react-redux";
import store from "store";

function LoginPage(props) {
  return (
    <div className="user-admission">
      <Provider store={store}>
        <Router>
          <div className="login-container">
            <NavBar />
            <div className="login-wrapper">
              <div className="brand-banner">
                <div className="slide-show-wrapper">
                  <SlideShow
                    interval={8000}
                    images={[Picture1, Picture2, Picture3, Picture4]}
                  />
                  <div className="hotline s-label">Hotline: 1900-6403</div>
                </div>
              </div>
              <Switch>
                <Route path="/auth/sign-in" component={LoginForm} />
                <Route path="/auth/sign-up" component={SignUpForm} />
              </Switch>
            </div>
            <Footer />
            <ToolBar />
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default LoginPage;
