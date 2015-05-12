'use strict';
angular.module('userSettingsModule')
    .constant('STATE_REPO_FILTER', 'repoFilter')
    .config([
        '$stateProvider', 'STATE_REPO_FILTER', function ($stateProvider, STATE_REPO_FILTER) {
            $stateProvider
                .state(STATE_REPO_FILTER, {
                    parent: 'page',
                    controller: 'userSettingsCtrl',
                    data: {requireLogin: true},
                    templateUrl: 'app_components/userSettingsModule/views/userSettings.html',
                    url: '/repo-filter'
                });
        }]);
