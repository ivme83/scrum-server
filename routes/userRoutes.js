const express         = require('express');
const router          = express.Router();
const mongoose        = require('mongoose');
// const User            = require('../models/User.js');
const db              = require("../models");

// /* GET ALL BOOKS */
// router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
//   let token = getToken(req.headers);
//   if (token) {
//     Book.find((err, books) => {
//       if (err) return next(err);
//       res.json(books);
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });

// /* SAVE BOOK */
// router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
//   let token = getToken(req.headers);
//   if (token) {
//     Book.create(req.body, (err, post) => {
//       if (err) return next(err);
//       res.json(post);
//     });
//   } else {
//     return res.status(403).send({success: false, msg: 'Unauthorized.'});
//   }
// });

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
      db.Teacher.create({user_id: newUser._id}, (err, newTeacher) => {
        console.log(err);
        console.log(newTeacher);
      });
    } else {
      db.Student.create({user_id: newUser._id}, (err, newStudent) => {
        console.log(err);
        console.log(newStudent);
      });
    }
    
    res.json(newUser);
  });
});

// getToken = (headers) => {
//   if (headers && headers.authorization) {
//     let parted = headers.authorization.split(' ');
//     if (parted.length === 2) {
//       return parted[1];
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// };

module.exports = router;