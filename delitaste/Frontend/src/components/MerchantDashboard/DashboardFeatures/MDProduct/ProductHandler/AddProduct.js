import { Fragment, useState, useEffect } from "react";
import "./ProductHandler.scss";
import "components/MerchantDashboard/DashboardFeatures/Panel.scss";
import "style/Common.scss";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Tag from "components/Commons/Tag/Tag";

const initialValues = {
  name: "",
  description: "",
};

const selectedFoodCategory = [
  { id: 1, categoryName: "Milk tea" },
  { id: 2, categoryName: "Coffee" },
  { id: 3, categoryName: "StreetFood" },
];
function AddProduct(props) {
  return (
    <Formik initialValues={initialValues}>
      {(formikProps) => {
        const { values, errors, touched } = formikProps;
        return (
          <Fragment>
            <div className="panel-detail-title">Add Item</div>
            <Form className="product-handler-container">
              <span className="product-detail-form-label">Name</span>
              <div className="product-detail-form-input-wrapper">
                <Field type="text" name="name" placeholder="Product name" />
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
              <span className="product-detail-form-label">Food category</span>
              <div className="product-detail-tag-container">
                {selectedFoodCategory.map((tag, index) => (
                  <Tag text={tag.categoryName} />
                ))}
              </div>
              <ButtonGroup float="flex-start" mgTop={10} mgBottom={5}>
                <Button
                  color={"black"}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon className="button-icon" icon={faSearch} />
                  }
                  width="50%"
                  height={30}
                  label="Select Category"
                />
              </ButtonGroup>
              <span className="product-detail-form-label">
                Specialty food category
              </span>
              <div className="product-detail-tag-container">
                {selectedFoodCategory.map((tag, index) => (
                  <Tag text={tag.categoryName} />
                ))}
              </div>
              <ButtonGroup float="flex-start" mgTop={10} mgBottom={5}>
                <Button
                  color={"black"}
                  bglight={true}
                  border={"#5d5d5d 1.5px solid"}
                  prefix={
                    <FontAwesomeIcon className="button-icon" icon={faSearch} />
                  }
                  width="50%"
                  height={30}
                  label="Select Category"
                />
              </ButtonGroup>
              <span className="product-detail-form-label">
                Additional options
              </span>

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
                  label="Add an option"
                />
              </ButtonGroup>
              <span className="product-detail-form-label">Price</span>
              <div className="product-detail-form-with-select">
                <Field
                  className="input-price"
                  type="text"
                  name="price"
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
            </Form>
          </Fragment>
        );
      }}
    </Formik>
  );
}

export default AddProduct;
