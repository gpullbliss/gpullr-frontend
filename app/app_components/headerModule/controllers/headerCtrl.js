'use strict';
angular.module('headerModule')
    /* jshint maxparams:false */
    .controller('headerCtrl', ['$scope', '$rootScope', '$interval', 'userService', 'UserNameService', 'notificationService', 'STATE_STATS', 'STATE_DASHBOARD', 'STATE_REPO_FILTER',
        function ($scope, $rootScope, $interval, userService, userNameService, notificationService, STATE_STATS, STATE_DASHBOARD, STATE_REPO_FILTER) {
            var notificationUpdaterPromise;

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

            function updateNotifications() {
                notificationService.getNotifications().then(
                    function (response) {
                        $scope.notifications = response;
                    }
                    //function (error) {
                    //    if (angular.isDefined(notificationUpdaterPromise)){
                    //        console.log('cancelling periodic notifications poll');
                    //        $interval.cancel(notificationUpdaterPromise);
                    //        notificationUpdaterPromise = undefined;
                    //    }
                    //}
                );
            }

            updateNotifications();
            notificationUpdaterPromise = $interval(function () {
                updateNotifications();
            }, 10000);

        }]
);
