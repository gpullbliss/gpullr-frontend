'use strict';
angular.module('dashboardModule').
    controller('systemNotificationsController', ['$scope', '$interval', 'notificationService', function ($scope, $interval, notficationService) {

        function init() {
            // periodically update notifications
            updateNotifications();
            $interval(function () {
                updateNotifications();
            }, 2e3);
        }

        function updateNotifications() {
            notficationService.getNotifications().then(
                function (response) {
                    $scope.messages = response.systemNotifications;

                    angular.forEach($scope.messages, function (msg) {
                        msg.validUntil = moment(msg.validUntil).fromNow();
                        console.log('moment(msg.validUntil).fromNow() = ' + moment(msg.validUntil).fromNow());
                    });
                }
            );
        }

        init();

    }]);