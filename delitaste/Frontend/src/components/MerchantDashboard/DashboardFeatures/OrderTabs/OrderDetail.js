import { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faHourglassHalf,
  faShippingFast,
  faTimesCircle,
} from "@fortawesome/fontawesome-free-solid";
import orderListData from "components/MerchantDashboard/DashboardFeatures/OrderTabs/data/orderListData";
import "../Panel.scss";
import ViewOrderDetail from "./OrderHandler/ViewOrderDetail";
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
function OrderDetail(props) {
  const [orderList, setOrderList] = useState(orderListData);
  const [selectedOrder, setSelectedOrder] = useState(orderList[0]);
  const filterOrderList = (type) => {
    console.log(type);
    if (type === "All") {
      setOrderList(orderListData);
      return;
    }
    const filteredOrderList = orderListData.filter(
      (order) => order.order_status === type
    );
    setOrderList(filteredOrderList);
  };
  useEffect(() => {
    filterOrderList(props.type);
  }, [props.type]);

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
          <FontAwesomeIcon className="o-order-icon done" icon={faCheckCircle} />
        );
      case "Canceled":
        return (
          <FontAwesomeIcon
            className="o-order-icon cancel"
            icon={faTimesCircle}
          />
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
  return (
    <Fragment>
      <div className="double-panel-container">
        <div className="main-detail-panel-wrapper">
          <div className="panel-detail-title">Your orders</div>
          <div className="product-list-info-row">
            <div className="product-list-info">
              <div className="product-stock-quantity">
                {orderListData.length} Orders
              </div>
              <div className="product-stock-quantity-description">
                {props.type} orders: {orderList.length}
              </div>
              <div className="product-progress-bar">
                <ProgressBar
                  bgcolor="#940000"
                  progress={`${orderList.length}`}
                  height="6px"
                  length={100}
                />
              </div>
            </div>
          </div>
          <div className="o-order-container">
            <div className="o-order-header-row">
              <div className="o-order o-order-id">Order Id</div>
              <div className="o-order o-order-name">Customer name</div>
              <div className="o-order o-order-time">Submitted time</div>
              <div className="o-order o-order-quantity">Quantity</div>
              <div className="o-order o-order-price">Price</div>
              <div className="o-order o-order-icon">Order status</div>
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
                <div className="o-order o-order-id">{order.order_id}</div>
                <div className="o-order o-order-name">
                  {order.customer_name}
                </div>
                <div className="o-order-time">{order.time_submitted}</div>
                <div className="o-order-quantity">{order.total_quantity}</div>
                <div className="o-order-price">{order.total_price}</div>
                {mapOrderStatusIcon(order.order_status)}
              </div>
            ))}
          </div>
        </div>
        <div className="sub-detail-panel-wrapper" style={{ paddingTop: "0" }}>
          <ViewOrderDetail selectedOrder={selectedOrder} />
        </div>
      </div>
    </Fragment>
  );
}

export default OrderDetail;
