import Homepage from "components/HomePage/Home";
import UserRegistrationScreen from "screens/UserAdmissionScreen/UserRegistrationScreen";
import UserSignInScreen from "screens/UserAdmissionScreen/UserSignInScreen";
import MerchantRegistrationScreen from "screens/MerchantRegistrationScreen/MerchantRegistrationScreen";
import SignContractScreen from "screens/MerchantRegistrationScreen/SignContractScreen/SignContractScreen";
import MerchantFormScreen from "screens/MerchantRegistrationScreen/MerchantFormScreen";
import MerchantDashboardScreen from "screens/MerchantDashboardScreen/MerchantDashboardScreen";
import HomeScreen from "screens/HomeScreen/HomeScreen";

import NavBar from "components/Commons/Layout/NavBar/NavBar";
import LoginForm from "components/UserAdmission/LoginForm/LoginForm";

export const routes = [
  {
    path: "/:lang(en|fr|vi)/",
    component: HomeScreen,
    exact: true,
    breadcrumb: "Home",
  },
  {
    path: "/",
    component: HomeScreen,
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
    path: "/:lang(en|fr|vi)/sign-up",
    exact: true,
    component: UserSignInScreen,
    breadcrumb: "Sign Up",
  },
  {
    path: "/:lang(en|fr|vi)/sign-in",
    exact: true,
    component: UserSignInScreen,
    breadcrumb: "Sign In",
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
    breadcrumb: "Start Business",
  },
  {
    path: "/merchant-registration/sign-contract",
    exact: true,
    component: SignContractScreen,
    breadcrumb: "Contract",
  },
  {
    path: "/merchant-registration/:form",
    exact: true,
    component: MerchantFormScreen,
    breadcrumb: "Service Info",
  },
  {
    path: "/merchant-dashboard",
    exact: true,
    component: MerchantDashboardScreen,
    breadcrumb: "Dashboard",
  },
];
