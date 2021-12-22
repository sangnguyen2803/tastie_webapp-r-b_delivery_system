import {
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAIL,
  CREATE_MERCHANT,
  UPDATE_SERVICE_INFO_FORM,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  isMerchantAuthenticated: false,
  isServiceFormSubmitted: false,
  currentForm: 0,
  merchantId: "",
  merchantPrefilledData: {},
  currentForm: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_MERCHANT:
      return { ...state, ...payload };
    case UPDATE_SERVICE_INFO_FORM:
      return { ...state, ...payload, currentForm: 1 };
    default:
      return state;
  }
}
