'use strict';

angular.module('discovery', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/discovery', {
            templateUrl: 'app/components/discovery/discovery.html',
            controller: 'DiscoveryCtrl'
        });
    }])

    .controller('DiscoveryCtrl', ['$route', '$rootScope', '$scope', '$location', 'Country', 'Unit', 'UnitType',
        function ($route, $rootScope, $scope, $location, Country, Unit, UnitType) {
            console.log('discovery');
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                console.log('discovery enter');
            }

        }
    ])
;