import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/fontawesome-free-solid";
import NavFlyoutAnchor from "./NavFlyoutAnchor";
import "./NavFlyout.scss";

const NavFlyout = (props) => {
  return (
    <>
      <NavFlyoutAnchor />
      <div
        className="nav-fly-out-container"
        style={{ width: props.width, height: props.height }}
      >
        {props.components}
      </div>
    </>
  );
};

export default NavFlyout;
