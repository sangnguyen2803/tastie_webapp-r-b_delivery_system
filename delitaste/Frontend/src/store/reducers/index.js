import { combineReducers } from "redux";
import UserReducer from "store/reducers/UserReducer/UserReducer";
import ProviderReducer from "store/reducers/ProviderReducer/ProviderReducer";
import ProductReducer from "store/reducers/ProductReducer/ProductReducer";
import ShipperReducer from "store/reducers/ShipperReducer/ShipperReducer";
import UIAlertReducers from "store/reducers/UIComponents/UIAlertReducers";

export default combineReducers({
  UserReducer,
  ProviderReducer,
  ProductReducer,
  ShipperReducer,
  UIAlertReducers,
});
