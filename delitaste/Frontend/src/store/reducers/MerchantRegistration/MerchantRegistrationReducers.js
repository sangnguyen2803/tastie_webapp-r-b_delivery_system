import {
  UPDATE_MERCHANT_SUCCESS,
  UPDATE_MERCHANT_FAIL,
} from "store/actions/types";
import {} from "store/actions/types";

const initialState = {
  isMerchantAuthenticated: true,
  isSubmitted: false,
  currentForm: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_MERCHANT_SUCCESS:
      return { ...state, ...payload };
    case UPDATE_MERCHANT_FAIL:
      return { ...state, ...payload };
    default:
      return state;
  }
}
