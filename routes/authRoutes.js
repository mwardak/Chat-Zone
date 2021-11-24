const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../database/dbPool");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
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
    res.status(500).send({ message: err.message });
  }
});

router.post("/loginform", async (req, res) => {
  const { email, password } = req.body;
  const io = req.app.get("socketio");
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
      "SELECT * FROM users WHERE last_active_at > now() - interval '12 hours'"
    );

    //Emit the active users to the client
    io.emit("login", { activeUsers: active.rows });

    //send token and email to client
    res.json({ token, email });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/logout", async (req, res) => {
  const { userEmail } = req.body;
  const io = req.app.get("socketio");
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
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
