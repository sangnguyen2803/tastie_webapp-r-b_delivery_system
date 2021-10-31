import NavBar from "../Common/NavBar/NavBar";
import Footer from "../Common/Footer/Footer";
import MainContent from "./MainContent/MainContent";
import React, { Fragment } from "react";
import ToolBar from "../Common/Toolbar/Toolbar";
import VoucherToolBar from "../Common/Toolbar/VoucherToolbar";
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
