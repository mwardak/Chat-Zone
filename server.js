const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const pool = require("./db");
const http = require("http");

const socket = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socket(server);
require("dotenv").config();
const jwt = require("jsonwebtoken");


app.use("/", express.static(path.join(__dirname, "client/build")));
app.use(express.json());

// LoginForm
app.post("/api/loginform", async (req, res) => {
  const { email, password } = req.body;
  // bcrypt.compare password with hash
  const hash = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (hash.rowCount < 1) {
    return res.status(400).json("User does not exist");
  }

  const isMatch = await bcrypt.compare(password, hash.rows[0].password);
  if (!isMatch) {
    return res.status(400).json("Incorrect password");
  }

  return res.json(hash.rows[0]);
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
    const { id, text } = req.body;
    const date = new Date();

    const newMessage = await pool.query(
      "INSERT INTO messages(messages_text, created_date, user_id) VALUES($1, $2, $3) RETURNING *",
      [text, date, id]
    );

    io.emit("receive-message", newMessage.rows[0]);

    res.json(newMessage.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM users");
    //io emit user joined
    io.emit("user-joined", allUsers.rows);

    res.json(allUsers.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Register user
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
   
    const user = await pool.query("SELECT * FROM users WHERE firstname = $1", [
      firstName,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users(firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, hashedPassword]
    );

    const accessToken = await jwt.sign(newUser.rows[0].id, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({accessToken});
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
