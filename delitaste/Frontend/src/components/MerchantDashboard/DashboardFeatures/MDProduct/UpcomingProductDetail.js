import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPlus,
  faTrashAlt,
} from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";
import "../Panel.scss";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
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
function UpcomingProductDetail(props) {
  const { user, product, getProductListAPI } = props;
  const [items, setItems] = useState(upcomingProduct || []);
  const [showHandlerPanel, setShowHandlerPanel] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [productForEdit, setProductForEdit] = useState();

  return (
    <Fragment>
      <div className="double-panel-container">
        <div className="main-detail-panel-wrapper">
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
                  <img src={up.product.product_image} />
                </div>
                <div className="upcoming-product-content-wrapper">
                  <span className="upd-name">{up.product.product_name}</span>
                  <span className="upd-price">
                    &#36; {up.product.estimated_price} •{" Release date: "}
                    {up.product.release_date}
                  </span>
                  <span className="upd-description">
                    {up.product.description}
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
      </div>
    </Fragment>
  );
}

UpcomingProductDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { getProductListAPI })(UpcomingProductDetail)
);
