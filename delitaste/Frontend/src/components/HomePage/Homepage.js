import NavBar from "../Common/LayoutComponents/NavBar/NavBar";
import Footer from "../Common/LayoutComponents/Footer/Footer";
import MainContent from "./MainContent/MainContent";
import React, { Fragment } from "react";
import ToolBar from "../Common/LayoutComponents/Toolbar/Toolbar";
import VoucherToolBar from "../Common/LayoutComponents/Toolbar/VoucherToolbar";
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
