import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import PDProductDetail from "components/ProviderDetail/PDBody/PDProductDetail/PDProductDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faCreditCard,
  faMoneyBillAlt,
  faPencilAlt,
  faPhone,
  faSearch,
  faTimes,
} from "@fortawesome/fontawesome-free-solid";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import "./OrderDetail.scss";
import "components/OrderCheckout/OrderCheckout.scss";
import "style/Common.scss";
import PaymentMomo from "assets/pm_momo.png";
import PaymentZalo from "assets/pm_zalopay.png";
import {
  getAddressBookAPI,
  getDeliveryFee,
} from "store/actions/UserAction/UserAction";
import { getProductListAPI } from "store/actions/ProductAction/ProductAction";

import SwitchSelector from "react-switch-selector";
import ScheduleOrder from "./ScheduleOrder";

const optionSwitcher = [
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

function OrderDetail(props) {
  const [deliveryOption, setDeliveryOption] = useState(false);
  const initialSelectedIndex = optionSwitcher.findIndex(
    ({ value }) => value === 0
  );
  const { user, getAddressBookAPI, getDeliveryFee, setOrderForm } = props;
  const [addressBook, setAddressBook] = useState([]);
  const [currentPhone, setCurrentPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(1);

  const [orderScheduleTime, setOrderScheduleTime] = useState("");

  const [enableAddressEdit, setEnableAddressEdit] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showScheduleTable, setShowScheduleTable] = useState(false);
  const [showRemoveCartDialog, setShowRemoveCartDialog] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState();

  useEffect(() => {
    setOrderForm((prevState) => ({
      ...prevState,
      schedule_time: orderScheduleTime,
    }));
  }, [orderScheduleTime, setOrderForm]);

  useEffect(() => {
    setOrderForm((prevState) => ({
      ...prevState,
      payment_method: selectedPaymentMethod,
    }));
  }, [selectedPaymentMethod, setOrderForm]);

  const selectedPMStyle = {
    border: "1px solid #d6d6d6",
    backgroundColor: "#f2f2f2",
  };
  useEffect(() => {
    async function fetchingAddressBook() {
      var addressBook = await getAddressBookAPI(1039129);
      setDeliveryAddress(addressBook?.address[0]?.address);
      let longitudeDF = addressBook?.address[0].longitude;
      let latitudeDF = addressBook?.address[0].latitude;
      let providerIdDF = user.userCart?.provider_id;
      if (providerIdDF !== -1) {
        var deliveryFee = await getDeliveryFee(
          providerIdDF,
          longitudeDF,
          latitudeDF
        );
        setOrderForm((prevState) => ({
          ...prevState,
          delivery_fee: deliveryFee,
        }));
        props.setDeliveryFee(deliveryFee);
      }
      setAddressBook(addressBook.address);
      setCurrentPhone(addressBook.phone);
      setOrderForm((prevState) => ({
        ...prevState,
        customer_phone: addressBook.phone,
        delivery_address: addressBook?.address[0]?.address,
        delivery_mode: !deliveryOption ? 1 : 2,
      }));
    }
    fetchingAddressBook();
  }, [user.userCart]);
  const onChange = (newValue) => {
    setDeliveryOption(newValue);
  };
  return (
    <Fragment>
      <div className="oc-order-detail">
        <div className="oc-od-container">
          <span
            className="oc-od-main-text-head"
            onClick={() =>
              props.history.push(
                `/provider-detail/${user.userCart?.provider_id}`
              )
            }
          >
            {user.userCart?.provider_name !== -1 && user.userCart.provider_name}
          </span>
          <div className="oc-od-switcher-wrapper">
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
          <div className="oc-od-address-option">
            <FontAwesomeIcon className="oc-od-small-icon" icon={faPhone} />
            <div className="oc-od-address-text" style={{ fontWeight: 700 }}>
              Phone Number :
            </div>
            <div className="oc-od-address-text">{currentPhone}</div>
          </div>
          <div className="oc-od-address-option">
            <FontAwesomeIcon
              className="oc-od-small-icon"
              icon={faMapMarkedAlt}
            />
            <div className="oc-od-address-text" style={{ fontWeight: 700 }}>
              Delivery To :
            </div>
            {!enableAddressEdit ? (
              <div className="oc-od-address-text">{deliveryAddress}</div>
            ) : (
              <input
                className="oc-od-edit-address"
                style={{ width: `${deliveryAddress.length * 7}px` }}
                value={deliveryAddress}
              />
            )}
            {enableAddressEdit && (
              <div
                className="oc-od-btn-cancel-address"
                onClick={() => {
                  setEnableAddressEdit((prev) => !prev);
                  setDeliveryAddress(addressBook[0]?.address);
                  setOrderForm((prevState) => ({
                    ...prevState,
                    delivery_address: deliveryAddress,
                  }));
                }}
              >
                Cancel
              </div>
            )}
            {!enableAddressEdit ? (
              <div
                className="oc-od-btn-edit"
                onClick={() => setEnableAddressEdit((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
                <span className="oc-od-edit-text-underline">Edit</span>
              </div>
            ) : (
              <div
                className="oc-od-btn-submit-address"
                onClick={() => {
                  setEnableAddressEdit((prev) => !prev);
                  setOrderForm((prevState) => ({
                    ...prevState,
                    delivery_address: deliveryAddress,
                  }));
                }}
              >
                Confirm
              </div>
            )}
          </div>
          {enableAddressEdit && (
            <div className="oc-od-address-book">
              <span className="oc-od-ab-text">
                <FontAwesomeIcon className="oc-od-ab-icon" icon={faBook} />
                Recent address:
              </span>
              {addressBook?.map((a) => (
                <label className="hb-sb-type-wrapper radio" key={a.address}>
                  <input
                    className="oc-od-ab-selection"
                    type="radio"
                    name="addressBook"
                    value={a.address}
                    onChange={() => setDeliveryAddress(a.address)}
                  />
                  <span className="hb-sb-label-radio option-box-radio-label">
                    {a.address}
                  </span>
                </label>
              ))}
            </div>
          )}

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
                value={1}
                onChange={(e) => {
                  setOrderScheduleTime("");
                  props.setOrderForm((prevState) => ({
                    ...prevState,
                    delivery_method: parseInt(e.target.value),
                  }));
                }}
              />
              <span className="hb-sb-label-radio option-box-radio-label">
                Standard
              </span>
            </label>
            <label className="hb-sb-type-wrapper radio">
              <input
                type="radio"
                name="deliveryMethod"
                value={2}
                onChange={(e) => {
                  setShowScheduleTable((prev) => !prev);
                  props.setOrderForm((prevState) => ({
                    ...prevState,
                    delivery_method: parseInt(e.target.value),
                  }));
                }}
              />
              <span className="hb-sb-label-radio option-box-radio-label">
                Schedule
              </span>
              {orderScheduleTime && (
                <span className="oc-od-schedule-time-text">
                  {`Your order will be submitted at ${orderScheduleTime}`}
                </span>
              )}
            </label>
          </div>
          <div className="oc-od-address-option">
            <div className="oc-od-address-text" style={{ fontWeight: 700 }}>
              Payment method:
            </div>
          </div>
          <div className="oc-od-payment-method-container">
            <div
              className="oc-od-pm-item"
              onClick={() => setSelectedPaymentMethod(1)}
              style={selectedPaymentMethod === 1 ? selectedPMStyle : {}}
            >
              <div className="oc-od-pm-image-wrapper">
                <FontAwesomeIcon
                  icon={faMoneyBillAlt}
                  className="oc-od-pm-icon"
                />
              </div>
              <span className="oc-od-pm-label-radio">By Cash</span>
            </div>
            <div
              className="oc-od-pm-item"
              onClick={() => setSelectedPaymentMethod(2)}
              style={selectedPaymentMethod === 2 ? selectedPMStyle : {}}
            >
              <div className="oc-od-pm-image-wrapper">
                <img
                  src={PaymentMomo}
                  className="oc-od-pm-img"
                  alt="payment_image"
                />
              </div>
              <span className="oc-od-pm-label-radio">Momo</span>
            </div>
            <div
              className="oc-od-pm-item"
              onClick={() => setSelectedPaymentMethod(3)}
              style={selectedPaymentMethod === 3 ? selectedPMStyle : {}}
            >
              <div className="oc-od-pm-image-wrapper">
                <img
                  src={PaymentZalo}
                  className="oc-od-pm-img"
                  alt="payment_image"
                />
              </div>
              <span className="oc-od-pm-label-radio">Zalo Pay</span>
            </div>
            <div
              className="oc-od-pm-item"
              onClick={() => setSelectedPaymentMethod(4)}
              style={selectedPaymentMethod === 4 ? selectedPMStyle : {}}
            >
              <div className="oc-od-pm-image-wrapper">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="oc-od-pm-icon-2"
                />
              </div>
              <span className="oc-od-pm-label-radio">Credit/Debit card</span>
            </div>
          </div>

          <div className="oc-od-address-option">
            <div className="oc-od-address-text" style={{ fontWeight: 700 }}>
              Add promotion code:
            </div>
          </div>
          <div className="oc-od-promotion-wrapper">
            <div className="oc-od-promotion-input-wrapper">
              <button className="oc-od-popup-button" type="submit">
                <FontAwesomeIcon icon={faSearch} />
                <span>Promotion</span>
              </button>
              <div className="oc-od-input-promos">
                <input
                  className="oc-od-form-text-field"
                  type="text"
                  name="promotionCode"
                  placeholder="Promotion code"
                  maxLength={50}
                  autoComplete="on"
                />
              </div>
              <button
                className="oc-od-submit-button-2 oc-od-popup-button"
                type="submit"
              >
                Apply
              </button>
            </div>
          </div>
          <div className="oc-od-items-container">
            <div
              className="oc-od-address-option"
              style={{
                fontWeight: 700,
                fontSize: 14,
                marginTop: 10,
              }}
            >
              <div className="oc-od-address-text">
                Cart items{" "}
                {user?.userCart?.cart?.length !== 0 &&
                  `• ${user.userCart.cart.length} items`}{" "}
                :
              </div>
            </div>
            <div className="oc-od-item-wrapper">
              {user?.userCart?.cart?.map((order) => (
                <Fragment key={order.product_id}>
                  <div
                    className="oc-od-item-row"
                    onClick={() => {
                      setShowProductDetail(true);
                      setSelectedProductDetail(order);
                    }}
                  >
                    <div className="oc-od-item-number">
                      {" "}
                      <span className="oc-od-item-number-inner">
                        {order.quantity}
                      </span>
                    </div>

                    <img
                      className="oc-od-item-img"
                      src={order.product_image}
                      alt={"product_img"}
                    />
                    <div className="oc-od-item-main-text">
                      <span className="oc-od-mt-1" style={{ fontWeight: 700 }}>
                        {order.product_name}
                      </span>
                      <span className="oc-od-mt-2">
                        € {order.product_price}
                      </span>
                      {order.note && (
                        <span className="oc-od-cart-note">
                          Special instruction: {order.note}
                        </span>
                      )}
                      {order?.product_options?.map((option) => (
                        <div className="oc-od-mt-ao-wrapper">
                          <span className="oc-od-cart-note">{`+ ${
                            option.option_name
                          } ${
                            parseInt(option.price) === 0
                              ? "(FREE)"
                              : `($${option.price})`
                          }:`}</span>
                          <span className="oc-od-cart-note">
                            {` ${option.value} `}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="oc-od-item-sub-text">
                      ${" "}
                      {(
                        parseFloat(order.product_price) *
                        parseFloat(order.quantity)
                      ).toFixed(2)}
                    </div>
                    <span className="cart-surfix-pos-wrapper">
                      <FontAwesomeIcon
                        className="cart-close-icon"
                        icon={faTimes}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      />
                    </span>
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
            setShowRemoveCartDialog={setShowRemoveCartDialog}
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
        >
          <ScheduleOrder
            setOrderScheduleTime={setOrderScheduleTime}
            closeModal={() => {
              setShowScheduleTable(false);
            }}
          />
        </Modal>
      </div>
    </Fragment>
  );
}

OrderDetail.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getProductListAPI: PropTypes.func.isRequired,
  getAddressBookAPI: PropTypes.func.isRequired,
  getDeliveryFee: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    getProductListAPI,
    getAddressBookAPI,
    getDeliveryFee,
  })(OrderDetail)
);

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
