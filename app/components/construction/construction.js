'use strict';

angular.module('construction', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/construction', {
            templateUrl: 'app/components/construction/construction.html',
            controller: 'ConstructionCtrl'
        });
    }])

    .controller('ConstructionCtrl', ['$route', '$rootScope', '$scope', '$location', 'Country', 'Building',
        function ($route, $rootScope, $scope, $location, Country, Building) {
            console.log('construction');
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                console.log('construction enter');
                var buildings = Building.all().query(function () {
                    $rootScope.buildings = buildings

                    var token = $rootScope.token;
                    var constructions = Country.constructions(token.token).query(function () {
                        $scope.constructions = constructions;
                        console.log('construction: ' + JSON.stringify(constructions));
                        var constructionTasks = [];
                        buildings.forEach(function (building) {
                            if (building.level < 2) {
                                var constructionTask = {};
                                constructionTask.id = building.id;
                                constructionTask.name = building.name;
                                constructionTask.buildingAmount = 0;
                                constructionTask.parentAmount = 0;
                                constructionTask.constructionAmount = 0;
                                constructionTask.priority = 0;
                                constructionTask.buildingFlag = false;
                                constructionTask.demolishFlag = false;
                                constructionTask.cancelFlag = false;
                                constructionTasks.push(constructionTask);
                            }
                            ;
                        });
                        $scope.constructionTasks = constructionTasks;

                    });
                });
            }

        }
    ]);