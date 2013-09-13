/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Book = mongoose.model('Book'),
    _ = require('underscore');


/**
 * Find book by id
 */
exports.book = function(req, res, next, id) {
    Book.load(id, function(err, book) {
        if (err) return next(err);
        if (!book) return next(new Error('Failed to load book ' + id));
        req.book = book;
        next();
    });
};

/**
 * Create a book
 */
exports.create = function(req, res) {
    var book = new Book(req.body);
    book.user = req.user;

    book.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                book: book
            });
        } 
        else {
            res.jsonp(book);
        }
    });
};

/**
 * Update a book
 */
exports.update = function(req, res) {
    var book = req.book;

    book = _.extend(book, req.body);

    book.save(function(err) {
        res.jsonp(book);
    });
};

/**
 * Delete an book
 */
exports.destroy = function(req, res) {
    var book = req.book;

    book.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(book);
        }
    });
};

/**
 * Show an book
 */
exports.show = function(req, res) {
    res.jsonp(req.book);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user').exec(function(err, books) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(books);
        }
    });
};

