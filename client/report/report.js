angular.module('dayverge.report', [])

.controller('ReportController', function ($scope, Yelp) {

  $scope.allLocations = Yelp.retrieveAllLocations();

})
