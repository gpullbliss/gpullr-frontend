'use strict';
angular.module('wallboardModule')
    .constant('STATE_WALLBOARD', 'wallboard')
    .config([
        '$stateProvider', 'STATE_WALLBOARD', function ($stateProvider, STATE_WALLBOARD) {
            $stateProvider
                .state(STATE_WALLBOARD, {
                    parent: 'pageWithoutHeader',
                    controller: 'wallboardCtrl',
                    templateUrl: 'app_components/wallboardModule/views/wallboard.html',
                    url: '/wallboard'
                });
        }]);
