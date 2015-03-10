'use strict';

angular.module('main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$rootScope', '$location', function ($rootScope, $location) {
        if ($rootScope.token.length < 1) {
            $location.path('login');
        }
    }]);