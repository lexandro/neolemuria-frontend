angular.module('services', [])

    .factory('Authentication', function ($resource, $rootScope) {
        //entry = $resource('http://localhost:8080/authentication/accessTokens?username=tester&password=test1234', {});
        entry = $resource($rootScope.host + '/authentication/accessTokens?username=tester&password=test1234', {});

        return entry;
    })
    .factory('Country', function ($resource, $rootScope) {
        //entry = $resource('http://localhost:8080/countries/4/overview', {});
        entry = $resource($rootScope.host + '/countries/:countryId/overview', {}, {
            get: {
                method: 'GET',
                isArray: false,
                headers: {"userToken": $rootScope.token.token}
            }
        });
        return entry;
    });