import { Fragment, useEffect } from "react";
import { Redirect, useSearchParams } from "react-router-dom";
import ProductList from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductOverview";
import "./Tabs.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/fontawesome-free-solid";

function Tabs({
  tabs,
  current,
  selectItem,
  fixed,
  borderTop,
  secondaryTabGroup,
  children,
  boxWidth,
}) {
  const tabStyling = {
    position: fixed ? "fixed" : "unset",
    border: borderTop ? "3px solid #eeeeee" : "none",
    width: secondaryTabGroup ? "calc(100% - 6px)" : "calc(100% - 252px)",
  };
  return (
    <Fragment>
      <div className="tab-bar-container" style={tabStyling}>
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
                    width: boxWidth || "80px",
                    fontSize: "18px",
                  }
                : { borderBottom: "none", width: boxWidth || "80px" }
            }
          >
            <span className="tab-item">{tab.name}</span>
          </div>
        ))}
        {children}
      </div>
    </Fragment>
  );
}

export default Tabs;
