'use strict';

angular.module('construction', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/construction', {
            templateUrl: 'app/components/construction/construction.html',
            controller: 'ConstructionCtrl'
        });
    }])

    .controller('ConstructionCtrl', ['$route', '$rootScope', '$scope', '$location', 'Country', 'Unit', 'UnitType',
        function ($route, $rootScope, $scope, $location, Country, Unit, UnitType) {
            console.log('construction');
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                console.log('construction enter');
            }

        }
    ])
;