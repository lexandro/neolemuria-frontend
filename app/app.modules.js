'use strict';

// TODO add better logging

// Declare app level module which depends on views, and components
angular.module('neoLemuriaApp', [
    'ngRoute',
    'ngResource',
    'neoLemuriaApp.services',
    'login',
    'main'
])
    .run(function ($rootScope) {
        $rootScope.token = "";
        console.log("Rootscope initialized");
    })
    .config(['$routeProvider', "$httpProvider", function ($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }])
;
