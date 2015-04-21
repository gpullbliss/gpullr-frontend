'use strict';
angular.module('headerModule')
    /* jshint maxparams:false */
    .controller('headerCtrl', ['$scope', '$rootScope', '$interval', 'userService', 'UserNameService', 'notificationService', 'STATE_STATS', 'STATE_DASHBOARD', 'STATE_REPO_FILTER',
        function ($scope, $rootScope, $interval, userService, userNameService, notificationService, STATE_STATS, STATE_DASHBOARD, STATE_REPO_FILTER) {
            $scope.navBar = [
                {title: 'All Requests', bubble: true, state: STATE_DASHBOARD},
                {title: 'Ranking', bubble: false, state: STATE_STATS},
                {title: 'Settings', bubble: false, state: STATE_REPO_FILTER}
            ];
            $scope.getName = userNameService.getName;
            userService.getCurrentUser();

            $rootScope.$on('changeRequestCount', function (event, requestCount) {
                $scope.requestCount = requestCount;
            });

            $interval(notificationService.getNotifications().then(
                function(response){
                    console.log('notification response items: ' + angular.toJson(response, true));
                    $scope.notifications = response;
                }
            ), 5000);

        }]
);
