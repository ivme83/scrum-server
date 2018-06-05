const express         = require('express');
const router          = express.Router();
const mongoose        = require('mongoose');
const db              = require("../models");


router.post('/createProject', (req, res) => {
    let newProjectData = {
        name: req.body.project_name,
        description: req.body.description,
        project_code: req.body.project_code
    };


    db.Project.create(newProjectData, (err, newProject) => {
        if (err) return next(err);

        db.User.findOne({ 'fbuid': req.body.student_id }, (err, foundUser) => {
            db.Student.findOneAndUpdate({ user: foundUser._id }, { $push: { projects: newProject._id } }, { new: true }, (err, updated) => {
                if (err) return next(err);
                res.json(newProject);
            });

        });

    });
});

router.post("/addProject", (req, res) => {
    let fbuid = req.body.fbuid;
    let project_code = req.body.project_code;

    db.Project.findOne({ project_code: project_code }, (err, foundProject) => {
        if (foundProject){
        db.User.findOne({ fbuid: fbuid }, (err, foundUser) => {
            db.Student.findOneAndUpdate(
                { user: foundUser._id },
                { $push: { projects: foundProject._id } },
                { new: true },
                (err, updatedStudent) => {
                    if (err) return next(err);
                    // console.log(updated);
                    res.json(updatedStudent);
                }
            );
        });
    }
    });
});

router.post("/getProjects", (req, res) => {
    let fbuid = req.body.fbuid;

    db.User.findOne({ fbuid: fbuid }, (err, foundUser) => {
        db.Student.findOne({ user: foundUser._id })
            .populate("projects")
            .then(userProjects => {
                res.json(userProjects);
            })
            .catch(function (err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });

    });
});

module.exports = router;