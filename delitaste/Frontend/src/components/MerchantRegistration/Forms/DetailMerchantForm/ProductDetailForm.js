import { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Menu from "assets/menu.jpg";
import "./DetailMerchantForm.scss";
import "style/Common.scss";

import FormHeader from "./FormHeader/FormHeader";

const initialValues = {
  menuPhoto: "",
  priceRange: "",
};

function ProductDetailForm(props) {
  const handleSubmitForm = (values) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <>
            <Form className="merchant-form-container">
              <FormHeader name="Product & Merchandise Info" />
              <div className="form-name">PRODUCT DETAIL INFORMATION:</div>
              <div className="merchant-form-wrapper">
                <div className="merchant-form-field-wrapper-file">
                  <div className="merchant-form-label-wrapper-file">
                    Menu Photo
                  </div>
                  <div className="merchant-form-input-wrapper-file">
                    <div className="business-registration-browse">
                      <Field
                        className="form-file-field-2"
                        type="file"
                        name="menuPhoto"
                      />
                    </div>
                  </div>
                </div>

                <div className="description-box-wrapper">
                  <img src={Menu} className="description-box-image" />
                  <span className="description-box-content">
                    Please upload a clear photo of the menu so we can help to
                    create menu for your shop faster. <br />
                    *Note: If pictures provided don't satisfy our requirements,
                    Tastie will replace them with Tastie logo so that your shop
                    can start to sell as soon as possible. You can still change
                    those photos later.
                  </span>
                </div>

                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Price Range</div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field-select"
                      style={{ width: "100%", height: "35px" }}
                      as="select"
                      name="priceRange"
                    >
                      <option value="" selected disabled hidden>
                        Select a price range...
                      </option>
                      <option value={0} label={"0 - 20.000đ"} />
                      <option value={1} label={"20.000đ - 50.000đ"} />
                      <option value={2} label={"50.000đ - 100.000đ"} />
                      <option value={3} label={"100.000đ - 200.000đ"} />
                      <option value={4} label={"200.000đ - 500.000đ"} />
                      <option value={5} label={"500.000đ - 1.000.000đ"} />
                      <option value={5} label={"1.000.000đ - 2.000.000đ"} />
                      <option value={6} label={"2.000.000đ - 5.000.000đ"} />
                    </Field>
                  </div>
                </div>
                <div
                  className="field-bottom-side-wrapper"
                  style={{ marginBottom: "20%" }}
                >
                  <span className="field-description">
                    Price should be estimated based on the average price for
                    each product (dish) in your business units.
                  </span>
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

export default withRouter(ProductDetailForm);
