import { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import ProductOverview from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductOverview";
import ProductDetail from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductDetail";
import Tabs from "components/MerchantDashboard/DashboardFeatures/Tabs";
import "../Panel.scss";

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
  const mappingTab = () => {
    switch (currentTab) {
      case 0:
        return <ProductOverview />;
      case 1:
        return <ProductDetail />;
      default:
        return <h1>No project match</h1>;
    }
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
              fixed={true}
            />
            {mappingTab()}
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

export default withRouter(ProductPanel);
