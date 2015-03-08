'use strict';

angular.module('main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$rootScope', function ($rootScope) {
        console.log("Main check rootscope" + Object.keys($rootScope));

    }]);