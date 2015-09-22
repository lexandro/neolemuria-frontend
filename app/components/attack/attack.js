'use strict';

angular.module('attack', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/attack', {
            templateUrl: 'app/components/attack/attack.html',
            controller: 'AttackCtrl'
        });
    }])

    .controller('AttackCtrl', ['$route', '$rootScope', '$scope', '$location', 'Helpers', 'Attack', 'Country',
        function ($route, $rootScope, $scope, $location, Helpers, Attack, Country) {
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                var units = $scope.units = $rootScope.units;
                var unitTypes = $scope.unitTypes = $rootScope.unitTypes;
                var token = $rootScope.token;

                var armies = Country.armies(token.token).get(function () {
                    console.log(JSON.stringify(armies));
                    var attackArmies = [];
                    var homeArmies = [];
                    unitTypes.forEach(function (unitType) {
                        var homeArmy = {};
                        var homeArmy = getArmyByUnitType(armies, unitType.id);
                        if (homeArmy != null) {
                            homeArmies.push(homeArmy);
                        }
                    });
                    $scope.homeArmies = homeArmies;
                });
            }

            $scope.prepareAttack = function () {
                var prepareAttackRequest = {};
                console.log($rootScope.token.user.countryId);
                console.log($rootScope.token);
                prepareAttackRequest.senderCountryId = $rootScope.token.user.countryId;
                prepareAttackRequest.targetCountryId = $scope.prepareTargetCountryId;
                prepareAttackRequest.attackTypeId = $scope.prepareAttackTypeId;
                var homeArmies = $scope.homeArmies;
                var preparedArmies = [];
                homeArmies.some(function (homeArmy) {
                    var preparedArmy = {};
                    if (!Helpers.isEmpty(homeArmy.prepared)) {
                        preparedArmy.unitId = homeArmy.unitId;
                        preparedArmy.amount = homeArmy.prepared;
                        preparedArmies.push(preparedArmy);
                    }
                });
                prepareAttackRequest.armyRequestList = preparedArmies;
                console.log(JSON.stringify(prepareAttackRequest));
                var aaa = Attack.attack($rootScope.token.token).prepare(prepareAttackRequest, function () {
                    console.log(JSON.stringify(aaa));
                })
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
    ])
;