angular.module('dayverge.services', [])

.factory('Yelp', function ($http) {
  var locationTree = new Arboreal();
  var currentLevel = 0;
  var lastLocations = [];

  var searchYelp = function (location, term, coords) {
    var method = 'GET';
    var url = 'http://api.yelp.com/v2/search?callback=JSON_CALLBACK';
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

    if (coords) {
      params['cll'] = coords.latitude + ',' + coords.longitude;
    }

    var signature = oauthSignature.generate(method, url, params, oauth.consumerSecret, oauth.tokenSecret, {encodeSignature: false});
    params['oauth_signature'] = signature;
      


    return $http.jsonp(url, {params: params})
      .then(function (resp) {
       return formatResults(resp.data);
      })
      .catch(function (err) {
        console.log(err);
      })
  };

  var formatResults = function (data) {
    var businesses = data.businesses;
    return _.map(businesses, function(business) {
      return {
        name: business.name,
        address: business.location.display_address,
        streetAddr: business.location.address[0],
        rating: business.rating,
        coords: business.location.coordinate,
        distance: business.distance || 0
      };
    });
  };

  var continueAndSave = function (locationsObj) {
    lastLocations = [];
    var root;
    var newKey;
    _.each(locationsObj, function (locations, key) {
      root = locationTree.find(key);
      _.each(locations, function (location) {
        newKey = key + '/' + root.children.length;
        root.appendChild(location);
        lastLocations.push(locationTree.find(newKey));
      })

    });
    currentLevel++;
  }

  var retrieveLocations = function(id) {
    return _.map(lastLocations, function (location) {
      return location;
    });
  }

  var retrieveAllLocations = function() {
    var allLocations = [];
    var currentBranch = [];

    var traverseTree = function (tree) {
      if(tree.id !== '0') {
        currentBranch.push(tree);
      }
      if( tree.children.length === 0 ) {
        allLocations.push(currentBranch.slice());
      } else {
        for( var i = 0; i < tree.children.length; i++ ) {
          traverseTree(tree.children[i]);
          currentBranch.pop();
        }
      }
    }

    traverseTree(locationTree);
    return allLocations;
  }

  return {
    searchYelp: searchYelp,
    continueAndSave: continueAndSave,
    retrieveLocations: retrieveLocations,
    retrieveAllLocations: retrieveAllLocations
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
