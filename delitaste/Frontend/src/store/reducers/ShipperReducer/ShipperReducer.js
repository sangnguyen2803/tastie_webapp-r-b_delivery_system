import io from "socket.io-client";

const initialState = {
  socket: io("wss://socket.tastie18vp.com", { transport: ["websocket"] }),
};

const ShipperReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default ShipperReducer;
