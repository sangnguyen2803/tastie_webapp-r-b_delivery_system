import { Fragment, useEffect, useState } from "react";
import ProviderGeneralInformation from "components/MerchantDashboard/DashboardFeatures/MDHome/ProviderGeneralInformation";
import "../Panel.scss";

function HomePanel(props) {
  switch (props.match.params.name) {
    case "general":
      return (
        <div className="panel-content-wrapper">
          <ProviderGeneralInformation />
        </div>
      );
    case "my-restaurant":
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
