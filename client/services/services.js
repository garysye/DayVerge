angular.module('dayverge.services', [])

.factory('Yelp', function ($http) {
  var searchResults = [];

  var searchYelp = function (location, term) {
    var method = 'GET';
    var url = 'http://api.yelp.com/v2/search';
    var params = {
      term: term,
      location: location,
      oauth_consumer_key: oauth.consumerKey,
      oauth_token: oath.token,
      oauth_signature_method: 'HMAC-SHA1',
      oauth_timestamp: new Date().getTime(),
      oauth_nonce: Math.round((new Date()).getTime() / 1000.0),
      callback: 'angular.callbacks._0'
    };
    var signature = oauthSignature.generate(method, url, params, oauth.consumerSecret, oauth.tokenSecret, {encodeSignature: false});
    params['oauth_signature'] = signature;
    
    return $http.jsonp(url, {params: params})
      .then(function (resp) {
       return formatResults(resp.data);
      });
  };

  var formatResults = function(data) {
    var businesses = data.businesses;
    _.map(businesses, function(business) {
      return {
        name: name,
        location: business.location
      };
    });
  };

  return {
    searchYelp: searchYelp
  };
})

.factory('Results', function () {
  var data = [];

  var storeResults = function (results) {
    data.push(results);
  };

  var getLastResults = function() {
    return data[data.length - 1];
  };

  return {
    storeResults: storeResults,
    getLastResults: getLastResults
  }
});
