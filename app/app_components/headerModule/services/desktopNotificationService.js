'use strict';
angular.module('headerModule')
    .factory('desktopNotificationService', ['$filter', 'notificationDropdownItemService', function ($filter, notificationDropdownItemService) {

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

        function sendNotificationIfNew(exitingNotififcationList, newNotificationList) {
            var diffNotificationList = [];

            if (typeof exitingNotififcationList === 'undefined' && typeof newNotificationList === 'undefined') {
                return;
            } else if (typeof exitingNotififcationList === 'undefined') {
                diffNotificationList = newNotificationList;
            } else {
                diffNotificationList = getNotificationDiff(newNotificationList, exitingNotififcationList);
            }

            diffNotificationList.forEach(function(notification) {
                var title = notification.repoTitle + ' - ' + notification.pullRequestTitle;
                var message = notificationDropdownItemService.convert(notification);
                var tag = notification.repoTitle;

                sendNotifictionToDevice(title, message, tag);
            });
        }

        function sendNotifictionToDevice(title, message, tag) {
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

                    notification.onclose = function() {
                        console.log('Notification closed');
                    };

                    notification.onclick = function() {
                        console.log('Notification clicked');
                    };
                });
            }
        }

        return {
            sendNotificationIfNew: sendNotificationIfNew
        };

    }]
);
