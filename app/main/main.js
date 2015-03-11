'use strict';

angular.module('main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$rootScope', '$scope', '$location', 'Country', function ($rootScope, $scope, $location, Country) {
        if ($rootScope.token.length < 1) {
            $location.path('login');
        } else {
            console.log("MainCtrl call: " + JSON.stringify(entry));
            var entry = Country.overview($rootScope.token.token).get({countryId: $rootScope.token.user.countryId}, function () {
                    console.log("MainCtrl returned: " + JSON.stringify(entry));
                    $scope.country = entry;
                }
            );
        }
    }]);