import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultProduct from "assets/default-product.png";
import {
  faHeart as faHeart2,
  faBars,
  faPlus,
  faChevronDown,
  faChevronUp,
  faCartPlus,
} from "@fortawesome/fontawesome-free-solid";
import moment from "moment";
import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import Tag from "components/Commons/Tag/Tag";
import DialogBox from "components/Commons/Overlay/DialogBox/DialogBox";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import PDProductDetail from "components/ProviderDetail/PDBody/PDProductDetail/PDProductDetail";
import PDUpcomingProduct from "components/ProviderDetail/PDBody/PDUpcomingProduct/PDUpcomingProduct";
import { clearCart } from "store/actions/CartAction/CartAction";
import { scroller } from "react-scroll";
import { faStar } from "@fortawesome/fontawesome-free-solid";
import Avatar from "assets/avatar.jpg";
import "../ProviderDetail.scss";

function PDBody({
  products,
  upcomingProducts,
  customerReviews,
  getUpcomingProductAPI,
  user,
  ...rest
}) {
  const getDifference = (date1, date2) => {
    var a = moment([date1.getFullYear(), date1.getMonth(), date1.getDate()]);
    var b = moment([date2.getFullYear(), date2.getMonth(), date2.getDate()]);
    return a.from(b);
  };
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(-1);
  const [showUpcomingProductDetail, setShowUpcomingProductDetail] =
    useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState();
  const [selectedUpcomingProductDetail, setSelectedUpcomingProductDetail] =
    useState();
  const [showCustomerReview, setShowCustomerReview] = useState(false);
  const [showRemoveCartDialog, setShowRemoveCartDialog] = useState(false);

  const scrollToSection = (sectionName) => {
    scroller.scrollTo(sectionName, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const clearCartItem = (id) => {
    async function clearCartItem(id) {
      await rest.clearCart(
        id,
        parseInt(rest.match.params.id),
        user?.currentProvider?.data?.merchant_name
      );
    }
    clearCartItem(user.profile?.user_id);
    setShowRemoveCartDialog(false);
  };

  return (
    <Fragment>
      <div className="p-d-body-container">
        <div className="pd-sb-menu-category-container">
          <span className="pd-sb-cart-info-wrapper">
            <span className="pd-sb-cart-info-main-text">
              <FontAwesomeIcon className="pd-sb-icon" icon={faCartPlus} />
              <span>{user.userCart?.cart?.length || 0} items in your cart</span>
            </span>
          </span>
          <span className="pd-sb-menu-title">
            <FontAwesomeIcon className="pd-sb-icon" icon={faBars} />
            <span>Menu</span>
          </span>
          <div className="pd-sb-menu-category">
            {upcomingProducts.length !== 0 && (
              <span
                className={`pd-sb-menu-item  ${
                  selectedMenu === -1 ? "selected-menu" : ""
                }`}
                onClick={() => {
                  setSelectedMenu(-1);
                  scrollToSection(`product-group-upcoming`);
                }}
              >
                Upcoming
              </span>
            )}
            {products?.length !== 0 &&
              products.map((product, index) => (
                <Fragment key={index}>
                  <span
                    className={`pd-sb-menu-item ${
                      selectedMenu === product.menu_category_id
                        ? "selected-menu"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedMenu(product.menu_category_id);
                      scrollToSection(
                        `product-group-${product.menu_category_id}`
                      );
                    }}
                  >
                    {product.menu_category_name}
                  </span>
                </Fragment>
              ))}
          </div>
        </div>
        <div className="pd-pl-product-list">
          <div className="pd-pl-feedback-container">
            <div className="pd-pl-title-wrapper">
              <div
                className="pd-fb-counter"
                style={{
                  padding: `3px ${
                    customerReviews.length < 10 ? "10px" : "0px"
                  }`,
                }}
              >
                {customerReviews?.length}
              </div>
              <span className="pd-pl-title">Customer Review</span>
              <FontAwesomeIcon
                icon={!showCustomerReview ? faChevronDown : faChevronUp}
                className="pd-sb-icon-extent"
                onClick={() => {
                  setShowCustomerReview((prev) => !prev);
                }}
              />{" "}
            </div>
            {showCustomerReview ? (
              <div className="customer-review-container">
                {customerReviews?.map(
                  (review, index) =>
                    index <= 5 && (
                      <div className="customer-review-wrapper">
                        <img
                          src={
                            "https://cdn2.iconfinder.com/data/icons/flatfaces-everyday-people-square/128/beard_male_man_face_avatar-512.png"
                          }
                          alt="avatar"
                          className="cr-customer-avatar"
                          width={50}
                          height={50}
                        />
                        <div className="cr-content-container">
                          <div className="cr-text-wrapper">
                            <span className="cr-main-text-wrapper">
                              {review.customer_info?.username}
                            </span>
                            <span className="cr-sub-text-wrapper">
                              {[...Array(review.stars || 5)].map((e, index) => (
                                <FontAwesomeIcon
                                  key={index}
                                  icon={faStar}
                                  className="md-text-icon"
                                  style={{
                                    color: "rgb(255, 221, 0)",
                                    fontSize: 16,
                                  }}
                                />
                              ))}
                              {[...Array(5 - (review.stars || 5))].map(
                                (e, index) => (
                                  <FontAwesomeIcon
                                    key={index}
                                    icon={faStar}
                                    className="md-text-icon"
                                    style={{
                                      color: "rgb(200, 200, 200)",
                                      fontSize: 16,
                                    }}
                                  />
                                )
                              )}
                              {`(${review.stars?.toFixed(1)} / 5.0)`}
                            </span>
                            <span className="cr-sub-text-wrapper">
                              {getDifference(
                                new Date(review.create_at.split("T")[0]),
                                new Date()
                              )}
                            </span>
                          </div>
                          <span className="cr-comment">{review.content}</span>
                          {review.image && (
                            <img
                              className="cr-image-review"
                              src={review?.image}
                              alt="image_review"
                            />
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            ) : (
              <span className="pd-fb-sub-text">
                {customerReviews?.length} customer reviews for this restaurant
              </span>
            )}
          </div>
          {upcomingProducts.length !== 0 && (
            <div className={`pd-pl-title product-group-upcoming`}>Upcoming</div>
          )}

          <div className="pd-pl-upcoming-product-group">
            {upcomingProducts?.map((up) => (
              <Fragment>
                <div
                  className="pd-pl-upcoming-product-item"
                  onClick={() => {
                    setShowUpcomingProductDetail(true);
                    setSelectedUpcomingProductDetail(up);
                  }}
                >
                  <div className="pd-pl-up-img-wrapper">
                    <img
                      className="pd-pl-up-product-img"
                      src={
                        up.product_status === 5
                          ? DefaultProduct
                          : up.product_image
                      }
                      alt="product_photo"
                    />
                  </div>
                  <div
                    className="pd-pl-up-tag-btn"
                    style={{
                      width: "auto",
                      marginRight: 5,
                      marginTop: 0,
                      backgroundColor: "unset",
                      alignSelf: "flex-end",
                    }}
                  >
                    <Tag text="New" />
                  </div>
                  <div className="pd-pl-up-tag-btn">
                    <span className="pd-pl-up-main-text">Coming soon</span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          {products?.length !== 0 &&
            products.map((menu, index) => (
              <Fragment key={index}>
                <div
                  className={`pd-pl-title product-group-${menu.menu_category_id}`}
                >
                  {menu.menu_category_name}
                </div>
                {menu.products.length > 3 ? (
                  <div className="pd-pl-product-group">
                    {menu.products.map((product) => (
                      <div
                        className={`pd-pl-product-item ${product?.product_id}`}
                        onClick={() => {
                          setShowProductDetail(true);
                          setSelectedProductDetail(product);
                        }}
                        key={product.product_id}
                      >
                        <div className="pd-pl-img-wrapper">
                          <img
                            className="pd-pl-product-img"
                            src={
                              product.product_status === 5
                                ? DefaultProduct
                                : product.product_image
                            }
                            alt="product_photo"
                          />
                        </div>
                        <div className="pd-pl-quantity-btn">
                          {!user?.userCart?.cart?.filter(
                            (item) =>
                              item.product_id === parseInt(product.product_id)
                          )[0]?.quantity ? (
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="inc-des-button"
                              onClick={() => {
                                setShowProductDetail(true);
                                setSelectedProductDetail(product);
                              }}
                            />
                          ) : (
                            <span className="inc-des-button-2">
                              {
                                user.userCart?.cart.filter(
                                  (item) =>
                                    item.product_id ===
                                    parseInt(product.product_id)
                                )[0]?.quantity
                              }
                            </span>
                          )}
                        </div>
                        <span className="pd-pl-text">
                          {product.product_name}
                        </span>
                        <span className="pd-pl-sub-text">
                          $ {product.price?.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pd-pl-product-group-2">
                    {menu.products.map((product) => (
                      <div
                        className="pd-pl-product-item-2"
                        onClick={() => {
                          setShowProductDetail(true);
                          setSelectedProductDetail(product);
                        }}
                        key={product.product_id}
                      >
                        <div className="pd-pl-img-wrapper">
                          <img
                            className="pd-pl-product-img"
                            src={
                              product.product_status === 5
                                ? DefaultProduct
                                : product.product_image
                            }
                            alt="product_photo"
                          />
                        </div>
                        <div className="pd-pl-content-wrapper">
                          <span className="pd-pl-text">
                            {product.product_name}
                          </span>
                          <span className="pd-pl-sub-text">
                            $ {product.price?.toFixed(2)}
                          </span>
                          <span
                            className="pd-pl-sub-text"
                            style={{ height: 70 }}
                          >
                            {product.description?.length > 5
                              ? product.description
                              : `Have you tried ${product.product_name} with the taste from this restaurant? If not, why don't you order now?`}
                          </span>
                          <div className="pd-pl-quantity-btn-horizontal">
                            {!user?.userCart?.cart?.filter(
                              (item) =>
                                item.product_id === parseInt(product.product_id)
                            )[0]?.quantity ? (
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="inc-des-button-horizontal"
                                onClick={() => {
                                  setShowProductDetail(true);
                                  setSelectedProductDetail(product);
                                }}
                              />
                            ) : (
                              <span className="inc-des-button-2-horizontal">
                                {
                                  user.userCart?.cart.filter(
                                    (item) =>
                                      item.product_id ===
                                      parseInt(product.product_id)
                                  )[0]?.quantity
                                }
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Fragment>
            ))}
        </div>
        <Modal
          openModal={showProductDetail}
          closeModal={() => {
            setShowProductDetail(false);
          }}
          title={"Product Detail"}
          width={35}
          height={600}
          heightAuto={true}
          padding="0% 0%"
          hideHeader={true}
        >
          <PDProductDetail
            setShowProductDetail={setShowProductDetail}
            setShowRemoveCartDialog={setShowRemoveCartDialog}
            productItem={selectedProductDetail}
          />
        </Modal>
        <DialogBox
          visibility={showRemoveCartDialog}
          headerText={"Remove"}
          close={() => setShowRemoveCartDialog(false)}
        >
          <div className="dialog-detail-wrapper">
            <div className="dialogbox-content">
              <span className="dialogbox-content-detail-main">
                Are you sure you want to change to another restaurant?
              </span>
              <span className="dialogbox-content-detail-sub">
                All your previous cart items will be cleared. You can't undo
                this action.
              </span>
            </div>
            <div className="dialogbox-action">
              <ButtonGroup gap={5} mgRight={5}>
                <Button
                  color={"black"}
                  bgColor={"#ECECEC"}
                  justifyContent={"center"}
                  gap={"10px"}
                  width={80}
                  height={30}
                  label={"Cancel"}
                  onClick={() => {
                    setShowRemoveCartDialog(false);
                  }}
                />
                <Button
                  color={"white"}
                  bgColor={"#800000"}
                  justifyContent={"center"}
                  gap={"10px"}
                  width={80}
                  height={30}
                  label={"OK"}
                  onClick={clearCartItem}
                />
              </ButtonGroup>
            </div>
          </div>
        </DialogBox>
        <Modal
          openModal={showUpcomingProductDetail}
          closeModal={() => {
            setShowUpcomingProductDetail(false);
          }}
          title={"Coming soon"}
          width={35}
          height={670}
          padding="0% 0%"
          headerColor="#900d09"
          headerFontWeight={700}
          header
          hideHeader={true}
        >
          <PDUpcomingProduct
            setShowProductDetail={setShowUpcomingProductDetail}
            upcomingProduct={selectedUpcomingProductDetail}
          />
        </Modal>
      </div>
    </Fragment>
  );
}

PDBody.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  clearCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(connect(mapStateToProps, { clearCart })(PDBody));

/*
 {!isButtonExpanded ? (
                      <div className="pd-pl-quantity-btn">
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="inc-des-button"
                          onClick={() => setIsButtonExpanded((prev) => !prev)}
                        />
                      </div>
                    ) : (
                      <div className="pd-pl-quantity-btn-open" ref={ref}>
                        <FontAwesomeIcon
                          icon={faMinus}
                          className="inc-des-button-open-left"
                        />
                        <input
                          className="inc-des-value"
                          type="number"
                          id="number"
                          value="1"
                        />
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="inc-des-button-open-right"
                        />
                      </div>
                    )}*/
