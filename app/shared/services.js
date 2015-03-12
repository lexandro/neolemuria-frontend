angular.module('services', [])

    .factory('Authentication', function ($resource, $rootScope) {
        entry = $resource($rootScope.host + '/authentication/accessTokens?username=tester&password=test1234', {});

        return entry;
    })
    .factory('Building', function ($resource, $rootScope) {
        return {
            all: function () {
                var buildings = $resource($rootScope.host + '/buildings', {});
                $rootScope.buildings = buildings;
                return buildings;
            }
        }
    })
    .factory('Country', function ($resource, $rootScope) {
        return {
            overview: function (token) {
                return $resource($rootScope.host + '/countries/:countryId/overview', {}, {
                    get: {
                        method: "GET",
                        isArray: false,
                        headers: {
                            'userToken': token
                        }
                    }
                });
            },
            buildings: function (token) {
                return $resource($rootScope.host + '/lands?countryId=:countryId', {}, {
                    query: {
                        method: "GET",
                        isArray: true,
                        headers: {
                            'userToken': token
                        }
                    }
                });
            },
            trainings: function (token) {
                return $resource($rootScope.host + '/trainings', {}, {
                    get: {
                        method: "GET",
                        isArray: true,
                        headers: {
                            'userToken': token
                        }
                    }
                });
            }
        }
    })
    .factory('Unit', function ($resource, $rootScope) {
        return {
            all: function () {
                return $resource($rootScope.host + '/units', {});
            }
        }
    })
    .factory('UnitType', function ($resource, $rootScope) {
        return {
            all: function () {
                var unitTypes = $resource($rootScope.host + '/unittypes', {});
                $rootScope.units = unitTypes;
                return unitTypes;
            }
        }
    })
;