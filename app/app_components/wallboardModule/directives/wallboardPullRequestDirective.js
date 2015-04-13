'use strict';
angular.module('wallboardModule')
    .directive('dvbWallboardPullRequest', ['pullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            restrict: 'A',
            scope: {
                pullRequest: '='
            },
            templateUrl: 'app_components/wallboardModule/views/pullRequest.html',
            link: function (scope, element) {
                var colorClass;

                colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt);
                element.addClass(colorClass);

                if (scope.pullRequest.assignedAt && scope.pullRequest.assignee) {
                    colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.assignedAt, 'assignment');
                    angular.element('.userBlock').addClass(colorClass);
                }
            }
        };
    }]);
