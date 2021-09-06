const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const pool = require("./db");
const http = require("http");

const socket = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socket(server);

//Run when user connects
io.on("connection", (socket) => {
  socket.on("chatMessage", (message) => {
    console.log(message);
    socket.broadcast.emit("receive-message", message);
    // socket.emit("message", "Welcome to ChatZone");
  });

  //Runs when user disconnects
  socket.on("disconnect", () => {
    console.log("User has left");
  });
});

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use(express.json());

// LoginForm
app.post("/api/loginform", async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(hashedPassword);
    
    const newUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, hashedPassword]
    );

    res.json(newUser.rows);
  } catch (err) {
    res.status(403).send(err.message);
  }

});

// Get all  chat messages
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await pool.query("SELECT * FROM messages");

    res.json(messages.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a chat message
app.post("/api/messages", async (req, res) => {
  try {
    // const userId = req.params;
    const { id, text, date } = req.body;

    const newMessage = await pool.query(
      "INSERT INTO messages(messages_text, created_date, user_id) VALUES($1, $2, $3) RETURNING *",
      [text, date, id]
    );

    res.json(newMessage.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");

    res.json(allUsers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Register user
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = await pool.query(
      "INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, password]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get a single user = GET:"api/users/{id}"
app.get("/api/users/:id", async (req, res) => {
  const id = req.params;

  try {
    const singleUser = await pool.query("SELECT * FROM users WHERE  id = $1", [
      id,
    ]);
    res.json(singleUser.rows);
  } catch (err) {
    console.log(err);
  }
});

// catch all route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// // This is how you specify a route path/URL with "/" and a callback/route handler
// app.get("/api/users/:id", (req, res) => {
//   const userId = users.find((u) => u.id === parseInt(req.params.id));
//   if (!userId) res.status(404).send("The user was not found");
//   res.send(userId);
// });

// Environtment variable for hosting
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

// CREATIND API ENDPOINTS
// 1. Get all messages - GET: "api/messages"
// 2. Create a chat message - POST: "api/message"
// 3. Get all users - GET: "api/users"
// 4. Create a user - POST:"api/users"
// 5. GEt a single user = GET:"api/users/{id}"
