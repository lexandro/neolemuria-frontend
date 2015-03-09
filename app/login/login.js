'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$rootScope', '$scope', 'Authentication', function ($rootScope, $scope, Authentication) {
        $scope.update = function (user) {
            $scope.master = angular.copy(user);
            $scope.token = user.name;
            //console.log("user: " + Object.keys(user));
            var entry = new Authentication();
            entry.$save(function () {
                console.log(entry);
            });
        };
    }])
;