import React, { Fragment, useState, useEffect } from "react";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import "./VoucherHandlers.scss";
import locations from "assets/json_location/locations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faAddressBook,
  faStore,
  faShoppingBasket,
} from "@fortawesome/fontawesome-free-solid";

import ReactMapGl, { Source, Layer, Marker, Popup } from "react-map-gl";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import SwitchSelector from "react-switch-selector";
import {
  addDiscountAPI,
  addPromotionAPI,
} from "store/actions/ProviderAction/ProviderAction";

const optionSwitcher = [
  {
    label: "Store promotion",
    value: 0,
    selectedBackgroundColor: "rgb(148, 0, 0);",
  },
  {
    label: "Product promotion",
    value: 1,
    selectedBackgroundColor: "rgb(148, 0, 0);",
  },
];
const initialValues = {
  //  provider_id: 1000001,
  promotion_code: "",
  promotion_name: "",
  start_at: new Date(),
  expire_at: new Date(),
  promotion_value: 0,
  min_order_value: "2.00",
  max_discount_value: "50.00",
  payment_method_id: 1,
  limited_offer: 1,
  weekly_usage_limit: 1,
  promotion_description: "",
  delivery_mode: 1,
};
const selectedTypeStyle = {
  backgroundColor: "#610000",
  border: "1px solid #500000",
  color: "white",
};
function CreateVoucher(props) {
  const [promotionOption, setPromotionOption] = useState(false);
  const initialSelectedIndex = optionSwitcher.findIndex(
    ({ value }) => value === 0
  );
  const onChange = (newValue) => {
    setPromotionOption(newValue);
  };
  const handleSubmitForm = async (values) => {
    if (promotionOption === 1) {
      const data = {
        provider_id: props.user?.provider_id,
        discount_name: values.promotion_name,
        discount_value: parseFloat(values.promotion_value),
        discount_description: values.promotion_description,
        start_at: values.start_at,
        expire_at: values.expire_at,
      };
      const status = await props.addDiscountAPI(data);
      if (status) props.setVisible(false);
      return;
    }
    const data = {
      provider_id: props.user?.provider_id,
      promotion_code: values.promotion_code,
      promotion_name: values.promotion_name,
      promotion_value: parseFloat(values.promotion_value),
      promotion_description: values.promotion_description,
      min_order_value: values.min_order_value,
      max_discount_value: values.max_discount_value,
      start_at: values.start_at,
      expire_at: values.expire_at,
      payment_method_id: values.payment_method_id,
      limited_offer: parseInt(values.limited_offer),
      weekly_usage_limit_per_user: parseInt(values.weekly_usage_limit),
      delivery_mode: parseInt(values.delivery_mode),
      update_at: new Date(),
    };
    const status = await props.addPromotionAPI(data);
    console.log(status);
    if (status) props.setVisible(false);
    return;
  };
  return (
    <Fragment>
      <Modal
        openModal={props.visible}
        closeModal={() => {
          props.setVisible(false);
        }}
        title={"Create promotion"}
        width={50}
        height={650}
        padding="5px 50px"
        transparent="30%"
        hideHeader={true}
      >
        <Formik initialValues={initialValues} validateOnChange={false}>
          {(formikProps) => {
            const { values, errors, touched } = formikProps;
            return (
              <Form className="modal-form-input-wrapper">
                <Fragment>
                  <div
                    className="modal-input-row"
                    style={{
                      marginBottom: 5,
                      marginTop: 10,
                    }}
                  >
                    <span className="modal-input-label">Type:</span>
                    <div
                      className="voucher-type-box-wrapper"
                      style={{ width: 280 }}
                    >
                      <SwitchSelector
                        onChange={onChange}
                        options={optionSwitcher}
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
                  <div className="modal-input-row">
                    <span className="modal-input-label">Voucher name:</span>
                    <Field
                      type="text"
                      name="promotion_name"
                      className="modal-input-field"
                      placeholder={"Voucher name"}
                    />
                  </div>
                  {promotionOption !== 1 && (
                    <div className="modal-input-row">
                      <span className="modal-input-label">Voucher code:</span>
                      <Field
                        type="text"
                        name="promotion_code"
                        className="modal-input-field"
                        placeholder={"Voucher code"}
                      />
                    </div>
                  )}
                  <div className="modal-input-row">
                    <span className="modal-input-label">Usage period:</span>
                    <Field
                      type="date"
                      name="start_at"
                      className="modal-input-field"
                      placeholder={"Voucher code"}
                      style={{ width: "calc(48% - 75px)", marginRight: 5 }}
                    />
                    —
                    <Field
                      type="date"
                      name="expire_at"
                      className="modal-input-field"
                      placeholder={"Voucher code"}
                      style={{ width: "calc(48% - 75px)", marginLeft: 5 }}
                    />
                  </div>
                  <div className="modal-input-row">
                    <span className="modal-input-label">Discount amount:</span>
                    <Field
                      type="text"
                      name="promotion_value"
                      className="modal-input-field"
                      placeholder={"Discount ammount"}
                    />
                  </div>

                  {promotionOption !== 1 && (
                    <Fragment>
                      <div className="modal-input-row">
                        <span className="modal-input-label">
                          Minimum basket discount:
                        </span>
                        <Field
                          type="text"
                          name="min_order_value"
                          className="modal-input-field"
                          placeholder={"Discount ammount"}
                        />
                      </div>
                      <div className="modal-input-row">
                        <span className="modal-input-label">
                          Maximum discount amount:
                        </span>
                        <Field
                          type="text"
                          name="max_discount_value"
                          className="modal-input-field"
                          placeholder={"Discount ammount"}
                        />
                      </div>
                      <div className="modal-input-row">
                        <span className="modal-input-label">
                          Usage quantity:
                        </span>
                        <Field
                          type="text"
                          name="limited_offer"
                          className="modal-input-field"
                          placeholder={"Litmited offer"}
                        />
                      </div>
                    </Fragment>
                  )}

                  <div className="modal-input-row">
                    <span className="modal-input-label">
                      Weekly usage limit:
                    </span>
                    <Field
                      type="text"
                      name="weekly_usage_limit"
                      className="modal-input-field"
                      placeholder={"Weekly usage limit per customer"}
                    />
                  </div>
                  <div
                    className="modal-input-row"
                    style={promotionOption === 1 ? { marginBottom: 190 } : {}}
                  >
                    <span className="modal-input-label">Description</span>
                    <Field
                      className="modal-textarea-field"
                      as="textarea"
                      name="promotion_description"
                      placeholder="Description about your product"
                    />
                  </div>
                  <ButtonGroup
                    width={100}
                    mgTop={5}
                    float="center"
                    mgBottom={15}
                  >
                    <Button
                      color={"white"}
                      bgColor={"#101010"}
                      justifyContent={"center"}
                      gap={"10px"}
                      width={120}
                      height={35}
                      label={"Create voucher"}
                      onClick={() => handleSubmitForm(values)}
                    />
                  </ButtonGroup>
                </Fragment>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    </Fragment>
  );
}

CreateVoucher.propTypes = {
  user: PropTypes.object.isRequired,
  addDiscountAPI: PropTypes.func.isRequired,
  addPromotionAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});
export default withRouter(
  connect(mapStateToProps, { addDiscountAPI, addPromotionAPI })(CreateVoucher)
);
