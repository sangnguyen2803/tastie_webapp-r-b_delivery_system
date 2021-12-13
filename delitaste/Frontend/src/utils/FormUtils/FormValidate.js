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
  password1: yup
    .string()
    .required("This field is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  password2: yup
    .string()
    .oneOf([yup.ref("password1")], "Password is diferent")
    .required("This field is required"),
});
