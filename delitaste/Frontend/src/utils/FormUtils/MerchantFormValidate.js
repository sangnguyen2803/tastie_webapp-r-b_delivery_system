import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const timeRegExp = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
//schema
const validateMerchantForm1 = yup.object().shape({
  name: yup.string().required("Merchant name is required"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "Phone number must be exactly 10 characters long")
    .max(10, "Phone number must be exactly 10 characters long"),
  city: yup.string().required("Please select a city"),
  district: yup.string().required("Please select a district"),
  ward: yup.string().required("Please select a ward"),
  road: yup.string(),
});

const validateMerchantForm2 = yup.object().shape({
  companyName: yup.string().required("This field cannot be left empty."),
  companyAddress: yup.string().required("This field cannot be left empty."),
  representativeName: yup.string().required("This field cannot be left empty."),
  representativeEmail: yup
    .string()
    .email("Invalid email")
    .required("This field cannot be left empty."),
  phone1: yup
    .string()
    .min(10, "Phone number must be exactly 10 characters long")
    .max(10, "Phone number must be exactly 10 characters long")
    .required("This field cannot be left empty."),
  idCardNumber: yup.string().required("This field cannot be left empty."),
  taxCode: yup.string().required("This field cannot be left empty."),
});

const validateMerchantForm3 = yup.object().shape({
  rushHour: yup
    .string()
    .matches(timeRegExp, "Incorrect time format, must be hh:mm:ss or hh:mm "),
});

const validateMerchantForm5 = yup.object().shape({
  idCardNumberBank: yup.string(),
  dateOfIssue: yup.date().required("This field is required."),
  bankBeneficiaryName: yup.string(),
  bankAccountNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(12, "Bank account must be over 12 digits in length."),
  bankName: yup.string(),
  bankProvince: yup.string(),
  bankBranch: yup.string(),
});
  
export {
  validateMerchantForm1,
  validateMerchantForm2,
  validateMerchantForm3,
  validateMerchantForm5,
};
