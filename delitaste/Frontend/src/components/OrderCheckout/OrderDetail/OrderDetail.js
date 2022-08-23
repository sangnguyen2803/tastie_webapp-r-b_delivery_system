import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import PDProductDetail from "components/ProviderDetail/PDBody/PDProductDetail/PDProductDetail";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactMapGl, { Source, Layer, Marker, Popup } from "react-map-gl";
import { setCurrentLocation } from "store/actions/UserAction/UserAction";
import {
  faBook,
  faCircle,
  faCreditCard,
  faMoneyBillAlt,
  faPencilAlt,
  faPhone,
  faSearch,
  faTimes,
  faUtensils,
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
import { getOrderPromotionAPI } from "store/actions/OrderAction/OrderAction";
import SwitchSelector from "react-switch-selector";
import ScheduleOrder from "./ScheduleOrder";
import axios from "axios";
import ApplyPromotion from "./ApplyPromotion";

const optionSwitcher = [
  {
    label: "Delivery",
    value: 0,
    selectedBackgroundColor: "#890009",
  },
  {
    label: "Pickup",
    value: 1,
    selectedBackgroundColor: "#890009",
  },
];

function OrderDetail(props) {
  const {
    arrivalCoordinates,
    setArrivalCoordinate,
    departureCoordinates,
    setDepartureCoordinates,
    deliveryOption,
    setDeliveryOption,
  } = props;
  const initialSelectedIndex = optionSwitcher.findIndex(
    ({ value }) => value === 0
  );
  const [showPromotion, setShowPromotion] = useState(false);
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
  const [promotion, setPromotion] = useState({});
  const [location, setLocation] = useState([
    106.68057155417674, 10.768685473523648,
  ]);
  useEffect(() => {
    async function fetchPromotion(id) {
      const result = await props.getOrderPromotionAPI(id);
      setPromotion(result);
    }
    if (props.user.userCart.provider_id !== -1)
      fetchPromotion(props.user.userCart.provider_id);
  }, [props.user.userCart.provider_id]);

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
    backgroundColor: "#f5f5f5",
  };

  useEffect(() => {
    setLocation([user.currentAddress.longitude, user.currentAddress.latitude]);
    setDeliveryAddress(user.currentAddress.address);
    setOrderForm((prevState) => ({
      ...prevState,
      delivery_address: user.currentAddress.address,
    }));
  }, [user.currentAddress]);

  useEffect(() => {
    async function fetchingAddressBook() {
      var addressBook = await getAddressBookAPI(props.match.params.uid);
      setAddressBook(addressBook.address);
      setCurrentPhone(addressBook.phone);
      setOrderForm((prevState) => ({
        ...prevState,
        customer_phone: addressBook.phone,
        delivery_mode: deliveryOption === 0 ? 1 : 2,
      }));
    }
    fetchingAddressBook();
  }, []);

  useEffect(() => {
    async function fetchDeliveryFee() {
      let latitudeDF = location[1];
      let longitudeDF = location[0];
      let providerIdDF = user.userCart?.provider_id;
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
    if (user.userCart.provider_id !== -1) fetchDeliveryFee();
  }, [location, user.userCart.provider_id]);

  const onChange = (newValue) => {
    setDeliveryOption(parseInt(newValue));
  }; //map
  const [routes, setRoutes] = useState([]);
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "300px",
    latitude: 10.768685473523648,
    longitude: 106.68057155417674,
    zoom: 14,
  });
  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: routes,
    },
  };
  useEffect(() => {
    async function fetchingRoutesAndDirections() {
      const endpoint = `https://api.mapbox.com/directions/v5/mapbox/driving/${location[0]},${location[1]};${arrivalCoordinates[0]},${arrivalCoordinates[1]}?geometries=geojson&access_token=pk.eyJ1IjoiaG9hbmduYW0yNDMiLCJhIjoiY2t1dHJxdjdlMHg5ZDJwbnlpcmo0a2NnMiJ9.DUrlIOzvO6-kWt-VCKZW1g`;
      const res = await axios.get(endpoint);
      const points = res.data.routes[0].geometry.coordinates;
      setViewport({
        ...viewport,
        latitude: (location[1] + arrivalCoordinates[1]) / 2,
        longitude: (location[0] + arrivalCoordinates[0]) / 2,
      });
      points.unshift(location);
      points.push(arrivalCoordinates);
      setRoutes(points);
    }
    fetchingRoutesAndDirections();
  }, [arrivalCoordinates, location]);
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
          {deliveryOption === 1 && (
            <ReactMapGl
              {...viewport}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={(viewport) => setViewport(viewport)}
              mapboxApiAccessToken="pk.eyJ1IjoiaG9hbmduYW0yNDMiLCJhIjoiY2t1dHJxdjdlMHg5ZDJwbnlpcmo0a2NnMiJ9.DUrlIOzvO6-kWt-VCKZW1g"
            >
              <Source id="polylineLayer" type="geojson" data={dataOne}>
                <Layer
                  id="lineLayer"
                  type="line"
                  source="my-data"
                  layout={{
                    "line-join": "round",
                    "line-cap": "round",
                  }}
                  paint={{
                    "line-color": "rgba(3, 170, 238, 0.5)",
                    "line-width": 10,
                  }}
                />
              </Source>
              <Marker
                latitude={location[1]}
                longitude={location[0]}
                offsetLeft={-20}
                offsetTop={-30}
              >
                <FontAwesomeIcon
                  className="provider-marker"
                  icon={faCircle}
                  style={{
                    background: "black",
                    color: "white",
                    padding: " 8px 8px",
                  }}
                />
              </Marker>
              <Marker
                alt="marker"
                latitude={arrivalCoordinates[1]}
                longitude={arrivalCoordinates[0]}
                offsetLeft={-20}
                offsetTop={-30}
              >
                <FontAwesomeIcon
                  className="provider-marker"
                  icon={faUtensils}
                  style={{
                    background: "black",
                    color: "white",
                    padding: " 7px 8pxư",
                  }}
                />
              </Marker>
            </ReactMapGl>
          )}
          {deliveryOption === 0 && (
            <Fragment>
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
                    style={{ width: `${deliveryAddress?.length * 7}px` }}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
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
                      props.setCurrentLocation(
                        location[1],
                        location[0],
                        deliveryAddress
                      );
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
                  <label className="hb-sb-type-wrapper radio">
                    <input
                      className="oc-od-ab-selection"
                      type="radio"
                      name="addressBook"
                      checked={user.currentAddress?.address === deliveryAddress}
                      value={user.currentAddress?.address}
                      onChange={() => {
                        setDeliveryAddress(user.currentAddress?.address);
                        setLocation([
                          parseFloat(user.currentAddress?.longitude),
                          parseFloat(user.currentAddress?.latitude),
                        ]);
                      }}
                    />
                    <span className="hb-sb-label-radio option-box-radio-label">
                      {user.currentAddress?.address}
                    </span>
                  </label>
                  {user.location?.map((a, index) => (
                    <label className="hb-sb-type-wrapper radio" key={index}>
                      <input
                        className="oc-od-ab-selection"
                        type="radio"
                        name="addressBook"
                        value={a.address}
                        checked={a.address === deliveryAddress}
                        onChange={() => {
                          setDeliveryAddress(a.address);
                          setLocation([
                            parseFloat(a.longitude),
                            parseFloat(a.latitude),
                          ]);
                        }}
                      />
                      <span className="hb-sb-label-radio option-box-radio-label">
                        {a.address}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </Fragment>
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
              <div
                className="oc-od-popup-button"
                style={{ fontSize: 13, width: 180, gap: 10 }}
                onClick={() => {
                  promotion && setShowPromotion(true);
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
                <span>Apply Promotion</span>
              </div>
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
                      style={{ objectFit: "cover" }}
                      src={order.product_image}
                      alt={"product_img"}
                    />
                    <div className="oc-od-item-main-text">
                      <span className="oc-od-mt-1" style={{ fontWeight: 700 }}>
                        {order.product_name}
                      </span>
                      <span className="oc-od-mt-2">
                        $ {order.product_price}
                      </span>
                      {order.note && (
                        <span className="oc-od-cart-note">
                          Special instruction: {order.note}
                        </span>
                      )}
                      {order?.product_options?.map((option, index) => (
                        <div className="oc-od-mt-ao-wrapper" key={index}>
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

        <Modal
          openModal={showPromotion}
          closeModal={() => {
            setShowPromotion(false);
          }}
          title={"Promotion"}
          width={35}
          height={260}
          padding="0% 0%"
          transparent="30%"
          hideHeader={true}
        >
          <ApplyPromotion
            promotions={promotion}
            orderForm={props.orderForm}
            setOrderForm={props.setOrderForm}
            closeModal={() => {
              setShowPromotion(false);
            }}
          ></ApplyPromotion>
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
  setCurrentLocation: PropTypes.func.isRequired,
  getOrderPromotionAPI: PropTypes.func.isRequired,
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
    setCurrentLocation,
    getOrderPromotionAPI,
  })(OrderDetail)
);
