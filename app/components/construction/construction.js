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
            console.log('construction');
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                console.log('construction enter');
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
                                            constructionTask.constructionAmount = construction.amount;
                                            constructionTask.priority = construction.priority;
                                        } else {
                                            constructionTask.constructionAmount = 0;
                                            constructionTask.priority = 10;
                                        }

                                        constructionTask.buildingFlag = false;
                                        constructionTask.demolishFlag = false;
                                        constructionTask.cancelFlag = false;
                                        constructionTasks.push(constructionTask);
                                    }
                                }
                            });

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
            }
        }]);

