import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../ProductHandler/ProductHandler.scss";
import "components/MerchantDashboard/DashboardFeatures/Panel.scss";
import "style/Common.scss";

import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import CategorySelector from "components/MerchantRegistration/Forms/DetailMerchantForm/CategorySelector/CategorySelector";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Tag from "components/Commons/Tag/Tag";
import {
  faPlus,
  faSearch,
  faUndo,
  faCircle,
} from "@fortawesome/fontawesome-free-solid";
import { getCategoryAPI } from "store/actions/ProviderAction/ProviderAction";
import AddAdditionalOption from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductHandler/AddAdditionalOption";
import UpdateAdditionalOption from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductHandler/UpdateAdditionalOption";
import {
  getMenuCategoryAPI,
  addProductAPI,
} from "store/actions/ProductAction/ProductAction";

const initialValues = {
  productName: "",
  description: "",
  available: 0,
  status: 1,
  quantityAvailable: 0,
  productStatus: 1,
  productPrice: 0,
  productPhoto: "",
  position: 1,
};

function AddUpcomingProduct(props) {
  const [showFoodCategory, setShowFoodCategory] = useState(false);
  const [showMainFoodCategory, setShowMainFoodCategory] = useState(false);
  const [showMenuCategory, setShowMenuCategory] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [showAdditionalOption, setShowAdditionalOption] = useState(false);
  const [showUpdateAdditionalOption, setShowUpdateAdditionalOption] =
    useState(false);
  const [foodCategory, setFoodCategory] = useState([]);
  const [filteredFoodCategory, setFilteredFoodCategory] = useState([]);
  const [mainFoodCategory, setMainFoodCategory] = useState([]);
  const [menuCategory, setMenuCategory] = useState([]);
  const [selectedFood, setSelectedFood] = useState([]);
  const [selectedMainFood, setSelectedMainFood] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [additionalOption, setAdditionalOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const { user } = props;
  useEffect(() => {
    async function fetchingCategoryData() {
      try {
        let foodCategory = await props.getCategoryAPI("food");
        let mainFoodCategory = await props.getCategoryAPI("main-food");
        if (user.provider_id) {
          var menuCategory = await props.getMenuCategoryAPI(user.provider_id);
        }
        setFoodCategory(foodCategory);
        setMainFoodCategory(mainFoodCategory);
        setMenuCategory(menuCategory);
      } catch (err) {
        console.log(err);
      }
    }
    fetchingCategoryData();
  }, []);

  useEffect(() => {
    setFilteredFoodCategory([]);
    if (selectedMainFood.length !== 1) return;
    const foodCategoryList = foodCategory.filter(
      (item) => item.parent_category_id === selectedMainFood[0]
    );
    setFilteredFoodCategory(foodCategoryList);
  }, [selectedMainFood]);

  const addProduct = async (values) => {
    const formData = {
      provider_id: user.provider_id,
      product_name: values.productName,
      description: values.description,
      price: values.productPrice || 0,
      product_image: "product-image",
    };
    if (user.provider_id !== -1 && user.provider_id !== null) {
      const status = await props.addProductAPI(formData);
      if (status) console.log("Thanh cong");
      else console.log("That bai");
    }
  };
  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <Form style={{ width: "100%" }}>
            <div className="panel-detail-title" style={{ marginTop: 0 }}>
              Create surveillance
            </div>
            <div
              className="option-box-wrapper-survey"
              style={{ marginBottom: 5 }}
            >
              <span
                className="option-box-title-main-survey"
                style={{
                  fontSize: 14,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ width: "100%", marginBottom: 10, fontSize: 14 }}>
                  <b>Question: </b>
                  <Field
                    type="text"
                    style={{ width: "90%" }}
                    defaultValue={"Are you eager to try this product?"}
                    name="question"
                  />
                </span>
              </span>
              <div className="homebody-sb-radio-detail-wrapper">
                <label
                  className="hb-sb-type-wrapper radio"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <input type="radio" checked={false} />
                  <span className="hb-sb-label-radio option-box-radio-label">
                    A1:{" "}
                    <Field
                      type="text"
                      style={{ border: "none", background: "transparent" }}
                      placeholder={"Type your answer here"}
                      name="a1"
                    />
                  </span>
                </label>
                <label
                  className="hb-sb-type-wrapper radio"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <input type="radio" checked={false} />
                  <span className="hb-sb-label-radio option-box-radio-label">
                    A2:{" "}
                    <Field
                      type="text"
                      style={{ border: "none", background: "transparent" }}
                      placeholder={"Type your answer here"}
                      name="a2"
                    />
                  </span>
                </label>
                <label
                  className="hb-sb-type-wrapper radio"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <input type="radio" checked={false} />
                  <span className="hb-sb-label-radio option-box-radio-label">
                    A3:{" "}
                    <Field
                      type="text"
                      style={{ border: "none", background: "transparent" }}
                      placeholder={"Type your answer here"}
                      name="a3"
                    />
                  </span>
                </label>
                <label
                  className="hb-sb-type-wrapper radio"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <input type="radio" checked={false} />
                  <span className="hb-sb-label-radio option-box-radio-label">
                    A4:{" "}
                    <Field
                      type="text"
                      style={{ border: "none", background: "transparent" }}
                      placeholder={"Type your answer here"}
                      name="a4"
                    />
                  </span>
                </label>
                <label
                  className="hb-sb-type-wrapper radio"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <input type="radio" checked={false} />
                  <span className="hb-sb-label-radio option-box-radio-label">
                    A5:{" "}
                    <Field
                      type="text"
                      style={{ border: "none", background: "transparent" }}
                      placeholder={"Type your answer here"}
                      name="a5"
                    />
                  </span>
                </label>
              </div>
            </div>
            <div
              className="product-handler-container"
              style={{ marginBottom: 50 }}
            >
              <span className="product-detail-form-label">Name</span>
              <div className="product-detail-form-input-wrapper">
                <Field
                  type="text"
                  name="productName"
                  placeholder="Product name"
                />
              </div>
              <div className="form-label-description">
                <span className="product-detail-form-label">Description</span>
                <span className="letter-counter">
                  {values.description.length} / 200
                </span>
              </div>
              <div className="product-detail-form-input-wrapper">
                <Field
                  className="product-detail-textarea"
                  style={{ height: 80 }}
                  as="textarea"
                  name="description"
                  placeholder="Description about your product"
                />
              </div>
              <span className="product-detail-form-label">Photo</span>

              <ButtonGroup float="flex-start" mgTop={10} mgBottom={5}>
                <Button
                  color={"black"}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon className="button-icon" icon={faPlus} />
                  }
                  width="50%"
                  height={30}
                  label="Upload a photo"
                />
              </ButtonGroup>
              <span className="product-detail-form-label">Estimated Price</span>
              <div className="product-detail-form-with-select">
                <Field
                  className="input-price"
                  type="text"
                  name="productPrice"
                  placeholder="Price"
                />
                <Field
                  className="select-currency"
                  as="select"
                  name="curency"
                  placeholder="Currency"
                >
                  <option>USD</option>
                  <option>VND</option>
                  <option>EURO</option>
                </Field>
              </div>
            </div>

            <ButtonGroup
              width={90}
              float={"space-between"}
              mgTop={10}
              gap={10}
              mgBottom={10}
            >
              <Button
                buttonType="secondary"
                justifyContent={"center"}
                width={100}
                height={36}
                radius={"0px"}
                label={"Undo"}
                prefix={
                  <FontAwesomeIcon icon={faUndo} style={{ color: "white" }} />
                }
              />
              <Button
                onClick={addProduct}
                buttonType="primary"
                justifyContent={"center"}
                width={100}
                height={36}
                radius={"0px"}
                label={"Add"}
                prefix={
                  <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
                }
              />
            </ButtonGroup>
          </Form>
        );
      }}
    </Formik>
  );
}

AddUpcomingProduct.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
  getCategoryAPI: PropTypes.func.isRequired,
  getMenuCategoryAPI: PropTypes.func.isRequired,
  addProductAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getCategoryAPI,
    getMenuCategoryAPI,
    addProductAPI,
  })(AddUpcomingProduct)
);
