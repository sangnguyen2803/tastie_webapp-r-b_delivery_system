const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let onlineUsers = [
  { userId: 1, name: "Han", socketId: "adffafsfaefea" },
  { userId: 2, name: "Sang", socketId: "e23424124124sdfsf" },
];
const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => username === username);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addNewUser(userId, socket.id);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

http.listen(4000, function () {
  console.log("listening on port 4000");
});
