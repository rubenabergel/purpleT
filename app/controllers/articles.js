/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Article = mongoose.model('Article'),
    _ = require('underscore'),
    Schema = mongoose.Schema,
    User = mongoose.model('User');


/**
 * Find article by id
 */
exports.article = function(req, res, next, id) {
    Article.load(id, function(err, article) {
        if (err) return next(err);
        if (!article) return next(new Error('Failed to load article ' + id));
        req.article = article;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var article = new Article(req.body);
    article.user = req.user;

    article.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                article: article
            });
        }
        else {
            res.jsonp(article);
        }
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var article = req.article;

    article = _.extend(article, req.body);

    article.save(function(err) {
        res.jsonp(article);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var article = req.article;

    article.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(article);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.article);
};

/**
 * List of Articles
 */

var findSubDomain = function(str){
    var q = str.split('.');
    if (q.length > 2 ){
        return q[0];
    }
};
// var s = findSubDomain(req.host);
    // console.log('find', findSubDomain(req.host), s);

exports.all = function(req, res) {
    console.log('findsub', findSubDomain(req.host));

    if (findSubDomain(req.host) !== undefined ){

    Article.getForUser(findSubDomain(req.host), function(err, articles){
        if(err) return res.render('error', { status: 500 });
        res.jsonp(articles);
    });


 } else { Article.findOne({'user': req.user.id },function (err, article) {
        console.log('inme');
    if(err) throw err;
    if(article){
        Article.find({'user': req.user.id }).sort('-created').populate('user').exec(function(err, articles) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log('oura');
            res.jsonp(articles);

        }
    });
    }else{
        console.log('not the right user');
    }
});
}
};


//     User.findOne({'lusername': findSubDomain(req.host) },function (err, user) {
//     if(err) throw err;
//     if(user){
//         Article.find().sort('-created').populate('user').exec(function(err, articles) {
//         if (err) {
//             res.render('error', {
//                 status: 500
//             });
//         } else {
//             res.jsonp(articles);
//         }
//     });
//     }else{
//         console.log('NOOOOOOOOOO');
//     }
// });
// };

//     Article.find().sort('-created').populate('user').exec(function(err, articles) {
//         if (err) {
//             res.render('error', {
//                 status: 500
//             });
//         } else {
//             res.jsonp(articles);
//         }
//     });
// };
