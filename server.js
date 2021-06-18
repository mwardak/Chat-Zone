const express = require("express");
const path = require("path");
// const socket = require("socket.io");
const pool = require("./db");

// const io = socket(server);

// io.on("connection", socket => {
//   socket.emit("chat-message", "hello world")
// });

const app = express();

app.use("/", express.static(path.join(__dirname, "client/build")));
app.use(express.json());

// catch all route
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
}); 


// LoginForm

// ROUTES
app.post("/api/loginform", async (req, res) => {
  
  //insert new email and password into database

  
// check if the email/password matches a user in the DB

//if not send not authorized status 403
res.status(403).json({errorMessage: "invalid email or password"})
 
//ELSE sucucessful status
res.json({});
});


// Get all  chat messages
app.get("/api/messages", async (req, res) => {
  const allMessages = await pool.query("SELECT messages FROM users");

  res.json(allMessages.rows);
});

// Create a chat message
app.post("/api/messages", async (req, res) => {
  try {
    // const userId = req.params;
    const chatMessage = req.body;

    const newMessage = await pool.query(
      "INSERT INTO users(messages) VALUES($1) RETURNING *",
      [chatMessage]
    );

    res.json(newMessage.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  const allUsers = await pool.query("SELECT name FROM users");

  res.json(allUsers.rows);
});

// Register user
app.post("/api/register", async (req, res) => {
  try {
    const {firstName, lastName, email, password, } = req.body;

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
