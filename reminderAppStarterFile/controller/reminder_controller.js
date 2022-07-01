let database = require("../database");
const userModel = require("../models/userModel").userModel; //new DB for passport
let userID = Req.session.passport.user;

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: userModel.userID.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userModel.userID.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: userModel.userID.reminders });
      // or: res.redirect("/reminder");
    }
  },

  create: (req, res) => {
    let reminder = {
      id: userModel.userID.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false,
    };
    userModel.userID.reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = userModel.userID.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    // implement this code
    let reminderToFind = req.params.id;
    
    let searchResult = userModel.userID.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    
    if (searchResult != undefined) {
      userModel.userID.reminders.title = req.body.title;
      userModel.userID.reminders.description = req.body.description;
      userModel.userID.reminders.completed = req.body.completed;
      res.redirect("/reminders");
    } else {
      res.render("reminder/index", { reminders: userModel.userID.reminders });
      // or: res.redirect("/reminder");
    }
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;

    let searchResult = userModel.userID.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    
    if (searchResult != undefined) {
      userModel.userID.reminders.filter(function (reminder) {
        return reminder.id != reminderToFind;
      });
      res.redirect("/reminders");
    } else {
      res.render("reminder/index", { reminders: userModel.userID.reminders });
      // or: res.redirect("/reminder");
    }
  },
};

module.exports = remindersController;
