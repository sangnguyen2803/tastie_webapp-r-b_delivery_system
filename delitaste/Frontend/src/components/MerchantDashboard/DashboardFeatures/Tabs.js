import { Fragment, useEffect } from "react";
import { Redirect, useSearchParams } from "react-router-dom";
import ProductList from "components/MerchantDashboard/DashboardFeatures/ProductTabs/ProductList";
import "./Tabs.scss";

function Tabs({ tabs, current, selectItem }) {
  return (
    <Fragment>
      <div className="tab-bar-container">
        {tabs?.map((tab) => (
          <div
            key={tab.id}
            className="tab-box"
            onClick={() => selectItem(tab.id)}
            style={
              current === tab.id
                ? {
                    paddingTop: "3px",
                    borderBottom: "3px solid rgb(44, 44, 44)",
                  }
                : { borderBottom: "none" }
            }
          >
            <span className="tab-item">{tab.name}</span>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

export default Tabs;
