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
import axios from "axios";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import {
  addAddressAPI,
  getAddressBookAPI,
} from "store/actions/UserAction/UserAction";

const initialValues = {
  //  provider_id: 1000001,
  promotion_code: "",
  promotion_name: "",
  start_at: new Date(),
  expire_at: new Date(),
  promotion_value: "0.00",
  min_order_value: "2.00",
  max_discount_value: "50.00",
  payment_method_id: 1,
  limited_offer: 1,
  weekly_usage_limit: 1,
  promotion_description: "",
  delivery_mode: 1,
};
const selectedTypeStyle = {
  backgroundColor: "#690000",
  border: "1px solid #500000",
  color: "white",
};
function CreateVoucher(props) {
  const [type, setType] = useState(1);
  const handleSubmitForm = (values) => {
    console.log(values);
  };
  return (
    <Fragment>
      <Modal
        openModal={props.visible}
        closeModal={() => {
          props.setVisible(false);
        }}
        title={"Create voucher"}
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
                    <div className="voucher-type-box-wrapper">
                      <div
                        className="voucher-type-box"
                        style={type === 1 ? selectedTypeStyle : {}}
                        onClick={() => setType(1)}
                      >
                        <FontAwesomeIcon
                          icon={faStore}
                          style={{ fontSize: 16 }}
                        />
                        <span className="voucher-type-box-text">
                          Store voucher
                        </span>
                      </div>
                      <div
                        className="voucher-type-box"
                        style={type === 2 ? selectedTypeStyle : {}}
                        onClick={() => setType(2)}
                      >
                        <FontAwesomeIcon
                          icon={faShoppingBasket}
                          style={{ fontSize: 16 }}
                        />
                        <span className="voucher-type-box-text">
                          Product voucher
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="voucher-form-header">
                    {type === 1 ? "Store voucher" : "Product voucher"}
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
                  {type === 1 && (
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

                  {type === 1 && (
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
                    style={type !== 1 ? { marginBottom: 190 } : {}}
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
  getAddressBookAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});
export default withRouter(connect(mapStateToProps, null)(CreateVoucher));
