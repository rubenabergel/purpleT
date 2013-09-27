angular.module('mean.profile')
.factory("Profile", ['$http', function($http) {
    return {
        get: function(cb) {
            return $http.get('/profile').success(cb)
        }
    };
}]);