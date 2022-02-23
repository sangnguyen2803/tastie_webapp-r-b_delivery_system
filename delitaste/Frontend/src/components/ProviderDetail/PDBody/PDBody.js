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
import Spinner from "components/Commons/Overlay/Spinner/Spinner";

function PDBody({ products }) {
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState();
  const [showCustomerReview, setShowCustomerReview] = useState(false);

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
            {products.length !== 0 &&
              products.map((product) => (
                <Fragment>
                  <span className="pd-sb-menu-item">
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
          {products.length !== 0 &&
            products.map((menu) => (
              <Fragment>
                <div className="pd-pl-title">{menu.menu_category_name}</div>
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
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="inc-des-button"
                          onClick={() => {
                            setShowProductDetail(true);
                            setSelectedProductDetail(product);
                          }}
                        />
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
          <PDProductDetail product={selectedProductDetail} />
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