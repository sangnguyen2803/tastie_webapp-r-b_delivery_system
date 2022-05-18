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

function OrderHistory(props) {
  const { user, history, match, getOrderHistoryAPI } = props;
  const [filterMode, setFilterMode] = useState(1);
  const [orderHistory, setOrderHistory] = useState([]);
  useEffect(() => {
    console.log("again");
    async function fetchOrderHistory(id) {
      const result = await getOrderHistoryAPI(id);
      setOrderHistory(result);
    }
    fetchOrderHistory(match.params.id);
    return function cleanup() {
      setOrderHistory([]);
    };
  }, []);
  useEffect(() => {}, [filterMode]);
  return (
    <Fragment>
      <div className="profile-ohis-container">
        <div className="p-ohis-header-wrapper">
          <div className="p-ohis-header-main-text">Order History</div>
        </div>
        <div className="p-ohis-body-wrapper">
          {orderHistory?.map((item) => (
            <div className="p-ohis-item-wrapper" key={item.order_id}>
              <div className="p-ohis-item-head">
                <span>#{item.order_code}</span>
                <span>{item.completed_at}</span>
              </div>
              <div className="p-ohis-item-body">
                <img
                  className="p-ohis-item-img"
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
                    <b>$ 32.00 (2 items)</b>
                  </div>
                  <div className="p-ohis-item-sub-text">
                    221 Tran Binh Trong, Ward 3, District 5, Ho Chi Minh City
                  </div>
                  <div className="p-ohis-item-sub-text">
                    Payment method: {item.payment_method}
                  </div>
                  <div
                    className="p-ohis-item-sub-text-medium p-ohis-submit-btn"
                    style={{ fontWeight: 700, width: "100%" }}
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
