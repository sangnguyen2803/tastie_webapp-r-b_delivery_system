import React from "react";
import { Fragment } from "react";
//scss
import "./UserAdmission.scss";
import "style/Common.scss";
//components
import SignUpForm from "components/UserAdmission/SignUpForm/SignUpForm";
import NavBar from "components/Commons/LayoutComponents/NavBar/NavBar";
import SlideShow from "components/Commons/SlideShow/SlideShow";
import Footer from "components/Commons/LayoutComponents/Footer/Footer";
import ToolBar from "components/Commons/LayoutComponents/Toolbar/Toolbar";
//assets
import Picture1 from "assets/SlideShowImg/Picture1.jpg";
import Picture2 from "assets/SlideShowImg/Picture2.jpg";
import Picture3 from "assets/SlideShowImg/Picture3.jpg";
import Picture4 from "assets/SlideShowImg/Picture4.jpg";

function UserRegistration(props) {
  return (
    <Fragment>
      <div className="login-container">
        <NavBar />
        <div className="login-wrapper">
          <div className="brand-banner">
            <div className="slide-show-wrapper">
              <SlideShow
                interval={8000}
                images={[Picture1, Picture2, Picture3, Picture4]}
              />
            </div>
          </div>
          <SignUpForm />
        </div>
        <Footer />
        <ToolBar />
      </div>
    </Fragment>
  );
}

export default UserRegistration;
