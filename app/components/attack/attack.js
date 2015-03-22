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
                var units = Unit.all().query(function () {
                    $rootScope.units = units;
                    $scope.units = $rootScope.units;
                    var unitTypes = UnitType.all().query(function () {
                        $scope.unitTypes = unitTypes;
                        $rootScope.unitTypes = unitTypes;
                        var token = $rootScope.token;
                        var armies = Country.armies(token.token).get(function () {


                        });
                    });
                });

            }

        }
    ]);