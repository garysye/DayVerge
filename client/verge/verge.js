angular.module('dayverge.verge', [])

.controller('VergeController', function($scope, $location, $state, Yelp) {
  $scope.savedLocations = Yelp.retrieveLocations();

  $scope.allSavedResults = {};

  $scope.handleSubmit = function () {
    $scope.$broadcast('locationSubmit');
  }

  $scope.handleContinue = function () {
    Yelp.continueAndSave($scope.allSavedResults);
    // $location.url('/continue');
    $state.reload();
  }

  $scope.handleFinish = function () {
    // Yelp.continueAndSave($scope.allSavedResults);
    $state.go('report');
  }

}); 
