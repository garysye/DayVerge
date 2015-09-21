angular.module('dayverge.home', [])

.controller('HomeController', function ($scope, $location, Yelp) {
  $scope.savedLocations = [];

  $scope.handleSubmit = function (params) {
    console.log('beep boop');
    Yelp.searchYelp(params.location, params.term).then(function(data) {
      $scope.searchResults = data.slice(0,4);
      console.log($scope.searchResults);
    });
  };

  $scope.addResult = function(result) {
    $scope.savedLocations.push(result);
  }

  $scope.removeLoc = function(location) {
    for( var i = 0; i < $scope.savedLocations.length; i++ ) {
      if( $scope.savedLocations[i] === location ) {
        $scope.savedLocations.splice(i, 1);
        break;
      }
    } 
  }

  $scope.continue = function() {
    console.log('yippee');
    Yelp.continueAndSave($scope.savedLocations);
    $location.url('/verge')
  }

});
