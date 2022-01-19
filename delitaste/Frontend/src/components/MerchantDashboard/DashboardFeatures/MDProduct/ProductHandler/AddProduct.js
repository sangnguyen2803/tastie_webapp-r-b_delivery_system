import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./ProductHandler.scss";
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
  faSave,
} from "@fortawesome/fontawesome-free-solid";
import { getCategoryAPI } from "store/actions/MerchantRegistration/MerchantRegistrationActions";
import AddAdditionalOption from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductHandler/AddAdditionalOption";
import UpdateAdditionalOption from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductHandler/UpdateAdditionalOption";
const initialValues = {
  productName: "",
  description: "",
  available: 0,
  status: 1,
  quantityAvailable: 0,
  productStatus: 0,
  productPrice: 0,
  productPhoto: "",
  position: 1,
};

function AddProduct(props) {
  const [showFoodCategory, setShowFoodCategory] = useState(false);
  const [showMainFoodCategory, setShowMainFoodCategory] = useState(false);
  const [showMenuCategory, setShowMenuCategory] = useState(false);
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

  const [choices, setChoices] = useState([]);
  const [currentId, setCurrentId] = useState(0);
  const [additionalOption, setAdditionalOption] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  useEffect(async () => {
    try {
      let foodCategory = await props.getCategoryAPI("food");
      let mainFoodCategory = await props.getCategoryAPI("main-food");
      setFoodCategory(foodCategory);
      setMainFoodCategory(mainFoodCategory);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    setFilteredFoodCategory([]);
    if (selectedMainFood.length !== 1) return;
    const foodCategoryList = foodCategory.filter(
      (item) => item.parent_category_id === selectedMainFood[0]
    );
    setFilteredFoodCategory(foodCategoryList);
  }, [selectedMainFood]);

  const addProduct = (values) => {};
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => addProduct(values)}
    >
      {(formikProps) => {
        const { values, errors, touched } = formikProps;

        return (
          <Fragment>
            <Form style={{ width: "inherit" }}>
              <div className="panel-detail-title">Add Item</div>
              <div className="product-handler-container">
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
                    as="textarea"
                    name="description"
                    placeholder="Description about your product"
                  />
                </div>
                <span className="product-detail-form-label">Menu category</span>
                <div className="product-detail-tag-container">
                  {menuCategory.map((tag, index) =>
                    selectedFood.includes(tag.category_id) ? (
                      <Tag key={tag.category_id} text={tag.category_name} />
                    ) : (
                      <></>
                    )
                  )}
                </div>
                <ButtonGroup float="flex-start" mgTop={10} mgBottom={5}>
                  <Button
                    color={"black"}
                    bglight={true}
                    border={"#5d5d5d 1.5px solid"}
                    prefix={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faSearch}
                      />
                    }
                    gap={"10px"}
                    justifyContent={"center"}
                    width="92%"
                    height={30}
                    label="Select Category"
                    onClick={() => setShowMenuCategory(true)}
                  />
                </ButtonGroup>

                <span className="product-detail-form-label">Food category</span>

                <ButtonGroup float="flex-start" mgTop={10} mgBottom={5}>
                  <Button
                    color={"black"}
                    bglight={true}
                    border={"#5d5d5d 1.5px solid"}
                    prefix={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faSearch}
                      />
                    }
                    justifyContent={"center"}
                    gap={"10px"}
                    width="92%"
                    height={30}
                    onClick={() => setShowMainFoodCategory(true)}
                    label="Select Category"
                  />
                </ButtonGroup>
                <div className="product-detail-tag-container">
                  {mainFoodCategory.map((tag, index) =>
                    selectedMainFood.includes(tag.category_id) ? (
                      <Tag key={tag.category_id} text={tag.category_name} />
                    ) : (
                      <></>
                    )
                  )}
                </div>
                <span className="product-detail-form-label">
                  Specialty category
                </span>

                <ButtonGroup float="flex-start" mgTop={10} mgBottom={5}>
                  <Button
                    color={"black"}
                    disabled={selectedMainFood.length ? false : true}
                    bglight={true}
                    border={"#5d5d5d 1.5px solid"}
                    prefix={
                      <FontAwesomeIcon
                        className="button-icon"
                        icon={faSearch}
                      />
                    }
                    justifyContent={"center"}
                    gap={"10px"}
                    width="92%"
                    height={30}
                    onClick={() => setShowFoodCategory(true)}
                    label="Select Category"
                  />
                </ButtonGroup>
                <div className="product-detail-tag-container">
                  {filteredFoodCategory.map((tag, index) =>
                    selectedFood.includes(tag.category_id) ? (
                      <Tag key={tag.category_id} text={tag.category_name} />
                    ) : (
                      <></>
                    )
                  )}
                </div>
                <span className="product-detail-form-label">
                  Additional options
                </span>

                <ButtonGroup float="flex-start" mgTop={10} mgBottom={5}>
                  <Button
                    color={"black"}
                    bglight={true}
                    border={"#5d5d5d 1.5px solid"}
                    justifyContent={"center"}
                    prefix={
                      <FontAwesomeIcon className="button-icon" icon={faPlus} />
                    }
                    onClick={() => setShowAdditionalOption(true)}
                    width="92%"
                    height={30}
                    label="Add an option"
                  />
                </ButtonGroup>
                <div className="option-box-container">
                  {additionalOption.map((option) => (
                    <div
                      className="option-box"
                      onClick={() => {
                        setShowUpdateAdditionalOption(true);
                        setSelectedOption(option.name);
                      }}
                      key={option.name}
                    >
                      {option.name}
                    </div>
                  ))}
                </div>
                <span className="product-detail-form-label">Available</span>
                <div className="product-detail-form-input-wrapper">
                  <Field
                    type="text"
                    name="quantityAvailable"
                    placeholder="In stock"
                  />
                </div>

                <span className="product-detail-form-label">Status</span>
                <div className="product-detail-form-with-select-2">
                  <Field
                    as="select"
                    className="select-box"
                    name="productStatus"
                    placeholder="Status"
                  >
                    <option>Available</option>
                  </Field>
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
                <span className="product-detail-form-label">Price</span>
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
                  buttonType="primary"
                  justifyContent={"center"}
                  onClick={(values) => addProduct(values)}
                  type="submit"
                  width={100}
                  height={36}
                  radius={"0px"}
                  label={"Add"}
                  prefix={
                    <FontAwesomeIcon icon={faPlus} style={{ color: "white" }} />
                  }
                />
              </ButtonGroup>
              <Modal
                isOpen={showMenuCategory}
                title={"Menu Category"}
                width={50}
                height={500}
                close={() => {
                  setShowMenuCategory(false);
                }}
              >
                <CategorySelector
                  save={() => setShowMenuCategory(false)}
                  selectedCategory={selectedMenu}
                  setSelectedCategory={setSelectedMenu}
                  list={menuCategory}
                  title={"Select categories for menu (maximum: 3)"}
                  required={1}
                />
              </Modal>
              <Modal
                isOpen={showMainFoodCategory}
                title={"Food Category"}
                width={50}
                height={500}
                close={() => {
                  setShowMainFoodCategory(false);
                }}
              >
                <CategorySelector
                  save={() => setShowMainFoodCategory(false)}
                  selectedCategory={selectedMainFood}
                  setSelectedCategory={setSelectedMainFood}
                  list={mainFoodCategory}
                  title={"Select categories for foods (maximum: 3)"}
                  required={1}
                />
              </Modal>
              <Modal
                isOpen={showFoodCategory}
                title={"Food Specialty Category"}
                width={50}
                height={500}
                close={() => {
                  setShowFoodCategory(false);
                }}
              >
                <CategorySelector
                  save={() => setShowFoodCategory(false)}
                  selectedCategory={selectedFood}
                  setSelectedCategory={setSelectedFood}
                  list={filteredFoodCategory}
                  title={"Select categories for food specialty (maximum: 3)"}
                  required={3}
                />
              </Modal>
              <Modal
                isOpen={showAdditionalOption}
                title={"Add Additional Options"}
                width={35}
                height={520}
                close={() => {
                  setShowAdditionalOption(false);
                }}
              >
                <AddAdditionalOption
                  title={"Create options for your product"}
                  additionalOption={additionalOption}
                  setAdditionalOption={setAdditionalOption}
                  setShowAdditionalOption={setShowAdditionalOption}
                />
              </Modal>
              <Modal
                isOpen={showUpdateAdditionalOption}
                title={"Update Additional Options"}
                width={35}
                height={520}
                close={() => {
                  setShowUpdateAdditionalOption(false);
                }}
              >
                <UpdateAdditionalOption
                  title={"Update your additional option"}
                  additionalOption={additionalOption}
                  setAdditionalOption={setAdditionalOption}
                  setShowAdditionalOption={showUpdateAdditionalOption}
                  selectedOption={selectedOption}
                />
              </Modal>
            </Form>
          </Fragment>
        );
      }}
    </Formik>
  );
}

AddProduct.propTypes = {
  getCategoryAPI: PropTypes.func.isRequired,
};

export default withRouter(
  connect(null, {
    getCategoryAPI,
  })(AddProduct)
);
