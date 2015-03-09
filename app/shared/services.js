angular.module('neoLemuriaApp.services', [])

    .factory('Authentication', function ($resource, $http) {
        return $resource('http://neolemuria.com:8080/authentication/accessTokens', {});
    });