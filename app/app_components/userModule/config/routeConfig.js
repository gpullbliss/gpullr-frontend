'use strict';
angular.module('userModule')
    .constant('STATE_LOGIN', 'login')
    .constant('STATE_GITHUB_OAUTH', 'githuboauth')
    .constant('STATE_REPO_FILTER', 'repoFilter')
    .config([
        '$stateProvider', 'STATE_LOGIN', 'STATE_GITHUB_OAUTH', 'STATE_REPO_FILTER',
        function ($stateProvider, STATE_LOGIN, STATE_GITHUB_OAUTH, STATE_REPO_FILTER) {
            $stateProvider
                .state(STATE_LOGIN, {
                    parent: 'pageWithoutHeader',
                    controller: 'loginCtrl',
                    templateUrl: 'app_components/loginModule/views/login.html',
                    url: '/login'
                }).state(STATE_GITHUB_OAUTH, {
                    parent: 'pageWithoutHeader',
                    controller: 'githubOauthCtrl',
                    templateUrl: 'app_components/loginModule/views/githuboauth.html',
                    url: '/oauth/github?code&state'
                }).state(STATE_REPO_FILTER, {
                    parent: 'page',
                    controller: 'userSettingsCtrl',
                    data: {requireLogin: true},
                    templateUrl: 'app_components/userModule/views/userSettings.html',
                    url: '/repo-filter'
                });
        }]);