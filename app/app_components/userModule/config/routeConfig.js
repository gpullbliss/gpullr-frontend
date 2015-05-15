'use strict';
angular.module('userModule')
    .constant('STATE_LOGIN', 'login')
    .constant('STATE_GITHUB_OAUTH', 'githubOAuth')
    .constant('STATE_USER_SETTINGS', 'userSettings')
    .config([
        '$stateProvider', 'STATE_LOGIN', 'STATE_GITHUB_OAUTH', 'STATE_USER_SETTINGS',
        function ($stateProvider, STATE_LOGIN, STATE_GITHUB_OAUTH, STATE_USER_SETTINGS) {
            $stateProvider
                .state(STATE_LOGIN, {
                    parent: 'pageWithoutHeader',
                    controller: 'loginCtrl',
                    templateUrl: 'app_components/userModule/views/login.html',
                    url: '/login'
                }).state(STATE_GITHUB_OAUTH, {
                    parent: 'pageWithoutHeader',
                    controller: 'githubOauthCtrl',
                    templateUrl: 'app_components/userModule/views/githuboauth.html',
                    url: '/oauth/github?code&state'
                }).state(STATE_USER_SETTINGS, {
                    parent: 'page',
                    controller: 'userSettingsCtrl',
                    data: {requireLogin: true},
                    templateUrl: 'app_components/userModule/views/userSettings.html',
                    url: '/repo-filter'
                });
        }]);