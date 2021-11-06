import LoginForm from "components/UserAdmission/LoginForm/LoginForm";
import SignUpForm from "components/UserAdmission/SignUpForm/SignUpForm";
import UserAdmission from "screens/UserAdmissionScreen/UserSignInScreen";
import NotFound from "components/Commons/ErrorPage/NotFound";
export const routeConfig = [
  {
    path: "/auth/sign-in",
    component: LoginForm,
    breadcrumb: "Sign In",
  },
  {
    path: "/auth/sign-up",
    component: SignUpForm,
    breadcrumb: "Sign Up",
  },
  {
    path: "/auth",
    component: UserAdmission,
  },
];
