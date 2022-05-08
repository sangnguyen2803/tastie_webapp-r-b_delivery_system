import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { validateMerchantForm2 } from "utils/FormUtils/MerchantFormValidate";

import "./DetailMerchantForm.scss";
import "style/Common.scss";
import { updateRepresentativeInfoFormAPI } from "store/actions/ProviderAction/ProviderAction";

import FormError from "components/Commons/ErrorHandlers/FormError/FormError";
import FormHeader from "./FormHeader/FormHeader";
import SwitchSelector from "react-switch-selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faUpload } from "@fortawesome/fontawesome-free-solid";

const options = [
  {
    label: "Individual",
    value: 0,
    selectedBackgroundColor: "#b90009",
  },
  {
    label: "Enterprise",
    value: 1,
    selectedBackgroundColor: "#b90009",
  },
];

const initialValues = {
  companyName: "",
  companyAddress: "",
  representativeName: "",
  representativeEmail: "",
  phone: "",
  idCardNumber: "",
  idCardFront: null,
  idCardBack: null,
  businessRegistration: "",
  taxCode: "",
};
const formHeaderText = {
  title: "2. Registered Representative Information",
  headerText: "Ready to be our Taste's merchant partner.",
  bodyText:
    "The representative’s infos must also be the provider’s infos. Our staff will contact via phone number within 24 hours to confirm the provided information.",
};
function RegisteredRepresentativeForm(props) {
  const [showRegisterAsEnterprise, setShowRegisterAsEnterprise] =
    useState(false);

  const onChange = () => {
    setShowRegisterAsEnterprise((prev) => !prev);
  };
  const initialSelectedIndex = options.findIndex(({ value }) => value === 0);

  const handleSubmitForm = async (values) => {
    const formData = {
      role: values.companyName && values.companyAddress ? 2 : 1,
      company_name: values.companyName,
      company_address: values.companyAddress,
      owner_name: values.representativeName,
      email: values.representativeEmail,
      owner_phone: values.phone,
      owner_card_id: values.idCardNumber,
      owner_card_image1: values.idCardFront || "front-card",
      owner_card_image2: values.idCardBack || "back-card",
      tax_code: values.taxCode,
    };
    if (!props.match.params.id) return;
    const updateStatus = await props.updateRepresentativeInfoFormAPI(
      props.match.params.id,
      formData
    );
    if (updateStatus) props.history.push("business-unit");
  };
  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched, setFieldValue } = formikProps;
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
                  <div
                    className="merchant-form-label-wrapper"
                    style={{ fontWeight: "normal", fontSize: 14 }}
                  >
                    Register as:
                  </div>
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
                        wrapperBorderRadius={0}
                        optionBorderRadius={0}
                        width={80}
                      />
                    </div>
                  </div>
                </div>

                {showRegisterAsEnterprise ? (
                  <Fragment>
                    <div className="field-group-title">
                      Enterprise information:
                    </div>
                    <div className="field-group-wrapper">
                      <div className="merchant-form-field-wrapper">
                        <div className="merchant-form-label-wrapper">
                          Company name
                        </div>
                        <div className="merchant-form-input-wrapper form-input-extra-large">
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

                      <div className="merchant-form-field-wrapper">
                        <div className="merchant-form-label-wrapper">
                          Company address
                        </div>
                        <div className="merchant-form-input-wrapper form-input-extra-large">
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
                    </div>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
                <div className="field-group-title">Personal information:</div>
                <div className="field-group-wrapper">
                  <div className="merchant-form-field-wrapper">
                    <div className="merchant-form-label-wrapper">Full name</div>
                    <div className="merchant-form-input-wrapper  form-input-extra-large">
                      <Field
                        className={
                          errors.representativeName
                            ? "form-text-field error"
                            : "form-text-field"
                        }
                        type="text"
                        name="representativeName"
                        placeholder="Enter your name"
                        maxLength={50}
                        autoComplete="on"
                      />
                    </div>
                  </div>

                  <div className="merchant-form-field-wrapper">
                    <div className="merchant-form-label-wrapper">
                      Email & Phone number
                    </div>
                    <div className="merchant-form-input-wrapper  form-input-medium">
                      <Field
                        className={
                          errors.representativeEmail
                            ? "form-text-field error"
                            : "form-text-field"
                        }
                        type="text"
                        name="representativeEmail"
                        placeholder="Email address"
                        maxLength={50}
                        autoComplete="on"
                      />
                      <Field
                        className={
                          errors.phone
                            ? "form-text-field error"
                            : "form-text-field"
                        }
                        type="text"
                        name="phone"
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
                    <div className="merchant-form-input-wrapper form-input-medium">
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
                </div>
                <div className="field-group-title">Registration Documents:</div>
                <div className="field-group-wrapper">
                  <div className="merchant-form-field-wrapper-file">
                    <div className="merchant-form-label-wrapper-file">
                      ID Card
                    </div>

                    <div className="merchant-form-input-wrapper-file">
                      <div className="front-id-card-browse">
                        <span className="file-upload-description">
                          Photo of the front side of your ID Card
                        </span>
                        <label className="form-file-field-2" for="upload">
                          <FontAwesomeIcon
                            className="upload-icon"
                            icon={faUpload}
                          />
                          <span>Choose a file to upload</span>
                          <input type="file" id="upload" />
                        </label>
                      </div>
                      <div className="back-id-card-browse">
                        <span className="file-upload-description">
                          Photo of the back side of your ID Card
                        </span>
                        <label className="form-file-field-2" for="upload">
                          <FontAwesomeIcon
                            className="upload-icon"
                            icon={faUpload}
                          />
                          <span>Choose a file to upload</span>
                          <input type="file" id="upload" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="merchant-form-field-wrapper-file">
                    <div className="merchant-form-label-wrapper-file">
                      Business Registration
                    </div>
                    <div className="merchant-form-input-wrapper-file">
                      <div className="business-registration-browse">
                        <label className="form-file-field-2" for="upload">
                          <FontAwesomeIcon
                            className="upload-icon"
                            icon={faUpload}
                          />
                          <span>Choose a file to upload</span>
                          <input type="file" id="upload" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="merchant-form-field-wrapper">
                    <div className="merchant-form-label-wrapper">Tax Code</div>
                    <div className="merchant-form-input-wrapper form-input-medium">
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

RegisteredRepresentativeForm.propTypes = {
  updateRepresentativeInfoFormAPI: PropTypes.func.isRequired,
};

export default withRouter(
  connect(null, {
    updateRepresentativeInfoFormAPI,
  })(RegisteredRepresentativeForm)
);
