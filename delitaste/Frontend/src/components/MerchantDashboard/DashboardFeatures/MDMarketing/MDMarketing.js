import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faPlus,
  faQuestionCircle,
} from "@fortawesome/fontawesome-free-solid";
import Switch from "react-switch";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";
import "./MDMarketing.scss";
import { faThumbsUp, faThumbsDown } from "@fortawesome/fontawesome-free-solid";
import PropTypes from "prop-types";
import Metric from "../Metric/Metric";
import MDHeader from "components/MerchantDashboard/MDHeader/MDHeader";
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
import Tabs from "components/MerchantDashboard/DashboardFeatures/Tabs";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import CreateVoucher from "./VoucherHandlers/CreateVoucher";
import UpdatePromotion from "./VoucherHandlers/UpdatePromotion";
import {
  getAllPromotionAPI,
  getAllEcouponAPI,
  subscribeEcouponAPI,
} from "store/actions/ProviderAction/ProviderAction";
import { validateDateBetweenTwoDates } from "utils/DateUtils";

const ProductFilterTab = {
  filterTabs: [
    { id: 0, name: "All" },
    { id: 1, name: "Ongoing" },
    { id: 2, name: "Upcoming" },
    { id: 3, name: "Expired" },
  ],
};
const metricDescription = [
  "Claims: Total number of seller-absorbed vouchers claimed by users over the selected time period.",
  "Cost: Total number of seller-absorbed vouchers claimed by users over the selected time period.",
  "Usage Rate: Total number of seller-absorbed vouchers claimed by users over the selected time period.",
];
function MDMarketing(props) {
  const { user, provider, getAllPromotionAPI, getAllEcouponAPI } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const [showCreateVoucher, setShowCreateVoucher] = useState(false);
  const [promotionType, setPromotionType] = useState(0);
  const [selectedPromotion, setSelectedPromotion] = useState({});
  const [showUpdatePromotion, setShowUpdatePromotion] = useState(false);
  const [voucher, setVoucher] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [ecoupon, setEcoupon] = useState([]);
  const [registeredEcoupon, setRegisteredEcoupon] = useState([]);
  useEffect(() => {
    async function fetchPromotion(id) {
      const res1 = await getAllPromotionAPI(id);
      const res2 = await getAllEcouponAPI(id);
      if (res1) {
        setVoucher(res1.promotion);
        setDiscount(res1.discount);
      }
      if (res2) {
        setEcoupon(res2.ecoupon);
        setRegisteredEcoupon(res2.ecoupon_registered);
      }
    }
    fetchPromotion(user.provider_id);
  }, [user.provider_id]);

  const subscribeEcoupon = async (id) => {
    if (user.provider_id) {
      var status = await props.subscribeEcouponAPI(id, user.provider_id);
      if (status) {
        const res = await getAllEcouponAPI(user.provider_id);
        if (res) {
          setEcoupon(res.ecoupon);
          setRegisteredEcoupon(res.ecoupon_registered);
        }
        return;
      }
    }
  };

  const handleSelectTab = (value) => {};
  return (
    <Fragment>
      <div
        className="panel-detail-wrapper"
        style={{ height: "auto", marginTop: "0px" }}
      >
        <MDHeader visible={true} />
        <div
          className="mkt-section-title"
          style={{ marginTop: 20, fontWeight: 700 }}
        >
          Key metrics
        </div>

        <div className="mkt-key-metrics-wrapper" style={{ height: 240 }}>
          <div
            className="promotion-progress-wrapper"
            style={{ height: 240, border: "2px solid #eeeeee" }}
          >
            <div className="product-stock-quantity">
              {voucher?.length + discount?.length + ecoupon?.length} Promotion
            </div>
            <div className="product-stock-quantity-description">
              Create {60 - voucher?.length - discount?.length - ecoupon?.length}{" "}
              more promotions.
            </div>
            <div className="product-progress-bar">
              <ProgressBar
                bgcolor="#940000"
                progress={voucher?.length || 0}
                height="6px"
                length={20}
                text={"vouchers"}
              />
            </div>
            <div className="product-progress-bar">
              <ProgressBar
                bgcolor="#940000"
                progress={discount?.length || 0}
                height="6px"
                length={20}
                text={" discounts"}
              />
            </div>
            <div className="product-progress-bar">
              <ProgressBar
                bgcolor="#940000"
                progress={ecoupon?.length || 0}
                height="6px"
                length={20}
                text={" ecoupons (subscribed)"}
              />
            </div>
            <ButtonGroup
              width={100}
              mgTop={10}
              float="flex-start"
              mgBottom={15}
            >
              <Button
                color={"white"}
                bgColor={"rgb(148, 0, 0)"}
                justifyContent={"center"}
                gap={"5px"}
                width={150}
                height={30}
                fontSize={13}
                prefix={
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "white", fontSize: 14 }}
                  />
                }
                label={"Create promotion"}
                onClick={() => setShowCreateVoucher(true)}
              />
            </ButtonGroup>
          </div>
          <Metric
            text={metricDescription[0]}
            width={"100%"}
            height={240}
            radius={5}
            numeric_data={120}
            border={"2px solid #eeeeee"}
          >
            <span className="metric-title">
              Claims
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
          <Metric
            text={metricDescription[1]}
            width={"100%"}
            height={240}
            radius={5}
            numeric_data={"12"}
            border={"2px solid #eeeeee"}
          >
            <span className="metric-title">
              Cost
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
          <Metric
            text={metricDescription[2]}
            width={"100%"}
            height={240}
            radius={5}
            numeric_data={"43"}
            border={"2px solid #eeeeee"}
          >
            <span className="metric-title">
              Usage rate
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
        </div>
        <div className="mkt-section-title">
          <span className="mkt-section-text" style={{ fontWeight: 700 }}>
            Voucher List
          </span>
        </div>
        <div className="product-table-container">
          <div className="product-table">
            <table className="table table-wrapper">
              <tbody className="text-capitalize">
                <tr className="table-row-wrapper">
                  <th>Voucher code</th>
                  <th>Voucher name</th>
                  <th>Description</th>
                  <th>Value</th>
                  <th>Start at</th>
                  <th>Expire at</th>
                  <th>Usage limit</th>
                  <th>Status</th>
                </tr>
                {voucher?.map((item, index) => (
                  <tr
                    className="table-row-wrapper"
                    key={item.promotion_id}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setPromotionType(0);
                      setSelectedPromotion(item);
                      setShowUpdatePromotion(true);
                    }}
                  >
                    <td
                      className="product-name"
                      style={{
                        textAlign: "left",
                        width: "12.5%",
                      }}
                    >
                      {item.promotion_code || "—"}
                    </td>
                    <td
                      className="field-hidden"
                      style={{
                        textAlign: "center",
                        width: "12.5%",
                      }}
                    >
                      {item.promotion_name || "—"}
                    </td>
                    <td
                      className="field-hidden"
                      style={{
                        textAlign: "left",
                        width: "25%",
                      }}
                    >
                      {item.promotion_description || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      $ {item?.promotion_value?.toFixed(2) || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {new Date(item.start_at).toLocaleDateString() || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {new Date(item.expire_at).toLocaleDateString() || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {item.limited_offer || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {validateDateBetweenTwoDates(
                        new Date(item.start_at),
                        new Date(item.expire_at),
                        new Date()
                      ) === true
                        ? "Available"
                        : "Expired"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mkt-section-title">
          <span className="mkt-section-text" style={{ fontWeight: 700 }}>
            Discount List
          </span>
        </div>
        <div className="product-table-container">
          <div className="product-table">
            <table className="table table-wrapper">
              <tbody className="text-capitalize">
                <tr className="table-row-wrapper">
                  <th>Discount code</th>
                  <th>Description</th>
                  <th>Value</th>
                  <th>Start at</th>
                  <th>Expire at</th>
                  <th>Usage limit</th>
                  <th>Status</th>
                </tr>
                {discount?.map((item, index) => (
                  <tr
                    className="table-row-wrapper"
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setPromotionType(1);
                      setSelectedPromotion(item);
                      setShowUpdatePromotion(true);
                    }}
                  >
                    <td
                      className="product-name"
                      style={{
                        textAlign: "left",
                        width: "25%",
                      }}
                    >
                      {item.discount_name || "P_SALEOFF10USD"}
                    </td>
                    <td
                      className="field-hidden"
                      style={{
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      {item.discount_description || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {`${(item.discount_value * 100).toFixed(0)}%` || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {new Date(item.start_at).toLocaleDateString() || "—"}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {new Date(item.expire_at).toLocaleDateString() || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      0
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {validateDateBetweenTwoDates(
                        new Date(item.start_at),
                        new Date(item.expire_at),
                        new Date()
                      ) === true
                        ? "Available"
                        : "Expired"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mkt-section-title" style={{ marginTop: 20 }}>
          <span className="mkt-section-text" style={{ fontWeight: 700 }}>
            Subscribe Ecoupon
          </span>
        </div>
        <div
          className="product-table-container"
          style={{ margin: "10px 0 30px 0" }}
        >
          <Tabs
            tabs={ProductFilterTab.filterTabs}
            boxWidth={"8%"}
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
                  <th>Ecoupon name</th>
                  <th>Description</th>
                  <th>Delivery method</th>
                  <th>Value</th>
                  <th>Start at</th>
                  <th>Expire at</th>
                  <th>Status</th>
                  <th>Subscription</th>
                </tr>
                {registeredEcoupon?.map((item, index) => (
                  <tr className="table-row-wrapper" key={index}>
                    <td
                      className="product-name"
                      style={{
                        textAlign: "left",
                        width: "15%",
                      }}
                    >
                      {item.ecoupon_code}
                    </td>
                    <td
                      className="field-hidden"
                      style={{
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      {item.ecoupon_description || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {item.delivery_mode || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {`$ ${item.ecoupon_value?.toFixed(2)}` || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {new Date(item.start_date).toLocaleDateString() || "—"}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {new Date(item.expire_date).toLocaleDateString() || "—"}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {validateDateBetweenTwoDates(
                        new Date(item.start_date),
                        new Date(item.expire_date),
                        new Date()
                      ) === true
                        ? "Available"
                        : "Expired"}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        width: "20%",
                      }}
                    >
                      <ButtonGroup
                        float="center"
                        mgTop={10}
                        gap={12}
                        mgBottom={5}
                        width={100}
                      >
                        <Button
                          color={"black"}
                          bglight={true}
                          border={"#5d5d5d 1.5px solid"}
                          gap={"10px"}
                          justifyContent={"center"}
                          width={100}
                          height={30}
                          label="Unsubscribe"
                        />
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
                {ecoupon?.map((item, index) => (
                  <tr className="table-row-wrapper" key={index}>
                    <td
                      className="product-name"
                      style={{
                        textAlign: "left",
                        width: "15%",
                      }}
                    >
                      {item.ecoupon_code}
                    </td>
                    <td
                      className="field-hidden"
                      style={{
                        textAlign: "center",
                        width: "25%",
                      }}
                    >
                      {item.ecoupon_description || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {item.delivery_mode || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {`$ ${item.ecoupon_value?.toFixed(2)}` || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {new Date(item.start_date).toLocaleDateString() || "—"}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {new Date(item.expire_date).toLocaleDateString() || "—"}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {validateDateBetweenTwoDates(
                        new Date(item.start_date),
                        new Date(item.expire_date),
                        new Date()
                      ) === true
                        ? "Available"
                        : "Expired"}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        width: "20%",
                      }}
                    >
                      <ButtonGroup
                        float="center"
                        mgTop={10}
                        gap={12}
                        mgBottom={5}
                        width={100}
                      >
                        <Button
                          color={"black"}
                          bglight={true}
                          border={"#5d5d5d 1.5px solid"}
                          gap={"10px"}
                          justifyContent={"center"}
                          width={100}
                          height={30}
                          label="Subscribe"
                          onClick={() => subscribeEcoupon(item.ecoupon_id)}
                        />
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <CreateVoucher
        visible={showCreateVoucher}
        setVisible={setShowCreateVoucher}
      />
      <UpdatePromotion
        promotionType={promotionType}
        selectedPromotion={selectedPromotion}
        visible={showUpdatePromotion}
        setVisible={setShowUpdatePromotion}
      />
    </Fragment>
  );
}

MDMarketing.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  getAllPromotionAPI: PropTypes.func.isRequired,
  getAllEcouponAPI: PropTypes.func.isRequired,
  subscribeEcouponAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getAllPromotionAPI,
    getAllEcouponAPI,
    subscribeEcouponAPI,
  })(MDMarketing)
);
