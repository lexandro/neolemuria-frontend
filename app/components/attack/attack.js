'use strict';

angular.module('attack', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/attack', {
            templateUrl: 'app/components/attack/attack.html',
            controller: 'AttackCtrl'
        });
    }])

    .controller('AttackCtrl', ['$route', '$rootScope', '$scope', '$location', 'Country',
        function ($route, $rootScope, $scope, $location, Country) {
            console.log('attack');
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                $scope.units = $rootScope.units;
                $scope.unitTypes = $rootScope.unitTypes;
                var token = $rootScope.token;

                var armies = Country.armies(token.token).get(function () {
                    var attackArmies = [];
                    $scope.unitTypes.forEach(function (unitType) {
                        // http://stackoverflow.com/questions/6298169/how-to-create-a-map-object-in-a-javascript
                        //    map-es megoldast a dictionarykra

                    });
                });
            }
        }
    ]);