const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.use(ejsLayouts);

app.set("view engine", "ejs");

// Routes start here

// 2 User wants to SEE list of reminders
app.get("/reminders", reminderController.list);

// 3 User wants to SEE a page to create a new reminder
app.get("/reminder/new", reminderController.new);

// 5 User wants to SEE an individual reminder
app.get("/reminder/:id", reminderController.listOne);

// 6 User wants to SEE a page to edit specific reminder
app.get("/reminder/:id/edit", reminderController.edit);

// 4 User wants to POST a new reminder to web server - from 3
app.post("/reminder/", reminderController.create);

// Implement this yourself
// 7 User wants to POST an edit to specific reminder - from 6
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
// 8 User wants to POST a reminder deletion - from 6
app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
