angular.module('dayverge', [
  'dayverge.services',
  'dayverge.home',
  'dayverge.verge',
  'dayverge.locations',
  'dayverge.directives',
  'dayverge.report',
  'ui.router',
  'ui.bootstrap'
])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider
    .when('/continue', '/verge')
    .otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home/home.html',
      controller: 'HomeController'
    })
    .state('verge', {
      url: '/verge',
      templateUrl: '/verge/verge.html',
      controller: 'VergeController'
    })
    // .state('continue', {
    //   url: '/continue',
    //   redirectTo: 'verge'
    // })
    .state('report', {
      url: '/report',
      templateUrl: '/report/report.html',
      controller: 'ReportController'
    })
});
