'use strict';

// Declare app level module which depends on views, and components
angular.module('neoLemuriaApp', [
    'ngRoute',
    'login',
    'main'
])
    .run(function ($rootScope) {
        $rootScope.token = "";
        $rootScope.counter = 0;
        console.log("init rootscope" + Object.keys($rootScope));
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/login'});
    }]);
