import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faHourglassHalf,
  faShippingFast,
  faTimesCircle,
} from "@fortawesome/fontawesome-free-solid";
import orderListData from "components/MerchantDashboard/DashboardFeatures/MDOrder/data/orderListData";
import "../Panel.scss";
import ViewOrderDetail from "./OrderHandler/ViewOrderDetail";
import SwitchSelector from "react-switch-selector";

const options = [
  {
    label: "Show all",
    value: 0,
    selectedBackgroundColor: "#AB2E15",
  },
  {
    label: "Select a date",
    value: 1,
    selectedBackgroundColor: "#AB2E15",
  },
];

function OrderHistory(props) {
  const [orderList, setOrderList] = useState(orderListData);
  const [selectedOrder, setSelectedOrder] = useState(orderList[0]);
  useEffect(() => {
    const filteredOrderList = orderListData.filter(
      (order) =>
        order.order_status === "Completed" || order.order_status === "Canceled"
    );
    setOrderList(filteredOrderList);
  }, []);

  const mapOrderStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return (
          <FontAwesomeIcon
            className="o-order-icon pending"
            icon={faHourglassHalf}
          />
        );
      case "In progress":
        return (
          <FontAwesomeIcon className="o-order-icon inprogress" icon={faClock} />
        );
      case "Picked-up":
        return (
          <FontAwesomeIcon
            className="o-order-icon picked-up"
            icon={faShippingFast}
          />
        );
      case "Completed":
        return (
          <>
            <FontAwesomeIcon
              className="o-order-icon-history done"
              icon={faCheckCircle}
            />
            <span className="order-status-text-green">Completed</span>
          </>
        );
      case "Canceled":
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
          <FontAwesomeIcon
            className="o-order-icon pick-up"
            icon={faShippingFast}
          />
        );
    }
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Show all"
  );

  return (
    <Fragment>
      <div className="double-panel-container panel-no-mg-top">
        <div className="main-detail-panel-wrapper">
          <div className="panel-detail-title">Order History</div>
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
              <div className="o-order o-order-icon-history">Order status</div>
              <div className="o-order-id">Order Id</div>
              <div className="o-order o-order-name">Customer name</div>
              <div className="o-order o-order-time">Submitted Time</div>
              <div className="o-order o-order-price">Paid</div>
              <div className="o-order o-order-courier">Courier</div>
            </div>
          </div>
          <div className="o-order-container">
            {orderList?.map((order) => (
              <div
                className="o-order-row"
                onClick={() => {
                  setSelectedOrder(order);
                }}
                key={order.order_id}
                style={
                  selectedOrder.order_id === order.order_id
                    ? { backgroundColor: "#f3f3f3", transition: "0.3s" }
                    : { backgroundColor: "white" }
                }
              >
                {mapOrderStatusIcon(order.order_status)}
                <div className="o-order">{order.order_id}</div>
                <div className="o-order o-order-name">
                  {order.customer_name}
                </div>
                <div className="o-order-time">{order.time_submitted}</div>
                <div className="o-order-price">{order.total_price}</div>
                <div className="o-order-courier">{order.courier_name}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="sub-detail-panel-wrapper" style={{ paddingTop: "0" }}>
          <ViewOrderDetail viewMode={true} selectedOrder={selectedOrder} />
        </div>
      </div>
    </Fragment>
  );
}

export default OrderHistory;
