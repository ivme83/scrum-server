const express         = require('express');
const router          = express.Router();
const mongoose        = require('mongoose');
// const User            = require('../models/User.js');
const db              = require("../models");

router.post('/getUser', (req, res) => {
  let fbuid = req.body.fbuid;

  db.User.findOne({'fbuid': fbuid}, (err, foundUser) => {
    if (err) return next(err);
    res.json(foundUser);
  });
});

router.post('/', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return next(err);

    if(newUser.role === "teacher"){
      db.Teacher.create({user: newUser._id}, (err, newTeacher) => {
        console.log(err);
        console.log(newTeacher);
      });
    } else {
      db.Student.create({user: newUser._id}, (err, newStudent) => {
        console.log(err);
        console.log(newStudent);
      });
    }
    
    res.json(newUser);
  });
});

module.exports = router;