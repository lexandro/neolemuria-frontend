'use strict';

// TODO add better logging

// Declare app level module which depends on views, and components
angular.module('neoLemuriaApp', [
    'ngRoute',
    'ngResource',
    'services',
    'login',
    'main',
    'training',
    'construction',
    'attack',
    'discovery',
    'settings',
    'logout'
])
    .run(['$rootScope', 'AttackType', 'Building', 'Unit', 'UnitType', function ($rootScope, AttackType, Building, Unit, UnitType) {
        console.log("Initializing client...");
        $rootScope.token = "";
        $rootScope.host = "http://localhost:8080";
        //$rootScope.host = "http://neolemuria.com:8080";
        //
        $rootScope.sidemenu = 'app/shared/sidemenu.html';

        /**/
        var attackTypes = AttackType.all().query(function () {
            $rootScope.attackTypes = attackTypes;
            console.log("AttackTypes initialized with " + attackTypes.length + " element");
        });
        var buildings = Building.all().query(function () {
            $rootScope.buildings = buildings;
            console.log("Buildings initialized with " + buildings.length + " element");
        });
        var units = Unit.all().query(function () {
            $rootScope.units = units;
            console.log("Units initialized with " + units.length + " element");
        });
        var unitTypes = UnitType.all().query(function () {
            $rootScope.unitTypes = unitTypes;
            console.log("UnitTypes initialized with " + unitTypes.length + " element");
        });

    }])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $httpProvider.defaults.headers.common.userToken = '';
        $routeProvider.otherwise({redirectTo: '/login'});
    }])
;

