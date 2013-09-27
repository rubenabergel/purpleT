/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Book = mongoose.model('Book'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    User = mongoose.model('User');


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

var findSubDomain = function(str){
    var q = str.split('.');
    if (q.length > 2 ){
        return q[0];
    }
};
/**
 * List of Articles
 */
exports.all = function(req, res) {
    console.log('findsub', findSubDomain(req.host));

    if (findSubDomain(req.host) !== undefined ){

    Book.getForUser(findSubDomain(req.host), function(err, books){
        if(err) return next(err);
        res.jsonp(books);
    });


 } else { Book.findOne({'user': req.user.id },function (err, book) {
        console.log('inme');
    if(err) throw err;
    if(book){
        Book.find({'user': req.user.id }).sort('-created').populate('user').exec(function(err, books) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log('oura');
            res.jsonp(books);

        }
    });
    }else{
        console.log('not the right user');
    }
});
}
};

//     Book.getForUser(findSubDomain(req.host), function(err, books){
//         if(err) return next(err);
//         res.jsonp(books);
//     });
// };

// exports.all = function(req, res) {
//     var subdomain = findSubDomain(req.host);
//     User.findOne({'lusername': subdomain }, function (err, user) {
//         if(err) throw err;
//         if(!user) return res.send(404, 'That user dones\'t exist');
//         Book.find({'user': user.id }).sort('-created').populate('user').exec(function(err, books) {
//             if (err) return res.render('error', { status: 500 });
//             else return res.jsonp(books);
//         });
//     });
// };

