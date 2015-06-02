'use strict';
angular.module('headerModule')
    .factory('desktopNotificationService', ['$filter', '$cookieStore', '$rootScope', 'notificationDropdownItemService', function ($filter, $cookieStore, $rootScope, notificationDropdownItemService) {

        var COOKIE_KEY = 'notifications';

        function updateCookie(notificationList) {
            $cookieStore.remove(COOKIE_KEY);

            var knownNotifications = {};
            notificationList.forEach(function (notification) {
                knownNotifications[notification.id] = notification.id;
            });

            $cookieStore.put(COOKIE_KEY, knownNotifications);
        }

        function notificationIsKnown(notification) {
            var knownNotifications = $cookieStore.get(COOKIE_KEY);

            if (typeof knownNotifications === 'undefined') {
                return false;
            }

            return typeof knownNotifications[notification.id] !== 'undefined';
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
                icon: 'http://gpullr.devbliss.com/styles/img/favicon/favicon.png'
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
                Notification.requestPermission(function() {
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

    }]
);
