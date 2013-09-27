/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Video = mongoose.model('Video'),
    _ = require('underscore');
        Schema = mongoose.Schema,
    User = mongoose.model('User');


/**
 * Find video by id
 */
exports.video = function(req, res, next, id) {
    Video.load(id, function(err, video) {
        if (err) return next(err);
        if (!video) return next(new Error('Failed to load video ' + id));
        req.video = video;
        next();
    });
};

/**
 * Create a video
 */
exports.create = function(req, res) {
    var video = new Video(req.body);
    video.user = req.user;

    video.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                video: video
            });
        }
        else {
            res.jsonp(video);
        }
    });
};

/**
 * Update a video
 */
exports.update = function(req, res) {
    var video = req.video;

    video = _.extend(video, req.body);

    video.save(function(err) {
        res.jsonp(video);
    });
};

/**
 * Delete an video
 */
exports.destroy = function(req, res) {
    var video = req.video;

    video.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(video);
        }
    });
};

/**
 * Show an video
 */
exports.show = function(req, res) {
    res.jsonp(req.video);
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
exports.all = function(req, res) {
    console.log('findsub', findSubDomain(req.host));

    if (findSubDomain(req.host) !== undefined ){

    Video.getForUser(findSubDomain(req.host), function(err, videos){
        if(err) return res.render('error', { status: 500 });
        res.jsonp(videos);
    });


 } else { Video.findOne({'user': req.user.id },function (err, video) {
        console.log('inme');
    if(err) throw err;
    if(video){
        Video.find({'user': req.user.id }).sort('-created').populate('user').exec(function(err, videos) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log('oura');
            res.jsonp(videos);

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







//     Video.findOne({'user': req.user.id },function (err, video) {
//         console.log('inme');
//     if(err) throw err;
//     if(video){
//         Video.find({'user': req.user.id }).sort('-created').populate('user').exec(function(err, videos) {
//         if (err) {
//             res.render('error', {
//                 status: 500
//             });
//         } else {
//             console.log('oura');
//             res.jsonp(videos);

//         }
//     });
//     }else{
//         console.log('not the right user');
//     }
// });
// };