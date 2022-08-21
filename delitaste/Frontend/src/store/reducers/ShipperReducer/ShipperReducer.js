import io from "socket.io-client";

const initialState = {
  socket: io(`wss://157.230.243.92:3015`),
};

const ShipperReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
};

export default ShipperReducer;
