angular.module('mean.books')
  .controller('BooksController', ['$scope', '$routeParams', '$location', 'Global', 'Articles','$http',  
    function ($scope, $routeParams, $location, Global, Books, $http) {
    $scope.global = Global;

    $scope.create = function() {
        var book = new Books({
            title: this.title,
            content: this.content
        });
        book.$save(function(response) {
            $location.path("articles/" + response._id);
        });

        this.title = "";
        this.content = "";
    };
    $scope.toggleTitleList = true;

    $scope.sendTitle = function(titleObj){
        $scope.title = titleObj.volumeInfo.title;
        $scope.toggleTitleList = false;
    };
    //listen to select event
    $scope.searchbooks = [];
    $scope.$watch('title', function(newval) {
        if (newval) {
            $http({
                method: 'JSONP',
                url: 'https://www.googleapis.com/books/v1/volumes?q=' +$scope.title+'&callback=JSON_CALLBACK&key=AIzaSyAHGLwa31f78oh9ogWsGZbN2eMl-Dp1mmY'
            }).success(function(data, status, headers, config) {
               if ($scope.toggleTitleList === false){
                $scope.toggleTitleList = false;
               } else {
                $scope.toggleTitleList = true;
               }
               if ( newval !== $scope.title ){
                $scope.toggleTitleList = true;
               }
                      //  console.log(data.items);
                      $scope.bookTitleInfo = data.items;
            }).error(function(data, status, headers, config) {
                    //    console.log('ERROR', arguments);
            });
        }
    });
}]);
app.directive("enter", function(){
    return function(scope, element){
        element.on("mouseenter", function(){
          element.css('background', 'orange');
          element.css('color', 'blue');
        });
    };
});
app.directive("leave", function(){
    return function(scope, element){
        element.on("mouseleave", function(){
          element.css('background', '#fff');
          element.css('color', 'black');

        });
    };
});


