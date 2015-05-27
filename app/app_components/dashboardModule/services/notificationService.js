'use strict';
angular.module('dashboardModule')
    .factory('notificationService', ['$http', '$interval', '$q', function ($http, $interval, $q) {
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

        // start polling after page reload. cookie MIGHT be available
        startPolling();

        return {
            getNotifications: getNotifications,
            markNotificationRead: markNotificationRead,
            markAllNotificationsRead: markAllNotificationsRead,

            startPolling: startPolling,
            stopPolling: stopPolling
        };
    }])
;
