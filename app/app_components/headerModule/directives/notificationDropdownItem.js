'use strict';
angular.module('headerModule').
    factory('notificationDropdownItemService', function () {
        function convert(n) {
            var text = '';

            switch (n.type) {
                case 'PULLREQUEST_CLOSED':
                    text = n.actorName + ' closed your pull request "' + n.pullRequestTitle +
                    '" in repository "' + n.repoTitle + '"';
                    break;
            }

            return text;
        }

        return {
            convert: convert
        };
    });

