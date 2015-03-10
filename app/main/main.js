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
            //var entry = new Country();
            var entry = Country.get({countryId: $rootScope.token.token}, function () {
                    console.log("MainCtrl returned: " + JSON.stringify(entry));
                    $scope.country = entry;
                }
            );
        }
    }]);