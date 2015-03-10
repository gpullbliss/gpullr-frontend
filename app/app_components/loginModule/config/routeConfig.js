'use strict';
angular.module('loginModule')
    .constant('STATE_LOGIN', 'login')
    .config([
        '$stateProvider', 'STATE_LOGIN', function ($stateProvider, STATE_LOGIN) {
            $stateProvider
                .state(STATE_LOGIN, {
                    parent: 'page',
                    controller: 'loginCtrl',
                    templateUrl: 'app_components/loginModule/views/login.html',
                    url: '/login'
                });
        }]);
