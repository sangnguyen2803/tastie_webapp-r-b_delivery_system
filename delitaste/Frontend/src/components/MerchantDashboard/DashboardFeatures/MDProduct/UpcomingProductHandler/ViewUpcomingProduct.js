import { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "components/MerchantDashboard/DashboardFeatures/Panel.scss";
import "style/Common.scss";

function ViewUpcomingProduct(props) {
  return (
    <Fragment>
      <div
        className="product-handler-container"
        style={{ minHeight: 600, overflowY: "hidden" }}
      >
        <div
          className="product-detail-form-input-wrapper"
          style={{ fontWeight: 700 }}
        >
          {props.selectedProduct.product_name}
        </div>
        <div className="product-image-wrapper-edit">
          <img
            style={{ objectFit: "cover" }}
            alt="upcoming_product_image"
            src={props.selectedProduct.product_image}
            width={150}
            height={150}
          />
        </div>
        <span className="product-detail-form-label">
          <b>Description</b>
        </span>
        <div
          className="product-detail-form-input-wrapper"
          style={{ fontSize: 13, fontStyle: "italic" }}
        >
          {props.selectedProduct.product_description}
        </div>
        <span className="product-detail-form-label">
          <b>Estimated price:</b> ${" "}
          {props.selectedProduct.estimated_price?.toFixed(2)}
        </span>
      </div>
    </Fragment>
  );
}

ViewUpcomingProduct.propTypes = {
  user: PropTypes.object.isRequired,
  provider: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  provider: state.ProviderReducer,
});

export default withRouter(connect(mapStateToProps, {})(ViewUpcomingProduct));
