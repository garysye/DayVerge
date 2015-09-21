angular.module('dayverge.home', [])

.controller('HomeController', function ($scope, Yelp) {
  $scope.searchResults = [];

  $scope.handleSubmit = function (params) {
    console.log('beep boop');
    Yelp.searchYelp(params.location, params.term).then(function(data) {
      console.log(data);
      $scope.searchResults = data;
    });
  };

})
