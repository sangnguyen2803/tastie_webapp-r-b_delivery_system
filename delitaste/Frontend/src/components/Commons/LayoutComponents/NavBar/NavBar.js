import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import MainNavBar from "./MainNavBar";
import SubNavBar from "./SubNavBar";
import Breadcrumbs from "components/Commons/Breadcrumbs/Breadcrumbs";
import "./NavBar.scss";

function NavBar(props) {
  return (
    <>
      <div className="navbars-wrapper">
        <MainNavBar />
        <SubNavBar variant={true} />
        <div className="nav-bread-crumbs">
          <Breadcrumbs />
        </div>
        <div className="darken-mask"></div>
      </div>
    </>
  );
}

export default withRouter(NavBar);
