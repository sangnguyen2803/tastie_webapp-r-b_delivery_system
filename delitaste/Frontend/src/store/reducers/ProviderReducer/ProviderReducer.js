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
} from "store/actions/types";
import {} from "store/actions/types";

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
  currentOrderList: [],
  operation: [],
  orderList: [],
  topBySales: [],
  topByUnit: [],
};

const ProviderReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_ORDER_LIST:
      return {
        ...state,
        ...payload,
      };
    case SET_DASHBOARD_PROVIDER:
      return {
        ...state,
        ...payload,
        provider: payload.provider,
        operation: payload.operation,
      };
    case SET_ORDER_LIST:
      return {
        ...state,
        ...payload,
      };
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
      return {
        ...state,
        ...payload,
      };
    case SET_TOP_PRODUCT_BY_UNIT:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default ProviderReducer;
