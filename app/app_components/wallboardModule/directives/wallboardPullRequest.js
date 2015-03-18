'use strict';
angular.module('wallboardModule')
    .directive('wallboardPullRequest', ['moment', function (moment) {
        return {
            restrict: 'E',
            scope: {
                pullRequest: '='
            },
            templateUrl: 'app_components/wallboardModule/views/pullRequest.html',
            link: function (scope, element) {
                var diffAssignedAt,
                    diffCreatedAt;

                /* TODO (Michael Diodone 2015-03-16): Move into service and use in pullRequest directive (dashboardModule) */
                var getColorClass = function (minutesDiff, prefix) {
                    var colorClass;
                    // hours difference rounds up and down. therefore once above the round up threshold, apply rule.
                    if (minutesDiff < 90) {
                        colorClass = 'youngerThan2h';
                    } else if (minutesDiff >= 90 && minutesDiff < 210) {
                        colorClass = 'olderThan2h';
                    } else if (minutesDiff >= 210 && minutesDiff < 450) {
                        colorClass = 'olderThan4h';
                    } else if (minutesDiff >= 450 && minutesDiff < 43170) {
                        colorClass = 'olderThan8h';
                    } else if (minutesDiff >= 43170) {
                        colorClass = 'olderThanAMonth';
                    }
                    if (prefix) {
                        colorClass = prefix + colorClass.charAt(0).toUpperCase() + colorClass.slice(1);
                    }
                    return colorClass;
                };

                diffCreatedAt = moment().diff(scope.pullRequest.createdAt, 'minutes');
                element.addClass(getColorClass(diffCreatedAt));

                if (scope.pullRequest.assignedAt) {
                    diffAssignedAt = moment().diff(scope.pullRequest.assignedAt, 'minutes');
                    element.addClass(getColorClass(diffAssignedAt, 'assignment'));
                }
            }
        };
    }]);
