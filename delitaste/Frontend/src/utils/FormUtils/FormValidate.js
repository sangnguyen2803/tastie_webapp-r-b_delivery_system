import * as yup from "yup";
//schema
export const validateSignUpForm1 = yup.object().shape({
  firstname: yup.string().required("This field is required"),
  lastname: yup.string().required("This field is required"),
  email: yup.string().email("Invalid email").required("This field is required"),
  phone: yup
    .string()
    .min(10, "Phone number must be exactly 10 characters long")
    .max(10, "Phone number must be exactly 10 characters long")
    .required("This field is required"),
  password1: yup.string().required("This field is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password1")], "Password is diferent")
    .required("This field is required"),
});
