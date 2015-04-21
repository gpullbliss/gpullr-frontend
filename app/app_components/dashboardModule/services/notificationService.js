'use strict';
angular.module('dashboardModule')
    .factory('notificationService', ['$http', function ($http) {
        var url = '/api/notifications';

        function getNotificationList() {
            return $http.get(url).then(
                function (response) {
                    return response.data.items;
                }
            );
        }

        function markNotificationRead(notificationId) {
            return $http.delete(url + '/' + notificationId);
        }

        return {
            getNotifications: getNotificationList,
            markNotificationRead: markNotificationRead
        };
    }]);
