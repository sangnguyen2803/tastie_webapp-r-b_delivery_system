import {
  CREATE_MERCHANT,
  UPDATE_SERVICE_INFO_FORM,
  UPDATE_REPRESENTATIVE_INFO_FORM,
  UPDATE_BUSINESS_UNIT_INFO_FORM,
  UPDATE_PRODUCT_DETAIL_INFO_FORM,
  UPDATE_BANK_INFO_FORM,
  SET_DASHBOARD_PROVIDER,
  SET_ORDER_LIST,
  SET_TOP_PRODUCT_BY_SALES,
  SET_TOP_PRODUCT_BY_UNIT,
  SET_CURRENT_ORDER_LIST,
  SET_TOP_CATEGORY_BY_UNIT,
  ADD_ORDER_TO_ORDER_LIST,
  UPDATE_ORDER_IN_ORDER_LIST,
} from "store/actions/types";
import {} from "store/actions/types";
import io from "socket.io-client";

const initialState = {
  isMerchantAuthenticated: false,
  isServiceFormSubmitted: false,
  isRepresentativeInfoFormSubmitted: false,
  isBusinessUnitInfoFormSubmitted: false,
  isProductDetailInfoFormSubmitted: false,
  isBankInfoFormSubmitted: false,
  currentForm: 0,
  merchantId: "",
  merchantPrefilledData: {},
  provider: {
    longitude: 106.68057155417674,
    latitude: 10.768685473523648,
  },
  socket: io(`wss://socket.tastie18vp.co`),
  providerNotifications: [],
  currentOrderList: [],
  operation: [],
  orderList: [],
  topBySales: [],
  topByUnit: [],
  topCategory: [],
};
const ProviderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_ORDER_LIST:
      return { ...state, ...payload };
    case SET_DASHBOARD_PROVIDER:
      return {
        ...state,
        ...payload,
        provider: payload.provider,
        operation: payload.operation,
      };
    case ADD_ORDER_TO_ORDER_LIST:
      const copy = state.orderList.filter(
        (el) => el.order_code !== payload.order.order_code
      );
      state.orderList = copy;
      state.orderList.unshift(payload.order);
      return { ...state, ...payload };

    case UPDATE_ORDER_IN_ORDER_LIST:
      state.orderList.forEach((item) => {
        if (item.order_code === payload.order.order_code) item.status = 6;
        return { ...state, ...payload };
      });
    case SET_ORDER_LIST:
      return { ...state, ...payload };
    case CREATE_MERCHANT:
      return { ...state, ...payload };
    case UPDATE_SERVICE_INFO_FORM:
      return { ...state, ...payload, currentForm: 1 };
    case UPDATE_REPRESENTATIVE_INFO_FORM:
      return { ...state, ...payload, currentForm: 2 };
    case UPDATE_BUSINESS_UNIT_INFO_FORM:
      return { ...state, ...payload, currentForm: 3 };
    case UPDATE_PRODUCT_DETAIL_INFO_FORM:
      return { ...state, ...payload, currentForm: 4 };
    case UPDATE_BANK_INFO_FORM:
      return { ...state, ...payload, currentForm: -1 };
    case SET_TOP_PRODUCT_BY_SALES:
      return { ...state, ...payload };
    case SET_TOP_PRODUCT_BY_UNIT:
      return { ...state, ...payload };
    case SET_TOP_CATEGORY_BY_UNIT:
      return { ...state, ...payload };
    default:
      return state;
  }
};

export default ProviderReducer;
