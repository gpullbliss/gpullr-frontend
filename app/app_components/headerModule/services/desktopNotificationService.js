'use strict';
angular.module('headerModule')
    .factory('desktopNotificationService', ['$filter', '$cookieStore', 'notificationDropdownItemService', function ($filter, $cookieStore, notificationDropdownItemService) {

        var COOKIE_KEY = 'notifications';

        function getNotificationDiff(newNotificationList, exitingNotififcationList) {
            var diffNotificationList = [];

            newNotificationList.forEach(function (newNotification) {
                var match = false;
                exitingNotififcationList.forEach(function (existingNotification) {
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

        function sendNotificationIfNew(existingNotificationList, newNotificationList) {
            var diffNotificationList = [];

            if (typeof existingNotificationList === 'undefined' && typeof newNotificationList === 'undefined') {
                return;
            } else if (typeof existingNotificationList === 'undefined') {
                diffNotificationList = newNotificationList;
            } else {
                diffNotificationList = getNotificationDiff(newNotificationList, existingNotificationList);
            }

            diffNotificationList.forEach(sendNewNotification);

            if (typeof newNotificationList !== 'undefined') {
                updateCookie(newNotificationList);
            }
        }

        function sendNotificationToDevice(title, message, tag) {
            if ('Notification' in window) {
                Notification.requestPermission(function () {
                    var options = {
                        body: message,
                        tag: tag,
                        lang: $filter('translate')('global.bcp47'),
                        icon: 'http://gpullr.devbliss.com/styles/img/favicon/favicon.png'
                    };

                    var notification = new Notification(title, options);

                    notification.onshow = function () {
                        console.log('Notification shown');
                    };

                    notification.onclose = function () {
                        console.log('Notification closed');
                    };

                    notification.onclick = function () {
                        console.log('Notification clicked');
                    };
                });
            }
        }

        function notificationHasNotBeenSentYet(sentNotifications, notificationId) {
            return typeof sentNotifications[notificationId] === 'undefined';
        }

        function sendNewNotification(notification) {
            var sentNotifications = $cookieStore.get(COOKIE_KEY);
            if (typeof sentNotifications === 'undefined') {
                sentNotifications = {};
            }

            var notificationId = notification.id;
            if (notificationHasNotBeenSentYet(sentNotifications, notificationId)) {
                var title = notification.repoTitle + ' - ' + notification.pullRequestTitle;
                var message = notificationDropdownItemService.convert(notification);
                var tag = notification.repoTitle;

                sendNotificationToDevice(title, message, tag);
            }
        }

        return {
            sendNotificationIfNew: sendNotificationIfNew
        };

    }]
);
