'use strict';

angular.module('authenticationControllers', [])


    .config(['$routeProvider', function ($routeProvider) {
        console.log('Login start')
        $routeProvider.when('/login', {
            templateUrl: 'app/components/login/login.html',
            controller: 'LoginCtrl'
        });
    }])


    .controller('LoginCtrl', [function () {
        console.log('Login klaty')
    }]);