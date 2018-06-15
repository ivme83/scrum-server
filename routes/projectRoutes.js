const express         = require('express');
const router          = express.Router();
const mongoose        = require('mongoose');
const db              = require("../models");


router.post('/createProject', (req, res) => {
    const newProjectData = {
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
    const fbuid = req.body.fbuid;
    const project_code = req.body.project_code;

    db.Project.findOne({ project_code: project_code }, (err, foundProject) => {
        if (foundProject){
        db.User.findOne({ fbuid: fbuid }, (err, foundUser) => {
            db.Student.findOneAndUpdate(
                { user: foundUser._id },
                { $push: { projects: foundProject._id } },
                { new: true },
                (err, updatedStudent) => {
                    if (err) return next(err);
                    res.json(updatedStudent);
                }
            );
        });
        }
    });
});

router.post("/getProjects", (req, res) => {
    const fbuid = req.body.fbuid;

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

router.post("/getSingleProject", (req, res) => {
    const _id = req.body._id;

    db.Project.findOne({ _id: _id }, (err, foundProject) => {
        if (err) return next(err);
        res.json(foundProject);
    });
});

router.post("/getTasks", (req, res) => {
    const _id = req.body._id;

    db.Project.findOne({ _id: _id })
        .populate("tasks")
        .then(projectTasks => {
            res.json(projectTasks);
        })
        .catch(function (err) {
            // If an error occurs, send it back to the client
            res.json(err);
        });
});

router.post("/addTask", (req, res) => {
    const _id = req.body._id;
    const newTaskData = {
        name: req.body.name,
        description: req.body.description,
        due_date: req.body.due_date
    };

    db.Task.create(newTaskData, (err, newTask) => {
        if (err) return next(err);
        console.log(err);
        

        db.Project.findOneAndUpdate({ _id: _id }, { $push: { tasks: newTask._id } }, { new: true }, (err, updated) => {
            if (err) return next(err);
            res.json(newTask);
        });


    });
});

module.exports = router;