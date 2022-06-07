import { withRouter } from "react-router-dom";
import NavBar from "../Commons/Layout/NavBar/NavBar";
import Footer from "../Commons/Layout/Footer/Footer";
import React, { Fragment, useEffect, useState } from "react";
import ToolBar from "../Commons/Layout/Toolbar/Toolbar";
import "./Shipper.scss";
import Button from "components/Commons/Button/Button";
import ButtonGroup from "components/Commons/Button/ButtonGroup/ButtonGroup";
import io from "socket.io-client";
import axios from "axios";
import CartImage from "assets/cart.svg";
import { ShipperLocation } from "assets/dummy/ShipperLocations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/fontawesome-free-solid";
import Avatar from "assets/avatar.jpg";
const shipper = {
  name: "Terry Harrison",
  license_plate: "64B1 - 03663",
  rating: 5,
  profile_image:
    "https://pyxis.nymag.com/v1/imgs/231/dd4/b1d43dd12227a68877644b36e1b6c9850e-13-zayn-malik.rsquare.w330.jpg",
};

function Shipper(props) {
  const socket = io("http://localhost:3015");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [orderData, setOrderData] = useState({});
  const [shipperConfirmBox, setShipperConfirmBox] = useState(false);
  useEffect(() => {
    socket.on(
      "shipper-received-order",
      (order, customer, provider, order_code) => {
        setOrderData({
          provider: {
            name: provider.name,
            phone: 1234567890,
            address: provider.address,
            location: provider.location,
            provider_id: provider.provider_id,
          },
          customer: {
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            location: customer.location,
          },
          order: { cart: [...order], order_code: order_code },
        });
        setShipperConfirmBox(true);
        // console.log(data);
        // dispatch(ReceiveOrder(data));
      }
    );
    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = (text) => {
    if (text !== "") {
      setMessages((prev) => [...prev, text]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.emit("join-room", orderCode);
    socket.on("receive-customer-inbox", (message) => {
      console.log(messages);
      setMessages((prev) => [
        ...prev,
        { sender: "customer", message: message.message },
      ]);
    });
  }, [orderCode]);
  const shipperAcceptOrder = async (orderData) => {
    socket.emit(
      "shipper-accepted-order",
      orderData.order,
      orderData.customer,
      orderData.provider,
      orderData.order.order_code
    );
    setOrderCode(orderData.order.order_code);
    try {
      await axios.post(`/v1/api/tastie/order/update_order_status`, {
        order_code: orderData.order.order_code,
        status: 2, // picked
        shipper_id: null, // edit actual shiper_id here
        update_at: "2022-04-21 20:11:11",
      });
    } catch (error) {
      console.error(error);
    }
    setShipperConfirmBox(false);
  };
  const shipperDeclineOrder = async (orderData) => {
    socket.emit(
      "shipper-decline-order",
      orderData.order,
      orderData.customer,
      orderData.provider,
      orderData.order.order_code
    );
    setShipperConfirmBox(false);
  };
  const shipperOnTheWay = async () => {
    socket.emit("On-the-way", orderData.order.order_code);
    try {
      await axios.post(`/v1/api/tastie/order/update_order_status`, {
        order_code: orderData.order.order_code,
        status: 4, // picked
        shipper_id: null, // edit actual shiper_id here
        update_at: "2022-04-21 20:11:11",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const shipperFinishOrder = async () => {
    socket.emit(
      "Shipper-arrived",
      "The shipper has arrived at your place",
      orderData.order.order_code
    );
    try {
      await axios.post(`/v1/api/tastie/order/update_order_status`, {
        order_code: orderData.order.order_code,
        status: 5,
        shipper_id: null, // edit actual shiper_id here
        update_at: "2022-04-21 20:11:11",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <NavBar fixed={true} hideBreadcrumb={true} />
      <div className="shipper-main">
        <div className="shipper-container">
          {shipperConfirmBox ? (
            <div className="shipper-utility-row">
              <span className="shi-uti-text">
                You received a new order at <b>{orderData.provider.name}</b>
              </span>
              <span className="shi-uti-text-medium">
                Order code: <b>{orderData.order.order_code}</b>
              </span>
              <span className="shi-uti-text-medium">Customer information:</span>
              <span className="shi-uti-text-small">
                <b>Name:</b> {orderData.customer.name}
                <br />
                <b>Phone number:</b> {orderData.customer.phone}
                <br />
                <b>Address:</b> {orderData.customer.address}
              </span>
              <ButtonGroup
                float="center"
                width={100}
                mgTop={5}
                mgBottom={5}
                gap={10}
              >
                <Button
                  color={"white"}
                  bgColor={"#710000"}
                  justifyContent={"center"}
                  gap={"10px"}
                  width={100}
                  fontSize={14}
                  height={30}
                  label={"Accept"}
                  onClick={() => shipperAcceptOrder(orderData)}
                />

                <Button
                  color={"#101010"}
                  bgColor={"#d6d6d6"}
                  justifyContent={"center"}
                  gap={"10px"}
                  width={100}
                  fontSize={14}
                  height={30}
                  label={"Decline"}
                  onClick={() => shipperDeclineOrder(orderData)}
                />
              </ButtonGroup>
            </div>
          ) : (
            <Fragment>
              <div className="shipper-utility-row" style={{ height: "200px" }}>
                <div
                  className="cart-body"
                  style={{ justifyContent: "center", width: "100%" }}
                >
                  <img
                    src={CartImage}
                    alt="cart_image"
                    className="cart-image"
                  />
                  <span
                    className="cart-image-description"
                    style={{ fontSize: 14 }}
                  >
                    You have no new order at the moment.
                  </span>
                </div>
              </div>
            </Fragment>
          )}
          <div className="shipper-utility-row">
            <ButtonGroup
              float="center"
              width={100}
              mgTop={5}
              mgBottom={5}
              gap={15}
            >
              <span className="shi-uti-text-medium">Shipper actions: </span>
              <Button
                color={"white"}
                bgColor={"#710000"}
                justifyContent={"center"}
                gap={"10px"}
                width={140}
                fontSize={13}
                height={30}
                label={"Go to restaurant"}
                onClick={() => shipperAcceptOrder()}
              />

              <Button
                color={"white"}
                bgColor={"#710000"}
                justifyContent={"center"}
                gap={"10px"}
                width={140}
                fontSize={13}
                height={30}
                label={"On the way"}
                onClick={() => shipperOnTheWay()}
              />

              <Button
                color={"white"}
                bgColor={"#710000"}
                justifyContent={"center"}
                gap={"10px"}
                width={140}
                fontSize={13}
                height={30}
                label={"Complete order"}
                onClick={() => shipperFinishOrder()}
              />
            </ButtonGroup>
          </div>
          <div className="or-st-ship-conversation">
            {messages?.map((item, index) => (
              <div key={index} className={`or-st-chat-item-${item.sender}`}>
                <img
                  className="or-st-chat-avatar"
                  src={
                    item.sender === "shipper" ? shipper.profile_image : Avatar
                  }
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
                    { sender: "shipper", message: message },
                  ]);
                  socket.emit("shipper-inbox", message, orderCode);
                  setMessage("");
                }
              }}
            >
              Send
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToolBar />
    </Fragment>
  );
}

export default withRouter(Shipper);