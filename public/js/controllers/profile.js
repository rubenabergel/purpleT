angular.module('mean.profile')
  .controller('ProfileController', ['$scope', '$routeParams', '$location', 'Global', 'Profile','$http',  
    function ($scope, $routeParams, $location, Global, Profile, $http) {
    $scope.global = Global;
    $scope.profile = {
        books: Books.all(),
        articles: Articles.all(),
        videos: Videos.all()
    };
}]);
