require("dotenv").config();
const port = process.env.PORT || 3000;

const express = require("express");
const path = require("path");
const http = require("http");
const socket = require("socket.io");

const app = express();

const server = http.createServer(app);
const io = socket(server);
app.set("socketio", io);

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use(express.json());

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/messageRoutes"));

server.listen(port, () => console.log(`server listening on port ${port}`));
