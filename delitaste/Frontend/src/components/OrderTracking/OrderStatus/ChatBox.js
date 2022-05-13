import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../OrderTracking.scss";
import Avatar from "assets/avatar.jpg";
function ChatBox(props) {
  const { shipper } = props;
  return (
    <Fragment>
      <span className="or-st-pre-body">
        <div className="or-st-ship-conversation">
          <div className="or-st-chat-item-client">
            <img
              className="or-st-chat-avatar"
              src={Avatar}
              alt="shipper_image"
            />
            <span className="or-st-chat-item-content">
              Can you please confirm this order, and make sure the address is
              correct?
            </span>
          </div>
          <div className="or-st-chat-item-server">
            <img
              className="or-st-chat-avatar"
              src={shipper.profile_image}
              alt="shipper_image"
            />
            <span className="or-st-chat-item-content">Sure, thank you</span>
          </div>
          <div className="or-st-chat-item-server">
            <img
              className="or-st-chat-avatar"
              src={shipper.profile_image}
              alt="shipper_image"
            />
            <span className="or-st-chat-item-content">
              I don't know what are you talking about.
            </span>
          </div>
          <div className="or-st-chat-item-client">
            <img
              className="or-st-chat-avatar"
              src={shipper.profile_image}
              alt="shipper_image"
            />
            <span className="or-st-chat-item-content">
              Hello there, I don't know as well
            </span>
          </div>
          <div className="or-st-chat-item-client">
            <img
              className="or-st-chat-avatar"
              src={shipper.profile_image}
              alt="shipper_image"
            />
            <span className="or-st-chat-item-content">
              People don't like you.
            </span>
          </div>
          <div className="or-st-chat-item-client">
            <img
              className="or-st-chat-avatar"
              src={shipper.profile_image}
              alt="shipper_image"
            />
            <span className="or-st-chat-item-content">
              I want to make an order
            </span>
          </div>
          <div className="or-st-chat-item-client">
            <img
              className="or-st-chat-avatar"
              src={shipper.profile_image}
              alt="shipper_image"
            />
            <span className="or-st-chat-item-content">
              People don't like you.
            </span>
          </div>
          <div className="or-st-chat-item-client">
            <img
              className="or-st-chat-avatar"
              src={shipper.profile_image}
              alt="shipper_image"
            />
            <span className="or-st-chat-item-content">
              People don't like you.
            </span>
          </div>
        </div>
        <div className="or-st-ship-chat-bar">
          <input className="or-st-chat-content" name="chat" />
          <div className="or-st-chat-submit">Send</div>
        </div>
      </span>
    </Fragment>
  );
}

ChatBox.propTypes = {
  user: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.UserReducer,
  product: state.ProductReducer,
});

export default withRouter(withAuth(connect(mapStateToProps, null)(ChatBox)));
