'use strict';

angular.module('linkedoutApp')

.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
})

.controller('LoginCtrl', [

    '$scope', 'Session', '$location',

    function ($scope, Session, $location) {
        var self = this;

        self.isLoggedIn = false;

        Session.then(function (session) {

            function updateLoginState(methodName, isLoggedIn) {
                session[methodName](function () {
                    $scope.$apply(function () {
                        self.isLoggedIn = isLoggedIn;
                        if (isLoggedIn) {
                            $location.path('/profile');
                        }
                    });
                });
            }

            self.login = session.login;

            updateLoginState('onLogin', true);
            updateLoginState('onLogout', false);

        });

    }
]);
