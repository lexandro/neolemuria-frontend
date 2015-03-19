'use strict';

angular.module('attack', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/attack', {
            templateUrl: 'app/components/attack/attack.html',
            controller: 'AttackCtrl'
        });
    }])

    .controller('AttackCtrl', ['$route', '$rootScope', '$scope', '$location', 'Country', 'Unit', 'UnitType',
        function ($route, $rootScope, $scope, $location, Country, Unit, UnitType) {
            console.log('attack');
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                console.log('attack enter');
            }

        }
    ])
;