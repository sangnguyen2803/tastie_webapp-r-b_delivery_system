import * as yup from "yup";

export const validateSignUpForm1 = yup.object().shape({
  firstname: yup.string().required("Required"),
  lastname: yup.string().required("Required"),
  email: yup.string().email("invalid email").required("This field is required"),
  phone: yup
    .string()
    .min(10, "Must be length of 10")
    .max(10, "Must be length of 10")
    .required("This field is required"),
  password1: yup.string().required("This field is required"),
  password2: yup
    .string()
    .oneOf([yup.ref("password1"), null])
    .required("This field is required"),
});
