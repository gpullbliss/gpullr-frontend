'use strict';
angular.module('loginModule')
    .constant('STATE_LOGIN', 'login')
    .config([
        '$stateProvider', 'STATE_LOGIN', 'STATE_OAUTH_GITHUB', function ($stateProvider, STATE_LOGIN, STATE_OAUTH_GITHUB) {
            $stateProvider
                .state(STATE_LOGIN, {
                    parent: 'page',
                    controller: 'loginCtrl',
                    templateUrl: 'app_components/loginModule/views/login.html',
                    url: '/login'
                }).state(STATE_OAUTH_GITHUB, {
                    parent: 'page',
                    controller: 'oauthCtrl',
                    templateUrl: 'app_components/loginModule/views/oauth.html',
                    url: '/oauth/callback'
                });
        }]);
