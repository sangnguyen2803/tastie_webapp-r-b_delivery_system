import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import MainContent from "./MainContent/MainContent";
import React, { Fragment } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import VoucherToolBar from "../Commons/Layout/Toolbar/VoucherToolbar";
import "./Homepage.css";

function Homepage(props) {
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

export default Homepage;
