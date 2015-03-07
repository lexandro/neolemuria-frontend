'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        console.log('Login klaty1')
        $routeProvider.when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [function () {
        console.log('Login klaty2')
    }]);