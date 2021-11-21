require("dotenv").config();
const express = require("express");
// const bcrypt = require("bcrypt");
const path = require("path");
const pool = require("./database/dbPool");
const http = require("http");

const socket = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socket(server);

const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use(express.json());

//Register user
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// LoginForm

// Get all  chat messages
app.get("/api/messages", async (req, res) => {
  try {
    const token = req.headers.token;
    const messages = await pool.query(
      "SELECT messages_text, firstname FROM messages INNER JOIN users ON messages.user_id = users.id"
    );

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json("Unauthorized");
    }

    res.json(messages.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a chat message
app.post("/api/messages", async (req, res) => {
  const { id, text, userName } = req.body;
  const date = new Date();

  try {
    const newMessage = await pool.query(
      "INSERT INTO messages(messages_text, created_date, user_id) VALUES($1, $2, $3) RETURNING *",
      [text, date, id]
    );

    // add firstname to object below coming from req.body
    io.emit("receive-message", { firstname: userName, messages_text: text });

    res.json(newMessage.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  //get token from api/users header and use to authorize user

  try {
    const token = req.headers.token;

    const decoded = jwt_decode(token);

    const user = await pool.query("SELECT firstname FROM users WHERE id = $1", [
      decoded.userId,
    ]);

    //verify token and return user id if valid token
    const payLoad = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!payLoad) {
      return res.status(401).json("Unauthorized");
    }

    // io.emit("receive-users", { firstname: user.rows[0].firstname });
    // console.log(user);
    res.json(user.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
//get active users
app.get("/api/users/active", async (req, res) => {
  try {
    const active = await pool.query(
      "SELECT * FROM users WHERE last_active_at > now() - interval ' 12 hours'"
    );

    console.log(active);

    if (active) {
      res.send(active);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Logout user
app.post("/api/logout", async (req, res) => {
  const { userEmail } = req.body;
  // Set user to inactive in the db  last_active_at = null
  try {
    await pool.query("UPDATE users SET last_active_at = $1 WHERE email = $2", [
      null,
      userEmail,
    ]);

    //Query the db for the remaining users
    const stillActive = await pool.query(
      "SELECT * FROM users WHERE last_active_at > now() - interval ' 12 hours'"
    );

    //Emit the actve users to the client
    io.emit("logout", { activeUsers: stillActive.rows });
    res.json({ message: "logged out" });
  } catch (err) {
    res.status(500).send({ err });
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
