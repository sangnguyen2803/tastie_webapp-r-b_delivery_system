import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "style/Common.scss";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScroll } from "@fortawesome/free-solid-svg-icons";
import "./NotificationPanel.scss";
import moment from "moment";
import { updateReadStatusAPI } from "store/actions/OrderAction/OrderAction";
import {
  faBicycle,
  faDotCircle,
  faEnvelope,
  faStore,
  faTag,
} from "@fortawesome/fontawesome-free-solid";
import { setNotificationSocket } from "store/actions/UserAction/UserAction";

const NotificationPanel = (props) => {
  const [showUnread, setShowUnread] = useState(false);
  const { user, notifications, updateReadStatusAPI, setNotificationSocket } =
    props;
  const { i18n } = useTranslation();

  useEffect(() => {
    user.socket.on("order-accepted", (notification) => {
      setNotificationSocket(notification);
    });
  });
  const renderNotificationImage = (notification) => {
    switch (notification.type) {
      case 1:
        return (
          <FontAwesomeIcon
            className="notification-image-icon"
            icon={faScroll}
          />
        );
      case 2:
        return (
          <FontAwesomeIcon className="notification-image-icon" icon={faStore} />
        );
      case 3:
        return (
          <FontAwesomeIcon className="notification-image-icon" icon={faTag} />
        );
      case 4:
        return (
          <FontAwesomeIcon
            className="notification-image-icon"
            icon={faEnvelope}
          />
        );
      case 5:
        return (
          <FontAwesomeIcon
            className="notification-image-icon"
            icon={faBicycle}
          />
        );
      default:
        return (
          <FontAwesomeIcon
            className="notification-image-icon"
            icon={faScroll}
          />
        );
    }
  };
  const getDifference = (date1, date2) => {
    var a = moment([date1.getFullYear(), date1.getMonth(), date1.getDate()]);
    var b = moment([date2.getFullYear(), date2.getMonth(), date2.getDate()]);
    return a.from(b);
  };
  const handleNotification = async (id) => {
    const status = await updateReadStatusAPI(id);
  };
  return (
    <div className="notification-panel">
      <div className="notification-status-toggle">
        <div
          className="notitcation-status-option-1"
          style={showUnread ? {} : { backgroundColor: "black", color: "white" }}
          onClick={() => setShowUnread(false)}
        >
          All
        </div>
        <div
          className="notitcation-status-option-2"
          style={showUnread ? { backgroundColor: "black", color: "white" } : {}}
          onClick={() => setShowUnread(true)}
        >
          Unread
        </div>
      </div>
      <div className="notification-sub-title">See all notifications</div>
      <div className="notification-title">Earlier</div>
      {user.notifications.map((notification, index) =>
        showUnread === true && notification.read_status === true ? (
          <></>
        ) : (
          <div
            className="notification-item"
            key={index}
            onClick={() => handleNotification(notification.id)}
          >
            <div
              className={`notification-image ${
                notification.read_status && "notification-read"
              }`}
              style={
                notification.type === 4 ? { backgroundColor: "#eab200" } : {}
              }
            >
              {renderNotificationImage(notification)}
            </div>
            <div className="notification-content">
              <span
                className="notification-main-text"
                style={{ fontWeight: notification.read_status ? "unset" : 700 }}
              >
                <b>{notification.subject}</b> {notification.content}
              </span>
              <span
                className="notification-sub-text"
                style={{
                  fontWeight: notification.read_status ? "unset" : 700,
                  color: notification.read_status
                    ? "#000000"
                    : "rgb(148, 0, 0)",
                }}
              >
                {getDifference(
                  new Date(notification.create_at.split("T")[0]),
                  new Date()
                )}
              </span>
            </div>
            <div className="notification-unread">
              {!notification.read_status && (
                <FontAwesomeIcon
                  style={{ color: "#bd0000" }}
                  icon={faDotCircle}
                />
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

NotificationPanel.propTypes = {
  user: PropTypes.object.isRequired,
  updateReadStatusAPI: PropTypes.func.isRequired,
  setNotificationSocket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
});

export default withRouter(
  connect(mapStateToProps, { updateReadStatusAPI, setNotificationSocket })(
    NotificationPanel
  )
);
