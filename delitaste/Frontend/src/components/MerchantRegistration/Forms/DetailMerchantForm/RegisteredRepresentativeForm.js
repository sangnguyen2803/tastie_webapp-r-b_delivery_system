import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { validateMerchantForm2 } from "utils/FormUtils/MerchantFormValidate";

import "./DetailMerchantForm.scss";
import "style/Common.scss";

import Stepper from "components/Commons/Stepper/Stepper";
import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import FormHeader from "./FormHeader/FormHeader";
import SwitchSelector from "react-switch-selector";

const options = [
  {
    label: "Individual",
    value: 0,
    selectedBackgroundColor: "#AB2E15",
  },
  {
    label: "Enterprise",
    value: 1,
    selectedBackgroundColor: "#AB2E15",
  },
];

const initialValues = {
  registerMethod: "individual",
  companyName: "",
  companyAddress: "",
  representativeName: "",
  representativeEmail: "",
  phone1: "",
  phone2: "",
  idCardNumber: "",
  idCardFront: "",
  idCardBack: "",
  businessRegistration: "",
  taxCode: "",
};

function RegisteredRepresentativeForm(props) {
  const [showRegisterAsEnterprise, setShowRegisterAsEnterprise] =
    useState(false);

  const onChange = () => {
    setShowRegisterAsEnterprise((prev) => !prev);
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "individual"
  );

  const handleSubmitForm = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateMerchantForm2}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <>
            <Form className="merchant-form-container">
              <FormHeader name="Registered Representative Info" />
              <div className="form-name">REPRESENTATIVE INFORMATION:</div>
              <div className="merchant-form-wrapper">
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Register As</div>
                  <div className="merchant-form-input-wrapper">
                    <div className="switcher-wrapper">
                      <SwitchSelector
                        onChange={onChange}
                        options={options}
                        initialSelectedIndex={initialSelectedIndex}
                        backgroundColor={"#E6E6E6"}
                        fontColor={"#2C2C2C"}
                        selectedFontColor={"#E6E6E6"}
                        fontSize={13}
                        wrapperBorderRadius={5}
                        optionBorderRadius={5}
                      />
                    </div>
                  </div>
                </div>
                {showRegisterAsEnterprise ? (
                  <>
                    <div className="merchant-form-field-wrapper">
                      <div className="merchant-form-label-wrapper">
                        Company name
                      </div>
                      <div className="merchant-form-input-wrapper">
                        <Field
                          className={
                            errors.companyName
                              ? "form-text-field error"
                              : "form-text-field"
                          }
                          type="text"
                          name="companyName"
                          placeholder="Company name"
                        />
                      </div>
                    </div>
                    <div className="field-bottom-side-wrapper">
                      <FormError
                        err={
                          errors.companyName && touched.companyName
                            ? errors.companyName
                            : ""
                        }
                        spaceBetween={0}
                        fontSize={12}
                        fontWeight={"bold"}
                      />
                    </div>
                    <div className="merchant-form-field-wrapper">
                      <div className="merchant-form-label-wrapper">
                        Company address
                      </div>
                      <div className="merchant-form-input-wrapper">
                        <Field
                          className={
                            errors.companyAddress
                              ? "form-text-field error"
                              : "form-text-field"
                          }
                          type="text"
                          name="companyAddress"
                          placeholder="Company address"
                          maxLength={50}
                          autoComplete="on"
                        />
                      </div>
                    </div>
                    <div className="field-bottom-side-wrapper">
                      <FormError
                        err={
                          errors.companyAddress && touched.companyAddress
                            ? errors.companyAddress
                            : ""
                        }
                        spaceBetween={0}
                        fontSize={12}
                        fontWeight={"bold"}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Representative <br />
                    full name
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className={
                        errors.representativeName
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="representativeName"
                      placeholder="Representative's name"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={
                      errors.representativeName && touched.representativeName
                        ? errors.representativeName
                        : ""
                    }
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                  <span className="field-description">
                    Representative must be one who signed the contract.
                  </span>
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Email</div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className={
                        errors.representativeEmail
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="representativeEmail"
                      placeholder="Email"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={
                      errors.representativeEmail && touched.representativeEmail
                        ? errors.representativeEmail
                        : ""
                    }
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Phone number
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className={
                        errors.phone1
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="phone1"
                      placeholder="Phone number"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={errors.phone1 && touched.phone1 ? errors.phone1 : ""}
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Secondary <br />
                    Phone number
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field"
                      type="text"
                      name="phone2"
                      placeholder="Phone number"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    ID Card number
                  </div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className={
                        errors.idCardNumber
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="idCardNumber"
                      placeholder="Identity card number"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={
                      errors.idCardNumber && touched.idCardNumber
                        ? errors.idCardNumber
                        : ""
                    }
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                </div>
                <div className="merchant-form-field-wrapper-file">
                  <div className="merchant-form-label-wrapper-file">
                    ID Card
                  </div>
                  <div className="merchant-form-input-wrapper-file">
                    <div className="front-id-card-browse">
                      <span className="file-upload-description">
                        Photo of the front side of your ID Card
                      </span>
                      <Field
                        className="form-file-field-1"
                        type="file"
                        name="idCardFront"
                        maxLength={50}
                        autoComplete="on"
                      />
                    </div>
                    <div className="back-id-card-browse">
                      <span className="file-upload-description">
                        Photo of the back side of your ID Card
                      </span>
                      <Field
                        className="form-file-field-1"
                        type="file"
                        name="idCardBack"
                        maxLength={50}
                        autoComplete="on"
                      />
                    </div>
                  </div>
                </div>

                <div className="merchant-form-field-wrapper-file">
                  <div className="merchant-form-label-wrapper-file">
                    Business Registration
                  </div>
                  <div className="merchant-form-input-wrapper-file">
                    <div className="business-registration-browse">
                      <Field
                        className="form-file-field-2"
                        type="file"
                        name="merchant-id-card-1"
                        maxLength={50}
                        autoComplete="on"
                      />
                    </div>
                  </div>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Tax Code</div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className={
                        errors.taxCode
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="taxCode"
                      placeholder="Tax Code"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={
                      errors.taxCode && touched.taxCode ? errors.taxCode : ""
                    }
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                </div>
              </div>
              <div className="btn-merchant-registration-wrapper">
                <button className="btn-merchant-registration-back">Back</button>
                <button
                  className="btn-merchant-registration-next"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default withRouter(RegisteredRepresentativeForm);
