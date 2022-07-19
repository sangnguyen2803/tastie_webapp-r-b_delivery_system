import React, { Fragment, useState, useEffect } from "react";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import "./VoucherHandlers.scss";
import { formatDate } from "utils/DateUtils";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import SwitchSelector from "react-switch-selector";
import {
  updateDiscountAPI,
  updatePromotionAPI,
} from "store/actions/ProviderAction/ProviderAction";

function UpdatePromotion(props) {
  const { promotionType, selectedPromotion } = props;
  const initialValues = {
    //  provider_id: 1000001,
    promotion_id: selectedPromotion?.promotion_id,
    promotion_code: selectedPromotion?.promotion_code || "",
    promotion_name:
      promotionType === 1
        ? selectedPromotion?.discount_name
        : selectedPromotion?.promotion_name || "",
    start_at: new Date(selectedPromotion?.start_at) || new Date(),
    expire_at: new Date(selectedPromotion?.expire_at) || new Date(),
    promotion_value:
      promotionType === 1
        ? selectedPromotion?.discount_value
        : selectedPromotion?.promotion_value || 0,
    min_order_value: selectedPromotion?.min_order_value || "2.00",
    max_discount_value: selectedPromotion?.max_discount_value || "50.00",
    payment_method_id: selectedPromotion?.payment_method_id || 1,
    limited_offer: selectedPromotion?.limited_offer || 1,
    weekly_usage_limit: selectedPromotion?.weekly_usage_limit_per_user || 1,
    promotion_description:
      promotionType === 1
        ? selectedPromotion?.discount_description
        : selectedPromotion?.promotion_description || "",
    delivery_mode: selectedPromotion?.delivery_mode || 1,
  };
  const handleSubmitForm = async (values) => {
    if (promotionType === 1) {
      const data = {
        discount_id: selectedPromotion.discount_id,
        provider_id: selectedPromotion.provider_id,
        discount_name: values.promotion_name,
        discount_value: parseFloat(values.promotion_value),
        discount_description: values.promotion_description,
        start_at: values.start_at,
        expire_at: values.expire_at,
      };
      const status = await props.updateDiscountAPI(data);
      if (status) props.setVisible(false);
      return;
    }
    const data = {
      promotion_id: selectedPromotion.promotion_id,
      provider_id: selectedPromotion.provider_id,
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
      update_at: formatDate(new Date()),
    };
    const status = await props.updatePromotionAPI(data);
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
        title={"Update promotion"}
        width={50}
        height={promotionType === 1 ? 420 : 580}
        padding="5px 50px"
        transparent="30%"
        hideHeader={true}
      >
        <Formik initialValues={initialValues} validateOnChange={false}>
          {(formikProps) => {
            const { values, errors, touched } = formikProps;
            return (
              <Form
                className="modal-form-input-wrapper"
                style={{ height: 300 }}
              >
                <Fragment>
                  <div className="modal-input-row" style={{ marginTop: 20 }}>
                    <span className="modal-input-label">Voucher name:</span>
                    <Field
                      type="text"
                      name="promotion_name"
                      className="modal-input-field"
                      placeholder={"Voucher name"}
                    />
                  </div>
                  {promotionType !== 1 && (
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

                  {promotionType !== 1 && (
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
                  <div className="modal-input-row">
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
                      width={130}
                      height={35}
                      label={`Update ${promotionType ? "Discount" : "Voucher"}`}
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

UpdatePromotion.propTypes = {
  user: PropTypes.object.isRequired,
  updateDiscountAPI: PropTypes.func.isRequired,
  updatePromotionAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});
export default withRouter(
  connect(mapStateToProps, { updatePromotionAPI, updateDiscountAPI })(
    UpdatePromotion
  )
);
