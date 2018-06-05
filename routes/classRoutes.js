const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const db = require("../models");

router.post("/", (req, res) => {
  let newClassData = {
    name: req.body.name,
    class_code: req.body.class_code
  };

  db.Class.create(newClassData, (err, newClass) => {
    if (err) return next(err);

    db.User.findOne({ fbuid: req.body.teacher_id }, (err, foundUser) => {
      db.Teacher.findOneAndUpdate(
        { user: foundUser._id },
        { $push: { classes: newClass._id } },
        { new: true },
        (err, updated) => {
          if (err) return next(err);
          console.log(updated);
          res.json(newClass);
        }
      );
    });
  });
});

router.post("/getTeacherClasses", (req, res) => {
  let fbuid = req.body.fbuid;

  db.User.findOne({ fbuid: fbuid }, (err, foundUser) => {
    if (foundUser.role === "teacher") {
      db.Teacher.findOne({ user: foundUser._id })
        .populate("classes")
        .then(userClasses => {
          console.log(userClasses);
          res.json(userClasses);
        })
        .catch(function(err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    } else {
      db.Student.findOne({ user: foundUser._id })
        .populate("classes")
        .then(userClasses => {
          console.log(userClasses);
          res.json(userClasses);
        })
        .catch(function(err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    }
  });
});

router.post("/getStudentsFromClass", (req, res) => {
  let class_id = req.body.class_id;

  db.Class.findOne({ _id: class_id })
    .populate({path: "students", populate: { path: "user" }})
    .then(studentsClass => {
      res.json(studentsClass);
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
});

// db.Class.find({})
//   .populate({ path: "userId", populate: { path: "reviewId" } })
//   .exec(function(err, res) {});

router.post("/addClass", (req, res) => {
  let fbuid = req.body.fbuid;
  let class_code = req.body.class_code;

  db.Class.findOne({ class_code: class_code }, (err, foundClass) => {
    if (err) return next(err);
    if(foundClass){
    db.User.findOne({ fbuid: fbuid }, (err, foundUser) => {
      db.Student.findOneAndUpdate(
        { user: foundUser._id },
        { $push: { classes: foundClass._id } },
        { new: true },
        (err, updatedStudent) => {
          db.Class.findOneAndUpdate(
            { _id: foundClass._id },
            { $push: { students: updatedStudent._id } },
            { new: true },
            (err, updatedClass) => {
              if (err) return next(err);
              // console.log(updated);
              res.json(updatedClass);
            }
          );
        }
      );
    });
  }
  });
});

module.exports = router;
