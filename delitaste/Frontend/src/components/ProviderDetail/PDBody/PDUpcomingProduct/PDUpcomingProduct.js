import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { faExpand, faCompress } from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import "../PDProductDetail/PDProductDetail.scss";
import { addToCart } from "store/actions/CartAction/CartAction";

function PDUpcomingProduct(props) {
  const [choice, setChoice] = useState("");
  const [heightViewPort, setHeightViewPort] = useState(180);
  const [showSurveyNote, setShowSurveyNote] = useState(false);
  const [isViewPortExpanded, setIsViewPortExpanded] = useState(false);
  const { upcomingProduct } = props;
  const heightForExpansion = 50;
  const submitSurvey = async (item) => {
    const data = {
      upcoming_product_id: item.upcoming_product_id,
      question: item.question,
      start_at: "2022-02-02",
      expire_at: "2022-04-02",
      choice: "abc",
    };
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <Fragment>
      <div className="pd-pr-d-header" style={{ height: `${heightViewPort}px` }}>
        <img
          className="pd-pr-d-image"
          src={upcomingProduct.product_image}
          alt="product_photo"
        />
        <div
          className="pd-pr-d-icon-abs-wrapper"
          style={{ marginTop: `calc(${heightViewPort}px - 30px)` }}
          onClick={() => {
            !isViewPortExpanded
              ? setHeightViewPort(180 + heightForExpansion)
              : setHeightViewPort(180);
            setIsViewPortExpanded((prev) => !prev);
          }}
        >
          <FontAwesomeIcon
            className="pd-pr-d-icon-abs"
            icon={!isViewPortExpanded ? faExpand : faCompress}
          />
        </div>
      </div>
      <div
        className="pd-pr-d-body"
        style={{
          height: !isViewPortExpanded
            ? "350px"
            : `${350 - heightForExpansion}px`,
        }}
      >
        <div className="pd-pr-d-main-text">{upcomingProduct?.product_name}</div>
        <div className="pd-pr-d-sub-text">
          <span style={{ fontSize: 15, fontWeight: 700 }}>
            $ {upcomingProduct?.estimated_price?.toFixed(2)}{" "}
          </span>
          {" • "}
          <span style={{ fontSize: 12 }}>
            {upcomingProduct.product_description}
          </span>
        </div>
        <div className="pd-pr-d-sub-text">
          <span style={{ fontSize: 13, fontWeight: 700, fontStyle: "italic" }}>
            Will be released soon
          </span>
        </div>
        <div className="option-box-wrapper-survey">
          <div className="option-question">
            <div className="option-box-title-wrapper-1">
              <span className="option-box-title-main-survey">
                {upcomingProduct.question}
              </span>
            </div>
          </div>
          <div
            className="homebody-sb-radio-detail-wrapper"
            style={{ height: isViewPortExpanded ? 200 : 235 }}
          >
            {upcomingProduct?.choice?.map((item, index) => (
              <div className="option-answer ">
                <label className="hb-sb-type-wrapper radio">
                  <input
                    type="radio"
                    value={item.content}
                    onChange={(e) => setChoice(e.target.value)}
                    name="survey"
                  />
                  <span className="hb-sb-label-radio option-box-radio-label">
                    {item.content}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <ButtonGroup width={100} float={"center"} mgBottom={10}>
          <Button
            color={"white"}
            bgColor={"black"}
            justifyContent={"center"}
            gap={"10px"}
            width={120}
            fontSize={13}
            height={35}
            label={`Submit`}
            onClick={() => submitSurvey(upcomingProduct)}
          />
        </ButtonGroup>
      </div>
    </Fragment>
  );
}

PDUpcomingProduct.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { addToCart })(PDUpcomingProduct)
);
