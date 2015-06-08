'use strict';
angular.module('headerModule')
    .factory('notificationService', ['$http', '$interval', '$q', '$filter',
        function ($http, $interval, $q, $filter) {
            var url = '/api/notifications';
            var notifications = {};
            var intervalPromise = null;

            function startPolling() {
                fetchNotifications();

                if (intervalPromise !== null) {
                    $interval.cancel(intervalPromise);
                    intervalPromise = null;
                }
                intervalPromise = $interval(fetchNotifications, 10e3);
            }

            function stopPolling() {
                if (intervalPromise !== null) {
                    $interval.cancel(intervalPromise);
                    intervalPromise = null;
                }
                notifications = {};
            }

            function fetchNotifications() {
                $http.get(url).then(
                    function (response) {
                        notifications = response.data;
                    },
                    function (error) {
                        if (error === null) {
                            notifications = {};
                        } else if (error.status === 403) {
                            stopPolling();
                        }
                    }
                );
            }

            function getNotifications() {
                var deferred = $q.defer();
                deferred.resolve(notifications);
                return deferred.promise;
            }

            function markNotificationRead(notificationId) {
                return $http.delete(url + '/' + notificationId);
            }

            function markAllNotificationsRead() {
                return $http.delete(url);
            }

            function getNotificationMessage(notification) {
                var text = '';

                switch (notification.type) {
                    case 'PULLREQUEST_CLOSED':
                        text = $filter('translate')('navi.notifications.merged', {
                            user: notification.actorName,
                            prName: notification.pullRequestTitle,
                            repoName: notification.repoTitle
                        });
                        break;
                    case 'NEW_COMMENT':
                        break;
                    case 'NEW_COMMIT':
                        break;
                }

                return text;
            }

            // start polling after page reload. cookie MIGHT be available
            startPolling();

            return {
                getNotifications: getNotifications,
                markNotificationRead: markNotificationRead,
                markAllNotificationsRead: markAllNotificationsRead,
                getNotificationMessage: getNotificationMessage,

                startPolling: startPolling,
                stopPolling: stopPolling
            };
        }]
);
