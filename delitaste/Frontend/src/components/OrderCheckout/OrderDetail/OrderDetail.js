import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./OrderDetail.scss";
import SwitchSelector from "react-switch-selector";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import PDProductDetail from "components/ProviderDetail/PDBody/PDProductDetail/PDProductDetail";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faMap,
  faPencilAlt,
  faPeopleCarry,
  faTruck,
} from "@fortawesome/fontawesome-free-solid";
import {
  faHouseUser,
  faMapMarked,
  faMapMarkedAlt,
  faPeopleArrows,
  faPersonBooth,
} from "@fortawesome/free-solid-svg-icons";
const options = [
  {
    label: "Delivery",
    value: 0,
    selectedBackgroundColor: "#b90009",
  },
  {
    label: "Pickup",
    value: 1,
    selectedBackgroundColor: "#b90009",
  },
];

const checkout = {
  provider_id: 1000001,
  provider_name: "Le Pain Quotidien (81 W Broadway)",
  latitude: "10.760489416636473",
  longitude: "106.68064561161064",
  delivery_mode: 3,
  delivery_method: 1, // 1: standard 2:schedule
  payment_method: 1, // 1: cash, 2: momo/zalo pay, 3: credit card
  promo_code: "FREESHIP",
  items: [
    {
      product_id: 1000001,
      product_name: "Smoked Salmon Tartine",
      product_image:
        "https://d1ralsognjng37.cloudfront.net/e0fbee37-a7f4-4bb9-aeed-8f2bd60ea470.jpeg",
      product_options: [
        {
          label: "Choose Bread",
          value: "SuperSeed Bread",
          price: 0,
        },
        {
          label: "Add Edd?",
          value: "Add Soft Boiled Egg",
          price: 0,
        },
      ],
      quantity: 1,
      product_price: 15,
      special_instruction: "",
    },
    {
      product_id: 1000002,
      product_name: "Organic Apple Juice",
      product_image:
        "https://d1ralsognjng37.cloudfront.net/c12a87ff-1f7b-4e45-9b79-c1e8333f59e9.jpeg",
      product_options: [],
      quantity: 1,
      product_price: 5,
      special_instruction: "",
    },
  ],
  subtotal: 20.0,
  delivery_fee: 1.5,
  tips: "10%",
  total: 22.5,
};

function OrderDetail(props) {
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showScheduleTable, setShowScheduleTable] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  const [showDeliveryOption, setShowDeliveryOption] = useState(false);
  const onChange = () => {
    setShowDeliveryOption((prev) => !prev);
  };
  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "Delivery"
  );
  return (
    <Fragment>
      <div className="oc-order-detail">
        <div className="oc-od-container">
          <span className="oc-od-main-text-head">{checkout.provider_name}</span>
          <div className="oc-od-switcher-wrapper">
            <SwitchSelector
              onChange={onChange}
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor={"#E6E6E6"}
              fontColor={"#2C2C2C"}
              selectedFontColor={"#E6E6E6"}
              fontSize={14}
              wrapperBorderRadius={50}
              optionBorderRadius={50}
              width={200}
            />
          </div>
          <div className="oc-od-address-option">
            <FontAwesomeIcon
              className="oc-od-small-icon"
              icon={faMapMarkedAlt}
            />
            <div className="oc-od-address-text" style={{ fontWeight: 700 }}>
              Delivery To :
            </div>
            <div className="oc-od-address-text">
              227 Nguyen Van Cu, Ward 4, District 5, Ho Chi Minh City
            </div>
            <FontAwesomeIcon className="oc-od-small-icon" icon={faPencilAlt} />
          </div>
          <div className="oc-od-address-option">
            <div className="oc-od-address-text" style={{ fontWeight: 700 }}>
              Delivery method:
            </div>
          </div>
          <div className="oc-od-radio">
            <label className="hb-sb-type-wrapper radio">
              <input
                defaultChecked
                type="radio"
                name="deliveryMethod"
                value={0}
              />
              <span className="hb-sb-label-radio option-box-radio-label">
                Standard
              </span>
            </label>
            <label className="hb-sb-type-wrapper radio">
              <input
                type="radio"
                name="deliveryMethod"
                value={1}
                onChange={() => setShowScheduleTable((prev) => !prev)}
              />
              <span className="hb-sb-label-radio option-box-radio-label">
                Schedule
              </span>
            </label>
          </div>
          <div className="oc-od-address-option">
            <div className="oc-od-address-text" style={{ fontWeight: 700 }}>
              Payment method:
            </div>
          </div>
          <div className="oc-od-radio">
            <label className="hb-sb-type-wrapper radio">
              <input
                defaultChecked
                type="radio"
                name="paymentMethod"
                value={0}
              />
              <span className="hb-sb-label-radio option-box-radio-label">
                Cash
              </span>
            </label>
            <label className="hb-sb-type-wrapper radio">
              <input type="radio" name="paymentMethod" value={1} />
              <span className="hb-sb-label-radio option-box-radio-label">
                Momo
              </span>
            </label>
            <label className="hb-sb-type-wrapper radio">
              <input type="radio" name="paymentMethod" value={1} />
              <span className="hb-sb-label-radio option-box-radio-label">
                Credit or debit card
              </span>
            </label>
          </div>
          <div className="oc-od-address-option">
            <div className="oc-od-address-text" style={{ fontWeight: 700 }}>
              Add promotion code:
            </div>
          </div>
          <div className="oc-od-promotion-wrapper">
            <div className="oc-od-promotion-input-wrapper form-input-medium">
              <input
                className="oc-od-form-text-field"
                type="text"
                name="promotionCode"
                placeholder="Promotion code"
                maxLength={50}
                autoComplete="on"
                style={{ width: "850px", borderRadius: 0, borderRight: "none" }}
              />
              <button
                className="oc-od-submit-button add-promotion"
                type="submit"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="oc-od-items-container">
            <div
              className="oc-od-address-text"
              style={{
                fontWeight: 700,
                paddingBottom: "10px",
                borderBottom: "2px solid #D6D6D6",
              }}
            >
              Review order:
            </div>
            <div className="oc-od-item-wrapper">
              {props.orderItem?.cart?.map((order) => (
                <Fragment>
                  <div
                    className="oc-od-item-row"
                    onClick={() => {
                      setShowProductDetail(true);
                      setSelectedProductDetail(order);
                      console.log(order);
                    }}
                    key={order.product_id}
                  >
                    <div className="oc-od-item-number">
                      {" "}
                      <span className="oc-od-item-number-inner">
                        {order.quantity}
                      </span>
                    </div>

                    <img className="oc-od-item-img" src={order.product_image} />
                    <div className="oc-od-item-main-text">
                      {order.product_name}
                    </div>
                    <div className="oc-od-item-sub-text">
                      $ {order.product_price}
                    </div>
                  </div>
                  <div className="oc-od-item-row-underline">
                    <div>
                      {order?.product_options?.map((option) => (
                        <Fragment>
                          •{" "}
                          <span className="oc-od-cart-note">{`${
                            option.option_name
                          } ${
                            parseInt(option.price) === 0
                              ? "(FREE)"
                              : `($${option.price})`
                          }:`}</span>
                          <span className="oc-od-cart-note">
                            {` ${option.value} `}
                          </span>
                        </Fragment>
                      ))}
                    </div>
                    {order.note && (
                      <span className="oc-od-cart-note">
                        • NOTE: {order.note}
                      </span>
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
        <Modal
          openModal={showProductDetail}
          closeModal={() => {
            setShowProductDetail(false);
          }}
          title={"Product Detail (Order Checkout)"}
          width={35}
          height={600}
          heightAuto={true}
          padding="0% 0%"
          hideHeader={true}
        >
          <PDProductDetail
            pushReload={true}
            buttonTitle={"Update your cart"}
            setShowProductDetail={setShowProductDetail}
            productItem={selectedProductDetail}
          />
        </Modal>

        <Modal
          openModal={showScheduleTable}
          closeModal={() => {
            setShowScheduleTable(false);
          }}
          title={"Schedule"}
          width={25}
          height={250}
          padding="0% 0%"
          transparent="30%"
          hideHeader={true}
        ></Modal>
      </div>
    </Fragment>
  );
}

OrderDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, { getProductListAPI })(OrderDetail)
);
