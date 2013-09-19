/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.send(401, 'User is not authorized');
    }
    next();   
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};

/**
 * Article authorizations routing middleware
 */
exports.article = {
    hasAuthorization: function(req, res, next) {
        if (req.article.user.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};
exports.book = {
    hasAuthorization: function(req, res, next) {
        if (req.book.user.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};

exports.video = {
    hasAuthorization: function(req, res, next) {
        if (req.video.user.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};
