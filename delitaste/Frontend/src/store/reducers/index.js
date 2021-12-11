import { combineReducers } from "redux";
import UserReducers from "store/reducers/UserAdmission/UserReducers";
import UIAlertReducers from "store/reducers/UIComponents/UIAlertReducers";
import MerchantRegistrationReducers from "store/reducers/MerchantRegistration/MerchantRegistrationReducers";
export default combineReducers({
  UserReducers,
  MerchantRegistrationReducers,
  UIAlertReducers,
});
