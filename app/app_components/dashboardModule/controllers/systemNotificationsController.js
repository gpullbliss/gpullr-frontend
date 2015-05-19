'use strict';
angular.module('dashboardModule').
    controller('systemNotificationsController', ['$scope', '$interval', 'notificationService', 'moment', function ($scope, $interval, notificationService, moment) {

        function init() {
            // periodically update notifications
            updateNotifications();
            $interval(function () {
                updateNotifications();
            }, 2e3);
        }

        function updateNotifications() {
            notificationService.getNotifications().then(
                function (response) {
                    $scope.messages = response.systemNotifications;

                    angular.forEach($scope.messages, function (msg) {
                        msg.validUntilParsed = moment(msg.validUntil).fromNow(true);
                    });
                }
            );
        }

        init();

    }]);