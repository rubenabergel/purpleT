angular.module('mean.videos')
  .controller('VideosController', ['$scope', '$routeParams', '$location', 'Global', 'Videos','$http',  
    function ($scope, $routeParams, $location, Global, Videos, $http) {
    $scope.global = Global;

    $scope.create = function() {
        var video = new Videos({
            title: this.title,
            content: this.content
            url = this.url
        });
        video.$save(function(response) {
            $location.path("videos/" + response._id);
        });

        this.title = "";
        this.content = "";
        this.url = "";
    };


    $scope.remove = function(video) {
        video.$remove();  

        for (var i in $scope.videos) {
            if ($scope.videos[i] == video) {
                $scope.videos.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var video = $scope.video;
        if (!video.updated) {
            video.updated = [];
        }
        video.updated.push(new Date().getTime());

        video.$update(function() {
            $location.path('videos/' + video._id);
        });
    };

    $scope.find = function(query) {
        Videos.query(query, function(videos) {
            $scope.videos = videos;
        });
    };

    $scope.findOne = function() {
        Videos.get({
            videoId: $routeParams.videoId
        }, function(video) {
            $scope.video = video;
        });
    };

    $scope.findYid = function(url){
       var result;
       for ( char in url){
         if ( char = "=" ){
            result = url.slice(0, char);
                console.log("1", result);

        }
    }return result;
    console.log("2", result);

    };


}]);


