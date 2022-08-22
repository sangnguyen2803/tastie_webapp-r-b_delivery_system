import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faExclamation,
  faExclamationCircle,
  faPlus,
  faQuestionCircle,
  faTrashAlt,
} from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import {
  getProductListAPI,
  getUpcomingProductAPI,
} from "store/actions/ProductAction/ProductAction";
import "../Panel.scss";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import AddUpcomingProduct from "./UpcomingProductHandler/AddUpcomingProduct";
import Chart from "react-apexcharts";
import Metric from "components/MerchantDashboard/DashboardFeatures/Metric/Metric";
import ViewUpcomingProduct from "./UpcomingProductHandler/ViewUpcomingProduct";

function UpcomingProductDetail(props) {
  const { user, product, getProductListAPI, getUpcomingProductAPI } = props;
  const [items, setItems] = useState([]);
  const [showHandlerPanel, setShowHandlerPanel] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [question, setQuestion] = useState(
    "Are you eager to try this product?"
  );
  const [refetchData, setRefetchData] = useState(false);
  const [choice, setChoice] = useState([]);
  const [series, setSeries] = useState([20, 20, 20, 20, 20]);
  const [options, setOptions] = useState({
    colors: ["#1CBB9B", "#E11A22", "#F8A825", "#02ADC1", "#C5CFD1"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        offsetX: 0,
        offsetY: 0,
        customScale: 1,
        expandOnClick: true,
        dataLabels: {
          offset: -10,
          fontSize: 26,
          minAngleToShowLabel: 10,
        },
      },
    },
    legend: {
      show: true,
      fontSize: "13px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 400,
      offsetX: 20,
      offsetY: 20,
    },
    chart: {
      width: 380,
      type: "pie",
      fontFamily: "Poppins, sans-serif",
    },
    labels: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
    responsive: [
      {
        breakpoint: 800,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  useEffect(() => {
    async function fetchUpcomingProducts(id) {
      const result = await getUpcomingProductAPI(id);
      if (result.length === 0) return;
      const seriesOnFirstRender = result[0]?.statistic?.map(
        (s) => s.num_responses
      );
      setChoice(result[0]?.choice);
      setQuestion(result[0]?.question);
      setSeries(
        seriesOnFirstRender.length !== 0
          ? seriesOnFirstRender
          : [20, 20, 20, 20, 20]
      );
      setOptions({
        ...options,
        labels: result[0]?.statistic?.map((s) => s.response),
      });
      setItems(result);
      setRefetchData(false);
    }
    if (refetchData === true || user.provider_id !== -1)
      fetchUpcomingProducts(user.provider_id);
  }, [user.provider_id, refetchData]);

  const handleUpdateStatistics = (p) => {
    setChoice(p.choice);
    setQuestion(p.question);
    const seriesOnFirstRender = p.statistic?.map((s) => s.num_responses);
    setSeries(
      seriesOnFirstRender.length !== 0
        ? seriesOnFirstRender
        : [20, 20, 20, 20, 20]
    );
    setOptions({
      ...options,
      labels: p.statistic?.map((s) => s.response),
    });
  };
  return (
    <Fragment>
      <div className="double-panel-container">
        <div className="main-detail-panel-wrapper">
          <div
            className="pie-chart-wrapper"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              backgroundColor: "white",
            }}
          >
            <Chart
              options={options}
              series={series}
              type="pie"
              width="400"
              height="220"
            />
            <Metric
              text={
                "UP Surveillance help approach customer's preference about your pre-release product on purpose of product's improvement"
              }
              width={"100%"}
              height={220}
              radius={5}
              border={"2px solid #eeeeee"}
            >
              <span className="metric-title">
                Surveillance Detail
                <FontAwesomeIcon
                  className="question-icon"
                  icon={faQuestionCircle}
                />
              </span>
              <div
                className="up-pro-detail"
                style={{
                  fontSize: 13,
                  alignSelf: "flex-start",
                  marginLeft: 25,
                }}
              >
                <b>Question: </b>
                {question}
              </div>
              <div
                className="homebody-sb-radio-detail-wrapper"
                style={{ marginBottom: 10 }}
              >
                {choice?.map((c, index) => (
                  <div className="option-answer" key={index}>
                    <label className="hb-sb-type-wrapper radio">
                      <input type="radio" value={"abc"} name="survey" />
                      <span className="hb-sb-label-radio option-box-radio-label">
                        A{index + 1}: {c?.content}
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            </Metric>
          </div>
          <div className="panel-detail-head-wrapper">
            <div className="panel-detail-title">Pre-release Product</div>
            <Button
              buttonType="primary"
              justifyContent={"center"}
              width={250}
              height={32}
              radius={"0px"}
              label={"Add upcoming product"}
              onClick={() => setShowHandlerPanel(0)}
              prefix={
                <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
              }
            />
          </div>
          <div
            className="upcoming-product-table-wrapper"
            style={{
              border: "1px solid #E6E6E6",
              backgroundColor:
                selectedProduct[0] === "10000001" ? "#E4E4E4" : "white",
            }}
          >
            {items?.length === 0 && (
              <Fragment>
                {" "}
                <div
                  className="o-order-container"
                  style={{
                    height: 500,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottom: "2px solid #d8d8d8",
                    borderLeft: "2px solid #d8d8d8",
                    borderRight: "2px solid #d8d8d8",
                    gap: 20,
                    fontSize: 14,
                  }}
                >
                  <span className="o-order-container-text">
                    Upcoming product not found.
                  </span>
                </div>
              </Fragment>
            )}
            {items?.map((up, index) => (
              <div
                onClick={() => {
                  setSelectedProduct(up);
                  handleUpdateStatistics(up);
                  setShowHandlerPanel(1);
                }}
                className="upcoming-product-item"
                style={{
                  borderBottom:
                    index === items.length - 1 ? "2px solid #d6d6d6" : "unset",
                }}
              >
                <div className="upcoming-product-img">
                  <img src={up.product_image} alt="upcoming_product_img" />
                </div>
                <div className="upcoming-product-content-wrapper">
                  <span className="upd-name">{up.product_name}</span>
                  <span className="upd-price">
                    &#36; {up.estimated_price?.toFixed(2)}
                  </span>
                  <span className="upd-description">
                    {up.product_description}
                  </span>
                </div>
                <span className="upd-download">Get survey result</span>
                <div className="menu-product-price upd-icon">
                  <FontAwesomeIcon
                    className="button-icon"
                    icon={faFileDownload}
                  />
                </div>
                <div className="menu-product-price  upd-icon">
                  <FontAwesomeIcon className="button-icon" icon={faTrashAlt} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sub-detail-panel-wrapper">
          {showHandlerPanel === 0 ? (
            <AddUpcomingProduct setRefetchData={setRefetchData} />
          ) : (
            <ViewUpcomingProduct selectedProduct={selectedProduct} />
          )}
        </div>
      </div>
    </Fragment>
  );
}

UpcomingProductDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
  getUpcomingProductAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { getProductListAPI, getUpcomingProductAPI })(
    UpcomingProductDetail
  )
);
