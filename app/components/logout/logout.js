'use strict';

angular.module('logout', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'app/components/logout/logout.html',
            controller: 'LogoutCtrl'
        });
    }])

    .controller('LogoutCtrl', ['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.token = "";
        $location.path('login');
    }]);