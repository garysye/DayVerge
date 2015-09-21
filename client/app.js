angular.module('dayverge', [
  'dayverge.services',
  'dayverge.home',
  'ngRoute'
])
.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/home/home.html',
      controller: 'HomeController'
    })
    .otherwise({
      redirectTo: '/home',
    })
});
