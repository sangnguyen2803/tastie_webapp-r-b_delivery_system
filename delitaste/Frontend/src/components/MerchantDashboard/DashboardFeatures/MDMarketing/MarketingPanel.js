import { Fragment, useEffect, useState } from "react";
import "../Panel.scss";

function MarketingPanel(props) {
  switch (props.match.params.name) {
    case "promotion":
      return <div className="panel-content-wrapper">Marketing Panel</div>;
    default:
      return (
        <div className="panel-container">
          <div className="panel-center">Developing</div>
        </div>
      );
  }
}

export default MarketingPanel;
