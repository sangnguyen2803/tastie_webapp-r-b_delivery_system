const eventOrder = require("./order/event");

const shipperRouter = (io) => {
  eventOrder(io);
};

module.exports = shipperRouter;
