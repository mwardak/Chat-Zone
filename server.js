require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const pool = require("./db");
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

    res.json({ newUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
// LoginForm
app.post("/api/loginform", async (req, res) => {
  const { email, password } = req.body;

  try {
    //select firstname and email database
    const userEmail = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (userEmail.rowCount < 1) {
      res.status(400).json("User does not exist");
    }

    const isMatch = await bcrypt.compare(password, userEmail.rows[0].password);
    if (isMatch) {
      //set the user as active in the database
      await pool.query(
        "UPDATE users SET last_active_at = $1 WHERE email = $2",
        [new Date(), email]
      );
    }
    // Craete a payload with the users id and first name
    const payload = {
      userId: userEmail.rows[0].id,
      firstName: userEmail.rows[0].firstname,
    };
    // Sign the token
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);

    //Query the db for the active users
    const active = await pool.query(
      "SELECT * FROM users WHERE last_active_at > now() - interval '45 minutes'"
    );

    //Emit the active users to the client
    io.emit("login", { activeUsers: active.rows });

    //send token and email to client
    res.json({ token, email });
  } catch (err) {
    res.status(500).send({ err });
  }
});

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
      "SELECT * FROM users WHERE last_active_at > now() - interval ' 45 minutes'"
    );

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
      "SELECT * FROM users WHERE last_active_at > now() - interval ' 45 minutes'"
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
