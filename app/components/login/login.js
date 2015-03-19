'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/components/login/login.html',
            controller: 'LoginCtrl'
        });
    }])

    .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'Authentication', function ($rootScope, $scope, $location, Authentication) {
        $scope.update = function (user) {
            $scope.master = angular.copy(user);
            var entry = new Authentication();
            entry.$save({username: user.name, password: user.password}, function () {
                console.log("LoginCtrl returned json: " + JSON.stringify(entry));
                $rootScope.token = entry;
                $location.path('main');
            });
        };
    }])
;