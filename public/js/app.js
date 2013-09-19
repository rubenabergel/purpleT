window.app = angular.module('mean', [
  'ngCookies',
  'ngResource',
  'ui.bootstrap',
  'ui.route',
  'mean.system',
  'mean.articles',
  'mean.books',
  'mean.videos',
  'mean.profile'
]);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.books', []);
angular.module('mean.videos', []);
angular.module('mean.profile', []);