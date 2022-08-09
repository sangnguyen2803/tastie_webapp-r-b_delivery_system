import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { css } from "@emotion/react";
import {
  faCheckCircle,
  faDotCircle,
  faTimesCircle,
} from "@fortawesome/fontawesome-free-solid";
import MDHeader from "components/MerchantDashboard/MDHeader/MDHeader";
import orderListData from "components/MerchantDashboard/DashboardFeatures/MDOrder/data/orderListData";
import "../Panel.scss";
import ViewOrderDetail from "./OrderHandler/ViewOrderDetail";
import SwitchSelector from "react-switch-selector";
import { getAllOrderAPI } from "store/actions/ProviderAction/ProviderAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Loader from "react-spinners/ScaleLoader";
const options = [
  {
    label: "Show all",
    value: 0,
    selectedBackgroundColor: "#942424",
  },
  {
    label: "Select a date",
    value: 1,
    selectedBackgroundColor: "#942424",
  },
];

function OrderHistory(props) {
  const { user, provider, getAllOrderAPI } = props;
  const [orderList, setOrderList] = useState([]);
  const [filterOrderList, setFilterOrderList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#910000");

  const override = css`
    display: block;
    border-color: #910000;
    font-size: 14px;
    color: red;
  `;
  useEffect(() => {
    async function fetchOrderList() {
      setLoading(false);
      let limit = 20;
      let offset = 1;
      const result = await getAllOrderAPI(user.provider_id, limit, offset);
      setFilterOrderList(result);
      setLoading(true);
      setOrderList(result);
    }
    if (provider?.orderList.length === 0) {
      fetchOrderList();
      return;
    }
    setLoading(true);
  }, [user.provider_id]);

  const mapOrderStatusIcon = (status) => {
    switch (status) {
      case 5:
        return (
          <>
            <FontAwesomeIcon
              className="o-order-icon-history done"
              icon={faCheckCircle}
            />
            <span className="order-status-text-green">Completed</span>
          </>
        );
      case 6:
        return (
          <>
            <FontAwesomeIcon
              className="o-order-icon-history cancel"
              icon={faTimesCircle}
            />
            <span className="order-status-text-red">Unable to delivery</span>
          </>
        );
      default:
        return (
          <>
            <FontAwesomeIcon
              className="o-order-icon-history inprogress"
              icon={faDotCircle}
            />
            <span className="order-status-text-blue">In progress</span>
          </>
        );
    }
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Show all"
  );

  return (
    <Fragment>
      <MDHeader visible={false} />
      <div className="panel-detail-wrapper panel-no-mg-top">
        <div
          className="mkt-section-title"
          style={{ marginTop: 0, fontWeight: 700 }}
        >
          Order History
        </div>

        <div className="ohis-order-filter-wrapper">
          <div className="ohis-switcher-wrapper">
            <SwitchSelector
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor={"#E6E6E6"}
              fontColor={"#2C2C2C"}
              selectedFontColor={"#E6E6E6"}
              fontSize={13}
              wrapperBorderRadius={0}
              optionBorderRadius={0}
            />
          </div>
          <input
            className="ohis-date-picker"
            type="date"
            name="date-submitted"
          />
        </div>
        <div className="o-order-container">
          <div className="o-order-header-row">
            <div
              className="o-order o-order-icon-history"
              style={{ width: "20%" }}
            >
              Status
            </div>
            <div className="o-order-id" style={{ width: "25%" }}>
              Order code
            </div>
            <div className="o-order o-order-name" style={{ width: "20%" }}>
              Customer name
            </div>
            <div className="o-order o-order-time" style={{ width: "15%" }}>
              Submitted Time
            </div>
            <div className="o-order o-order-time" style={{ width: "10%" }}>
              Payment method
            </div>
            <div className="o-order o-order-price" style={{ width: "10%" }}>
              Paid
            </div>
          </div>
        </div>
        {loading && provider?.orderList?.length !== 0 ? (
          <div className="o-order-container">
            {provider.orderList.map((order) => (
              <div
                className="o-order-row"
                onClick={() => {
                  setSelectedOrder(order);
                }}
                key={order?.order_code}
                style={
                  selectedOrder?.order_code === order?.order_code
                    ? { backgroundColor: "#f3f3f3", transition: "0.3s" }
                    : { backgroundColor: "white" }
                }
              >
                {mapOrderStatusIcon(order.status)}
                <div
                  className="o-order"
                  style={{ width: "30%", textAlign: "left" }}
                >
                  {order.order_code}
                </div>
                <div
                  className="o-order o-order-name"
                  style={{ width: "20%", textAlign: "left" }}
                >
                  {`${order.user_first_name} ${order.user_last_name}`}
                </div>
                <div className="o-order-time">{order.update_at}</div>
                <div className="o-order-time">{order.payment_name}</div>
                <div className="o-order-price">
                  $ {order.subtotal?.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
              gap: 10,
            }}
          >
            <Loader
              color={color}
              loading={true}
              css={override}
              size={100}
              margin={3}
              speedMultiplier={0.8}
            />
            <span className="o-order-container-text">
              Please wait for a while ...
            </span>
          </div>
        )}
      </div>
    </Fragment>
  );
}

OrderHistory.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  getAllOrderAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getAllOrderAPI,
  })(OrderHistory)
);
