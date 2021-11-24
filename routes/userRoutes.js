const express = require("express");
const router = express.Router();
const pool = require("../database/dbPool");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

router.get("/users", async (req, res) => {
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

router.get("/users/active", async (req, res) => {
  try {
    const active = await pool.query(
      "SELECT * FROM users WHERE last_active_at > now() - interval ' 12 hours'"
    );

    if (active) {
      res.send(active);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
