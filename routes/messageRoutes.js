const express = require("express");
const router = express.Router();
const pool = require("../database/dbPool");
const jwt = require("jsonwebtoken");

router.get("/messages", async (req, res) => {
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

router.post("/messages", async (req, res) => {
  const { id, text, userName } = req.body;
  const date = new Date();
  const io = req.app.get("socketio");

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

module.exports = router;
