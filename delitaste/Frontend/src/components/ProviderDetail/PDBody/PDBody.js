import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHeart as faHeart2,
  faBars,
  faPlus,
  faChevronDown,
  faChevronUp,
  faCartPlus,
} from "@fortawesome/fontawesome-free-solid";

import Modal from "components/Commons/Overlay/Popup/Modal/Modal";
import "../ProviderDetail.scss";
import PDProductDetail from "components/ProviderDetail/PDBody/PDProductDetail/PDProductDetail";
import PDUpcomingProduct from "components/ProviderDetail/PDBody/PDUpcomingProduct/PDUpcomingProduct";
import { scroller } from "react-scroll";

function PDBody({ products, upcomingProducts, user }) {
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showUpcomingProductDetail, setShowUpcomingProductDetail] =
    useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState();
  const [selectedUpcomingProductDetail, setSelectedUpcomingProductDetail] =
    useState();
  const [showCustomerReview, setShowCustomerReview] = useState(false);
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

  return (
    <Fragment>
      <div className="p-d-body-container">
        <div className="pd-sb-menu-category-container">
          <span className="pd-sb-cart-info-wrapper">
            <span className="pd-sb-cart-info-main-text">
              <FontAwesomeIcon className="pd-sb-icon" icon={faCartPlus} />
              <span>3 items in your cart</span>
            </span>
          </span>
          <span className="pd-sb-menu-title">
            <FontAwesomeIcon className="pd-sb-icon" icon={faBars} />
            <span>Menu</span>
          </span>
          <div className="pd-sb-menu-category">
            <span
              className="pd-sb-menu-item"
              onClick={() => scrollToSection(`product-group-upcoming`)}
            >
              Upcoming
            </span>
            {products.length !== 0 &&
              products.map((product) => (
                <Fragment>
                  <span
                    className="pd-sb-menu-item"
                    onClick={() =>
                      scrollToSection(
                        `product-group-${product.menu_category_id}`
                      )
                    }
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
              <div className="pd-fb-counter">35</div>
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
              <Fragment></Fragment>
            ) : (
              <span className="pd-fb-sub-text">
                35 customer reviews for this restaurant
              </span>
            )}
          </div>
          <div className={`pd-pl-title product-group-upcoming`}>Upcoming</div>

          <div className="pd-pl-upcoming-product-group">
            {upcomingProducts.map((up) => (
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
                      src={up.product.product_image}
                    />
                  </div>
                  <div className="pd-pl-up-tag-btn">
                    <span className="pd-pl-up-main-text">Coming soon</span>
                    <span className="pd-pl-up-sub-text">
                      {up.product.release_date}
                    </span>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          {products.length !== 0 &&
            products.map((menu) => (
              <Fragment>
                <div
                  className={`pd-pl-title product-group-${menu.menu_category_id}`}
                >
                  {menu.menu_category_name}
                </div>
                <div className="pd-pl-product-group">
                  {menu.products.map((product) => (
                    <div
                      className="pd-pl-product-item"
                      onClick={() => {
                        setShowProductDetail(true);
                        setSelectedProductDetail(product);
                      }}
                      key={product.product_id}
                    >
                      <div className="pd-pl-img-wrapper">
                        <img
                          className="pd-pl-product-img"
                          src={product.product_image}
                        />
                      </div>
                      <div className="pd-pl-quantity-btn">
                        {!user?.userCart.cart.filter(
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
                              user?.userCart.cart.filter(
                                (item) =>
                                  item.product_id ===
                                  parseInt(product.product_id)
                              )[0]?.quantity
                            }
                          </span>
                        )}
                      </div>
                      <span className="pd-pl-text">{product.product_name}</span>
                      <span className="pd-pl-sub-text">
                        {product.price} VNĐ
                      </span>
                    </div>
                  ))}
                </div>
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
            productItem={selectedProductDetail}
          />
        </Modal>
        <Modal
          openModal={showUpcomingProductDetail}
          closeModal={() => {
            setShowUpcomingProductDetail(false);
          }}
          title={"Coming soon"}
          width={35}
          height={670}
          padding="0% 0%"
          headerColor="#53B404"
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
};
const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(connect(mapStateToProps, null)(PDBody));

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
