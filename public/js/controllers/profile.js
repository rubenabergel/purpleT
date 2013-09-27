
angular.module('mean.profile').controller('ProfileController', ['$scope', '$routeParams', '$location', 'Global', 'Articles', 'Books', 'Profile', '$http',  function ($scope, $routeParams, $location, Global, Articles, Profile, $http) {
    $scope.global = Global;


    $scope.create = function() {
        var article = new Articles({
            title: this.title,
            content: this.content,
            url: this.url
        });
        article.$save(function(response) {
            $location.path("articles/" + response._id);
        });

        this.title = "";
        this.content = "";
        this.url = "";
    };

    $scope.remove = function(article) {
        article.$remove();

        for (var i in $scope.articles) {
            if ($scope.articles[i] == article) {
                $scope.articles.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article._id);
        });
    };

    $scope.find = function(query) {
        Profile.get(function(profile){
            // we WANT profile to be an object has of { books, articles, videos}
            $scope.profile = profile;
        });
    };

    $scope.findOne = function() {
        // Articles.get({
        //     articleId: $routeParams.articleId
        // }, function(article) {
        //     $scope.article = article;
        // });
    };

    $scope.sendArticleinfo = function(url){
    $scope.url = video.url;
    };



}]);
