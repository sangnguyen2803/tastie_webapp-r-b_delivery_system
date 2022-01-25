import { GET_PRODUCT_LIST } from "store/actions/types";

const initialState = {
  productList: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PRODUCT_LIST:
      return { ...state, ...payload };
    default:
      return state;
  }
}
