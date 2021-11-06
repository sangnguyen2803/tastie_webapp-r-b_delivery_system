import { LOAD_REGISTER_FORM } from "store/actions/types";

export const loadRegisterForm = (form, msg) => (dispatch) => {
  //dispatch an action to show set message to the alert
  dispatch({
    type: LOAD_REGISTER_FORM,
    payload: { currentForm: form },
  });
};
