angular.module('neoLemuriaApp.services', [])

    .factory('Authentication', function ($resource) {
        //entry = $resource('http://localhost:8080/authentication/accessTokens?username=tester&password=test1234', {});
        entry = $resource('http://neolemuria.com:8080/authentication/accessTokens?username=tester&password=test1234', {});

        return entry;
    });