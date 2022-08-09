import { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import Menu from "assets/menu.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAsterisk, faImage } from "@fortawesome/fontawesome-free-solid";
import "./DetailMerchantForm.scss";
import "style/Common.scss";
import FormHeader from "./FormHeader/FormHeader";
import ImagePreview from "components/Commons/ImageHandlers/ImagePreview/ImagePreview";
import { updateProductDetailInfoFormAPI } from "store/actions/ProviderAction/ProviderAction";

const initialValues = {
  menu: null,
  priceRange: null,
};
const formHeaderText = {
  title: "4. Product Detail Information",
  headerText: "Let Tastie help you bring your specialty to everyone.",
  bodyText:
    "To make your business more consumer-friendly, provide a detailed list of products that your business will provide including price for each product. After registration, our staff will compare the products that you will sell with this list.",
};
function ProductDetailForm(props) {
  const [menu, setMenu] = useState(null);
  const [menuReview, setMenuReview] = useState(null);
  const handleSubmitForm = async (values) => {
    const formData = {
      menu_image: "abc",
      price_range: values.priceRange,
      update_at: new Date().toISOString().split("T")[0],
    };
    console.log(formData);
    if (!props.match.params.id) return;
    const updateStatus = await props.updateProductDetailInfoFormAPI(
      props.match.params.id,
      formData
    );
    if (updateStatus) props.history.push("bank");
  };
  return (
    <Formik
      initialValues={{ menu: null, priceRange: "" }}
      onSubmit={(values) => handleSubmitForm(values)}
    >
      {(formikProps) => {
        const { values, errors, touched, setFieldValue } = formikProps;
        return (
          <Fragment>
            <Form className="merchant-form-container">
              <FormHeader
                title={formHeaderText.title}
                headerText={formHeaderText.headerText}
                bodyText={formHeaderText.bodyText}
              />

              <div className="merchant-form-wrapper">
                <div className="field-group-wrapper">
                  <div className="merchant-form-field-wrapper-file">
                    <div className="merchant-form-label-wrapper-file">
                      Menu photo
                    </div>
                    <div className="merchant-form-input-wrapper-file">
                      <div
                        className="business-registration-browse"
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <label className="form-file-field-2" for="file">
                          <FontAwesomeIcon
                            className="upload-icon"
                            icon={faImage}
                          />
                          <span>Choose a file to upload</span>
                          <Field
                            type="file"
                            name="menu"
                            onChange={(event) => {
                              setMenu(event.target.files[0]);
                              const objectUrl = URL.createObjectURL(
                                event.target.files[0]
                              );
                              setMenuReview(objectUrl);
                            }}
                          />
                        </label>
                        <ImagePreview file={menu} />
                      </div>
                    </div>
                  </div>

                  <div className="description-box-wrapper">
                    <img src={Menu} className="description-box-image" />
                    <span className="description-box-content">
                      Please upload a clear photo of the menu so we can help to
                      create menu for your shop faster. <br />
                      *Note: If pictures provided don't satisfy our
                      requirements, Tastie will replace them with Tastie logo so
                      that your shop can start to sell as soon as possible. You
                      can still change those photos later.
                    </span>
                  </div>
                </div>
                <div className="merchant-form-field-wrapper">
                  <div className="merchant-form-label-wrapper">Price Range</div>
                  <div className="merchant-form-input-wrapper">
                    <Field
                      className="form-text-field-select"
                      style={{ width: "30%", height: "35px" }}
                      type="text"
                      name="priceRange"
                    />
                  </div>
                </div>
                <div className="field-bottom-side-wrapper">
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
          </Fragment>
        );
      }}
    </Formik>
  );
}
ProductDetailForm.propTypes = {
  updateProductDetailInfoFormAPI: PropTypes.func.isRequired,
};
export default withRouter(
  connect(null, {
    updateProductDetailInfoFormAPI,
  })(ProductDetailForm)
);
