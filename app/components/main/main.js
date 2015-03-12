'use strict';

angular.module('main', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            templateUrl: 'app/components/main/main.html',
            controller: 'MainCtrl'
        });
    }])

    .controller('MainCtrl', ['$rootScope', '$scope', '$location', 'Country', function ($rootScope, $scope, $location, Country) {
        if ($rootScope.token.length < 1) {
            $location.path('login');
        } else {
            if ($scope.country === undefined) {
                var token = $rootScope.token;
                var entry = Country.overview(token.token).get({countryId: token.user.countryId}, function () {
                        if ($scope.country === undefined) {
                            console.log("MainCtrl returned: " + JSON.stringify(entry));
                            $scope.country = entry;
                        }
                    }
                );
            }
        }
    }]);