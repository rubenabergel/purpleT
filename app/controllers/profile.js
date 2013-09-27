var mongoose = require('mongoose'),
    async = require('async'),
    Book = mongoose.model('Book'),
    Article = mongoose.model('Article'),
    Video = mongoose.model('Video'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    User = mongoose.model('User');


exports.all = function(req, res, next) {
    // get the articles, books, and videos from the database then...
    if(!req.user) return next(new Error('not logged in!'));
    var username = req.user.lusername;
    Book.getForUser(username, function(err, books){
        if(err) return next(err);

    Article.getForUser(username, function(err, articles){
        if(err) return next(err);

    Video.getForUser(username, function(err, videos){
            if(err) return next(err);
                res.json({
                    articles: articles,
                    books: books, // got boooks!
                    videos: videos
                });
            });
        });
    });
};