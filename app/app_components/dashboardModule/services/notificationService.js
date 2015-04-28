'use strict';
angular.module('dashboardModule')
    .factory('notificationService', ['$http', function ($http) {
        var url = '/api/notifications';

        function getNotifications() {
            return $http.get(url).then(
                function (response) {
                    return response.data.items;
                }
            );
        }

        function markNotificationRead(notificationId) {
            return $http.delete(url + '/' + notificationId);
        }

        function markAllNotificationsRead() {
            return $http.delete(url);
        }

        return {
            getNotifications: getNotifications,
            markNotificationRead: markNotificationRead,
            markAllNotificationsRead: markAllNotificationsRead
        };
    }]);
