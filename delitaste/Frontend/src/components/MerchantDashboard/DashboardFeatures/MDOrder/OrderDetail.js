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
import ProgressBar from "components/Commons/ProgressBar/ProgressBar";
import io from "socket.io-client";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getAllOrderAPI } from "store/actions/ProviderAction/ProviderAction";
import {
  getAllProductFromOrderAPI,
  getOrderStatusAPI,
} from "store/actions/OrderAction/OrderAction";
// let socket;

function OrderDetail(props) {
  const { user, getAllOrderAPI, getAllProductFromOrderAPI, getOrderStatusAPI } =
    props;
  const [statusOnView, setStatusOnView] = useState();
  const [orderList, setOrderList] = useState([]);
  const [orderSummary, setOrderSummary] = useState(orderList[0]);
  const [orderItems, setOrderItems] = useState([]);
  const [incomingOrder, setIncomingOrder] = useState({
    order: null,
    customer: null,
    order_code: null,
  });

  const socket = io(`http://localhost:3015`);

  const filterOrderList = (type) => {
    const filteredOrderList = orderListData.filter(
      (order) => order.order_status === type
    );
    setOrderList(filteredOrderList);
  };
  useEffect(() => {
    filterOrderList(props.type);
  }, [props.type]);

  useEffect(() => {
    if (incomingOrder.order_code) {
      console.log(incomingOrder);
    }
  }, [incomingOrder]);
  useEffect(() => {
    async function fetchAllOrders(id) {
      const result = await getAllOrderAPI(id);
      result.sort(function (a, b) {
        return new Date(b.update_at) - new Date(a.update_at);
      });
      setOrderList(result);
    }
    fetchAllOrders(props.match.params.id);
  }, []);
  useEffect(() => {
    const provider_id = user.provider_id;
    socket.emit("provider-join-room", `provider-${provider_id}`);
    socket.on(
      "provider-received-order",
      async (orderData, customerData, order_code) => {
        const result1 = await getAllProductFromOrderAPI(order_code);
        const result2 = await getOrderStatusAPI(order_code);
        const result3 = await getAllOrderAPI(props.match.params.id);
        let temp = result3.filter((item) => item.order_code === order_code);
        let status = temp[0]["MAX(os.order_status_name)"];
        setStatusOnView(status);
        Promise.all([result1, result2, result3]).then((data) => {
          setOrderItems(data[0]);
          setOrderSummary(data[1]);
          setOrderList(data[2]);
        });
      }
    );
  }, [user.provider_id]);

  const viewOrderDetail = (code) => {
    async function fetchOrderDetail(orderCode) {
      const result1 = await getAllProductFromOrderAPI(orderCode);
      const result2 = await getOrderStatusAPI(orderCode);
      Promise.all([result1, result2]).then((data) => {
        setOrderItems(data[0]);
        setOrderSummary(data[1]);
      });
    }
    fetchOrderDetail(code);
  };

  const mapOrderStatusIcon = (status) => {
    switch (status) {
      case 3:
        return (
          <FontAwesomeIcon
            className="o-order-icon pending"
            icon={faHourglassHalf}
          />
        );
      case 1:
        return (
          <FontAwesomeIcon className="o-order-icon inprogress" icon={faClock} />
        );
      case 2:
        return (
          <FontAwesomeIcon className="o-order-icon inprogress" icon={faClock} />
        );
      case 4:
        return (
          <FontAwesomeIcon
            className="o-order-icon picked-up"
            icon={faShippingFast}
          />
        );
      case 5:
        return (
          <FontAwesomeIcon className="o-order-icon done" icon={faCheckCircle} />
        );
      case 6:
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
                {orderList.length} Orders
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
              <div className="o-order o-order-quantity">Payment</div>
              <div className="o-order o-order-price">Total</div>
              <div className="o-order o-order-icon">Order status</div>
            </div>
          </div>
          <div className="o-order-container">
            {orderList?.map((order) => (
              <div
                className="o-order-row"
                onClick={() => viewOrderDetail(order.order_code)}
                key={order.order_code}
                style={
                  orderSummary?.order_code === order?.order_code
                    ? { backgroundColor: "#f3f3f3", transition: "0.3s" }
                    : { backgroundColor: "white" }
                }
              >
                <div className="o-order o-order-id">{order.order_code}</div>
                <div className="o-order o-order-name">
                  {`${order.user_first_name} ${order.user_last_name}`}
                </div>
                <div className="o-order-time">{order.update_at}</div>
                <div className="o-order-quantity">{order.payment_name}</div>
                <div className="o-order-price">$ {order.total_amount}</div>
                {mapOrderStatusIcon(order["MAX(os.order_status_name)"])}
              </div>
            ))}
          </div>
        </div>
        <div className="sub-detail-panel-wrapper" style={{ paddingTop: "0" }}>
          <ViewOrderDetail
            orderItems={orderItems}
            orderSummary={orderSummary}
            orderStatus={statusOnView}
            socket={socket}
          />
        </div>
      </div>
    </Fragment>
  );
}

OrderDetail.propTypes = {
  user: PropTypes.object.isRequired,
  getAllOrderAPI: PropTypes.func.isRequired,
  getAllProductFromOrderAPI: PropTypes.func.isRequired,
  getOrderStatusAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getAllOrderAPI,
    getAllProductFromOrderAPI,
    getOrderStatusAPI,
  })(OrderDetail)
);
