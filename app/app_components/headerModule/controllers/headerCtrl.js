'use strict';
angular.module('headerModule')
    /* jshint maxparams:false */
    .controller('headerCtrl', ['$scope', '$rootScope', '$interval', 'userService', 'UserNameService', 'notificationService', 'notificationDropdownItemService', 'STATE_STATS', 'STATE_DASHBOARD', 'STATE_REPO_FILTER',
        function ($scope, $rootScope, $interval, userService, userNameService, notificationService, notificationDropdownItemService, STATE_STATS, STATE_DASHBOARD, STATE_REPO_FILTER) {
            $scope.navBar = [
                {title: 'navi.linkPullrequest', bubble: true, state: STATE_DASHBOARD},
                {title: 'navi.linkRanking', bubble: false, state: STATE_STATS},
                {title: 'navi.linkSettings', bubble: false, state: STATE_REPO_FILTER}
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

            $scope.markAllNotificationsRead = function () {
                notificationService.markAllNotificationsRead();
                $scope.notifications = [];
            };

            $scope.markNotificationAsSeen = function (event, id) {
                event.stopPropagation();

                notificationService.markNotificationRead(id);
                for (var idx in $scope.notifications) {
                    if ($scope.notifications[idx].id === id) {
                        $scope.notifications.splice(idx, 1);
                        break;
                    }
                }
            };

            $scope.toText = notificationDropdownItemService.convert;

            updateNotifications();
            $interval(function () {
                updateNotifications();
            }, 10000);

        }]
);
