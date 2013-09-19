angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.menu = [{
        "title": "Articles",
        "link": "articles"
    }, {

        "title": "Create New Article",
        "link": "articles/create"
    }, {
        "title": "Add a book",
        "link": "books/create"
    }, {
        "title": "Add a video",
        "link": "videos/create"
    }, {
        "title": "Books",
        "link": "books"
    }, {
        "title": "Videos",
        "link": "videos"
    },  {
        "title": "ProfileWall",
        "link": "profile"
    }];
}]);