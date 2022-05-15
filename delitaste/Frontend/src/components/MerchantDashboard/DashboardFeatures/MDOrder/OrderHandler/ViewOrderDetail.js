import { Fragment, useState, useEffect } from "react";

import "components/MerchantDashboard/DashboardFeatures/Panel.scss";
import "style/Common.scss";
import "components/MerchantDashboard/DashboardFeatures/MDOrder/OrderHandler/OrderHandler.scss";
import { Formik, ErrorMessage, Form, Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faStickyNote,
  faSave,
  faUndo,
} from "@fortawesome/fontawesome-free-solid";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import Tag from "components/Commons/Tag/Tag";

function ViewOrderDetail({ selectedOrder }) {
  return selectedOrder ? (
    <Fragment>
      <div className="od-handler-wrapper">
        <div className="od-header-wrapper">
          <div className="od-header-title">{selectedOrder.customer?.name}</div>
          <div className="od-header-sub-title">{selectedOrder.order_code}</div>
        </div>
        <div className="od-body-wrapper">
          {selectedOrder.order ? (
            selectedOrder.order?.cart?.map((product, index) => (
              <Fragment key={index}>
                <div className="od-product-box">
                  <div className="od-product-quantity">
                    {product.quantity} &#215;
                  </div>
                  <div className="od-product-detail-wrapper">
                    <div className="od-product-detail-main">
                      <div className="od-product-detail-name">
                        {product.product_name}
                      </div>
                      <div className="od-product-detail-price">
                        {product.price}
                      </div>
                    </div>
                    {product.item_additional_options ? (
                      product.item_additional_options.map((option) => (
                        <div className="od-product-option-wrapper">
                          <div className="od-product-option-label">
                            <div className="od-product-option-name">
                              {option.option_name}
                            </div>
                            <div className="od-product-option-selected">
                              {option.selected_option}
                            </div>
                          </div>
                          <div className="od-product-option-price">
                            {option.option_price}
                          </div>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {product.special_instruction ? (
                  <div className="note-wrapper">
                    <FontAwesomeIcon
                      className="note-icon"
                      icon={faStickyNote}
                    />
                    **
                    {product.special_instruction}
                  </div>
                ) : (
                  <></>
                )}
              </Fragment>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className="od-footer-wrapper">
          <div className="od-footer-row">
            <div className="od-footer-title">Subtotal</div>
            <div className="od-footer-sub-title">
              {/* {selectedOrder.order_subtotal} */}
            </div>
          </div>
          <div className="od-footer-row">
            <div
              className="od-footer-title"
              style={{ fontSize: "12px", color: "rgb(156, 156, 156)" }}
            >
              Delivery Fee
            </div>
            <div
              className="od-footer-sub-title"
              style={{ fontSize: "12px", color: "rgb(156, 156, 156)" }}
            >
              {selectedOrder.delivery_fee}
            </div>
          </div>
          <div className="od-footer-row">
            <div className="od-footer-title">Subtotal</div>
            <div className="od-footer-sub-title">
              {selectedOrder.total_price}
            </div>
          </div>
        </div>
        <ButtonGroup
          width={100}
          float={"center"}
          mgTop={20}
          gap={30}
          mgBottom={10}
        >
          <Button
            bgColor={"white"}
            color="black"
            border={"2px solid rgb(170, 170, 170)"}
            buttonType="secondary"
            width={120}
            height={30}
            radius={"0px"}
            label={"Decline"}
          />
          <Button
            buttonType="primary"
            width={120}
            height={30}
            radius={"0px"}
            label={"Accept"}
          />
        </ButtonGroup>
      </div>
    </Fragment>
  ) : (
    <Fragment>ABCd</Fragment>
  );
}

export default ViewOrderDetail;
