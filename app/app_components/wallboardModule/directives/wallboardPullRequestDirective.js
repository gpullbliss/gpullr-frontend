'use strict';
angular.module('wallboardModule')
    .directive('dvbWallboardPullRequest', ['PullRequestCssClassService', function (PullRequestCssClassService) {
        return {
            restrict: 'A',
            scope: {
                pullRequest: '='
            },
            templateUrl: 'app_components/wallboardModule/views/pullRequest.html',
            link: function (scope, element) {
                var colorClass;

                colorClass = PullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt);
                element.addClass(colorClass);
            }
        };
    }]);
