const mongoose = require('mongoose');
const UserDetails = require('../models/userDetails.Model');
const passport = require('passport');

module.exports.index = function(req, res) {
    UserDetails.get(function(err, userDetails){
        if (err) {
            res.json({status: "error", message: err});
        } else {
            res.json({status: "success", message: "userDetails saved successfully", data: userDetails});
        }
    });
};

module.exports.new = function(req, res) {
    const userDetails = new UserDetails();
    userDetails.selectedWing = req.body.selectedWing;
    userDetails.roomNo = req.body.roomNo;
    userDetails.name = req.body.name ? req.body.name : userDetails.name;
    userDetails.adharNo = req.body.adharNo;
    userDetails.mobile = req.body.mobile;
    userDetails.doj = req.body.doj;
    userDetails.deposit = req.body.deposit;
    userDetails.rent = req.body.rent;
    userDetails.subPersonName = req.body.subPersonName;
    userDetails.subPersonMobile = req.body.subPersonMobile;
    userDetails.password = req.body.password;

    userDetails.save(function (err) {
        res.json({
                    message: 'New userDetails created!',
                    data: userDetails
                });
            });
};

module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json();
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}
