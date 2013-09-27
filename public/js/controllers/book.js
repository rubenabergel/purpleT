angular.module('mean.books')
  .controller('BooksController', ['$scope', '$routeParams', '$location', 'Global', 'Books','$http',
    function ($scope, $routeParams, $location, Global, Books, $http) {
    $scope.global = Global;

    $scope.create = function() {
        var book = new Books({
            title: this.title,
            content: this.content,
            author: this.author,
            thumbnail: this.thumbnail

        });
        book.$save(function(response) {
            $location.path("book/" + response._id);
        });

        this.title = "";
        this.content = "";
        this.author = "";
        this.thumbnail = "";
    };
    $scope.remove = function(book) {
        book.$remove();

        for (var i in $scope.books) {
            if ($scope.books[i] == book) {
                $scope.books.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var book = $scope.book;
        if (!book.updated) {
            book.updated = [];
        }
        book.updated.push(new Date().getTime());

        book.$update(function() {
            $location.path('books/' + book._id);
        });
    };

    $scope.find = function(query) {
        Books.query(query, function(books) {
            $scope.books = books;
        });
    };

    $scope.findOne = function() {
        Books.get({
            bookId: $routeParams.bookId
        }, function(book) {
            $scope.book = book;
        });
    };
    $scope.toggleTitleList = true;

    $scope.sendTitle = function(titleObj){
        $scope.title = titleObj.volumeInfo.title;
        $scope.name = titleObj.volumeInfo.authors[0];
        $scope.thumbnail = titleObj.volumeInfo.imageLinks.thumbnail;
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
                      console.log(data.items);
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

app.directive("quotepage", function(){
    return function(scope, element){
        element.on("click", function(){
            console.log('click');
        })
    }
})


