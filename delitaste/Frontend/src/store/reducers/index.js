import { combineReducers } from "redux";
import RegistrationReducers from "store/reducers/UserAdmission/RegistrationReducers";
import UIAlertReducers from "store/reducers/UIComponents/UIAlertReducers";
import MerchantRegistrationReducers from "store/reducers/MerchantRegistration/MerchantRegistrationReducers";
export default combineReducers({
  RegistrationReducers,
  MerchantRegistrationReducers,
  UIAlertReducers,
});
