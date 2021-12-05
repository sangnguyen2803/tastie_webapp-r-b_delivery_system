import { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./AlertNotificationBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTimes,
} from "@fortawesome/fontawesome-free-solid";
import { removeAlertNotification } from "store/actions/UIComponents/UIAlertAction";

function AlertNotificationBox(props) {
  return props.msg && props.loadingAlert ? (
    <Fragment>
      <div className={`alert-notification-box-container ${props.alertStyling}`}>
        <FontAwesomeIcon
          className="alert-icon alert-box-prefix"
          icon={faExclamationCircle}
        />
        <span className="alert-msg">{props.msg}</span>
        <FontAwesomeIcon
          className="alert-icon alert-box-surfix"
          icon={faTimes}
          onClick={() => {
            props.removeAlertNotification();
          }}
        />
      </div>
    </Fragment>
  ) : (
    <></>
  );
}

AlertNotificationBox.propTypes = {
  removeAlertNotification: PropTypes.func.isRequired,
};

export default connect(null, { removeAlertNotification })(AlertNotificationBox);
