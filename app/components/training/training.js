'use strict';

angular.module('training', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/training', {
            templateUrl: 'app/components/training/training.html',
            controller: 'TrainingCtrl'
        });
    }])

    .controller('TrainingCtrl', ['$rootScope', '$scope', '$location', 'Country', 'Unit', function ($rootScope, $scope, $location, Country, Unit) {
        console.log('TRAINING! ***********');
        if ($rootScope.token.length < 1) {
            $location.path('login');
        } else {
            var units = Unit.all().query(function () {
                $scope.units = units;
                $rootScope.units = units;
            });

            var token = $rootScope.token;
            var trainings = Country.trainings(token.token).get({countryId: token.user.countryId}, function () {
                console.log('Training trainings:' + JSON.stringify(trainings));
                $scope.trainings = trainings;
                $rootScope.trainings = trainings;
            });
        }

    }]);