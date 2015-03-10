'use strict';

// TODO add better logging

// Declare app level module which depends on views, and components
angular.module('neoLemuriaApp', [
    'ngRoute',
    'ngResource',
    'services',
    'login',
    'main'
])
    .run(function ($rootScope) {
        $rootScope.token = "";
        $rootScope.host = "http://localhost:8080";
        //$rootScope.host = "http://neolemuria.com:8080";
        //
        console.log("Rootscope initialized");
    })
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.common.userToken = '1';
        $routeProvider.otherwise({redirectTo: '/login'});
    }])
;

