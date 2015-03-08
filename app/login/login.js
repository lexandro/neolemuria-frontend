'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        console.log('Login klaty1')
        $routeProvider.when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.update = function (user) {
            $scope.master = angular.copy(user);
            console.log("check rootscope" + Object.keys($rootScope));
        };
    }])


;