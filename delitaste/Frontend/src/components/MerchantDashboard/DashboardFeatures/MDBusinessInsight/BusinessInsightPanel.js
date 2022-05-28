import { Fragment, useEffect, useState } from "react";
import MDBusinessInsight from "components/MerchantDashboard/DashboardFeatures/MDBusinessInsight/MDBusinessInsight";
import "../Panel.scss";

function BusinessInsightPanel(props) {
  switch (props.match.params.name) {
    case "business-insight":
      return (
        <div className="panel-content-wrapper">
          <MDBusinessInsight />
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

export default BusinessInsightPanel;
