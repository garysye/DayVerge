angular.module('dayverge.locations', [])

.controller('LocationController', function ($scope, Yelp) {
  $scope.localId = $scope.location.id;
  // $scope.localId = idArray[idArray.length - 1];

  $scope.searchResults = [];
  $scope.savedResults = [];
  $scope.allSavedResults[$scope.localId] = $scope.savedResults;

  $scope.addResult = function(result) {
    $scope.savedResults.push(result);
    console.log($scope.allSavedResults);
    for( var i = 0; i < $scope.searchResults.length; i++ ) {
      if( $scope.searchResults[i] === result ) {
        $scope.searchResults.splice(i, 1);
        return;
      }
    }
  };


  $scope.removeResult = function(result) {
    $scope.searchResults.push(result);
    for( var i = 0; i < $scope.savedResults.length; i++ ) {
      if( $scope.savedResults[i] === result ) {
        $scope.savedResults.splice(i, 1);
        return;
      }
    }
  };

  $scope.$on('locationSubmit', function (event) {
    Yelp.searchYelp($scope.location.data.address.join(', '), $scope.searchTerm, $scope.location.data.coords).then(function (data) {
      $scope.searchResults = data;
    })
  });

})

