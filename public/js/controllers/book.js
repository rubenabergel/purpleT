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


    $scope.searchbooks = [];

    $scope.$watch('title', function(newval) {
        if (newval) {
            $http({
                method: 'JSONP',
                url: 'https://www.googleapis.com/books/v1/volumes?q=' +$scope.title+'&callback=JSON_CALLBACK&key=AIzaSyAHGLwa31f78oh9ogWsGZbN2eMl-Dp1mmY'
            }).success(function(data, status, headers, config) {
                        console.log('args: ', arguments);

                // if (data.items) {
                //     for( var i = 0; i<data.items.length; i++){
                //     console.log(data.items[i].volumeInfo.title);
                    //  console.log(data.items[i].volumeInfo.authors[0]);
                      $scope.bookTitleInfo = data.items;
                      //$scope.bookAuthorInfo = data.items[i].volumeInfo.authors[0];
                      console.log($scope.bookinfo);
                // } else { console.log('no items!');
           // console.log(data.items);
            }).error(function(data, status, headers, config) {
                        console.log('ERROR', arguments);

            });
        }
    });

}]);