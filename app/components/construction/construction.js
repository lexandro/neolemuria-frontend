'use strict';

angular.module('construction', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/construction', {
            templateUrl: 'app/components/construction/construction.html',
            controller: 'ConstructionCtrl'
        });
    }])

    .controller('ConstructionCtrl', ['$route', '$rootScope', '$scope', '$location', 'Helpers', 'Country', 'Building',
        function ($route, $rootScope, $scope, $location, Helpers, Country, Building) {
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                var buildings = Building.all().query(function () {
                    $rootScope.buildings = buildings;
                    var token = $rootScope.token;
                    var lands = Country.lands(token.token).query({countryId: token.user.countryId}, function () {
                        var constructions = Country.constructions(token.token).query(function () {
                            $scope.constructions = constructions;
                            var constructionTasks = [];
                            var sumOfLands = 0;
                            lands.forEach(function (land) {
                                sumOfLands += land.amount;
                            });
                            buildings.forEach(function (building) {
                                if (building.level < 2 && building.buildable === true) {
                                    var parentAmount = getParent(building, lands);
                                    if (parentAmount > 0) {
                                        var constructionTask = {};
                                        var land = getEntryFrom(building, lands);
                                        var construction = getEntryFrom(building, constructions);
                                        constructionTask.id = building.id;
                                        constructionTask.name = building.name;
                                        constructionTask.parentAmount = parentAmount;
                                        //
                                        if (!Helpers.isEmpty(land)) {
                                            constructionTask.buildingAmount = land.amount;
                                            constructionTask.buildingPercentage = Math.ceil(land.amount / sumOfLands * 100);
                                        } else {
                                            constructionTask.buildingAmount = 0;
                                            constructionTask.buildingPercentage = 0;
                                        }
                                        //
                                        if (!Helpers.isEmpty(construction)) {
                                            if (construction.amount > 0) {
                                                constructionTask.constructionAmount = construction.amount;
                                                constructionTask.priority = construction.priority;
                                            } else {
                                                constructionTask.demolishAmount = Math.abs(construction.amount);
                                                constructionTask.priority = construction.priority;
                                            }
                                        } else {
                                            constructionTask.priority = 10;
                                        }
                                        constructionTask.constructionFlag = false;
                                        constructionTask.demolishFlag = false;
                                        constructionTask.cancelFlag = false;
                                        constructionTasks.push(constructionTask);
                                    }
                                }
                            });
                            //
                            function getParent(building, lands) {
                                var result = 0;
                                lands.some(function (land) {
                                    if (land.buildingId === building.parentId) {
                                        result = land.amount;
                                    }
                                    return result > 0;
                                });
                                return result;
                            }

                            //
                            function getEntryFrom(building, array) {
                                var result = {};
                                array.some(function (item) {
                                    if (item.buildingId === building.id) {
                                        result = item;
                                    }
                                    return !Helpers.isEmpty(result);
                                });
                                return result
                            }

                            $scope.constructionTasks = constructionTasks;
                        });
                    });

                });
                //
                $scope.updateConstruction = function (constructionTasks) {
                    var constructionRequests = [];
                    var cancelRequests = [];
                    constructionTasks.forEach(function (constructionTask) {
                        if (Helpers.hasTrueFlag(constructionTask, "constructionFlag")
                            && !Helpers.hasTrueFlag(constructionTask, "demolishFlag")
                            && !Helpers.hasTrueFlag(constructionTask, "cancelFlag")
                            && constructionTask.constructionAmount > 0) {
                            var constructionRequest = {};
                            constructionRequest.buildingId = constructionTask.id;
                            constructionRequest.amount = constructionTask.constructionAmount;
                            constructionRequest.priority = constructionTask.priority;
                            constructionRequests.push(constructionRequest);
                        }
                        else if (!Helpers.hasTrueFlag(constructionTask, "constructionFlag")
                            && Helpers.hasTrueFlag(constructionTask, "demolishFlag")
                            && !Helpers.hasTrueFlag(constructionTask, "cancelFlag")
                            && constructionTask.demolishAmount > 0) {
                            var constructionRequest = {};
                            constructionRequest.buildingId = constructionTask.id;
                            constructionRequest.amount = -constructionTask.demolishAmount;
                            constructionRequest.priority = constructionTask.priority;
                            constructionRequests.push(constructionRequest);
                        } else if (!Helpers.hasTrueFlag(constructionTask, "constructionFlag") && !Helpers.hasTrueFlag(constructionTask, "demolishFlag") && Helpers.hasTrueFlag(constructionTask, "cancelFlag")) {
                            cancelRequests.push(constructionTask.id);
                        }
                    });
                    if (constructionRequests.length > 0) {
                        Country.constructions($rootScope.token.token).save(constructionRequests, function () {
                            $route.reload();
                        });
                    }
                    //
                    if (cancelRequests.length > 0) {
                        cancelRequests.forEach(function (cancelRequest) {
                            Country.constructions($rootScope.token.token).cancel({buildingId: cancelRequest}, function () {
                                $route.reload();
                            });
                        });
                    }
                }
            }
        }]);

