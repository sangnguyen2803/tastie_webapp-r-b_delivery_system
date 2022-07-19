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

import {
  getProviderTopProductBySalesAPI,
  getProviderTopProductByUnitAPI,
  getProviderTopCategoryByUnitAPI,
  getProviderRevenueByTime,
  getProviderOrderByTime,
} from "store/actions/ProviderAction/ProviderAction";
import Tabs from "../Tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faPlus,
  faQuestionCircle,
} from "@fortawesome/fontawesome-free-solid";
import Chart from "react-apexcharts";

const monthLabel = [
  "",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const xAxisLabel = [];
const today = new Date();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let count = 12;
while (count > 0) {
  if (month === 0) {
    year -= 1;
    month += 12;
  }
  xAxisLabel.unshift(year + "-" + monthLabel[month]);
  month -= 1;
  count -= 1;
}
const DummyData = {
  options: {
    colors: ["#E11A22", "#F8A825"],
    chart: {
      height: 350,
      type: "line",
      fontFamily: "Poppins, sans-serif",
    },
    title: {
      text: "Store monthly revenue by number of orders",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
    },
    labels: xAxisLabel,
    yaxis: [
      {
        labels: {
          formatter: function (val) {
            return val?.toFixed(2);
          },
        },
        title: {
          text: "Sales",
        },
      },
      {
        labels: {
          formatter: function (val) {
            return val?.toFixed(0);
          },
        },
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
    getProviderTopCategoryByUnitAPI,
    getProviderRevenueByTime,
    getProviderOrderByTime,
  } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const handleSelectTab = (value) => {
    setCurrentTab(value);
  };
  const [series, setSeries] = useState([
    {
      name: "Revenue",
      type: "column",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      name: "Order",
      type: "column",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
  ]);
  const [revenueByTime, setRevenueByTime] = useState([]);
  const [orderByTime, setOrderByTime] = useState([]);
  useEffect(() => {
    async function fetchStatisticsData(id) {
      const revenue = await getProviderRevenueByTime(id, 1, 6, 2022);
      setRevenueByTime(revenue);
      const order = await getProviderOrderByTime(id, 1, 6, 2022);
      setOrderByTime(order);
      setSeries([
        {
          name: "Revenue",
          type: "column",
          data: revenue,
        },
        {
          name: "Order",
          type: "column",
          data: order,
        },
      ]);
      const result1 = await getProviderTopProductBySalesAPI(id, 1, 6, 2022);
      const result2 = await getProviderTopProductByUnitAPI(id, 1, 6, 2022);
      const result3 = await getProviderTopCategoryByUnitAPI(id, 1, 6, 2022);
    }
    if (user.provider_id !== -1) fetchStatisticsData(user.provider_id);
  }, [user.provider_id]);

  return (
    <Fragment>
      <div
        className="panel-detail-wrapper"
        style={{ height: "auto", marginTop: "0px" }}
      >
        <MDHeader visible={false} />
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
            {revenueByTime.length !== 0 && (
              <div className="product-stock-quantity-description">
                Your profit has been{" "}
                <b>
                  {revenueByTime[11] < revenueByTime[10]
                    ? "descreased "
                    : "increased "}
                </b>
                <b>
                  {((revenueByTime[11] / revenueByTime[10]) * 100).toFixed(2)}%
                </b>{" "}
                comparing to last month data.
              </div>
            )}
            <div className="product-stock-quantity-description">
              Sales: {revenueByTime?.reduce((a, b) => a + b, 0) || "0.00"}
            </div>
            <div className="product-stock-quantity-description">
              Total Order: {orderByTime?.reduce((a, b) => a + b, 0) || "0 "}{" "}
              orders
            </div>
          </div>
          <Metric
            text={`Revenue demonstrates the total amount your store has received from ${
              xAxisLabel[0]
            } to ${xAxisLabel[xAxisLabel.length - 1]}`}
            width={"100%"}
            height={180}
            radius={5}
            textColor={"black"}
            numeric_data={`$ ${revenueByTime
              ?.reduce((a, b) => a + b, 0)
              ?.toFixed(2)}`}
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
            subText={`Average: `}
            text={`Order by time demonstrates the total number of orders your store has received from ${
              xAxisLabel[0]
            } to ${xAxisLabel[xAxisLabel.length - 1]}`}
            width={"100%"}
            height={180}
            radius={5}
            textColor={"black"}
            numeric_data={`${orderByTime?.reduce((a, b) => a + b, 0)}`}
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
            text={"The revenue amount per order."}
            width={"100%"}
            height={180}
            radius={5}
            textColor={"black"}
            numeric_data={`$ ${
              revenueByTime?.reduce((a, b) => a + b, 0) &&
              orderByTime?.reduce((a, b) => a + b, 0)
                ? (
                    revenueByTime?.reduce((a, b) => a + b, 0) /
                    orderByTime?.reduce((a, b) => a + b, 0)
                  ).toFixed(2)
                : "0.00"
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
          series={series}
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
                  ? provider?.topBySales?.map(
                      (item, index) =>
                        index < 10 && (
                          <tr className="table-row-wrapper" key={index}>
                            <td
                              className="product-name"
                              style={{
                                textAlign: "left",
                                width: "20%",
                              }}
                            >
                              #{index + 1}
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
                        )
                    )
                  : provider?.topByUnit?.map(
                      (item, index) =>
                        index < 10 && (
                          <tr className="table-row-wrapper" key={index}>
                            <td
                              className="product-name"
                              style={{
                                textAlign: "left",
                                width: "20%",
                              }}
                            >
                              #{index + 1}
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
                        )
                    )}
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
        <div className="product-table-container">
          <div className="product-table">
            <table className="table table-wrapper">
              <tbody className="text-capitalize">
                <tr className="table-row-wrapper">
                  <th>Ranking</th>
                  <th>Product name</th>
                  <th>Category name</th>
                  <th>By Units</th>
                </tr>
                {props.provider?.topCategory?.map(
                  (item, index) =>
                    index < 5 && (
                      <tr className="table-row-wrapper" key={index}>
                        <td
                          className="product-name"
                          style={{
                            textAlign: "left",
                            width: "20%",
                          }}
                        >
                          #{index + 1}
                        </td>
                        <td
                          className="field-hidden"
                          style={{
                            textAlign: "left",
                            width: "50%",
                          }}
                        >
                          {item.product_name || "—"}
                        </td>
                        <td
                          className="field-hidden"
                          style={{
                            textAlign: "left",
                            width: "20%",
                          }}
                        >
                          {item.food_category_name || "—"}
                        </td>
                        <td
                          className="field-hidden"
                          style={{
                            textAlign: "center",
                            width: "10%",
                          }}
                        >
                          $ {item.total_quantity || "—"}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
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
  getProviderTopCategoryByUnitAPI: PropTypes.func.isRequired,
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
    getProviderTopCategoryByUnitAPI,
    getProviderRevenueByTime,
    getProviderOrderByTime,
  })(MDBusinessInsight)
);
