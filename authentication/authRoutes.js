const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const db = require("../models");

Router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log(user);
    if (err || !user) {
      return res.status(400).json({
        message: "Something isn't right",
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), process.env.PASSPORT_SECRET);
      const { email, zipcode } = user;

      return res.json({ email, token, zipcode});
    });
  })(req, res, next);
});

Router.post("/signup", async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.json(user);
  } catch (err) {
    res.json(err)
  }
});

module.exports = Router;
