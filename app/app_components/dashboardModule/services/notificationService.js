'use strict';
angular.module('dashboardModule')
    .factory('notificationService', ['$http', '$interval', '$q', function ($http, $interval, $q) {
        var url = '/api/notifications';
        var doPoll = false;
        var notifications = {};
        var intervalPromise = null;

        function startPolling() {
            doPoll = true;
            fetchNotifications();

            if (intervalPromise !== null) {
                $interval.cancel(intervalPromise);
                intervalPromise = null;
            }
            intervalPromise = $interval(fetchNotifications, 10e3);
        }

        function stopPolling() {
            doPoll = false;
        }

        function fetchNotifications() {
            if (doPoll) {
                $http.get(url).then(
                    function (response) {
                        notifications = response.data;
                    },
                    function (error) {
                        if (error.status === 403) {
                            doPoll = false;
                        }
                    }
                );
            }
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
