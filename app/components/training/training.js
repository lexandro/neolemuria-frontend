'use strict';

angular.module('training', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/training', {
            templateUrl: 'app/components/training/training.html',
            controller: 'TrainingCtrl'
        });
    }])

    .controller('TrainingCtrl', ['$route', '$rootScope', '$scope', '$location', 'Country', 'Unit', 'UnitType',
        function ($route, $rootScope, $scope, $location, Country, Unit, UnitType) {
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

                            var trainings = Country.trainings(token.token).query(function () {
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
                                        result.disbandAmount = "";
                                        //
                                        trainings.forEach(function (training) {
                                            if (training.unitId === unit.id) {
                                                result.amount = training.amount;
                                                result.priority = training.priority;
                                                result.mode = training.mode;
                                                result.status = training.status;
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

            $scope.updateTraining = function () {
                var trainingRequests = [];
                var cancelRequests = [];
                var disbandRequests = [];
                var trainingLines = $scope.trainingLines;
                //
                trainingLines.forEach(function (trainingLine) {
                        if (hasTrueFlag(trainingLine, "trainingFlag") && !hasTrueFlag(trainingLine, "cancelFlag") && !hasTrueFlag(trainingLine, "disbandFlag")) {
                            var trainingRequest = {};
                            trainingRequest.unitId = trainingLine.unitId;
                            trainingRequest.amount = trainingLine.amount;
                            trainingRequest.priority = trainingLine.priority;
                            trainingRequests.push(trainingRequest);
                        }
                        else if (!hasTrueFlag(trainingLine, "trainingFlag") && hasTrueFlag(trainingLine, "cancelFlag") && !hasTrueFlag(trainingLine, "disbandFlag")) {
                            if (trainingLine.hasOwnProperty('mode')) {
                                var cancelRequest = {};
                                cancelRequest.unitId = trainingLine.unitId;
                                cancelRequests.push(cancelRequest);
                            }
                        } else if (!hasTrueFlag(trainingLine, "trainingFlag") && !hasTrueFlag(trainingLine, "cancelFlag") && hasTrueFlag(trainingLine, "disbandFlag")) {
                            if (trainingLine.hasOwnProperty('disbandAmount') && trainingLine.disbandAmount > 0) {
                                var disbandRequest = {};
                                disbandRequest.unitId = trainingLine.unitId;
                                disbandRequest.amount = trainingLine.disbandAmount;
                                disbandRequests.push(disbandRequest);
                            }
                        }
                    }
                );
                if (trainingRequests.length > 0) {
                    console.log("training " + JSON.stringify(trainingRequests));
                    trainings = Country.trainings($rootScope.token.token).save(trainingRequests, function () {
                        $route.reload();
                    });
                }
                if (cancelRequests.length > 0) {
                    console.log("cancel " + JSON.stringify(cancelRequests));
                    cancelRequests.forEach(function (cancelRequest) {
                        trainings = Country.trainings($rootScope.token.token).cancel({unitId: cancelRequest.unitId}, function () {
                            $route.reload();
                        });
                    });
                }
                if (disbandRequests.length > 0) {
                    console.log("disband " + JSON.stringify(disbandRequests));
                    var trainings = Country.armies($rootScope.token.token).disband(disbandRequests, function () {
                        $route.reload();
                    });
                }
            };

            function hasTrueFlag(object, propertyName) {
                return !!(object.hasOwnProperty(propertyName) && object[propertyName] == true);

            }
        }
    ])
;