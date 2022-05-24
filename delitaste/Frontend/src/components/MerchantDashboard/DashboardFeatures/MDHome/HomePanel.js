import { Fragment, useEffect, useState } from "react";
import MDHome from "components/MerchantDashboard/DashboardFeatures/MDHome/MDHome";
import "../Panel.scss";

function HomePanel(props) {
  switch (props.match.params.name) {
    case "general":
      return (
        <div className="panel-content-wrapper">
          <MDHome />
        </div>
      );
    case "my-restaurant":
      return (
        <Fragment>
          <div className="panel-content-wrapper">Developing</div>
        </Fragment>
      );
    default:
      return (
        <div className="panel-container">
          <div className="panel-center">Developing</div>
        </div>
      );
  }
}

export default HomePanel;
