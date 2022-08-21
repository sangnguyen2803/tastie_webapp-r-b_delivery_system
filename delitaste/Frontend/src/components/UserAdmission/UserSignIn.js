import React from "react";
import { Fragment } from "react";
import { withRouter } from "react-router-dom";
import "style/Common.scss";

//css
import "components/UserAdmission/UserAdmission.scss";
//components
import LoginForm from "components/UserAdmission/LoginForm/LoginForm";
import NavBar from "components/Commons/Layout/NavBar/NavBar";
import SlideShow from "components/Commons/SlideShow/SlideShow";
import Footer from "components/Commons/Layout/Footer/Footer";
import ToolBar from "components/Commons/Layout/Toolbar/Toolbar";

//assets
import Picture1 from "assets/SlideShowImg/Picture1.jpg";
import Picture2 from "assets/SlideShowImg/Picture2.jpg";
import Picture3 from "assets/SlideShowImg/Picture3.jpg";
import Picture4 from "assets/SlideShowImg/Picture4.jpg";
import Banner from "assets/banner.png";

function UserSignIn(props) {
  return (
    <Fragment>
      <div
        className="login-container navbar-state"
        style={{
          background: `url(${Banner}) no-repeat center center fixed`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <NavBar fixed={true} hideBreadcrumb={true} />
        <div className="login-wrapper">
          <div className="brand-banner">
            <div className="slide-show-wrapper">
              <SlideShow
                interval={8000}
                images={[Picture1, Picture2, Picture3, Picture4]}
              />
            </div>
          </div>
          <LoginForm />
        </div>
        <Footer />
        <ToolBar />
      </div>
    </Fragment>
  );
}

export default withRouter(UserSignIn);
