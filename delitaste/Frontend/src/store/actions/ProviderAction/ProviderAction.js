import axios from "axios";

import {
  CREATE_MERCHANT,
  UPDATE_SERVICE_INFO_FORM,
  UPDATE_REPRESENTATIVE_INFO_FORM,
  UPDATE_BUSINESS_UNIT_INFO_FORM,
  UPDATE_PRODUCT_DETAIL_INFO_FORM,
  UPDATE_BANK_INFO_FORM,
  GET_PROVIDER_DETAIL,
  SET_DASHBOARD_PROVIDER,
  SET_ORDER_LIST,
  SET_TOP_PRODUCT_BY_SALES,
  SET_TOP_PRODUCT_BY_UNIT,
  GET_NOTIFICATION,
  ADD_ORDER_TO_ORDER_LIST,
  SET_TOP_CATEGORY_BY_UNIT,
  UPDATE_ORDER_IN_ORDER_LIST,
} from "store/actions/types";

//Create provider
export const createMerchantAPI = (id) => async (dispatch) => {
  const registered_at = new Date().toISOString().slice(0, 10);
  const provider_update_at = new Date().toISOString().slice(0, 10);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    user_id: id,
    registered_at,
    provider_update_at,
  });
  try {
    const endpoint = "/v1/api/provider/sign-contract";
    console.log(body);
    const res = await axios.post(endpoint, body, config);
    if (res?.data.state) {
      dispatch({
        type: CREATE_MERCHANT,
        payload: { merchantId: res.data.providerID },
      });
      return res.data.providerID;
    }
    return -1;
  } catch (err) {
    return -1;
  }
};
// Update form 1:
export const updateServiceInfoFormAPI = (id, data) => async (dispatch) => {
  data.update_at = new Date().toISOString().slice(0, 10);
  data.registered_at = new Date().toISOString().slice(0, 10);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  console.log(body);
  try {
    const endpoint = `/v1/api/provider/register/${id}/basic-info`;
    const res = await axios.post(endpoint, body, config);
    console.log(res);
    if (res.data?.state) {
      dispatch({
        type: UPDATE_SERVICE_INFO_FORM,
        payload: { isServiceFormSubmitted: true },
      });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};
// Update form 2
export const updateRepresentativeInfoFormAPI =
  (id, data) => async (dispatch) => {
    data.update_at = new Date().toISOString().slice(0, 10);
    data.create_at = new Date().toISOString().slice(0, 10);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);

    console.log(body);
    try {
      const endpoint = `/v1/api/provider/register/${id}/representive`;
      const res = await axios.post(endpoint, body, config);
      if (res.data?.state) {
        dispatch({
          type: UPDATE_REPRESENTATIVE_INFO_FORM,
          payload: { isRepresentativeInfoFormSubmitted: true },
        });
        return true;
      }
      return false;
    } catch (err) {
      console.log(err.response.data.errors);
      return false;
    }
  };

// Update form 3
export const getCategoryAPI = (type) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/register/${type}/get-categories`;
    const res = await axios.get(endpoint);
    if (res.data?.status) {
      if (!res.data.result) return [];
      return res.data.result;
    }
  } catch (err) {
    console.log(err.response.data.errors);
  }
};

export const updateBusinessUnitInfoFormAPI = (id, data) => async (dispatch) => {
  data.update_at = new Date().toISOString().slice(0, 10);
  data.create_at = new Date().toISOString().slice(0, 10);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(data);
  try {
    console.log("here", body);
    const endpoint = `/v1/api/provider/register/${id}/detail-info`;
    const res = await axios.post(endpoint, body, config);
    console.log(res);
    if (res.data?.state) {
      dispatch({
        type: UPDATE_BUSINESS_UNIT_INFO_FORM,
        payload: { isBusinessUnitInfoFormSubmitted: true },
      });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};
// Update form 4
export const updateProductDetailInfoFormAPI =
  (id, data) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(data);
    try {
      console.log(id);
      console.log(body);
      const endpoint = `/v1/api/provider/register/${id}/menu-photo`;
      const res = await axios.post(endpoint, body, config);
      console.log(res);
      if (res.data?.state) {
        dispatch({
          type: UPDATE_PRODUCT_DETAIL_INFO_FORM,
          payload: { isProductDetailInfoFormSubmitted: true },
        });
        return true;
      }
      return false;
    } catch (err) {
      console.log(err.response.data.errors);
      return false;
    }
  };

// Update form 5
export const updateBankInfoFormAPI = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  //update user_role to merchant account
  data.user_role = 2;
  data.update_at = new Date().toISOString().split("T")[0];
  const body = JSON.stringify(data);
  try {
    console.log(body);
    const endpoint = `/v1/api/provider/register/${id}/bank-info`;
    const res = await axios.post(endpoint, body, config);
    console.log(res);
    if (res.data?.state) {
      dispatch({
        type: UPDATE_BANK_INFO_FORM,
        payload: { isBankInfoFormSubmitted: true },
      });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data.errors);
    return false;
  }
};
//get provider by id

//type 1 : get provider for customer view - type 2 : get provider for provider dashboard view
export const getProviderByIdAPI =
  (provider_id, type, user_id) => async (dispatch) => {
    if (!type) type = 1;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      user_id: user_id || -1,
      provider_id: provider_id,
    });
    try {
      const endpoint = `/v1/api/provider/dashboard/get-info`;
      const res = await axios.post(endpoint, body, config);
      if (res.data?.state) {
        if (!res.data.provider_info?.data) return [];
        if (type === 1) {
          dispatch({
            type: GET_PROVIDER_DETAIL,
            payload: { currentProvider: res.data.provider_info.data },
          });
        }
        if (type === 2) {
          dispatch({
            type: SET_DASHBOARD_PROVIDER,
            payload: {
              provider: res.data.provider_info.data,
              operation: res.data.provider_info.operation_time,
            },
          });
        }
        return res.data?.provider_info;
      }
    } catch (err) {
      console.log(err.response.data?.errors);
    }
  };

export const getScheduleTime = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/checkout/get_schedule_time/${id}`;
    const res = await axios.get(endpoint);
    if (res.data) {
      return res.data.response;
    }
  } catch (err) {
    console.log(err);
  }
};

export const addDiscountAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/provider/dashboard/add-discount";
    const res = await axios.post(endpoint, body, config);
    console.log(res.data);
    if (res.data?.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data?.errors);
    return false;
  }
};

export const updateDiscountAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/provider/dashboard/update-discount";
    const res = await axios.post(endpoint, body, config);
    console.log(res.data);
    if (res.data?.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data?.errors);
    return false;
  }
};

export const getPromotionClaims = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/get-voucher-claims/${id}`;
    const res = await axios.get(endpoint);
    if (res.data) {
      return res.data.count;
    }
  } catch (err) {
    console.log(err);
  }
};
export const getPromotionCosts = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/get-voucher-costs/${id}`;
    const res = await axios.get(endpoint);
    if (res.data) {
      return res.data.total_cost;
    }
  } catch (err) {
    console.log(err);
  }
};
export const applyDiscountProviderAPI = (pid, did) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    discount_id: did,
    product_id: pid,
  });
  try {
    const endpoint = "/v1/api/provider/dashboard/apply-discount-to-product";
    const res = await axios.post(endpoint, body, config);
    if (res.data?.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data?.errors);
    return false;
  }
};

export const addPromotionAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  console.log(body);
  try {
    const endpoint = "/v1/api/tastie/provider/add-promotion";
    const res = await axios.post(endpoint, body, config);
    if (res.data?.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response?.data?.errors);
    return false;
  }
};

export const updatePromotionAPI = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(data);
  try {
    const endpoint = "/v1/api/tastie/provider/update-promotion";
    const res = await axios.post(endpoint, body, config);
    if (res.data?.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err.response.data?.errors);
    return false;
  }
};

export const getAllPromotionAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/get-all-promos/${id}`;
    const res = await axios.get(endpoint);
    if (res.data.status) {
      return res.data.response;
    }
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const getPromotionStatisticsAPI = (id) => async (dispatch) => {
  try {
    const endpoint1 = `/v1/api/provider/dashboard/get-voucher-claims/${id}`;
    const endpoint2 = `/v1/api/provider/dashboard/get-voucher-costs/${id}`;
    const res1 = await axios.get(endpoint1);
    const res2 = await axios.get(endpoint2);
    console.log(res1, res2);
    if (res1.data.status && res2.data.status) {
      return [
        res1.data.count.total_claims,
        res2.data.total_cost,
        res1.data.count.total_claims === 0 && res2.data.total_cost === 0
          ? 0
          : res1.data.count.total_claims / res2.data.total_cost,
      ];
    }
    return [1, 1, 1];
  } catch (err) {
    console.log(err);
    return [1, 1, 1];
  }
};

export const getAllEcouponAPI = (id) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/provider/dashboard/get-all-ecoupon/${id}`;
    const res = await axios.get(endpoint);
    if (res.data.status) {
      return res.data.response;
    }
    return {};
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const subscribeEcouponAPI = (eid, pid) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    ecoupon_id: eid,
    provider_id: pid,
  });
  try {
    const endpoint = `/v1/api/provider/dashboard/register-ecoupon`;
    const res = await axios.post(endpoint, body, config);
    if (res.data.status) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const addMenuCategoryAPI = (id, name) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    provider_id: id,
    menu_name: name,
  });
  console.log(body);
  try {
    const endpoint = `/v1/api/provider/dashboard/menu-overview/add-menu-category`;
    const res = await axios.post(endpoint, body, config);
    console.log(res);
    if (res.data.status) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};

export const getAllOrderAPI = (id, limit, offset) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    provider_id: id,
    limit: limit,
    offset: offset,
  });
  try {
    const endpoint = `/v1/api/provider/order/get-all-order`;
    const res = await axios.post(endpoint, body, config);
    if (res.data.status) {
      let orders = res.data.response.map((item) => {
        return {
          order_id: item.order_id,
          order_code: item.order_code,
          total_amount: item.total_amount,
          status: item["MAX(os.order_status_name)"],
          user_first_name: item.user_first_name,
          user_last_name: item.user_last_name,
          update_at: item.update_at,
          payment_name: item.payment_name,
          subtotal: item.subtotal,
        };
      });
      dispatch({
        type: SET_ORDER_LIST,
        payload: {
          orderList: orders,
        },
      });
      return res.data.response;
    }
    return [];
  } catch (err) {
    return [];
  }
};

export const getProviderTopProductByUnitAPI =
  (id, start_month, end_month, year) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      provider_id: id,
      start_month,
      end_month,
      year,
    });
    try {
      const endpoint = `/v1/api/provider/dashboard/get-top-product-by-unit-by-provider`;
      const res = await axios.post(endpoint, body, config);
      if (res.data.status) {
        dispatch({
          type: SET_TOP_PRODUCT_BY_UNIT,
          payload: {
            topByUnit: res.data.list_product,
          },
        });
        return res.data.list_product;
      }
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

export const getProviderTopCategoryByUnitAPI =
  (id, start_month, end_month, year) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      provider_id: id,
      start_month,
      end_month,
      year,
    });
    try {
      const endpoint = `/v1/api/provider/dashboard/get-top-category-by-unit-by-provider`;
      const res = await axios.post(endpoint, body, config);
      if (res.data.status) {
        dispatch({
          type: SET_TOP_CATEGORY_BY_UNIT,
          payload: {
            topCategory: res.data.response,
          },
        });
        return res.data.list_product;
      }
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

export const getProviderTopProductBySalesAPI =
  (id, start_month, end_month, year) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      provider_id: id,
      start_month,
      end_month,
      year,
    });
    try {
      const endpoint = `/v1/api/provider/dashboard/get-top-product-by-sales-by-provider`;
      const res = await axios.post(endpoint, body, config);
      if (res.data.status) {
        dispatch({
          type: SET_TOP_PRODUCT_BY_SALES,
          payload: {
            topBySales: res.data.list_product,
          },
        });
        return res.data.list_product;
      }
      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

export const getProviderRevenueByTime =
  (id, start_month, end_month, year) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = [];
    try {
      const endpoint = `/v1/api/provider/dashboard/get-provider-revenue-by-time`;
      let month = new Date().getMonth();
      let count = 12;
      let body = {};
      while (count > 0) {
        if (month + 1 === 0) {
          year -= 1;
          month += 12;
        }
        start_month = month + 1;
        end_month = month + 1;
        body = JSON.stringify({
          provider_id: id,
          start_month,
          end_month,
          year,
        });
        const res = await axios.post(endpoint, body, config);
        if (res.data.status) result.unshift(res.data.total_revenue);
        month -= 1;
        count -= 1;
      }
      return result;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };

export const getProviderOrderByTime =
  (id, start_month, end_month, year) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = [];
    try {
      const endpoint = `/v1/api/provider/dashboard/get-provider-number-order-by-time`;
      let month = new Date().getMonth();
      let count = 12;
      let body = {};
      while (count > 0) {
        if (month + 1 === 0) {
          year -= 1;
          month += 12;
        }
        start_month = month + 1;
        end_month = month + 1;
        body = JSON.stringify({
          provider_id: id,
          start_month,
          end_month,
          year,
        });
        const res = await axios.post(endpoint, body, config);
        if (res.data.status) result.unshift(res.data.number_order);
        month -= 1;
        count -= 1;
      }
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return 0;
    }
  };

export const updateProviderDetailAPI = (id, data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    provider_status: data.status,
    day: "Monday",
    open_time: "09:15:00",
    close_time: "20:30:00",
    estimated_cooking_time: data.ect,
    update_at: data.update_at,
  });
  try {
    const endpoint = `/v1/api/provider/dashboard/${id}/update-provider`;
    const res = await axios.post(endpoint, body, config);
    if (res.data.status) {
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getProviderNotification = (pid) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/order/get-all-notification-to-provider/${pid}`;
    const res = await axios.get(endpoint);
    if (res.data?.status) {
      dispatch({
        type: GET_NOTIFICATION,
        payload: {
          notifications: res.data.response,
        },
      });
      return res.data.response;
    }
  } catch (err) {
    return [];
  }
};

export const appendOrderList = (order) => (dispatch) => {
  dispatch({
    type: ADD_ORDER_TO_ORDER_LIST,
    payload: {
      order: order,
    },
  });
};
export const updateOrderList = (order) => (dispatch) => {
  dispatch({
    type: UPDATE_ORDER_IN_ORDER_LIST,
    payload: {
      order: order,
    },
  });
};

export const getCustomerReviewAPI = (pid) => async (dispatch) => {
  try {
    const endpoint = `/v1/api/tastie/store/customer_review/${pid}`;
    const res = await axios.get(endpoint);
    if (res.data?.status) {
      return res.data.response;
    }
  } catch (err) {
    return [];
  }
};
