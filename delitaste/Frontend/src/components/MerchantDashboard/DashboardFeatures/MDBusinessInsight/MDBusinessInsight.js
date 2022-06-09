import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./MDBusinessInsight.scss";
import PropTypes from "prop-types";
import MDHeader from "components/MerchantDashboard/MDHeader/MDHeader";
import Metric from "../Metric/Metric";
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getProviderTopProductBySalesAPI,
  getProviderTopProductByUnitAPI,
  getProviderRevenueByTime,
  getProviderOrderByTime,
} from "store/actions/ProviderAction/ProviderAction";
import Tabs from "../Tabs";

import {
  faCalendarPlus,
  faPlus,
  faQuestionCircle,
} from "@fortawesome/fontawesome-free-solid";
import Chart from "react-apexcharts";

const DummyData = {
  series: [
    {
      name: "Sales",
      type: "column",
      data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
    },
    {
      name: "Order",
      type: "column",
      data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
    },
  ],
  options: {
    colors: ["#E11A22", "#F8A825"],
    chart: {
      height: 350,
      type: "line",
    },
    title: {
      text: "Sales/Order Sources",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: [
      "01 Jan 2001",
      "02 Jan 2001",
      "03 Jan 2001",
      "04 Jan 2001",
      "05 Jan 2001",
      "06 Jan 2001",
      "07 Jan 2001",
      "08 Jan 2001",
      "09 Jan 2001",
      "10 Jan 2001",
      "11 Jan 2001",
      "12 Jan 2001",
    ],
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        title: {
          text: "Sales",
        },
      },
      {
        opposite: true,
        title: {
          text: "Order",
        },
      },
    ],
  },
};
const StatisticsType = {
  filterTabs: [
    { id: 0, name: "By Sales" },
    { id: 1, name: "By Units" },
  ],
};
function MDBusinessInsight(props) {
  const {
    user,
    provider,
    getProviderTopProductBySalesAPI,
    getProviderTopProductByUnitAPI,
    getProviderRevenueByTime,
    getProviderOrderByTime,
  } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const handleSelectTab = (value) => {
    setCurrentTab(value);
  };
  const [revenueByTime, setRevenueByTime] = useState(0);
  const [orderByTime, setOrderByTime] = useState(0);
  useEffect(() => {
    async function fetchStatisticsData(id) {
      const result1 = await getProviderTopProductBySalesAPI(id, 1, 6, 2022);
      const result2 = await getProviderTopProductByUnitAPI(id, 1, 6, 2022);
      const revenue = await getProviderRevenueByTime(id, 1, 6, 2022);
      setRevenueByTime(revenue);
      const order = await getProviderOrderByTime(id, 1, 6, 2022);
      setOrderByTime(order);
    }
    if (user.provider_id !== -1) fetchStatisticsData(user.provider_id);
  }, [user.provider_id]);
  return (
    <Fragment>
      <div
        className="panel-detail-wrapper"
        style={{ height: "auto", marginTop: "0px" }}
      >
        <div className="panel-detail-title">Business Insights</div>
        <div
          className="mkt-section-title"
          style={{ marginTop: 0, fontWeight: 700 }}
        >
          Key metrics
        </div>

        <div className="mkt-key-metrics-wrapper" style={{ height: 180 }}>
          <div
            className="promotion-progress-wrapper"
            style={{
              height: 180,
              border: "2px solid #eeeeee",
              backgroundColor: "#fcfcfc",
            }}
          >
            <div className="product-stock-quantity">Sales Overview</div>
            <div className="product-stock-quantity-description">
              Your profit has increased 1.4% comparing to last 6-month result.
            </div>
            <div className="product-stock-quantity-description">
              Sales: 235,354 USD
            </div>
            <div className="product-stock-quantity-description">
              Total Order: "3,246"
            </div>
          </div>
          <Metric
            text={"abc"}
            width={"100%"}
            height={180}
            radius={5}
            textColor={"black"}
            numeric_data={`USD ${revenueByTime?.toFixed(2)}`}
            numericFontSize={30}
            border={"2px solid #eeeeee"}
          >
            <span className="metric-title">
              Sales
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
          <Metric
            text={"abc"}
            width={"100%"}
            height={180}
            radius={5}
            textColor={"black"}
            numeric_data={orderByTime}
            numericFontSize={30}
            border={"2px solid #eeeeee"}
          >
            <span className="metric-title">
              Orders
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
          <Metric
            text={"abc"}
            width={"100%"}
            height={180}
            radius={5}
            textColor={"black"}
            numeric_data={`USD ${
              revenueByTime && orderByTime
                ? (revenueByTime / orderByTime).toFixed(2)
                : 0
            }`}
            numericFontSize={30}
            border={"2px solid #eeeeee"}
          >
            <span className="metric-title">
              Sales per Order
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
        </div>
        <div
          className="mkt-section-title"
          style={{ marginTop: 30, fontWeight: 700 }}
        >
          Trend chart
        </div>

        <Chart
          options={DummyData.options}
          series={DummyData.series}
          type="bar"
          width="1100"
          height="320"
        />

        <div
          className="mkt-section-title"
          style={{ marginTop: 30, fontWeight: 700 }}
        >
          Product Ranking
        </div>
        <div className="product-table-container">
          <Tabs
            tabs={StatisticsType.filterTabs}
            boxWidth={"15%"}
            secondaryTabGroup={true}
            borderTop={true}
            fixed={false}
            current={currentTab}
            selectItem={handleSelectTab}
          />
          <div className="product-table">
            <table className="table table-wrapper">
              <tbody className="text-capitalize">
                <tr className="table-row-wrapper">
                  <th>Ranking</th>
                  <th>Product</th>
                  <th>By Sales</th>
                </tr>
                {currentTab === 0
                  ? provider?.topBySales?.map((item, index) => (
                      <tr className="table-row-wrapper" key={item.promotion_id}>
                        <td
                          className="product-name"
                          style={{
                            textAlign: "left",
                            width: "20%",
                          }}
                        >
                          #{index}
                        </td>
                        <td
                          className="field-hidden"
                          style={{
                            textAlign: "left",
                            width: "60%",
                          }}
                        >
                          {item.product_name || "—"}
                        </td>
                        <td
                          className="field-hidden"
                          style={{
                            textAlign: "center",
                            width: "20%",
                          }}
                        >
                          $ {item.total_sales?.toFixed(2) || "—"}
                        </td>
                      </tr>
                    ))
                  : provider?.topByUnit?.map((item, index) => (
                      <tr className="table-row-wrapper" key={item.promotion_id}>
                        <td
                          className="product-name"
                          style={{
                            textAlign: "left",
                            width: "20%",
                          }}
                        >
                          #{index}
                        </td>
                        <td
                          className="field-hidden"
                          style={{
                            textAlign: "left",
                            width: "60%",
                          }}
                        >
                          {item.product_name || "—"}
                        </td>
                        <td
                          className="field-hidden"
                          style={{
                            textAlign: "center",
                            width: "20%",
                          }}
                        >
                          {item.total_quantity || "—"}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="mkt-section-title"
          style={{ marginTop: 30, fontWeight: 700 }}
        >
          Category Ranking
        </div>
      </div>
    </Fragment>
  );
}

MDBusinessInsight.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  getProviderTopProductBySalesAPI: PropTypes.func.isRequired,
  getProviderTopProductByUnitAPI: PropTypes.func.isRequired,
  getProviderRevenueByTime: PropTypes.func.isRequired,
  getProviderOrderByTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getProviderTopProductBySalesAPI,
    getProviderTopProductByUnitAPI,
    getProviderRevenueByTime,
    getProviderOrderByTime,
  })(MDBusinessInsight)
);
