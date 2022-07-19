import axios from "axios";

import { CREATE_ORDER, CLEAR_CART, SET_READ_STATUS } from "store/actions/types";

export const addNotificationAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/tastie/order/add-notification";
    const res = await axios.post(endpoint, body, config);
    if (res.data?.status) {
      return res.data.notification_id;
    }
    return -1;
  } catch (err) {
    console.log(err);
    return -1;
  }
};

export const updateReadStatusAPI = (nid) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/order/update-status-notification/${nid}`;
    const res = await axios.put(endpoint);
    if (res.data.status) {
      dispatch({
        type: SET_READ_STATUS,
        payload: { notification_id: nid },
      });
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
//Get order history
export const getOrderHistoryAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/order/get-order-history/${id}`;
    const res = await axios.get(endpoint);
    if (res.data) return res.data.response.list_order_history;
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};
//Add product
export const submitOrderCheckoutAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  data.total = data.subtotal + data.tips;
  const body = JSON.stringify(data);
  var orderCode = "";
  try {
    const endpoint = "/v1/api/tastie/order/submit-order-info-delivery";
    const res = await axios.post(endpoint, body, config);
    if (res.data?.status) {
      return res.data.order_code;
    }
    return orderCode;
  } catch (err) {
    console.log(err);
    return orderCode;
  }
};

export const submitOrderItemAPI = (id, code) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    customer_id: id,
    order_code: code,
  });
  try {
    const endpoint = "/v1/api/tastie/order/submit-order-items";
    const res = await axios.post(endpoint, body, config);
    if (res.data.status) {
      dispatch({
        type: CLEAR_CART,
        payload: {
          userCart: {
            provider_id: -1,
            user_id: -1,
            provider_name: -1,
            date: "",
            status: -1,
            cart: [],
          },
        },
      });
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const getAllProductFromOrderAPI = (code) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/order/get-all-products-from-order/${code}`;
    const res = await axios.get(endpoint);
    if (res.data) return res.data.response;
    return {};
  } catch (err) {
    return {};
  }
};

export const getOrderStatusAPI = (code) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/order/get-order-summary/${code}`;
    const res = await axios.get(endpoint);
    if (res.data) return res.data.response;
    return {};
  } catch (err) {
    return {};
  }
};

export const ratingOrderAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/tastie/order/add-order-review";
    const res = await axios.post(endpoint, body, config);
    if (res.data.status) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
export const ratingShipperAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/tastie/order/add-shipper-review";
    const res = await axios.post(endpoint, body, config);
    console.log(res.data);
    if (res.data.status) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
