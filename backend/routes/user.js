
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

const Task = require('../models/task');
const User = require('../models/user');

const ErrCodes = {'Duplicate': 11000};

module.exports = (router) => {

/**
 * Disk Storage
*/
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/images/profileImage');
    },
    filename: function(req, file, callback){
        callback(null, + Date.now() + '-' + file.originalname )
    }
});
var upload = multer({storage: storage});

/**
 * Register User
 */
router.post('/register',  upload.single('profileImg'), (req, res) => {
    var fullUrl = req.protocol + '://' + req.get('host') ;
    let imagePath = fullUrl + '/images/profileImage/' + req.file.filename
    let user = new User({
        email: req.body.email.toLowerCase(),
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        profileImage: imagePath
    });
    user.save((err, user) => {
        if(err){
            if(err.code === ErrCodes.Duplicate){
                res.status(500).json({ 
                    success: false, 
                    message: 'First Name or Last Name or Email already exists.'
                });
            } else {
            res.status(500).json({ 
                success: false, 
                message: 'Failed to add user ', err 
            });
            }
        } else {
            res.status(201).json({ 
                success: true, 
                message: 'Succesful added new user.' 
            });
        }
    });
});

/**
 * Login User
 */
router.post('/login', (req, res) => {
    if(!req.body.email){
        res.json({ 
            success: false, 
            message: 'No Email was provided.' 
        });
    } else {
        if(!req.body.password) {
            res.json({ 
                success: false, 
                message: 'No Password was provided.'
            });
        } else {
            User.findOne( {email: req.body.email.toLowerCase()}, (err, user) => {
                if(err){
                    res.status(500).json({ 
                        success: false,  
                        message: err
                    });
                } else {
                    if(!user){
                        res.status(401).json({ 
                            success: false,  
                            message: 'Invalid login credentials.'
                        });
                    } else {
                        if(!bcrypt.compareSync(req.body.password, user.password)){
                            res.status(401).json({ 
                                success: false,  
                                message: 'Invalid login credentials.'
                            });
                        } else {
                            /*Set Token*/
                            const token = jwt.sign({user: user}, 'secret', {expiresIn: '24h'});
                            res.status(200).json({ 
                                success: true,
                                message: 'Successfully logged in', 
                                token: token, 
                                userId: user._id
                            });
                        }
                    }
                }
            });
        }
    }
});

/**
 * Get Currsent User
 */
router.get('/currentUser/:id', (req, res, next) => {
    User.findById(req.params.id,'firstName lastName profileImage', (err, user) => {
            if(err){
                res.status(500).json({ success: false, message: err });
            } else {
                res.status(200).json(user);
            }
        }
    );
});



return router; // Return router object 
}