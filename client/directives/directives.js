angular.module('dayverge.directives', [])

.directive('resultsList', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/results.html'
  };
})
.directive('locationBox', function () {
  return {
    restrict: 'E',
    templateUrl: 'templates/location.html'
  };
})
.directive('locationReport', function () {
  return {
    restrict: 'E',
    templateUrl: 'report/locationReport.html'
  }
})
