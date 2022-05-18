import axios from "axios";

import { CREATE_ORDER } from "store/actions/types";

//Get order history
export const getOrderHistoryAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/order/get-order-history/${id}`;
    const res = await axios.get(endpoint);
    if (res.data) return res.data.response;
    return {};
  } catch (err) {
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
  const body = JSON.stringify(data);
  var orderCode = "";
  console.log(body);
  try {
    const endpoint = "/v1/api/tastie/order/submit-order-info-delivery";
    const res = await axios.post(endpoint, body, config);
    console.log(res.data);
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
    if (res.data.status) return true;
    return false;
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
