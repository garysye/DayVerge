angular.module('dayverge.report', [])

.controller('ReportController', function ($scope, Yelp) {

  $scope.allLocations = Yelp.retrieveAllLocations();
  $scope.distances = _.map($scope.allLocations, function (locationSet) {
    return _.reduce(locationSet, function (memo, node) {
      return memo + node.data.distance;
    }, 0)
  });
  console.log('scope distances here');
  console.log($scope.distances)

  $scope.name = 'hi how you are you'

})
