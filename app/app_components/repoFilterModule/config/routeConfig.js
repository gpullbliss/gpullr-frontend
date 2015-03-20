'use strict';
angular.module('repoFilterModule')
    .constant('STATE_REPO_FILTER', 'repoFilter')
    .config([
        '$stateProvider', 'STATE_REPO_FILTER', function ($stateProvider, STATE_REPO_FILTER) {
            $stateProvider
                .state(STATE_REPO_FILTER, {
                    parent: 'page',
                    //controller: 'loginCtrl',
                    templateUrl: 'app_components/repoFilterModule/views/repoFilter.html',
                    url: '/repo-filter'
                });
        }]);
