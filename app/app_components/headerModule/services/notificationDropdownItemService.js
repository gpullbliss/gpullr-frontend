'use strict';
angular.module('headerModule')
    .factory('notificationDropdownItemService', ['$filter', function ($filter) {

        function sendNotification(title, message) {
            if ('Notification' in window) {
                Notification.requestPermission(function() {
                    var options = {
                        body: message,
                        tag: 'preset',
                        icon: 'http://gpullr.devbliss.com/favicon.ico'
                    }

                    var notification = new Notification(title, options);

                    notification.onshow = function() {
                        console.log('Notification shown');
                    };
                });
            }
        }

        function convert(n) {
            var text = '',
                closedPr = $filter('translate')('navi.notifications.closedPr'),
                inRepo = $filter('translate')('navi.notifications.inRepo');

            switch (n.type) {
                case 'PULLREQUEST_CLOSED':
                    text = n.actorName + ' ' + closedPr + ' ' + n.pullRequestTitle + ' ' + inRepo + ' ' + n.repoTitle + '"';
                    sendNotification(closedPr, text);
                    break;
            }

            return text;
        }

        return {
            convert: convert
        };
    }]
);
