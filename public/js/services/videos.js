//Video service used for videos REST endpoint
angular.module('mean.videos').factory("Videos", ['$resource', function($resource) {
    return $resource('videos/:videoId', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);