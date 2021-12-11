import { withRouter } from "react-router-dom";
import withAuth from "components/HOC/withAuth";

import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import MainContent from "./MainContent/MainContent";
import React, { Fragment } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import VoucherToolBar from "../Commons/Layout/Toolbar/VoucherToolbar";
import "./Home.css";

function Home(props) {
  return (
    <Fragment>
      <NavBar />
      <div className="main">
        <MainContent />
      </div>
      <Footer />
      <VoucherToolBar />
      <ToolBar />
    </Fragment>
  );
}

export default withRouter(Home);
