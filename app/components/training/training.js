'use strict';

angular.module('training', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/training', {
            templateUrl: 'app/components/training/training.html',
            controller: 'TrainingCtrl'
        });
    }])

    .controller('TrainingCtrl', ['$rootScope', '$scope', '$location', 'Country', 'Unit', 'UnitType',
        function ($rootScope, $scope, $location, Country, Unit, UnitType) {
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
                        var trainings = Country.trainings(token.token).get({countryId: token.user.countryId}, function () {
                            $scope.trainings = trainings;
                            var maxLevel = 1;
                            var trainingLines = [];
                            $scope.unitTypes.forEach(function (unitType) {
                                var trainingLine = {};

                                function createTrainingLine(unitType, unit) {
                                    var result = {};
                                    result.unitType = unitType.name;
                                    result.name = unit.name;
                                    result.amount = 0;
                                    result.wounded = 0;
                                    result.priority = 0;
                                    trainingLines[trainingLines.length] = result;
                                    return result;
                                }

                                if (unitType.id > 0) {
                                    if (unitType.id < 7) {
                                        // military needs to be reversed and limited age and age-1
                                        $scope.units.slice().reverse().forEach(function (unit) {
                                            if (unit.unitType === unitType.name && (unit.level === maxLevel || unit.level === maxLevel - 1)) {
                                                trainingLine = createTrainingLine(unitType, unit);
                                            }
                                        })
                                    } else {
                                        // non-military is in normal order, without lower age restriction
                                        $scope.units.forEach(function (unit) {
                                            if (unit.unitType === unitType.name && unit.level <= maxLevel) {
                                                trainingLine = createTrainingLine(unitType, unit);
                                            }

                                        })
                                    }

                                }
                            });
                            $scope.trainingLines = trainingLines;
                        });
                    });
                });

            }
            $scope.unitFilter = function (unit) {
                return unit.level < 3;
            }


        }
    ])
;