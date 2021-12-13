import { Fragment, useEffect, useState } from "react";
import { Redirect, useSearchParams } from "react-router-dom";
import ProductList from "components/MerchantDashboard/DashboardFeatures/ProductTabs/ProductList";
import "../Panel.scss";
import Tabs from "components/MerchantDashboard/DashboardFeatures/Tabs";
import { faTags } from "@fortawesome/fontawesome-free-solid";

function ProductPanel(props) {
  const [currentTab, setCurrentTab] = useState(0);

  const TabList = {
    tab1: [
      { id: 0, name: "Overview" },
      { id: 1, name: "Menu" },
      { id: 2, name: "Category" },
    ],
  };
  const handleSelectTab = (value) => {
    setCurrentTab(value);
  };
  switch (props.match.params.name) {
    case "my-product":
      return (
        <Fragment>
          <div className="panel-content-wrapper">
            <Tabs
              tabs={TabList.tab1}
              current={currentTab}
              selectItem={handleSelectTab}
            />
            <ProductList current={currentTab} />
          </div>
        </Fragment>
      );
    case "product-detail":
      return (
        <div className="panel-container">
          <div className="panel-center">Type2</div>
        </div>
      );
    default:
      return (
        <div className="panel-container">
          <div className="panel-center">ABC</div>
        </div>
      );
  }
}

export default ProductPanel;
