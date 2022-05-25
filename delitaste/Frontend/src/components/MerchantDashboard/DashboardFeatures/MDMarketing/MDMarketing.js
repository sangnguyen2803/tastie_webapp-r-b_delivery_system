import { Fragment, useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faQuestionCircle } from "@fortawesome/fontawesome-free-solid";
import Switch from "react-switch";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";
import "./MDMarketing.scss";
import { faSearch } from "@fortawesome/fontawesome-free-solid";
import PropTypes from "prop-types";
import Metric from "../Metric/Metric";
import MDHeader from "components/MerchantDashboard/MDHeader/MDHeader";
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
import Tabs from "components/MerchantDashboard/DashboardFeatures/Tabs";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import CreateVoucher from "./VoucherHandlers/CreateVoucher";

const ProductFilterTab = {
  filterTabs: [
    { id: 0, name: "All" },
    { id: 1, name: "Ongoing" },
    { id: 2, name: "Upcoming" },
    { id: 3, name: "Expired" },
  ],
};
function MDMarketing(props) {
  const [currentTab, setCurrentTab] = useState(0);
  const [showCreateVoucher, setShowCreateVoucher] = useState(false);
  const [vouchers, setVouchers] = useState([
    {
      product_name: "#A0FLO13B10HXY8100",
      description: "Shop voucher",
      price: 14.22,
      update_at: 200,
      quantity: "Available",
    },
    {
      product_name: "#A0FLO13B10HXY8100",
      description: "Shop voucher",
      price: 14.22,
      update_at: 200,
      quantity: "Available",
    },
    {
      product_name: "#A0FLO13B10HXY8100",
      description: "Shop voucher",
      price: 14.22,
      update_at: 200,
      quantity: "Available",
    },
  ]);
  const handleSelectTab = (value) => {};
  return (
    <Fragment>
      <div
        className="panel-detail-wrapper"
        style={{ height: "auto", marginTop: "0px" }}
      >
        <MDHeader />
        <div
          className="mkt-section-title"
          style={{ marginTop: 20, fontWeight: 700 }}
        >
          Key metrics
        </div>
        <div className="mkt-key-metrics-wrapper">
          <div className="promotion-progress-wrapper">
            <div className="product-stock-quantity">
              {vouchers.length} Vouchers
            </div>
            <div className="product-stock-quantity-description">
              Create {20 - vouchers.length} more promotions/vouchers.
            </div>
            <div className="product-progress-bar">
              <ProgressBar
                bgcolor="#940000"
                progress={vouchers.length}
                height="6px"
                length={20}
              />
            </div>
          </div>
          <Metric width={"100%"} radius={5} numeric_data={120}>
            <span className="metric-title">
              Claims
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
          <Metric width={"100%"} radius={5} numeric_data={"12"}>
            <span className="metric-title">
              Cost
              <FontAwesomeIcon
                className="question-icon"
                icon={faQuestionCircle}
              />
            </span>
          </Metric>
          <Metric width={"100%"} radius={5} numeric_data={"43"}>
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
          <ButtonGroup width={100} mgTop={10} float="flex-end" mgBottom={15}>
            <Button
              color={"white"}
              bgColor={"rgb(148, 0, 0)"}
              justifyContent={"center"}
              gap={"5px"}
              width={100}
              height={30}
              fontSize={13}
              prefix={
                <FontAwesomeIcon
                  icon={faPlus}
                  style={{ color: "white", fontSize: 14 }}
                />
              }
              label={"Create"}
              onClick={() => setShowCreateVoucher(true)}
            />
          </ButtonGroup>
        </div>
        <div className="product-table-container">
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
                  <th>Voucher code</th>
                  <th>Type</th>
                  <th>Description</th>
                  <th>Discount amount</th>
                  <th>Usage limit</th>
                  <th>Status</th>
                </tr>
                {vouchers?.map((voucher, index) => (
                  <tr className="table-row-wrapper" key={index}>
                    <td
                      className="product-name"
                      style={{
                        textAlign: "left",
                        width: "20%",
                      }}
                    >
                      {voucher.product_name || "—"}
                    </td>
                    <td
                      className="field-hidden"
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {voucher.description || "—"}
                    </td>
                    <td
                      className="field-hidden"
                      style={{
                        textAlign: "left",
                        width: "30%",
                      }}
                    >
                      {voucher.description || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "20%",
                      }}
                    >
                      $ {voucher?.price?.toFixed(2) || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {voucher.update_at || "—"}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        width: "10%",
                      }}
                    >
                      {voucher.quantity || "—"}
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
    </Fragment>
  );
}

MDMarketing.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(connect(mapStateToProps, {})(MDMarketing));
