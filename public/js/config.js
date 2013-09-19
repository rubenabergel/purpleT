//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        
/////////////////////////////////////////

        when('/books', {
            templateUrl: 'views/books/list.html'
        }).
        when('/books/create', {
            templateUrl: 'views/books/create.html'
        }).
        when('/books/:bookId/edit', {
            templateUrl: 'views/books/edit.html'
        }).
        when('/books/:bookId', {
            templateUrl: 'views/books/view.html'
        }).
       

//////////////////////////////////////////////////
        when('/videos', {
            templateUrl: 'views/videos/list.html'
        }).

        when('/videos/create', {
            templateUrl: 'views/videos/create.html'
        }).
        when('/video/:videoId/edit', {
            templateUrl: 'views/videos/edit.html'
        }).
        when('/videos/:videoId', {
            templateUrl: 'views/videos/view.html'
        }).
////////////////////////////////////////////////////////////////////
        when('/profile', {
            templateUrl: 'views/profile/profile.html'
        }).

///////////////////////////////////////////////////////
        otherwise({
            redirectTo: '/'
        });
     }  

]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);