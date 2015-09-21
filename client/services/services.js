angular.module('dayverge.services', [])

.factory('Yelp', function ($http) {
  var locationTree = new Arboreal();
  var currentLevel = 0;
  var lastLocations = [];

  var searchYelp = function (location, term) {
    var method = 'GET';
    var url = 'http://api.yelp.com/v2/search';
    var params = {
      term: term,
      location: location,
      oauth_consumer_key: oauth.consumerKey,
      oauth_token: oauth.token,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: new Date().getTime(),
      oauth_nonce: Math.round((new Date()).getTime() / 1000.0),
      callback: 'angular.callbacks._0'
    };
    var signature = oauthSignature.generate(method, url, params, oauth.consumerSecret, oauth.tokenSecret, {encodeSignature: false});
    params['oauth_signature'] = signature;
    console.log('tik tok');
    
    return $http.jsonp(url, {params: params})
      .then(function (resp) {
        console.log('chugga chugga');
       return formatResults(resp.data);
      });
  };

  var formatResults = function (data) {
    var businesses = data.businesses;
    return _.map(businesses, function(business) {
      return {
        name: business.name,
        address: business.location.display_address,
        streetAddr: business.location.address[0]
      };
    });
  };

  var continueAndSave = function (locations, id) {
    id = id || '0';
    var node = locationTree.find(id) || locationTree;
    _.each(locations, function (location) {
      node.appendChild(location);
    });
  }

  var retrieveLocations = function(id) {
    id = id || '0';
    return _.map(locationTree.find(id).children, function (node) {
      return node.data;
    });
  }

  return {
    searchYelp: searchYelp,
    continueAndSave: continueAndSave,
    retrieveLocations: retrieveLocations
  };
})

// .factory('Results', function () {
//   var data = [];

//   var storeResults = function (results) {
//     data.push(results);
//   };

//   var getLastResults = function() {
//     return data[data.length - 1];
//   };

//   return {
//     storeResults: storeResults,
//     getLastResults: getLastResults,
//   }
// });
