import { useState, useEffect, Fragment } from "react";
import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./OrderStatus.scss";

function OrderStatus(props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return <Fragment>OrderStatus</Fragment>;
}

OrderStatus.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(
  withAuth(connect(mapStateToProps, null)(OrderStatus))
);
