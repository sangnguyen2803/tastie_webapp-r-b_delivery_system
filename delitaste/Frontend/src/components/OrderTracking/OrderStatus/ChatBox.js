import withAuth from "components/HigherOrderComponents(HOC)/withAuth";
import React, { Fragment, useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "../OrderTracking.scss";
import Avatar from "assets/avatar.jpg";
import io from "socket.io-client";

function ChatBox(props) {
  let socket = io(`http://localhost:3015`);
  const { message, setMessage, messages, setMessages } = props;
  const { shipper } = props;
  const { order_code } = props.match.params;
  const scrollRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    socket.emit("join-room", order_code);
    socket.on("receive-shipper-inbox", (message) => {
      setMessages((prev) => [
        ...prev,
        { sender: "shipper", message: message.message },
      ]);
    });
  }, []);
  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <Fragment>
      <div className="or-st-pre-body">
        <div className="or-st-ship-conversation">
          {messages?.map((item, index) => (
            <div key={index} className={`or-st-chat-item-${item.sender}`}>
              <img
                className="or-st-chat-avatar"
                src={item.sender === "shipper" ? shipper.profile_image : Avatar}
                alt="shipper_image"
              />
              <span className="or-st-chat-item-content">{item.message}</span>
            </div>
          ))}
        </div>
        <div className="or-st-ship-chat-bar">
          <input
            className="or-st-chat-content"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="chat"
          />
          <div
            className="or-st-chat-submit"
            onClick={() => {
              if (message !== "") {
                setMessages((prev) => [
                  ...prev,
                  { sender: "customer", message: message },
                ]);
                console.log(message, order_code);
                socket.emit("customer-inbox", message, order_code);

                setMessage("");
              }
            }}
          >
            Send
          </div>
        </div>
      </div>
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
