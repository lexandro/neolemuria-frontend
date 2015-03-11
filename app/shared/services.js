angular.module('services', [])

    .factory('Authentication', function ($resource, $rootScope) {
        entry = $resource($rootScope.host + '/authentication/accessTokens?username=tester&password=test1234', {});

        return entry;
    })
    .factory('Country', function ($resource, $rootScope) {
        return {
            overview: function (token) {
                console.log("overview token: " + token);
                return $resource($rootScope.host + '/countries/:countryId/overview', {}, {
                    get: {
                        method: "GET",
                        isArray: false,
                        headers: {
                            'userToken': token
                        }
                    }
                });
            }
        }
    });