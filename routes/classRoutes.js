const express         = require('express');
const router          = express.Router();
const mongoose        = require('mongoose');
// const User            = require('../models/User.js');
const db              = require("../models");

// router.post('/getClasses', (req, res) => {
//   let fbuid = req.body.fbuid;

//   db.User.findOne({'fbuid': fbuid}, (err, foundUser) => {
//     if (err) return next(err);
//     res.json(foundUser);
//   });
// });

router.post('/', (req, res) => {
    let newClassData = {
        name: req.body.name,
        class_code: req.body.class_code
    };

    db.Class.create(newClassData, (err, newClass) => {
        if (err) return next(err);

        db.User.findOne({ 'fbuid': req.body.teacher_id }, (err, foundUser) => {

            db.Teacher.findOneAndUpdate({ user_id: foundUser._id }, { $push: { classes: newClass._id } }, { new: true }, (err, updated) => {
                if (err) return next(err);
                console.log(updated);
                res.json(newClass);
            });

        });

    });
});

router.post("/getClasses", (req, res) => {
    let fbuid = req.body.fbuid;

    db.User.findOne({ fbuid: fbuid }, (err, foundUser) => {
        if (foundUser.role === "teacher") {
            db.Teacher.findOne({ user_id: foundUser._id })
                .populate("classes")
                .then(userClasses => {
                    console.log(userClasses);
                    res.json(userClasses);
                })
                .catch(function (err) {
                    // If an error occurs, send it back to the client
                    res.json(err);
                });
        } else {
            db.Student.findOne({ user_id: foundUser._id })
                .populate("classes")
                .then(userClasses => {
                    console.log(userClasses);
                    res.json(userClasses);
                })
                .catch(function (err) {
                    // If an error occurs, send it back to the client
                    res.json(err);
                });

        });
});

router.post("/addClass", (req, res) => {
    let fbuid = req.body.fbuid;
    let class_code = req.body.class_code;

    db.Class.findOne({class_code: class_code}, (err, foundClass) => {
        db.User.findOne({ fbuid: fbuid }, (err, foundUser) => {
            db.Student.findOneAndUpdate({ user_id: foundUser._id }, { $push: { classes: foundClass._id } }, { new: true }, (err, updated) => {
                if (err) return next(err);
                console.log(updated);
                res.json(newClass);
            });
        });
    });
});

module.exports = router;