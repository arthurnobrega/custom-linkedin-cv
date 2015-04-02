'use strict';

angular.module('linkedoutApp', [
    'ngRoute',
    'ngSanitize'
])
.config(function ($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });
});
