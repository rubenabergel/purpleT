/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    User = require('./user.js'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
ArticleSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    },
    getForUser: function(username, cb){
        User.findOne({'lusername': username }, function (err, user) {
            if(err) return cb(err);
            if(user) Article.find({'user': user.id }).sort('-created').populate('user').exec(cb);
            else return cb(new Error('no user found with that name ' + username));
        });
    }
};

var Article = mongoose.model('Article', ArticleSchema);
module.exports = Article;