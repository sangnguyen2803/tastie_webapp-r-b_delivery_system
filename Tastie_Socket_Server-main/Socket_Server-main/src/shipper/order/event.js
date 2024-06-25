const eventOrder = (io) => {
  const TIMEOUT = 60 * 10 * 1000; // 10 minutes
  let hangingRequest = [];

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected to socket`);
    socket.emit("hello-from-server", { message: "Hello user" });
    socket.on("hello-from-client", (message) => {
      console.log("Message from client", message);
      socket.broadcast.emit("hello-from-server", {
        message: `Message from client: ${message}`,
      });
    });

    // customer send their location
    socket.on("send-location", (location) => {
      console.log("location is", location);
      socket.broadcast.emit("received-location", location);
    });

    // shipper send their location
    socket.on("shipper-location", (data) => {
      console.log("Shipper sent location:", data);
      socket.broadcast.emit("shipperLocation", data);
    });

    // shipper has arrived to the customer's place
    socket.on("Shipper-arrived", (room, userNotificationForm) => {
      console.log("Shipper has arrived");
      socket.broadcast
        .to(room)
        .emit("shipper-has-arrived", userNotificationForm);
      console.log("shipper leave the room", room);
      socket.leave(room);
    });

    socket.on("join-room", (room) => {
      console.log("Socket room before: ", socket.rooms);
      if (socket.rooms.has(room)) {
        // already in the room
        console.log("joined room already");
      } else {
        socket.join(room);
        console.log("joined room", room);
      }
      console.log("Socket room after: ", socket.rooms);
    });
    socket.on("leave-room", (room) => {
      socket.leave(room);
      console.log(socket.id + " has left the room", room);
    });

    // provider joins their own room (room name: provider-<provider_id> eg: provider-1)
    socket.on("provider-join-room", (room) => {
      socket.join(room);
      console.log("provider join room");
    });

    socket.on(
      "customer-submit-order",
      (orderData, customerData, providerData, order_code, pricing) => {
        console.log(
          "customer submit order",
          orderData,
          customerData,
          providerData,
          order_code,
          pricing
        );

        hangingRequest.push(order_code); // Add the order in the hanging requests

        // after 10 minutes, go check if that order is still in the hanging requests or not
        setTimeout(() => {
          console.log("before", hangingRequest);
          const index = hangingRequest.indexOf(order_code);
          console.log(index);
          // if yes, tell the client that the order has to be canceled
          if (index !== -1) {
            io.to(order_code).emit("order-timeout", {
              subject: "Your order has been canceled !",
              content: "The order has been canceled due to timeout",
            });
            socket.leave(order_code);
            console.log(
              "the order has been canceled duo to timeout",
              order_code
            );
            hangingRequest.splice(index, 1); // remove that order from the hanging requests
            console.log("after", hangingRequest);
          }
        }, TIMEOUT);

        // for "Delivery" mode: send the order to shipper and provider simultaneously
        if (pricing.deliveryMode === 1) {
          // send order to shipper
          socket.broadcast.emit(
            "shipper-received-order",
            orderData,
            customerData,
            providerData,
            order_code,
            pricing
          );
          // also send order to provider (but provider has to wait for acceptation from shipper to confirm)
          if (pricing) {
            socket.broadcast
              .to(`provider-${providerData.provider_id}`)
              .emit(
                "provider-received-order",
                orderData,
                customerData,
                order_code,
                pricing
              );
          } else {
            socket.broadcast.to(`provider-${providerData.provider_id}`).emit(
              "provider-received-order",
              orderData,
              customerData,
              order_code,
              {} // providerNotificationForm
            );
          }
        }
        // for "Pickup" mode: only send to provider
        else {
          if (pricing) {
            socket.broadcast
              .to(`provider-${providerData.provider_id}`)
              .emit(
                "provider-received-order",
                orderData,
                customerData,
                order_code,
                pricing
              );
          } else {
            socket.broadcast.to(`provider-${providerData.provider_id}`).emit(
              "provider-received-order",
              orderData,
              customerData,
              order_code,
              {} // providerNotificationForm included
            );
          }
        }

        // server announce to provider
        // socket.broadcast
        //   .to(`provider-${providerData.provider_id}`)
        //   .emit("provider-received-order", orderData, customerData, order_code);
      }
    );

    socket.on(
      "shipper-accepted-order",
      (
        orderData,
        customerData,
        providerData,
        order_code,
        userNotificationForm,
        providerNotificationForm
      ) => {
        // join the same room with the customer when the shipper accept the order (room's name is the order_code)
        const room = order_code;
        socket.join(room);

        const data = {
          orderData: orderData,
          customerData: customerData,
          providerData: providerData,
          order_code: order_code,
          notificationForm: {
            userNotificationForm: userNotificationForm,
            providerNotificationForm: providerNotificationForm,
          },
        };

        socket.broadcast
          .to(room) // notify user that the order is accepted
          .to(`provider-${providerData.provider_id}`) // also tell provider to confirm and prepare the order
          .emit("order-accepted", data);

        // when the shipper accept the order, remove that order from the hanging requetsts
        const index = hangingRequest.indexOf(order_code);
        if (index !== -1) {
          hangingRequest.splice(index, 1);
          console.log("hanging request after shipper accepted", hangingRequest);
        }

        // when the shipper accepted the order, tell provider to prepare the order
        // socket.broadcast
        //   .to(`provider-${providerData.provider_id}`)
        //   .emit(
        //     "provider-received-order",
        //     orderData,
        //     customerData,
        //     order_code,
        //     providerNotificationForm
        //   );
      }
    );

    socket.on("Arrived-provider", (room, userNotificationForm) => {
      socket.broadcast
        .to(room)
        .emit(userNotificationForm.subject, userNotificationForm.content);
    });

    socket.on("On-the-way", (room, userNotificationForm) => {
      console.log("Shipper is on the way", room);
      socket.broadcast
        .to(room)
        .emit("shipper-on-the-way", userNotificationForm);
    });

    socket.on("Almost-arrived", (room, userNotificationForm) => {
      socket.broadcast
        .to(room)
        .emit("shipper-almost-arrived", userNotificationForm);
    });

    socket.on("shipper-cancel-order", (room, userNotificationForm) => {
      // the room's name is the order_code where the customer is in
      socket.broadcast.to(room).emit("order-canceled", userNotificationForm);
    });

    socket.on("provider-confirmed", (room) => {
      // same as shipper when accept the order (for pickup)
      const index = hangingRequest.indexOf(room);
      if (index !== -1) {
        hangingRequest.splice(index, 1);
        console.log("hanging request after provider accepted", hangingRequest);
      }
      socket.broadcast.to(room).emit("order-confirmed-from-provider");
    });
    socket.on("provider-assigned", (room) => {
      socket.broadcast.to(room).emit("order-assigned");
    });
    socket.on("provider-decline-order", (room) => {
      // the room's name is the order_code where the customer is in
      socket.broadcast
        .to(room)
        .emit("order-canceled", "Your order has been canceled");
    });

    socket.on("customer-inbox", (message, room) => {
      console.log("customer: " + message + " to room " + room);
      socket.broadcast.to(room).emit("receive-customer-inbox", message, room);
    });
    socket.on("shipper-inbox", (message, room) => {
      console.log("shipper: " + message + " to room " + room);
      socket.broadcast.to(room).emit("receive-shipper-inbox", message, room);
    });

    // socket.on('shipper-done-shipping', () => {
    //   socket.broadcast.emit('order-done', )
    // })

    // socket.on("shipperLocation", (data) => {
    //   console.log("shipperLocation", data);
    //   socket.emit("received-shipper-location", { longitude: data.longitude });
    // });

    socket.on("admin-add-ecoupon", () => {
      console.log("admin added ecoupon");
      socket.broadcast.emit("customer-receive-notification", 1);
    });
  });
};

module.exports = eventOrder;
