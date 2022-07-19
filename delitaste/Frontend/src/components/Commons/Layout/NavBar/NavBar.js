import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import MainNavBar from "./MainNavBar";
import SubNavBar from "./SubNavBar";
import Breadcrumbs from "components/Commons/Breadcrumbs/Breadcrumbs";
import "./NavBar.scss";

function NavBar(props) {
  const { hideBreadcrumb } = props;
  return (
    <>
      <div
        className="navbars-wrapper"
        style={
          props.fixed
            ? { position: "fixed" }
            : {
                position: "unset",
                boxShadow:
                  "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset",
              }
        }
      >
        <MainNavBar hideSubNavbar={props.hideSubNavbar} />
        {!props.merchant ? <SubNavBar variant={true} /> : <></>}
        {!hideBreadcrumb ? (
          <div className="nav-bread-crumbs">
            <Breadcrumbs />
          </div>
        ) : null}

        <div className="darken-mask"></div>
      </div>
    </>
  );
}

export default withRouter(NavBar);
