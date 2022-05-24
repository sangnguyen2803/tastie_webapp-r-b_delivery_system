import withAuth from "components/HigherOrderComponents(HOC)/withAuth";

import React, { Fragment, useState, useEffect } from "react";
import {
  useLocation,
  withRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./OrderHistory.scss";
import { getOrderHistoryAPI } from "store/actions/OrderAction/OrderAction";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Button from "components/Commons/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/fontawesome-free-solid";

function OrderHistory(props) {
  const { user, history, match, getOrderHistoryAPI } = props;
  const [filterMode, setFilterMode] = useState(1);
  const [orderHistory, setOrderHistory] = useState([]);
  const [filterOrderHistory, setFilterOrderHistory] = useState([]);
  useEffect(() => {
    async function fetchOrderHistory(id) {
      const result = await getOrderHistoryAPI(id);
      result.sort(function (a, b) {
        return (
          new Date(b.completed_at.split(", ")[1]) -
          new Date(a.completed_at.split(", ")[1])
        );
      });
      setOrderHistory(result);
      setFilterOrderHistory(result);
    }
    fetchOrderHistory(match.params.id);
    return function cleanup() {
      setOrderHistory([]);
    };
  }, []);
  const filterItems = (status) => {
    if (parseInt(status) !== 0) {
      const result = orderHistory.filter(
        (element) => element.order_status_nb === parseInt(status)
      );
      setFilterOrderHistory(result);
    } else setFilterOrderHistory(orderHistory);
  };
  const directToOrderTracking = (code, status) => {
    if (status < 5) history.push(`/order-tracking/${code}`);
    return;
  };
  return (
    <Fragment>
      <div className="profile-ohis-container">
        <div className="p-ohis-header-wrapper">
          <div className="p-ohis-header-main-text">Order History</div>
        </div>
        <div className="p-ohis-general-profile-row ">
          <span className="p-ohis-b-gp-label">Status:</span>
          <select
            onChange={(e) => filterItems(e.target.value)}
            className="p-ohis-b-iu-input-general-select"
            name="status"
          >
            {[
              "All",
              "Submitted",
              "Assigned",
              "Confirmed",
              "Picked",
              "Completed",
              "Cancel",
            ].map((item, index) => (
              <option key={index} value={index} label={item} />
            ))}
          </select>
          —<span className="p-ohis-b-gp-label">Date:</span>
          <input
            type="date"
            className="p-ohis-b-iu-input-general"
            name="from"
          />
          —
          <input
            type="date"
            style={{ marginRight: 10 }}
            className="p-ohis-b-iu-input-general"
            name="to"
          />
          <Button
            buttonType="primary"
            width={90}
            height={30}
            prefix={
              <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
            }
            bgColor={"black"}
            color={"white"}
            radius={"0px"}
            label={"Search"}
          />
        </div>

        <div className="p-ohis-body-wrapper">
          {filterOrderHistory.map((item) => (
            <div className="p-ohis-item-wrapper" key={item.order_id}>
              <div className="p-ohis-item-head">
                <span>#{item.order_code}</span>
                <span>{item.completed_at}</span>
              </div>
              <div
                className="p-ohis-item-body"
                onClick={() =>
                  directToOrderTracking(item.order_code, item.order_status_nb)
                }
              >
                <img
                  className={`p-ohis-item-img ${
                    item.order_status_nb === 6 && "p-ohis-grey-scale"
                  }`}
                  src={item.provider_avatar}
                  alt={"product_img"}
                />
                <div className="p-ohis-item-content">
                  <div
                    className="p-ohis-item-main-text"
                    style={{ marginBottom: 5 }}
                  >
                    {item.provider_name}
                  </div>
                  <div className="p-ohis-item-sub-text-medium">
                    <b>$ {item.total_amount.toFixed(2)} (2 items)</b>
                  </div>
                  <div className="p-ohis-item-sub-text">
                    221 Tran Binh Trong, Ward 3, District 5, Ho Chi Minh City
                  </div>
                  <div className="p-ohis-item-sub-text">
                    Payment method: {item.payment_method}
                  </div>
                  <div
                    className="p-ohis-item-sub-text-medium p-ohis-submit-btn"
                    style={{ fontWeight: 500, width: "100%" }}
                  >
                    <span style={{ width: 200 }}>
                      Status: {item.order_status}
                    </span>
                    <ButtonGroup width={100} float={"flex-end"} gap={10}>
                      <Button
                        bgColor={"white"}
                        color="black"
                        border={"2px solid rgb(170, 170, 170)"}
                        buttonType="secondary"
                        width={120}
                        height={30}
                        radius={"0px"}
                        label={"View rating"}
                      />
                      <Button
                        buttonType="primary"
                        width={120}
                        height={30}
                        bgColor={"black"}
                        color={"white"}
                        radius={"0px"}
                        label={"Re-order"}
                      />
                    </ButtonGroup>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

OrderHistory.propTypes = {
  user: PropTypes.object.isRequired,
  getOrderHistoryAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, { getOrderHistoryAPI })(OrderHistory))
);
