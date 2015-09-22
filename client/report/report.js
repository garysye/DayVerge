angular.module('dayverge.report', [])

.controller('ReportController', function ($scope, Yelp) {

  $scope.allLocations = Yelp.retrieveAllLocations();
  console.log($scope.allLocations);

})
