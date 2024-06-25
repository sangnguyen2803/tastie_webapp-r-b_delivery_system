# Syntax

1. Emit an event:
   > socket.emit(eventName, [args])
2. Listen to an event:
   > socket.on(eventName, callback([args]))

# Customer

Make sure to join the room (which is the order_code)

```js
socket.emit("join-room", order_code);
```

- Submit an order:

  1. Event name:

  ```js
  socket.emit(
    "customer-submit-order",
    cartItem,
    customerData,
    providerData,
    order_code,
    pricing
  );
  ```

  2. Arguments:

     **cartItem:**

     ```js
     [
        {
            productName: "product's name",
            quantity: 1,
            price: 2.99,
            specialInstruction: "note"
        },
        {
            ...
        }
     ]
     ```

     **customerData:**

     ```js
     const customerData = {
       name: "John Doe",
       phone: "123456789",
       address: "address",
       user_id: 1000001,
       location: {
         latitude: latitude,
         longitude: longitude,
       },
     };
     ```

     **providerData:**

     ```js
     const providerData = {
       name: "Mc Donald",
       address: "135B Tran Hung Dao, Cau Ong Lanh, District 1",
       provider_id: 1000000,
       location: {
         latitude: latitude,
         longitude: longitude,
       },
     };
     ```

     **order_code**: the order code obtained

     **pricing**:

     ```js
     const pricing = {
       delivery_fee: 0.66,
       total: 10.0, // delivery_fee excluded
       paymentMethod: "Cash",
       deliveryMode: 1, // 1: delivery, 2: pickup
       deliveryMethod: "Standard", // or Schedule
       scheduleTime: "sunday 11:30 - 12:00",
     };
     ```

- Tracking order's progess:

  1. Shipper accepted order:

  ```js
  socket.on("order-accepted", (userNotification) => {
    // do something
  });
  ```

  2. Provider confirmed the order:

  ```js
  socket.on("order-confirmed-from-provider", () => {
    // do something
  });
  ```

  3. Shipper is on the way:

  ```js
  socket.on("shipper-on-the-way", (userNotification) => {
    // do something
  });
  ```

  4. Shipper has arrived:

  ```js
  socket.on("shipper-has-arrived", (userNotification) => {
    // do something
  });
  ```

  5. Shipper canceled the order:

  ```js
  socket.on("order-canceled", (userNotificationForm) => {
    // do something
  });
  ```

- Chat with shipper:

  1. Send a message:

  ```js
  socket.emit("customer-inbox", message, room); // room is the order_code
  ```

  2. Receive message from shipper:

  ```js
  socket.on("receive-shipper-inbox", (message, room) => {
    // do something
  });
  ```

# Provider

Make sure to join the room (which is: provider-{provider_id}). For example: provider-1000001.

- Receive an order (READ ONLY, wait for shipper's acceptation)

```js
socket.on(
  "provider-received-order",
  (orderData, customerData, order_code, providerNotificationForm) => {
    // do something
  }
);
```

- When shipper has accepted the order, now provider can confirm or refuse the order:

```js
socket.on("order-accepted", (data) => {
  // show the Confirm button and Decline button
});
```

> The **data** argument is:

```js
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
```

- Confirm an order:

```js
socket.emit("provider-confirmed", order_code);
```

- Decline an order:

```js
socket.emit("provider-decline-order", order_code);
```

# Shipper

Make sure to join the same room with the customer (which is the order_code)

- Receive order from customer:

```js
socket.broadcast.on(
  "shipper-received-order",
  (orderData, customerData, providerData, order_code, pricing) => {
    // do something
  }
);
```

- Accept an order:

```js
socket.emit(
  "shipper-accepted-order",
  orderData,
  customerData,
  providerData,
  order_code,
  userNotificationForm,
  providerNotificationForm
);
```

- Cancel an order:

```js
socket.on("shipper-cancel-order", room, userNotificationForm);
```

- On the way to customer's place:

```js
socket.emit("On-the-way", room, userNotificationForm);
```

- Arrived to customer's place:

```js
socket.on("Shipper-arrived", room, userNotificationForm);
```

- Chat to the customer:

  1. Receive customer's message:

  ```js
  socket.on("receive-customer-inbox", (message, room) => {
    // do something
  });
  ```

  2. Chat to customer:

  ```js
  socket.emit("shipper-inbox", message);
  ```
