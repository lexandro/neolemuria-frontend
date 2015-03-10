angular.module('services', [])

    .factory('Authentication', function ($resource, $rootScope) {
        entry = $resource($rootScope.host + '/authentication/accessTokens?username=tester&password=test1234', {});

        return entry;
    })
    .factory('Country', function ($resource, $rootScope) {
        entry = $resource($rootScope.host + '/countries/:countryId/overview', {}, {
            get: {
                method: "GET",
                isArray: false,
                headers: {
                    'userToken': function ($rootScope) {
                        console.log("$rootScope: " + JSON.stringify($rootScope));
                        return '1';
                    }
                }
            }
        });
        return entry;
    });