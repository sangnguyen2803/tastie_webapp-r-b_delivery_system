import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import NavFlyoutAnchor from "./NavFlyoutAnchor";
import "./NavFlyout.css";

const NavFlyout = (props) => {
  return (
    <>
      <NavFlyoutAnchor />
      <div
        className="nav-fly-out-container"
        style={{ width: props.width, height: props.height }}
      >
        {props.component}
      </div>
    </>
  );
};

export default NavFlyout;
