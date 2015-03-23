'use strict';
angular.module('wallboardModule')
    .directive('wallboardPullRequest', ['pullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            restrict: 'E',
            scope: {
                pullRequest: '='
            },
            templateUrl: 'app_components/wallboardModule/views/pullRequest.html',
            link: function (scope, element) {
                var colorClass;

                colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt);
                element.addClass(colorClass);

                if (scope.pullRequest.assignedAt) {
                    colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.assignedAt, 'assignment');
                    element.addClass(colorClass);
                }
            }
        };
    }]);
