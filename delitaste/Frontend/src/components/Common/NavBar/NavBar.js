import React, { useEffect, useState } from "react";
import MainNavBar from "./MainNavBar";
import SubNavBar from "./SubNavBar";
import { faBars } from "@fortawesome/fontawesome-free-solid";
import "./NavBar.css";

function NavBar() {
  return (
    <>
      <div className="navbars-wrapper">
        <MainNavBar />
        <SubNavBar variant={true} />
      </div>
    </>
  );
}

export default NavBar;
