import { Fragment, useEffect, useState } from "react";
import MDMarketing from "components/MerchantDashboard/DashboardFeatures/MDMarketing/MDMarketing";
import "../Panel.scss";

function MarketingPanel(props) {
  switch (props.match.params.name) {
    case "promotion":
      return (
        <div className="panel-content-wrapper">
          <MDMarketing />
        </div>
      );
    default:
      return (
        <div className="panel-container">
          <div className="panel-center">Developing</div>
        </div>
      );
  }
}

export default MarketingPanel;
