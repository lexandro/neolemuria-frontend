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

                        var armies = Country.armies(token.token).get({countryId: token.user.countryId}, function () {

                            var trainings = Country.trainings(token.token).get({countryId: token.user.countryId}, function () {
                                $scope.trainings = trainings;
                                var maxLevel = 1;
                                var trainingLines = [];
                                $scope.unitTypes.forEach(function (unitType) {
                                    var trainingLine = {};

                                    function createTrainingLine(unitType, unit, trainings) {
                                        var result = {};
                                        result.unitType = unitType.name;
                                        result.unitId = unit.id;
                                        result.name = unit.name;
                                        result.armyAmount = 0;
                                        result.armyWounded = 0;
                                        result.amount = 0;
                                        result.priority = 0;
                                        //
                                        trainings.forEach(function (training) {
                                            if (training.unitId === unit.id) {
                                                result.amount = training.amount;
                                                result.priority = training.priority;
                                            }
                                        });

                                        armies.forEach(function (army) {
                                            if (army.unitId === unit.id) {
                                                result.armyAmount = army.amount;
                                                result.armyWounded = army.wounded;
                                            }

                                        });

                                        trainingLines[trainingLines.length] = result;
                                        return result;
                                    }

                                    if (unitType.id > 0) {
                                        if (unitType.id < 7) {
                                            // military needs to be reversed and limited age and age-1
                                            $scope.units.slice().reverse().forEach(function (unit) {
                                                if (unit.unitType === unitType.name && (unit.level === maxLevel || unit.level === maxLevel - 1)) {
                                                    trainingLine = createTrainingLine(unitType, unit, trainings);
                                                }
                                            })
                                        } else {
                                            // non-military is in normal order, without lower age restriction
                                            $scope.units.forEach(function (unit) {
                                                if (unit.unitType === unitType.name && unit.level <= maxLevel) {
                                                    trainingLine = createTrainingLine(unitType, unit, trainings);
                                                }

                                            })
                                        }

                                    }
                                });
                                $scope.trainingLines = trainingLines;
                            });
                        });
                    });
                });
            }
            ;


            $scope.updateTraining = function (trainingLines) {
                var trainingRequests = [];
                var cancelRequests = [];
                var dismountRequests = [];
                //
                trainingLines.forEach(function (trainingLine) {
                    if (hasTrueFlag("trainingFlag", trainingLine) && !hasTrueFlag("cancelFlag", trainingLine) && !hasTrueFlag("disbandFlag", trainingLine)) {
                        console.log("training " + trainingLine);
                    } else if (!hasTrueFlag("trainingFlag", trainingLine) && hasTrueFlag("cancelFlag", trainingLine) && !hasTrueFlag("disbandFlag", trainingLine)) {
                        console.log("cancel " + trainingLine);
                    } else if (!hasTrueFlag("trainingFlag", trainingLine) && !hasTrueFlag("cancelFlag", trainingLine) && hasTrueFlag("disbandFlag", trainingLine)) {
                        console.log("disband " + trainingLine);
                    } else {
                        console.log("error " + trainingLine);
                    }

                });

            }

            function hasTrueFlag(propertyName, object) {
                if (object.hasOwnProperty(propertyName) && object[propertyName] == true) {
                    return true;
                }
                return false;
            }


            $scope.unitFilter = function (unit) {
                return unit.level < 3;
            }


        }
    ])
;