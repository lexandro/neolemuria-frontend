'use strict';

// TODO add better logging

// Declare app level module which depends on views, and components
angular.module('neoLemuriaApp', [
    'ngRoute',
    'login',
    'main'
])
    .run(function ($rootScope) {
        $rootScope.token = "";
        console.log("Rootscope initialized");
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});

    }])
;
