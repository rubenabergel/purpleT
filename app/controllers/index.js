/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User'),
    async = require('async'),
    _ = require('underscore');



var findSubDomain = function(str){
    var q = str.split('.');
    if (q.length > 2 ){
        return q[0];
    }
};


User.findOne({'username': 'Ruben'},function (err, user) {
    if(err) throw err;
    if(user){
        console.log('YESSSSSSSSS');
    }else{
        console.log('NOOOOOOOOOO');
    }
});



// var query = User.findOne({ 'name.last': 'Ruben' });

exports.render = function(req, res) {
    console.log("request", findSubDomain(req.host));


    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};


