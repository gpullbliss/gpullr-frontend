'use strict';
angular.module('headerModule')
    .controller('headerCtrl', ['$scope', '$rootScope', '$interval', 'userService', 'notificationService', 'notificationDropdownItemService', 'desktopNotificationService', 'STATE_STATS_TODAY', 'STATE_DASHBOARD', 'STATE_USER_SETTINGS',
        function ($scope, $rootScope, $interval, userService, notificationService, notificationDropdownItemService, desktopNotificationService, STATE_STATS_TODAY, STATE_DASHBOARD, STATE_USER_SETTINGS) {

            function init() {
                userService.getCurrentUser();
                setupNavBar();
                updateNotifications();
                subscribeChangeRequestCountEvent();

                // periodically update notifications
                $interval(function () {
                    updateNotifications();
                }, 2e3);
            }

            function setupNavBar() {
                $scope.navBar = [
                    {
                        title: 'navi.linkPullrequest',
                        bubble: true,
                        class: 'dashboard',
                        state: STATE_DASHBOARD
                    },
                    {
                        title: 'navi.linkRanking',
                        bubble: false,
                        class: 'stats',
                        state: STATE_STATS_TODAY
                    },
                    {
                        title: 'navi.linkSettings',
                        bubble: false,
                        class: 'settings',
                        state: STATE_USER_SETTINGS
                    }
                ];
            }

            function subscribeChangeRequestCountEvent() {
                $rootScope.$on('changeRequestCount', function (event, requestCount) {
                    $scope.requestCount = requestCount;
                });
            }

            function updateNotifications() {
                notificationService.getNotifications().then(
                    function (response) {
                        if (response !== undefined) {
                            desktopNotificationService.sendNotificationsIfNew(response.userNotifications);
                            $scope.notifications = response.userNotifications;
                        }
                    }
                );
            }

            $scope.getName = function (user) {
                return userService.getName(user);
            };

            $scope.toText = function (n) {
                return notificationDropdownItemService.convert(n);
            };

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

            init();
        }]
);
