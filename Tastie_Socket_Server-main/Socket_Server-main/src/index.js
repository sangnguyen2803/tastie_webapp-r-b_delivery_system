const express = require("express");
const app = express();

const http = require("http");

const server = http.createServer(app);
const { Server } = require("socket.io");
const bodyParser = require("body-parser");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const socket = require("socket.io");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const eventShipperOrder = require("./shipper/order/event");
const shipperRouter = require("./shipper");

shipperRouter(io);

server.listen(3015, () => {
  console.log("Connect with port 3015");
});
