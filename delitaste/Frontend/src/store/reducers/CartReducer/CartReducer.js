import { GET_PRODUCT_LIST } from "store/actions/types";

const initialState = {
  userCartId: -1,
  providerCartId: -1,
  date: "",
  providerName: "",
  cartDetail: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
