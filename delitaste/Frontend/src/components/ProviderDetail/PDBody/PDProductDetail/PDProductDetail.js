import { withRouter } from "react-router-dom";
import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import "./PDProductDetail.scss";

function PDProductDetail(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return <Fragment>ProductDetail</Fragment>;
}

export default withRouter(PDProductDetail);
