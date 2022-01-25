import { Link } from "react-router-dom";
import ProfilePhoto from "assets/avatar.jpg";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Fragment, useState } from "react";
import "style/Common.scss";
import { useTranslation } from "react-i18next";

const NotificationPanel = ({ user }) => {
  const { i18n } = useTranslation();
  return (
    <div className="notification-panel">
      {user.isUserAuthenticated ? (
        <Fragment>
          <li>Notification 1</li>
          <li>Notification 2</li>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
};

NotificationPanel.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(connect(mapStateToProps, null)(NotificationPanel));
