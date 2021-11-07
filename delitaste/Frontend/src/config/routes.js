import Homepage from "components/HomePage/Homepage";
import UserRegistrationScreen from "screens/UserAdmissionScreen/UserRegistrationScreen";
import UserSignInScreen from "screens/UserAdmissionScreen/UserSignInScreen";
import MerchantRegistrationScreen from "screens/MerchantRegistrationScreen/MerchantRegistrationScreen";
import SignContractScreen from "screens/MerchantRegistrationScreen/SignContractScreen/SignContractScreen";

export const routes = [
  {
    path: "/",
    component: Homepage,
    exact: true,
    breadcrumb: "Home",
  },
  {
    path: "/sign-up",
    exact: true,
    component: UserRegistrationScreen,
    breadcrumb: "Sign Up",
  },
  {
    path: "/sign-in",
    exact: true,
    component: UserSignInScreen,
    breadcrumb: "Sign In",
  },
  {
    path: "/merchant-registration",
    exact: true,
    component: MerchantRegistrationScreen,
    breadcrumb: "Merchant Registration",
  },
  {
    path: "/merchant-registration/sign-contract",
    exact: true,
    component: SignContractScreen,
    breadcrumb: "Sign Contract",
  },
  {
    path: "/merchant-registration/shop-basic-info",
    exact: true,
    component: SignContractScreen,
    breadcrumb: "Step 1: Basic Info",
  },
];
