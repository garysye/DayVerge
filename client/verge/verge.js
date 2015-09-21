angular.module('dayverge.verge', [])

.controller('VergeController', function($scope, Yelp) {
  $scope.savedLocations = Yelp.retrieveLocations();



}); 
