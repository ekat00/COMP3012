const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/reminders",
//     failureRedirect: "/auth/login",
//   })
// );

// test if POST request sent
router.post("/login", (req, res) => {
  console.log(req.body);
});


//router.get("/register",  forwardAuthenticated, (req, res) => res.render("register"));

//router.post("register")


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

module.exports = router;
