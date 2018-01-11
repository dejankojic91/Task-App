const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
const checkAuth = require('../checkAuth/checkAuth');

const Task = require('../models/task');
const User = require('../models/user');

module.exports = (router) => {

/**
 * Disk Storage
*/
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/taskFiles')
    },
    filename: function (req, file, cb) {
        cb(null, + Date.now() + '-' +file.originalname )
    }
});
 var upload = multer({ storage: storage });

/* POST . */
router.post('/new', upload.array("taskFiles", 10), checkAuth, (req, res, next) => {
    //Token
    const decoded = jwt.decode(req.headers.authorization);
    User.findById(decoded.user._id, (err, user) => {
        if(err){
            res.json({ success: false, message: err });
        } else {
            let task = new Task({
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
                priority: req.body.priority,
                problemStatus: req.body.problemStatus,
                dateOfCompletion: req.body.dateOfCompletion,
                status: req.body.status,
                user: {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    url: user.profileImage
                },
            });
            var fullUrl = req.protocol + '://' + req.get('host') ;
            for(let i = 0; i < req.files.length; i++){
                task.attachment.push({
                    url: fullUrl + '/taskFiles/' + req.files[i].filename,
                    name: req.files[i].originalname,
                });
             }

            task.save((err, task) => {
                if(err){
                    res.status(500).json({ 
                        success: false, 
                        message: 'Failed to create New Task ', err 
                    });
                } else {
                    res.status(201).json({ 
                        success: true, 
                        message: 'Succesful created new Task.', task 
                    });
                }
            });
        }
    }); 
});

/**
 * Update Task
 */
router.put('/update/:id', upload.array("taskFiles", 10), checkAuth, (req, res, next) => {
    Task.findOne({ _id: req.params.id }, (err, task) => {
        if(err){
            res.json({
                success: false,
                message: err
            });
        } else {
            User.findById(task.user._id, (err, user) => {
                task.title= req.body.title;
                task.date= req.body.date;
                task.description= req.body.description;
                task.priority= req.body.priority;
                task.problemStatus= req.body.problemStatus;
                task.dateOfCompletion= req.body.dateOfCompletion;
                task.status= req.body.status;
                task.user = {
                    _id: user._id,                              
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username,
                    url: user.profileImage
                };
                var fullUrl = req.protocol + '://' + req.get('host') ;
                for(let i = 0; i < req.files.length; i++){
                    task.attachment.push({
                        url: fullUrl + '/taskFiles/' + req.files[i].filename,
                        name: req.files[i].originalname,
                    });
                 }
                
            task.save((err, task) => {
                if(err){
                    res.status(500).json({ 
                        success: false, 
                        message: 'Failed to update Task ', err 
                    });
                } else {
                    res.status(201).json({ 
                        success: true, 
                        message: 'Succesful update new Task.', task 
                    });
                }
            });
        });
        }
    
    });
});

/**
 * Get All Tasks
 */
router.get('/tasks', (req, res, next) => {
    Task.find()
        .exec((err, tasks)=> {
            if(err){
                res.status(500).json({ success: false, message: err });
            } else {
                res.status(200).json({ success: true, tasks: tasks });
            }
        }
    );
});


/**
 * Get Task By Id
*/
router.get('/task/:id', (req, res, next) => {
    if(!req.params.id){
        res.json({ success: false, message: 'No task Id was provided.' });
    } else {
        Task.findById(req.params.id, (err, task) => {
            if(err){
                res.json({ success: false, message: err });
            } else {
                if(!task){
                    res.json({ success: false, message: 'Task not found.' });
                } else {
                    res.json({ success: true, task: task });
                }
            }
        });
    }
});


/**
 * Delete Comment
*/
router.delete('/delete/:id', checkAuth, (req, res) => {
    if(!req.params.id) {
        res.json({ success: false, message: 'No Id provided' });
    } else {
        Task.findById(req.params.id, (err, task) => {
           // console.log(task);
            if(err) {
                res.json({ success: false, message: 'Invalid id' });
            } else {
                if(!task) {
                    res.json({ success: false, message: 'Task was not found.' });
                } else {
                    task.remove((err) => {
                        if(err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Task deleted!' });
                        }
                    });
                }
            }
        });
    }
});

/**
 * New Comment
*/
router.post('/comment', checkAuth, (req, res) => {
    Task.findOne({ _id: req.body.id}, (err, task) => {
        if(err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            if(!task){
                res.json({
                    success: false,
                    message: 'Task not found!'
                });
            } else {
                User.findOne({ _id: req.body.userId }, (err, user) => {
                    task.comments.push({
                        comment: req.body.comment,
                        createdBy: {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            username: user.username,
                            url: user.profileImage
                        }
                    });
                    task.save((err)=>{
                        if(err){
                            res.json({
                                success: false,
                                message: 'Something went wrong'
                            });
                        } else {
                            res.json({
                                success: true,
                                message: 'Success Save'
                            });
                        }

                    });
                });
            }
        }
    });
});


/**
 * Update Comment
 */
router.put('/commentUpdate/:id', checkAuth, (req, res, next) => {
    if(!req.params.id) {
        res.json({
            success: false,
            message: 'Task Id not provided '
        });
    } else {
        Task.findOne({ _id: req.params.id}, (err, task) => {
            if(err){
                res.json({
                    success: false,
                    message: 'Error', err
                });
            } else {
                if(!req.body.userId) {
                    res.json({
                        success: false,
                        message: 'User Id not provided '
                    });
                } else {
                    User.findOne({ _id: req.body.userId }, (err, user) => {
                        for(let k = 0; k < task.comments.length; k++){
                            if(task.comments[k]._id == req.body.commentId ){
                                task.comments[k].comment = req.body.comment;
                                task.save((err, task)=>{
                                    if(err){
                                        res.json({
                                            success: false,
                                            message: 'Something went wrong'
                                        });
                                    } else {
                                        res.status(201).json({ 
                                            success: true, 
                                            message: 'Succesful updated new Task.', task 
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }

});

return router; // Return router object 
}