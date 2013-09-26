/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore');


var findSubDomain = function(str){
    var q = str.split('.');
    if (q.length > 2 ){
        return q[0];
    }
};


exports.render = function(req, res) {
    console.log("request", findSubDomain(req.host));

    res.render('index', {
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};


