angular.module('services', [])

    .factory('Authentication', function ($resource, $rootScope) {
        entry = $resource($rootScope.host + '/authentication/accessTokens?username=:username&password=:password', {});

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
            armies: function (token) {
                return $resource($rootScope.host + '/armies', {}, {
                    get: {
                        method: "GET",
                        isArray: true,
                        headers: {
                            'userToken': token
                        }
                    },
                    disband: {
                        method: "POST",
                        isArray: true,
                        headers: {
                            'userToken': token
                        }
                    }
                });
            },
            constructions: function (token) {
                return $resource($rootScope.host + '/constructions/:buildingId', {}, {
                    query: {
                        method: "GET",
                        isArray: true,
                        headers: {
                            'userToken': token
                        }
                    },
                    save: {
                        method: "POST",
                        isArray: true,
                        headers: {
                            'userToken': token
                        }
                    },
                    cancel: {
                        method: "DELETE",
                        isArray: false,
                        headers: {
                            'userToken': token
                        }
                    }
                });
            },
            lands: function (token) {
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
                return $resource($rootScope.host + '/trainings/:unitId', {}, {
                    query: {
                        method: "GET",
                        isArray: true,
                        headers: {
                            'userToken': token
                        }
                    },
                    save: {
                        method: "POST",
                        isArray: true,
                        headers: {
                            'userToken': token
                        }
                    },
                    cancel: {
                        method: "DELETE",
                        isArray: false,
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