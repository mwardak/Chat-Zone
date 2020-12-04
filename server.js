const express = require("express");
const path = require("path");
const socket = require("socket.io");

const app = express();

app.use("/", express.static(path.join(__dirname, "client/build")));


app.get("/", (req, res) =>{
    console.log("Responding to root route");
    res.send("Hello from root");
})

app.listen(3000, () => {
    console.log("server is up and listening on port 3000");
});

const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");
});


// CREATIND API ENDPOINTS
// 1. Get all messages - GET: "api/messages"
// 2. Create a chat message - POST: "api/message"
// 3. Get all users - GET: "api/users"
// 4. Create a user - POST:"api/users"
// 5. GEt a single user = GET:"api/users/{id}"