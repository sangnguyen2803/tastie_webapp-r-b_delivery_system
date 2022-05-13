import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function MyAccount(props) {
  return <Fragment>My account</Fragment>;
}

MyAccount.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(withAuth(connect(mapStateToProps, null)(MyAccount)));
