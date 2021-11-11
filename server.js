const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const socket = require("./sockets");
const io = require("socket.io")(server);

// START SOCKET EVENTS
socket(io);
// END SOKCET EVENTS

server.listen(PORT, () => {
  console.log("SERVER ONLINE");
});
