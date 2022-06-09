import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
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
import EditUpcomingProduct from "./UpcomingProductHandler/EditUpcomingProduct";
import Chart from "react-apexcharts";
import Metric from "components/MerchantDashboard/DashboardFeatures/Metric/Metric";
const upcomingProduct = [
  {
    survey_id: 100001,
    start_at: "2022-03-01 00:00:00",
    expire_at: "2022-04-01 00:00:00",
    product: {
      upcoming_product_id: 100000,
      product_name: "Smoked Salmon Tartine",
      description:
        "Salmon with organic butter, scallion, dill, and a side of herb aioli. [540 Cal.]",
      estimated_price: 15.0,
      release_date: "2022 March 28",
      product_image:
        "https://d1ralsognjng37.cloudfront.net/2cec0d90-b78c-488a-9e43-b97d589d8492.jpeg",
    },
    survey: {
      question: "Are you eager to try this upcoming product?",
      choices: [
        "Absolutely yes! I cannot wait to try this!",
        "It seems good. I am curious about its flavor.",
        "Neutral. I am not sure.",
        "I am not interested.",
        "It is not my thing!",
        "Other",
      ],
      rate: ["10%", "20%", "45%", "2%", "8%", "10%"],
    },
  },
  {
    survey_id: 100002,
    start_at: "2022-03-01 00:00:00",
    expire_at: "2022-04-01 00:00:00",
    product: {
      upcoming_product_id: 100000,
      product_name: "Smoked Salmon Tartine",
      description:
        "Salmon with organic butter, scallion, dill, and a side of herb aioli. [540 Cal.]",
      estimated_price: 15.0,
      release_date: "2022 March 28",
      product_image:
        "https://tb-static.uber.com/prod/image-proc/processed_images/5a5e9e22b4efb745ad1629055cad13c5/859baff1d76042a45e319d1de80aec7a.jpeg",
    },
    survey: {
      question: "Are you eager to try this upcoming product?",
      choices: [
        "Absolutely yes! I cannot wait to try this!",
        "It seems good. I am curious about its flavor.",
        "Neutral. I am not sure.",
        "I am not interested.",
        "It is not my thing!",
        "Other",
      ],
      rate: ["10%", "20%", "45%", "2%", "8%", "10%"],
    },
  },
];
const DummyData = {
  series: [44, 55, 13, 43, 22],
  options: {
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
  },
};

function UpcomingProductDetail(props) {
  const { user, product, getProductListAPI, getUpcomingProductAPI } = props;
  const [items, setItems] = useState([]);
  const [showHandlerPanel, setShowHandlerPanel] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productForEdit, setProductForEdit] = useState();
  useEffect(() => {
    async function fetchUpcomingProducts(id) {
      const result = await getUpcomingProductAPI(id);
      console.log(result);
      setItems(result);
    }
    fetchUpcomingProducts(user.provider_id);
  }, [user.provider_id]);
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
              options={DummyData.options}
              series={DummyData.series}
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
                <b>Question: </b>Are you eager to try this product?
              </div>
              <div
                className="homebody-sb-radio-detail-wrapper"
                style={{ marginBottom: 10 }}
              >
                <div className="option-answer ">
                  <label className="hb-sb-type-wrapper radio">
                    <input type="radio" value={"abc"} name="survey" />
                    <span className="hb-sb-label-radio option-box-radio-label">
                      A1: Yeah, it's perfect
                    </span>
                  </label>
                </div>
                <div className="option-answer ">
                  <label className="hb-sb-type-wrapper radio">
                    <input type="radio" value={"abc"} name="survey" />
                    <span className="hb-sb-label-radio option-box-radio-label">
                      A1: Yeah, it's perfect
                    </span>
                  </label>
                </div>
                <div className="option-answer ">
                  <label className="hb-sb-type-wrapper radio">
                    <input type="radio" value={"abc"} name="survey" />
                    <span className="hb-sb-label-radio option-box-radio-label">
                      A1: Yeah, it's perfect
                    </span>
                  </label>
                </div>
                <div className="option-answer ">
                  <label className="hb-sb-type-wrapper radio">
                    <input type="radio" value={"abc"} name="survey" />
                    <span className="hb-sb-label-radio option-box-radio-label">
                      A1: Yeah, it's perfect
                    </span>
                  </label>
                </div>
                <div className="option-answer ">
                  <label className="hb-sb-type-wrapper radio">
                    <input type="radio" value={"abc"} name="survey" />
                    <span className="hb-sb-label-radio option-box-radio-label">
                      A1: Yeah, it's perfect
                    </span>
                  </label>
                </div>
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
              prefix={
                <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
              }
            />
          </div>
          <div
            className="upcoming-product-table-wrapper"
            style={{
              backgroundColor:
                selectedProduct[0] === "10000001" ? "#E4E4E4" : "white",
            }}
          >
            {items.map((up, index) => (
              <div
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
            <AddUpcomingProduct />
          ) : (
            <EditUpcomingProduct />
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
