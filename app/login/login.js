'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.update = function (user) {
            $scope.master = angular.copy(user);
            $scope.token = user.name;
            console.log("user " + Object.keys(user));
            console.log("check rootscope " + Object.keys($rootScope));
        };
    }])
;