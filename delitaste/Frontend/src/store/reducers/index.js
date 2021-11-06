import { combineReducers } from "redux";
import registerReducer from "./UserAdmission/registerReducer";
import loadFormReducer from "./UserAdmission/loadFormReducer";
export default combineReducers({
  registerReducer,
  loadFormReducer,
});
