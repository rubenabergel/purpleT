angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.menu = [{
        "title": "Profile",
        "link": "profile"
    }, {

        "title": "Books",
        "link": "books"
    }, {
        "title": "Videos",
        "link": "videos"
    }, {
        "title": "Articles",
        "link": "articles"
    }, {
        "title": "Add a book",
        "link": "books/create"
    }, {
        "title": "Add a video",
        "link": "videos/create"
    },  {
        "title": "Add an article",
        "link": "articles/create"
    }];
}]);


