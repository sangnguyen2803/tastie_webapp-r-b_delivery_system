import { withRouter } from "react-router-dom";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import NavBar from "../../Commons/Layout/NavBar/NavBar";
import Footer from "../../Commons/Layout/Footer/Footer";
import React, { Fragment, useState, useEffect } from "react";
import ToolBar from "../../Commons/Layout/Toolbar/Toolbar";
import VoucherToolBar from "../../Commons/Layout/Toolbar/VoucherToolbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import {
  faClock,
  faHeart as faHeart2,
  faMapMarkerAlt,
  faStar,
  faCalendarPlus,
  faComment,
  faClipboard,
  faCopy,
  faSearch,
} from "@fortawesome/fontawesome-free-solid";
import { faHeart as faHeart1 } from "@fortawesome/fontawesome-free-regular";
import Background from "assets/home_banner.png";
import "../ProviderDetail.scss";
import ProviderDetail from "../ProviderDetail";
import PropTypes from "prop-types";
import { getProviderByIdAPI } from "store/actions/ProviderAction/ProviderAction";
import { connect } from "react-redux";

const promotions = [
  {
    type: 1,
    promotion_id: 100001,
    promotion_code: "FESTIVE10",
    promotion_name: "FESTIVE10",
    promotion_value: 10,
    promotion_description: "Discount 10% product's price",
    min_order_value: 5,
    max_discount_value: 5,
    start_at: "2022, March 21",
    expire_at: "2022, April 12",
    limited_offer: 1,
    weekly_usage_limit_per_user: 10,
    delivery_mode: 1,
  },
  {
    type: 2,
    promotion_id: 100002,
    promotion_code: "FREESHIP",
    promotion_name: "FREESHIP",
    promotion_value: 10,
    promotion_description: "Discount €2.99 delivery free",
    min_order_value: 5,
    max_discount_value: 3,
    start_at: "2022 March 21",
    expire_at: "2022-April 13",
    limited_offer: 1,
    weekly_usage_limit_per_user: 5,
    delivery_mode: 1,
  },
  {
    type: 1,
    promotion_id: 100003,
    promotion_code: "FESTIVE15",
    promotion_name: "FESTIVE15",
    promotion_value: 10,
    promotion_description: "Discount 10% product's price",
    min_order_value: 5,
    max_discount_value: 3,
    start_at: "2022 March-21",
    expire_at: "2022-April-13",
    limited_offer: 1,
    weekly_usage_limit_per_user: 5,
    delivery_mode: 1,
  },
  {
    type: 1,
    promotion_id: 100004,
    promotion_code: "FESTIVE20",
    promotion_name: "FESTIVE20",
    promotion_value: 10,
    promotion_description: "Discount 20% product's price",
    min_order_value: 5,
    max_discount_value: 3,
    start_at: "2022 March-21",
    expire_at: "2022-April-13",
    limited_offer: 1,
    weekly_usage_limit_per_user: 5,
    delivery_mode: 1,
  },
  {
    type: 1,
    promotion_id: 100005,
    promotion_code: "FESTIVE20",
    promotion_name: "FESTIVE20",
    promotion_value: 10,
    promotion_description: "Discount 20% product's price",
    min_order_value: 10,
    max_discount_value: 20,
    start_at: "2022 March-21",
    expire_at: "2022-April-13",
    limited_offer: 1,
    weekly_usage_limit_per_user: 5,
    delivery_mode: 1,
  },
  {
    type: 1,
    promotion_id: 100006,
    promotion_code: "FESTIVE25",
    promotion_name: "FESTIVE25",
    promotion_value: 10,
    promotion_description: "Discount 25% product's price",
    min_order_value: 25,
    max_discount_value: 5,
    start_at: "2022 March-21",
    expire_at: "2022-April-13",
    limited_offer: 1,
    weekly_usage_limit_per_user: 5,
    delivery_mode: 1,
  },
];

function PDHeader(props) {
  const [providerDetail, setProviderDetail] = useState();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  useEffect(() => {
    async function fetchingDataAPI() {
      const result = await props.getProviderByIdAPI(props.match.params?.id);
      setProviderDetail(result?.data);
    }
    fetchingDataAPI();
  }, []);
  return (
    <Fragment>
      {providerDetail && (
        <Fragment>
          <div className="p-d-header-container">
            <div className="p-d-provider-image">
              <img src={`${providerDetail.avatar}`} alt="provider_avatar" />
              <div className="p-d-provider-interaction-wrapper">
                <FontAwesomeIcon
                  className="p-d-icon-for-liking"
                  style={{ zIndex: 1 }}
                  icon={faHeart1}
                />
              </div>
            </div>
            <div className="p-d-provider-info">
              <div className="p-d-sub-head-title">Restaurant</div>
              <div className="p-d-title">{providerDetail.merchant_name}</div>
              <div className="p-d-note">
                € 0.49 Delivery Fee&nbsp;•&nbsp;Delivered in 35 to 45 min
              </div>
              <div className="p-d-sub-title-1">
                <div className="p-d-sub-title-content">
                  <FontAwesomeIcon className="p-d-icon" icon={faMapMarkerAlt} />
                  &nbsp;
                  <span>{providerDetail.address}</span>
                </div>
              </div>
              <div className="p-d-sub-title-1">
                <div className="p-d-sub-title-content">
                  <FontAwesomeIcon className="p-d-icon" icon={faStar} />
                  &nbsp;
                  <span>
                    {providerDetail.rating || 5}/5 (
                    {providerDetail.rating_total || "250"} ratings)
                  </span>
                </div>
                &nbsp;•&nbsp;
                <span className="p-d-sub-title-content">
                  {providerDetail.dietary || "Alergy-friendly"}
                </span>
                &nbsp;•&nbsp;
                <span className="p-d-sub-title-content">
                  {providerDetail.price_range}
                </span>
              </div>
              <div className="p-d-sub-title-2">
                <FontAwesomeIcon className="p-d-icon" icon={faClock} />
                &nbsp;
                <span className="p-d-sub-title-content">
                  Open until 17:00 PM
                  <br />
                  <span style={{ fontSize: "12px" }}>
                    Every day: 10:00 AM - 17:00 PM
                  </span>
                </span>
              </div>
              <ButtonGroup
                float="flex-end"
                gap={10}
                mgRight={5}
                mgTop={10}
                mgBottom={10}
              >
                <Button
                  prefix={<FontAwesomeIcon icon={faComment} />}
                  color={"black"}
                  bgColor={"#ECECEC"}
                  justifyContent={"center"}
                  label={"Feedback"}
                  width={100}
                  height={30}
                />
                <Button
                  color={"black"}
                  bgColor={"#ECECEC"}
                  justifyContent={"center"}
                  label={"Schedule"}
                  prefix={<FontAwesomeIcon icon={faCalendarPlus} />}
                  width={100}
                  height={30}
                />
              </ButtonGroup>
            </div>
            <div className="p-d-promotion">
              <div className="p-d-promotion-container">
                {promotions?.map((promotion) => (
                  <div className="promotion-items-wrapper">
                    <div className="promotion-icon">
                      <svg
                        width="27px"
                        height="18px"
                        viewBox="0 0 26 19"
                        className="icon"
                        style={{
                          fill: "#9c1818",
                        }}
                      >
                        <g transform="translate(-18 -22)" fillRule="evenodd">
                          <path
                            d="M42.632 29.207c.591 0 1.07-.461 1.07-1.03V23.03c0-.569-.479-1.03-1.07-1.03H19.07C18.48 22 18 22.461 18 23.03v5.147c0 .569.48 1.03 1.071 1.03 1.22 0 2.142.885 2.142 2.059 0 1.174-.921 2.06-2.142 2.06-.591 0-1.071.46-1.071 1.029v5.147c0 .569.48 1.03 1.071 1.03h23.56c.592 0 1.072-.461 1.072-1.03v-5.147c0-.569-.48-1.03-1.071-1.03-1.221 0-2.142-.885-2.142-2.059 0-1.174.921-2.06 2.142-2.06zm-15.529-3.089c.887 0 1.607.692 1.607 1.545 0 .852-.72 1.544-1.607 1.544s-1.606-.692-1.606-1.544c0-.853.72-1.545 1.606-1.545zM34.6 36.414c-.887 0-1.607-.692-1.607-1.545 0-.852.72-1.544 1.607-1.544s1.606.692 1.606 1.544c0 .853-.72 1.545-1.606 1.545zm-8.032.426l-1.515-1.456 10.082-9.692 1.515 1.456-10.082 9.692z"
                            fillRule="nonzero"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <div className="promotion-separator"></div>
                    <div className="promotion-content-wrapper">
                      <span className="promotion-head-text">
                        {promotion.promotion_code}
                      </span>
                      <span className="promotion-main-text">
                        {promotion.promotion_description}
                      </span>
                      <span className="promotion-sub-text">
                        Expire at {promotion.expire_at}
                      </span>
                    </div>
                    <div
                      className="promotion-icon"
                      style={{ backgroundColor: "unset" }}
                    >
                      <FontAwesomeIcon
                        className="promotion-tail-icon"
                        icon={faCopy}
                        onClick={() => {
                          navigator.clipboard.writeText(
                            promotion.promotion_code
                          );
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-d-promotion-footer">
                <input className="p-d-promotion-search-box" />
                <Button
                  prefix={
                    <FontAwesomeIcon
                      icon={faSearch}
                      style={{ color: "white" }}
                    />
                  }
                  color={"white"}
                  bgColor={"#3c3c3c"}
                  buttonType="primary"
                  justifyContent={"center"}
                  gap={10}
                  width={80}
                  height={34}
                  radius={"0px"}
                  label={"Find"}
                  fontSize={13}
                />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

PDHeader.propTypes = {
  getProviderByIdAPI: PropTypes.func.isRequired,
};
export default withRouter(connect(null, { getProviderByIdAPI })(PDHeader));
