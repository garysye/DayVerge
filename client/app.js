angular.module('dayverge', [
  'dayverge.services',
  'dayverge.home',
  'dayverge.verge',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/home/home.html',
      controller: 'HomeController'
    })
    .when('/verge', {
      templateUrl: '/verge/verge.html',
      controller: 'VergeController'
    })
    .otherwise({
      redirectTo: '/home',
    })
});
