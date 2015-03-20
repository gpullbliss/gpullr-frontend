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
                element.addClass(pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt));

                if (scope.pullRequest.assignedAt) {
                    element.addClass(pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.assignedAt, 'assignment'));
                }
            }
        };
    }]);
