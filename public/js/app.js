window.app = angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ui.bootstrap',
  'ui.route',
  'mean.system',
  'mean.articles',
  'mean.books'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.books', []);