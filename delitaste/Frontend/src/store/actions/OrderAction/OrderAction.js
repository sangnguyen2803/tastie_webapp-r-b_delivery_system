import axios from "axios";

import { CREATE_ORDER } from "store/actions/types";

//Add product
export const submitOrderCheckoutAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
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
