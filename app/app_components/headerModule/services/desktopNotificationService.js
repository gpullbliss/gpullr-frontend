'use strict';
angular.module('headerModule')
    .factory('desktopNotificationService',
    ['$filter', '$cookies', '$rootScope', 'notificationDropdownItemService',
        function ($filter, $cookies, $rootScope, notificationDropdownItemService) {

            var COOKIE_KEY = 'notifications';

            function updateCookie(notificationList) {
                $cookies.remove(COOKIE_KEY);

                var knownNotifications = [];
                notificationList.forEach(function (notification) {
                    knownNotifications.push(notification.id);
                });

                $cookies.putObject(COOKIE_KEY, knownNotifications);
            }

            function notificationIsKnown(notification) {
                var knownNotifications = $cookies.get(COOKIE_KEY);

                if (typeof knownNotifications === 'undefined') {
                    return false;
                }

                return knownNotifications.indexOf(notification.id) > -1;
            }

            function sendNotification(notification) {
                if (notificationIsKnown(notification)) {
                    return;
                }

                var title = notification.repoTitle + ' - ' + notification.pullRequestTitle;
                var options = {
                    body: notificationDropdownItemService.convert(notification),
                    tag: notification.repoTitle,
                    lang: $filter('translate')('global.bcp47'),
                    icon: '/styles/img/notification.png'
                };

                new Notification(title, options);
            }

            function hasDesktopNotificationDisbled() {
                if (typeof $rootScope.user === 'undefined') {
                    return true;
                } else if (typeof $rootScope.user.userSettingsDto === 'undefined') {
                    return true;
                }

                return !$rootScope.user.userSettingsDto.desktopNotification;
            }

            function sendNotificationsIfNew(notifications) {
                if ('Notification' in window) {
                    Notification.requestPermission(function () {
                        if (typeof notifications === 'undefined') {
                            return;
                        }

                        if (hasDesktopNotificationDisbled()) {
                            return;
                        }

                        notifications.forEach(sendNotification);
                        updateCookie(notifications);
                    });

                }

            }

            return {
                sendNotificationsIfNew: sendNotificationsIfNew
            };

        }

    ]
);
