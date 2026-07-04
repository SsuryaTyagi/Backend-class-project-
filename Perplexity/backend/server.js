const app = require("./src/app");
const connectToDb = require("./src/config/database");
const http = require("http");
const { initSocket } = require("./src/sockets/server.socket");

const httpServer = http.createServer(app);
initSocket(httpServer);

connectToDb();


httpServer.listen(3000, () => {
  console.log("http://localhost:3000");
});
