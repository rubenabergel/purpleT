var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);
    
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);
//####################################################################

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);
    
    //Finish with setting up the articleId param
    app.param('articleId', articles.article);

//########################################################################

    //Books Routes
    var books = require('../app/controllers/books');
    app.get('/books', books.all);
    app.post('/books', auth.requiresLogin, books.create);
    app.get('/books/:bookId', books.show);
    app.put('/books/:bookId', auth.requiresLogin, auth.book.hasAuthorization, books.update);
    app.del('/books/:bookId', auth.requiresLogin, auth.book.hasAuthorization, books.destroy);

    //Finish with setting up the bookId param
    app.param('bookId', books.book);

//########################################################################
    
    //Video Routes
    var videos = require('../app/controllers/videos');
    app.get('/videos', videos.all);
    app.post('/videos', auth.requiresLogin, videos.create);
    app.get('/videos/:videoId', videos.show);
    app.put('/videos/:videoId', auth.requiresLogin, auth.video.hasAuthorization, videos.update);
    app.del('/videos/:videoId', auth.requiresLogin, auth.video.hasAuthorization, videos.destroy);

    //Finish with setting up the bookId param
    app.param('videoId', videos.video);

////////////////////////////////////////////////////////////////////////////
     var profile = require('../app/controllers/profile');
     app.get('/profile');
    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);

};