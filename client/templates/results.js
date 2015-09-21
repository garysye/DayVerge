angular.module('dayverge.results', [])

.controller('ResultsController', function ($scope) {
  var idArray = $scope.locationId.split('/');
  $scope.localId = idArray[idArray.length - 1];

  $scope.savedResults = [];

  $scope.addResult = function(result) {
    $scope.savedResults.push(result);
  }
})
