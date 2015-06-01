'use strict';
angular.module('headerModule')
    .factory('desktopNotificationService', ['$filter', '$cookieStore', 'notificationDropdownItemService', function ($filter, $cookieStore, notificationDropdownItemService) {

        var COOKIE_KEY = 'notifications';

        function getNotificationDiff(newNotificationList, existingNotificationList) {
            var diffNotificationList = [];

            newNotificationList.forEach(function (newNotification) {
                var match = false;
                existingNotificationList.forEach(function (existingNotification) {
                    if (existingNotification.id === newNotification.id) {
                        match = true;
                        return;
                    }
                });

                if (match === false) {
                    diffNotificationList.push(newNotification);
                }

            });

            return diffNotificationList;
        }

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

        function sendNotificationsIfNew(existingNotificationList, newNotificationList) {
            if ('Notification' in window) {
                Notification.requestPermission(function() {
                    var diffNotificationList = [];

                    if (typeof existingNotificationList === 'undefined' && typeof newNotificationList === 'undefined') {
                        return;
                    } else if (typeof existingNotificationList === 'undefined') {
                        diffNotificationList = newNotificationList;
                    } else {
                        diffNotificationList = getNotificationDiff(newNotificationList, existingNotificationList);
                    }

                    diffNotificationList.forEach(sendNotification);

                    if (typeof newNotificationList !== 'undefined') {
                        updateCookie(newNotificationList);
                    }
                });
            }
        }

        return {
            sendNotificationsIfNew: sendNotificationsIfNew
        };

    }]
);
