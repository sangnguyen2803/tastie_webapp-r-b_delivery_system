import { Fragment, useEffect, useState } from "react";
import "../Panel.scss";

function HomePanel(props) {
  switch (props.match.params.name) {
    case "my-restaurant":
      return (
        <Fragment>
          <div className="panel-content-wrapper">ABC</div>
        </Fragment>
      );
    case "operation-settings":
      return (
        <Fragment>
          <div className="panel-content-wrapper">abc</div>
        </Fragment>
      );
    default:
      return (
        <div className="panel-container">
          <div className="panel-center">ABC</div>
        </div>
      );
  }
}

export default HomePanel;
