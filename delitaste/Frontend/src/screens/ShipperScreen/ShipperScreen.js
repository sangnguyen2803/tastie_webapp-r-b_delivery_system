import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Fragment } from "react";
import Shipper from "components/Shipper/Shipper";
import { initSocket } from "store/actions/UserAction/UserAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function ShipperScreen(props) {
  const { user, initSocket } = props;
  useEffect(() => {
    initSocket();
  }, []);
  return (
    <Fragment>
      <Shipper socket={user.socket} />
    </Fragment>
  );
}

ShipperScreen.propTypes = {
  user: PropTypes.object.isRequired,
  initSocket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  connect(mapStateToProps, {
    initSocket,
  })(ShipperScreen)
);
