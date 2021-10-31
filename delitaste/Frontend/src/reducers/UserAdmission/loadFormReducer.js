import { LOAD_REGISTER_FORM } from "actions/types";

const initialState = {
  currentForm: "account_registration",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_REGISTER_FORM:
      return { ...state, ...payload };
    default:
      return state;
  }
}
