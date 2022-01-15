import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { validateMerchantForm3 } from "utils/FormUtils/MerchantFormValidate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk } from "@fortawesome/fontawesome-free-solid";
import "./DetailMerchantForm.scss";
import "style/Common.scss";

import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import FormHeader from "./FormHeader/FormHeader";
const formHeaderText = {
  title: "5. Bank Account Information",
  headerText: "One final step to finish your merchant registration.",
  bodyText:
    "Make sure the following information is accurate as Tastie will send future profits (after 25% deduction of total bill according to the contract) through this bank number. Make sure your business license is up to date as our staff will very your business license within 24 hours",
};
const initialValues = {
  idCardNumberBank: "",
  dateOfIssue: "",
  bankBeneficiaryName: "",
  bankAccountNumber: "",
  bankName: "",
  bankProvince: "",
  bankBranch: "",
};

function BankInfoForm(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  const handleSubmitForm = (values) => {};
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateMerchantForm3}
      validateOnChange={false}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <>
            <Form className="merchant-form-container">
              <FormHeader
                title={formHeaderText.title}
                headerText={formHeaderText.headerText}
                bodyText={formHeaderText.bodyText}
              />
              <div className="merchant-form-wrapper">
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Id card number
                  </div>
                  <div className="merchant-form-input-wrapper form-input-medium">
                    <Field
                      className={
                        errors.idCardNumberBank
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="text"
                      name="idCardNumberBank"
                      placeholder="ID card number"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={
                      errors.idCardNumberBank && touched.idCardNumberBank
                        ? errors.idCardNumberBank
                        : ""
                    }
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">
                    Date of issue
                  </div>
                  <div className="merchant-form-input-wrapper form-input-medium">
                    <Field
                      className={
                        errors.dateOfIssue
                          ? "form-text-field error"
                          : "form-text-field"
                      }
                      type="date"
                      name="dateOfIssue"
                      placeholder="Date of issue"
                      maxLength={50}
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
                  <FormError
                    err={
                      errors.dateOfIssue && touched.dateOfIssue
                        ? errors.dateOfIssue
                        : ""
                    }
                    spaceBetween={0}
                    fontSize={12}
                    fontWeight={"bold"}
                  />
                  <span className="field-description">
                    Date of issue must be entered by the following format:
                    YYYY/MM/DD. Eg. "1999-01-01"
                  </span>
                </div>
                <div className="group-field-name">Bank account:</div>
                <div className="field-bottom-side-wrapper">
                  <span className="field-description">
                    By providing the bank account information, the shop can
                    receive payment immediately after confirming in case the
                    payment method of this order is by credit card. No need to
                    wait for driver to pay in cash.
                  </span>
                </div>
                <div
                  className="field-group-wrapper"
                  style={{ marginTop: "10px" }}
                >
                  <div className="merchant-form-field-wrapper">
                    <div className="merchant-form-label-wrapper">
                      Bank beneficiary
                    </div>
                    <div className="merchant-form-input-wrapper form-input-large">
                      <Field
                        className={
                          errors.bankBeneficiaryName
                            ? "form-text-field error"
                            : "form-text-field"
                        }
                        type="text"
                        name="bankBeneficiaryName"
                        placeholder="Bank beneficiary name"
                      />
                    </div>
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <FormError
                      err={
                        errors.bankBeneficiaryName &&
                        touched.bankBeneficiaryName
                          ? errors.bankBeneficiaryName
                          : ""
                      }
                      spaceBetween={0}
                      fontSize={12}
                      fontWeight={"bold"}
                    />
                  </div>

                  <div className="merchant-form-field-wrapper">
                    <div className="merchant-form-label-wrapper">
                      Bank account number
                    </div>
                    <div className="merchant-form-input-wrapper form-input-large">
                      <Field
                        className={
                          errors.bankAccountNumber
                            ? "form-text-field error"
                            : "form-text-field"
                        }
                        type="text"
                        name="bankAccountNumber"
                        placeholder="Bank account number"
                      />
                    </div>
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <FormError
                      err={
                        errors.bankAccountNumber && touched.bankAccountNumber
                          ? errors.bankAccountNumber
                          : ""
                      }
                      spaceBetween={0}
                      fontSize={12}
                      fontWeight={"bold"}
                    />
                  </div>

                  <div className="merchant-form-field-wrapper">
                    <div className="merchant-form-label-wrapper">Bank name</div>
                    <div className="merchant-form-input-wrapper form-input-large">
                      <Field
                        className={
                          errors.bankName
                            ? "form-text-field error"
                            : "form-text-field"
                        }
                        type="text"
                        name="bankName"
                        placeholder="Bank name"
                      />
                    </div>
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <FormError
                      err={
                        errors.bankName && touched.bankName
                          ? errors.bankName
                          : ""
                      }
                      spaceBetween={0}
                      fontSize={12}
                      fontWeight={"bold"}
                    />
                  </div>

                  <div className="merchant-form-field-wrapper">
                    <div className="merchant-form-label-wrapper">
                      Bank Province
                    </div>
                    <div className="merchant-form-input-wrapper form-input-large">
                      <Field
                        className={
                          errors.bankProvince
                            ? "form-text-field error"
                            : "form-text-field"
                        }
                        type="text"
                        name="bankProvince"
                        placeholder="Bank province"
                      />
                    </div>
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <FormError
                      err={
                        errors.bankProvince && touched.dateOfIssue
                          ? errors.bankProvince
                          : ""
                      }
                      spaceBetween={0}
                      fontSize={12}
                      fontWeight={"bold"}
                    />
                  </div>

                  <div className="merchant-form-field-wrapper">
                    <div className="merchant-form-label-wrapper">
                      Bank Branch
                    </div>
                    <div className="merchant-form-input-wrapper form-input-large">
                      <Field
                        className={
                          errors.bankBranch
                            ? "form-text-field error"
                            : "form-text-field"
                        }
                        type="text"
                        name="bankBranch"
                        placeholder="Bank branch"
                      />
                    </div>
                  </div>
                  <div className="field-bottom-side-wrapper">
                    <FormError
                      err={
                        errors.bankBranch && touched.bankBranch
                          ? errors.bankBranch
                          : ""
                      }
                      spaceBetween={0}
                      fontSize={12}
                      fontWeight={"bold"}
                    />
                  </div>
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

export default withRouter(BankInfoForm);
