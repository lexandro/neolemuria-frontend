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
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                var units = $scope.units = $rootScope.units;
                var unitTypes = $scope.unitTypes = $rootScope.unitTypes;
                var token = $rootScope.token;

                var armies = Country.armies(token.token).get(function () {
                    var attackArmies = [];
                    var homeArmies = [];
                    unitTypes.forEach(function (unitType) {
                        var homeArmy = {};
                        var homeArmy = getArmyByUnitType(armies, unitType.id);
                        if (homeArmy != null) {
                            console.log(JSON.stringify(homeArmy));
                            // http://stackoverflow.com/questions/6298169/how-to-create-a-map-object-in-a-javascript
                            //    map-es megoldast a dictionarykra
                            homeArmies.push(homeArmy);
                        }
                    });
                    $scope.homeArmies = homeArmies;
                });
            }

            $scope.prepareAttack = function () {
                console.log('Click');
            };

            function getArmyByUnitType(armies, unitTypeId) {
                var result = null;
                armies.some(function (army) {
                    var unit = getUnitById(army.unitId);
                    var unitType = getUnitTypeByName(unit.unitType);
                    if (unitType != null && unitType.id == unitTypeId) {
                        result = {};
                        result.id = army.id;
                        result.unitId = army.unitId;
                        result.unitTypeId = unitType.id;

                        result.name = unit.name;
                        result.amount = army.amount;
                        result.wounded = army.wounded;
                        result.resting = -1;
                        result.prepared = '';
                        return true;
                    }
                });
                return result;
            }

            function getUnitById(unitId) {
                var units = $rootScope.units;
                var result = null;
                units.some(function (unit) {
                    if (unit.id == unitId) {
                        result = unit;
                        return true;
                    }
                });
                return result;
            }

            function getUnitTypeById(unitTypeId) {
                var unitTypes = $rootScope.unitTypes;
                var result = null;
                unitTypes.some(function (unitType) {
                    if (unitType.id == unitTypeId) {
                        result = unitType;
                        return true;
                    }
                });
                return result;
            }

            function getUnitTypeByName(unitTypeName) {
                var unitTypes = $rootScope.unitTypes;
                var result = null;
                unitTypes.some(function (unitType) {
                    if (unitType.name == unitTypeName) {
                        result = unitType;
                        return true;
                    }
                });
                return result;
            }
        }
    ]);