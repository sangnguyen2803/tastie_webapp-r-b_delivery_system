import * as yup from "yup";

//schema
const validateMerchantForm1 = yup.object().shape({
  name: yup.string().required("This field cannot be left empty."),
  phone: yup
    .string()
    .min(10, "Phone number must be exactly 10 characters long")
    .max(10, "Phone number must be exactly 10 characters long")
    .required("This field cannot be left empty."),
  city: yup.string().required("Please select a city"),
  district: yup.string().required("Please select a district"),
  ward: yup.string().required("Please select a ward"),
  road: yup.string().required("This field cannot be left empty."),
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
  idCardNumberBank: yup.string().required("This field cannot be left empty."),
  dateOfIssue: yup.date().required("This field cannot be left empty."),
  bankBeneficiaryName: yup
    .string()
    .required("This field cannot be left empty."),
  bankAccountNumber: yup.string().required("This field cannot be left empty."),
  bankName: yup.string().required("This field cannot be left empty."),
  bankProvince: yup.string().required("This field cannot be left empty."),
  bankBranch: yup.string().required("This field cannot be left empty."),
});

export { validateMerchantForm1, validateMerchantForm2, validateMerchantForm3 };
