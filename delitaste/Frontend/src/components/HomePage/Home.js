import { withRouter } from "react-router-dom";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";

import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import MainContent from "./MainContent/MainContent";
import React, { Fragment } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import VoucherToolBar from "../Commons/Layout/Toolbar/VoucherToolbar";

import Background from "assets/home_banner.png";

const backgroundStyling = {
  background: `url(${Background})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

import "./Home.scss";

function Home(props) {
  return (
    <Fragment>
      <NavBar fixed={true} />
      <div className="main" style={backgroundStyling}>
        <MainContent />
      </div>
      <Footer />
      <VoucherToolBar />
      <ToolBar />
    </Fragment>
  );
}

export default withRouter(Home);
