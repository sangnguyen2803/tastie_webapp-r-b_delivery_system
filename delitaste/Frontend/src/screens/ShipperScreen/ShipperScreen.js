import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Fragment } from "react";
import Shipper from "components/Shipper/Shipper";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function ShipperScreen(props) {
  const { user } = props;
  return (
    <Fragment>
      <Shipper />
    </Fragment>
  );
}

ShipperScreen.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(connect(mapStateToProps, {})(ShipperScreen));
