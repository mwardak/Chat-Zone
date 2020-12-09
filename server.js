const express = require("express");
const path = require("path");
// const socket = require("socket.io");

const app = express();

app.use("/", express.static(path.join(__dirname, "client/build")));

//dummy data for testing api
const users = [
    {username:"John", id: 1, text:"Hi everyone"},
    {username:"Mike", id: 2, text:"Hows its going"}

  ];
  
  app.get("/api/users", (req, res) => {
    
    res.send(users);
})


// This is how you specify a route path or URL with "/" and a callback/route handler 
app.get("/api/users/:id", (req, res) => {
    
   const userId  = users.find(u => u.id === parseInt(req.params.id))
   if(!userId)res.status(404).send("The user was not found") ;
})


// Environtment variable for hosting
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server listening on port ${port}`);
});

// const io = socket(server);


// io.on("connection", function (socket) {
//   console.log("Made socket connection");
// });


// CREATIND API ENDPOINTS
// 1. Get all messages - GET: "api/messages"
// 2. Create a chat message - POST: "api/message"
// 3. Get all users - GET: "api/users"
// 4. Create a user - POST:"api/users"
// 5. GEt a single user = GET:"api/users/{id}"