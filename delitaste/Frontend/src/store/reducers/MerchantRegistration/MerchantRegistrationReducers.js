import {
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAIL,
  CREATE_MERCHANT,
  UPDATE_SERVICE_INFO_FORM,
  UPDATE_REPRESENTATIVE_INFO_FORM,
  UPDATE_BUSINESS_UNIT_INFO_FORM,
  UPDATE_PRODUCT_DETAIL_INFO_FORM,
  UPDATE_BANK_INFO_FORM,
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
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
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
    case UPDATE_PRODUCT_DETAIL_INFO_FORM:
      return { ...state, ...payload, currentForm: -1 };
    default:
      return state;
  }
}
