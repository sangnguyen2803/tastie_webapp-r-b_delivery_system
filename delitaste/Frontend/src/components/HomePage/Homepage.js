import NavBar from "../Commons/LayoutComponents/NavBar/NavBar";
import Footer from "../Commons/LayoutComponents/Footer/Footer";
import MainContent from "./MainContent/MainContent";
import React, { Fragment } from "react";
import ToolBar from "../Commons/LayoutComponents/Toolbar/Toolbar";
import VoucherToolBar from "../Commons/LayoutComponents/Toolbar/VoucherToolbar";
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
