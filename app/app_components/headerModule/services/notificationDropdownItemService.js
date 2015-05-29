'use strict';
angular.module('headerModule')
    .factory('notificationDropdownItemService', ['$filter', function ($filter) {

        function convert(n) {
            var text = '',
                closedPr = $filter('translate')('navi.notifications.closedPr'),
                inRepo = $filter('translate')('navi.notifications.inRepo');

            switch (n.type) {
                case 'PULLREQUEST_CLOSED':
                    text = n.actorName + ' ' + closedPr + ' ' + n.pullRequestTitle + ' ' + inRepo + ' ' + n.repoTitle + '"';
                    break;
            }

            return text;
        }

        return {
            convert: convert
        };
    }]
);
