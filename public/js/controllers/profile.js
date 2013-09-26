angular.module('mean.profile')
  .controller('ProfileController', ['$scope', '$routeParams', '$location', 'Global','$http',
    function ($scope, $routeParams, $location, Global, Profile, Books, Videos, Articles,  $http) {
//    $scope.global = Global;
    $scope.profile = Profile.get();
}]);

