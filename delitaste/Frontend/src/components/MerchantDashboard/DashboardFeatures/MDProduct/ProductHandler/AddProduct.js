import { Fragment, useState, useEffect, useRef } from "react";
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
import AddMenuCategory from "./AddMenuCategory";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Tag from "components/Commons/Tag/Tag";
import { faPlus, faSearch, faUndo } from "@fortawesome/fontawesome-free-solid";
import { getCategoryAPI } from "store/actions/ProviderAction/ProviderAction";
import AddAdditionalOption from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductHandler/AddAdditionalOption";
import UpdateAdditionalOption from "components/MerchantDashboard/DashboardFeatures/MDProduct/ProductHandler/UpdateAdditionalOption";
import {
  getMenuCategoryAPI,
  addProductAPI,
} from "store/actions/ProductAction/ProductAction";
import SelectMenuCategory from "./SelectMenuCategory";
import axios from "axios";
import AddMenu from "./AddMenu";

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

function AddProduct(props) {
  const [productImage, setProductImage] = useState(null);
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
  const [selectedMenuCategory, setSelectedMenuCategory] = useState([]);
  const [productReview, setProductReview] = useState(null);
  const inputFile = useRef(null);
  const { user } = props;

  const [showAddMenu, setShowAddMenu] = useState(false);

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
    /*
    try {
      const res = await axios.post(
        `http://157.230.243.92:3777/upload/image-product`,
        data,
        {
          headers: {
            Accept: "application/json",
            ContentType: "multipart/form-data",
          },
        }
      );
      if (res.data.status) {
        console.log("hello");
        console.log(res.data.url);
      }
      console.log("upload failed");
    } catch (err) {
      console.log("Cannot upload avatar", err);
    }
    return;*/
    const formData = {
      provider_id: user.provider_id,
      product_name: values.productName,
      product_status: values.productStatus,
      description: values.description,
      price: values.productPrice || 0,
      quantity: values.quantityAvailable || 0,
      product_image: "product-image",
      menuCategoryID: selectedMenuCategory,
      mainCategoryID: selectedMainFood,
      foodCategoryID: selectedFood,
      additionalOptions: additionalOption,
    };
    if (user.provider_id !== -1 && user.provider_id !== null) {
      const result = await props.addProductAPI(formData, productImage); //event.target.file[0]
      if (result) {
        props.setShowHandlerPanel(1);
        props.setShowHandlerPanel(0);
        props.setDialogContent({
          header: "Add product",
          text1: `Successfully added your product ${values.productName}`,
          text2:
            "Your product has been added to the selected menu category. Please check it out",
        });
        props.setShowEditDialog(true);
      } else {
        props.setDialogContent({
          header: "Edit Product",
          text1: `Fail to add your product ${values.productName}`,
          text2: "Your product has not been added. Please try again",
        });
        props.setShowEditDialog(true);
      }
      return;
    }
  };

  const handleUploadImage = () => {
    inputFile.current.click();
  };
  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <Form style={{ width: "100%" }}>
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

              <ButtonGroup float="flex-start" mgTop={10} gap={12} mgBottom={5}>
                <Button
                  color={"black"}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon className="button-icon" icon={faSearch} />
                  }
                  gap={"10px"}
                  justifyContent={"center"}
                  width="44%"
                  height={30}
                  label="Select menu"
                  onClick={() => setShowCreateMenu(true)}
                  disabled={menuCategory?.length ? false : true}
                />
                <Button
                  color={"black"}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon className="button-icon" icon={faPlus} />
                  }
                  gap={"10px"}
                  justifyContent={"center"}
                  width="44%"
                  height={30}
                  label="Add menu"
                  onClick={() => setShowAddMenu(true)}
                />
              </ButtonGroup>
              <div className="product-detail-tag-container">
                {menuCategory?.map((tag, index) =>
                  selectedMenuCategory.includes(tag.menu_id) ? (
                    <Tag key={index} text={tag.name} />
                  ) : (
                    <></>
                  )
                )}
              </div>
              <span className="product-detail-form-label">Food category</span>

              <ButtonGroup float="flex-start" mgTop={10} mgBottom={5}>
                <Button
                  color={"black"}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon className="button-icon" icon={faSearch} />
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
                {mainFoodCategory?.map((tag, index) =>
                  selectedMainFood.includes(tag.category_id) ? (
                    <Tag key={index} text={tag.category_name} />
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
                  disabled={selectedMainFood?.length ? false : true}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon className="button-icon" icon={faSearch} />
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
                {filteredFoodCategory?.map((tag, index) =>
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
              <div
                className="product-image"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: productReview
                    ? "space-between"
                    : "flex-start",
                  alignItems: "center",
                  width: "92%",
                  gap: "10px",
                }}
              >
                <Button
                  color={"black"}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon className="button-icon" icon={faPlus} />
                  }
                  onClick={handleUploadImage}
                  width={180}
                  height={30}
                  label="Upload a photo"
                />
                <input
                  hidden={true}
                  name="upload"
                  type="file"
                  ref={inputFile}
                  onChange={(event) => {
                    setProductImage(event.target.files[0]);
                    const objectUrl = URL.createObjectURL(
                      event.target.files[0]
                    );
                    setProductReview(objectUrl);
                  }}
                  className="form-control"
                />
                {productReview && (
                  <img
                    src={productReview}
                    alt="review"
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
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
                onClick={() => addProduct(values)}
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
            <Modal
              openModal={showMenuCategory}
              title={"Menu Category"}
              width={50}
              height={500}
              closeModal={() => {
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
              openModal={showCreateMenu}
              title={"Add Menu Category"}
              width={50}
              height={450}
              closeModal={() => {
                setShowCreateMenu(false);
              }}
            >
              <AddMenuCategory
                save={() => {
                  setShowCreateMenu(false);
                }}
                list={menuCategory}
                selectedCategory={selectedMenuCategory}
                setSelectedCategory={setSelectedMenuCategory}
                title={"Select a menu category"}
                required={1}
              />
            </Modal>
            <Modal
              openModal={showMainFoodCategory}
              title={"Food Category"}
              width={50}
              height={500}
              closeModal={() => {
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
              openModal={showFoodCategory}
              title={"Food Specialty Category"}
              width={50}
              height={500}
              closeModal={() => {
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
              openModal={showAddMenu}
              title={"Add Menu category"}
              width={35}
              height={490}
              closeModal={() => {
                setShowAddMenu(false);
              }}
            >
              <AddMenu
                title={"Add a new menu category"}
                menuCategory={menuCategory}
                setMenuCategory={setMenuCategory}
                save={() => {
                  setShowAddMenu(false);
                }}
                close={() => {
                  setShowAddMenu(false);
                }}
              />
            </Modal>
            <Modal
              openModal={showAdditionalOption}
              title={"Add Additional Options"}
              width={35}
              height={520}
              closeModal={() => {
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
              openModal={showUpdateAdditionalOption}
              title={"Update Additional Options"}
              width={35}
              height={520}
              closeModal={() => {
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
        );
      }}
    </Formik>
  );
}

AddProduct.propTypes = {
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
  })(AddProduct)
);
