const express = require("express");
const path = require("path");
const socket = require("socket.io");
const pool = require("./db");

// const io = socket(server);

// io.on("connection", socket => {
//   socket.emit("chat-message", "hello world")
// });

const app = express();

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use(express.json());

// ROUTES
// create users

app.post("/api/name", async (req, res) => {
  try {
    const createNewUser = "Adam";
    
    const newUser = await pool.query("INSERT INTO users(name) VALUES($1) RETURNING *",
    [createNewUser]
    );

    res.json(newUser.rows)
  } catch (err) {
  
    res.status(500).send(err.message);
  }
  
});
// get all users
app.get("/api/name", async (req, res) => {

      
      const allUsers = await pool.query("SELECT name FROM users")
   
      
      res.json(allUsers.rows);
    
  });
// update user

app.put("/api/name/:id", async (req, res) => { 

const {id} = req.params;
const {name} = req.body;
  
  const singleUser = await pool.query("UPDATE users SET name = $1 WHERE users_id = $2"
  [name, id])
  res.json(singleUser.rows);
});
// delete a user

//dummy data for testing api
// const usersLoggedIn = [
//   { username: "John", id: 1 },
//   { username: "Mike", id: 2 },
// ];

// app.get("/api/users", (req, res) => {
//   res.send(usersLoggedIn);
// });

// const userMessages = [
//   { username: "John", id: 1, text: "Hello" },
//   { username: "Mike", id: 2, text: "Hi" },
// ];

// app.get("/api/messages", (req, res) => {
//   res.send(userMessages);
// });
// // This is how you specify a route path/URL with "/" and a callback/route handler
// app.get("/api/users/:id", (req, res) => {
//   const userId = users.find((u) => u.id === parseInt(req.params.id));
//   if (!userId) res.status(404).send("The user was not found");
//   res.send(userId);
// });

// Environtment variable for hosting
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// CREATIND API ENDPOINTS
// 1. Get all messages - GET: "api/messages"
// 2. Create a chat message - POST: "api/message"
// 3. Get all users - GET: "api/users"
// 4. Create a user - POST:"api/users"
// 5. GEt a single user = GET:"api/users/{id}"
