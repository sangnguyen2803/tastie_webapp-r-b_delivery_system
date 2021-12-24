import { Fragment, useEffect, useState } from "react";
import { Redirect, useSearchParams } from "react-router-dom";
import OrderDetail from "components/MerchantDashboard/DashboardFeatures/OrderTabs/OrderDetail";
import "../Panel.scss";
import Tabs from "components/MerchantDashboard/DashboardFeatures/Tabs";
import OrderHistory from "./OrderHistory";
function OrderPanel(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [type, setType] = useState("All");
  useEffect(() => {
    setType(TabList.tab1[currentTab].name);
  }, [currentTab]);
  const TabList = {
    tab1: [
      { id: 0, name: "All" },
      { id: 1, name: "Pending" },
      { id: 2, name: "In progress" },
      { id: 3, name: "Picked-up" },
      { id: 4, name: "Completed" },
      { id: 5, name: "Canceled" },
    ],
  };
  const handleSelectTab = (value) => {
    setCurrentTab(value);
  };
  switch (props.match.params.name) {
    case "my-order":
      return (
        <Fragment>
          <div className="panel-content-wrapper">
            <Tabs
              boxWidth={"10%"}
              tabs={TabList.tab1}
              current={currentTab}
              selectItem={handleSelectTab}
              fixed={true}
            />
            <OrderDetail type={type} />
          </div>
        </Fragment>
      );
    case "order-history":
      return (
        <Fragment>
          <div className="panel-content-wrapper">
            <OrderHistory />
          </div>
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

export default OrderPanel;
