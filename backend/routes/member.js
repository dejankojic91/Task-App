const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../checkAuth/checkAuth');

const Task = require('../models/task');
const User = require('../models/user');

module.exports = (router) => {

/**
 * Get Members
 */
router.get('/members', (req, res) => {
    User.find()      
    .exec((err, members)=> {
        if(err){
            res.status(500).json({
                success: false,
                message: err
            });
        } else {
            res.status(200).json({ 
                success: true, 
                members: members.map(function(item) { 
                    item.password = '';
                    return item; 
                })
             });
        }
    });
});

/**
 * Get Members By Id
 */
router.get('/member/:id', (req, res, next) => {
    if(!req.params.id){
        res.json({ success: false, message: 'No member Id was provided.' });
    } else {
        User.findById(req.params.id, (err, member) => {
            if(err){
                res.json({ success: false, message: err });
            } else {
                if(!member){
                    res.json({ success: false, message: 'Member not found.' });
                } else {
                    function memberFun(member) { 
                        member.password = '';
                        return member; 
                    }
                    res.json({ 
                        success: true, 
                        member: memberFun(member)
                         
                    });
                }
            }
        });
    }
});


/**
 * Update Member
 */
router.put('/updateMember/:id', checkAuth, (req, res, next) => {
     User.findOne({ _id: req.params.id }, (err, member) => {
        if(err){
            res.json({
                success: false,
                message: err
            });
        } else {
            member.function= req.body.function;
            member.phoneNumber= req.body.phoneNumber;
            member.mobilePhoneNumber= req.body.mobilePhoneNumber;
            member.group= req.body.group;
            member.save((err, member) => {
                if(err){
                    res.status(500).json({ 
                        success: false, 
                        message: 'Failed to update Member ', err 
                    });
                } else {
                    res.status(201).json({ 
                        success: true, 
                        message: 'Succesful update new Member.', member 
                    });
                }
            });
        }
    });
});


return router; // Return router object 
}