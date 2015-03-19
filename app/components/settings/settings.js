'use strict';

angular.module('settings', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/settings', {
            templateUrl: 'app/components/settings/settings.html',
            controller: 'SettingsCtrl'
        });
    }])

    .controller('SettingsCtrl', ['$route', '$rootScope', '$scope', '$location', 'Country', 'Unit', 'UnitType',
        function ($route, $rootScope, $scope, $location, Country, Unit, UnitType) {
            console.log('settings');
            if ($rootScope.token.length < 1) {
                $location.path('login');
            } else {
                console.log('settings enter');
            }

        }
    ])
;